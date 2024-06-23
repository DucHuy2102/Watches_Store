import { useEffect, useMemo, useState } from 'react';
import { ProductCard } from '../exportPages';
import { PaginationComponent, Sort_Filter } from '../../components/exportComponents';
import { useDispatch, useSelector } from 'react-redux';
import { clearSearch, clearFilter, addAllProducts } from '../../redux/slides/productSlide';
import { useQuery } from '@tanstack/react-query';
import * as ProductService from '../../services/ProductService';

const ProductPage = () => {
    const dispatch = useDispatch();

    // Get all products from redux
    const products_Redux = useSelector((state) => state.product.products);
    const productsLength = products_Redux.length;

    // Get search data from redux
    const searchProduct_Redux = useSelector((state) => state.product.search);
    const isFilter = useSelector((state) => state.product.isFilter);

    // Function to get all products from API
    const getProducts = async () => {
        const res = await ProductService.getAllProduct();
        return res;
    };

    // Fetch data from API using react-query
    const { data } = useQuery({
        queryKey: ['products'],
        queryFn: getProducts,
        enabled: productsLength === 0,
    });

    // Add all products to redux store
    useEffect(() => {
        if (data?.data && productsLength === 0) {
            dispatch(addAllProducts(data.data));
        }
    }, [data, dispatch, productsLength]);

    // Pagination state and function to handle pagination logic
    const [currentPage, setCurrentPage] = useState(1);
    const [productPerPage] = useState(12);
    const lastProductIndex = currentPage * productPerPage;
    const firstProductIndex = lastProductIndex - productPerPage;

    // Get data to display on page
    const dataToDisplay = useMemo(() => {
        return searchProduct_Redux.length > 0 ? searchProduct_Redux : products_Redux;
    }, [products_Redux, searchProduct_Redux]);

    // Get products to display on page
    const displayData = useMemo(() => {
        return Array.isArray(dataToDisplay)
            ? dataToDisplay.slice(firstProductIndex, lastProductIndex)
            : [];
    }, [dataToDisplay, firstProductIndex, lastProductIndex]);

    // Clear search data in redux store when component unmounts
    useEffect(() => {
        return () => {
            if (searchProduct_Redux.length > 0) {
                dispatch(clearSearch());
            } else if (isFilter) {
                dispatch(clearFilter());
            }
        };
    }, [dispatch, searchProduct_Redux.length, isFilter]);

    return (
        <div className='w-full mb-2 flex flex-col items-center justify-center'>
            {/* Sort and filter */}
            <Sort_Filter />

            {/* Products */}
            <div className='mt-7 mb-3 grid grid-cols-3 gap-10'>
                <ProductCard products={displayData} />
            </div>

            {/* Pagination */}
            <PaginationComponent
                totalProducts={dataToDisplay.length}
                productPerPage={productPerPage}
                setCurrentPageValue={setCurrentPage}
            />
        </div>
    );
};

export default ProductPage;
