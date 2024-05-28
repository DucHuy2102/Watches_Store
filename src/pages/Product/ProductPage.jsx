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
    const dataSearch_Redux = useSelector((state) => state.searchProduct.search);

    const getAllProduct = async () => {
        const res = await ProductService.getAllProduct();
        return res;
    };

    const { data } = useQuery({
        queryKey: ['products'],
        queryFn: getAllProduct,
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchInterval: false,
    });

    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (searchRef.current) {
            console.log('hello');
        }
        searchRef.current = true;
    }, []);

    useEffect(() => {
        if (dataSearch_Redux.length > 0) {
            setProducts(dataSearch_Redux);
        } else if (data && data.data) {
            setProducts(data.data);
        }
    }, [data, dataSearch_Redux]);

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
