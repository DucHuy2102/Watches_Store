import { useEffect, useMemo, useRef, useState } from 'react';
import { ProductCard } from '../exportPages';
import { PaginationComponent, Sort_Filter } from '../../components/exportComponents';
import { useDispatch, useSelector } from 'react-redux';
import { clearSearch } from '../../redux/slides/productSlide';

const ProductPage = () => {
    const dispatch = useDispatch();

    // Get all products from redux
    const dataProducts_Redux = useSelector((state) => state.product.products);

    // Get search data from redux
    const dataSearch_Redux = useSelector((state) => state.product.search);

    // Pagination state and function to handle pagination logic
    const [currentPage, setCurrentPage] = useState(1);
    const [productPerPage] = useState(12);
    const lastProductIndex = currentPage * productPerPage;
    const firstProductIndex = lastProductIndex - productPerPage;

    // Get data to display on page
    const dataToDisplay = useMemo(() => {
        return dataSearch_Redux.length > 0 ? dataSearch_Redux : dataProducts_Redux;
    }, [dataProducts_Redux, dataSearch_Redux]);

    // Get products to display on page
    const displayData = useMemo(() => {
        return Array.isArray(dataToDisplay)
            ? dataToDisplay.slice(firstProductIndex, lastProductIndex)
            : [];
    }, [dataToDisplay, firstProductIndex, lastProductIndex]);

    // Clear search data in redux store when component unmounts
    useEffect(() => {
        return () => {
            dispatch(clearSearch());
        };
    }, [dispatch]);

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
