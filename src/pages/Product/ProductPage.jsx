import { useEffect, useRef, useState } from 'react';
import { ProductCard } from '../exportPages';
import { PaginationComponent, Sort_Filter } from '../../components/exportComponents';
import { useQuery } from '@tanstack/react-query';
import * as ProductService from '../../services/ProductService';
import { useDispatch, useSelector } from 'react-redux';
import { clearSearch } from '../../redux/slides/productSlide';

const ProductPage = () => {
    // pagination state and function to handle pagination logic
    const [currentPage, setCurrentPage] = useState(1);
    const [productPerPage] = useState(12);
    const lastProductIndex = currentPage * productPerPage;
    const firstProductIndex = lastProductIndex - productPerPage;

    // search state and function to handle search logic
    const searchRef = useRef(false);
    const dispatch = useDispatch();

    // get data from redux
    const dataSearch_Redux = useSelector((state) => state.product.search);

    // get all products from api and set to state allProducts
    // and products to display on page
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const getAllProduct = async () => {
        const res = await ProductService.getAllProduct();
        return res;
    };  
    const { data } = useQuery({
        queryKey: ['products'],
        queryFn: getAllProduct,
        keepPreviousData: true,
    });

    // get products to display on page
    const currentProducts = Array.isArray(products)
        ? products.slice(firstProductIndex, lastProductIndex)
        : [];

    // set all products to state allProducts and products to display on page
    useEffect(() => {
        if (data && data.data) {
            setAllProducts(data.data);
            if (!searchRef.current) {
                setProducts(data.data);
            }
        }
    }, [data]);

    // set products to display on page when search data change in redux store
    // or when search data is empty in redux store
    useEffect(() => {
        if (searchRef.current) {
            if (dataSearch_Redux && dataSearch_Redux.length > 0) {
                setProducts(dataSearch_Redux);
            } else {
                setProducts(allProducts);
            }
        } else {
            searchRef.current = true;
        }
    }, [dataSearch_Redux, allProducts]);

    // clear search data in redux store when component unmount or change page to another page in pagination component
    // or sort and filter component
    useEffect(() => {
        dispatch(clearSearch());
    }, [dispatch]);

    return (
        <div className='w-full mb-2 flex flex-col items-center justify-center'>
            {/* sort and filter */}
            <Sort_Filter />

            {/* products */}
            <div className='mt-7 mb-3 grid grid-cols-3 gap-10'>
                <ProductCard products={currentProducts} />
            </div>

            {/* pagination */}
            <PaginationComponent
                totalProducts={products.length}
                productPerPage={productPerPage}
                setCurrentPageValue={setCurrentPage}
            />
        </div>
    );
};

export default ProductPage;
