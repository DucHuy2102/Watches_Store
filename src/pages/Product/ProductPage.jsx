import { useEffect, useRef, useState } from 'react';
import { ProductCard } from '../exportPages';
import {
    PaginationComponent,
    Sort_Filter,
} from '../../components/exportComponents';
import { useQuery } from '@tanstack/react-query';
import * as ProductService from '../../services/ProductService';
import { useSelector } from 'react-redux';

const ProductPage = () => {
    const searchRef = useRef(false);
    const dataSearch_Redux = useSelector(
        (state) => state?.searchProduct?.search
    );

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

    useEffect(() => {
        if (data && data.data) {
            setAllProducts(data.data);
            if (!searchRef.current) {
                setProducts(data.data);
            }
        }
    }, [data]);

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

    return (
        <div className='w-full mb-2 flex flex-col items-center justify-center'>
            {/* sort and filter */}
            <Sort_Filter />

            {/* products */}
            <div className='mt-7 mb-3 grid grid-cols-3 gap-10'>
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {/* pagination */}
            <PaginationComponent />
        </div>
    );
};

export default ProductPage;
