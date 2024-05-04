import { ProductCard } from '../exportPages';
import { PaginationComponent, Sort_Filter } from '../../components/exportComponents';
import { useEffect } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const ProductPage = () => {
    const fetchAPI = async () => {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/product/findAll`);
        return res.data;
    };

    const query = useQuery({ queryKey: ['todos'], queryFn: fetchAPI });

    // useEffect(() => {
    //     fetchAPI();
    // }, []);

    return (
        <div className='w-full mb-2 flex flex-col items-center justify-center'>
            {/* sort and filter */}
            <Sort_Filter />

            {/* products */}
            <div className='mt-7 mb-3 grid grid-cols-3 gap-5'>
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </div>

            {/* pagination */}
            <PaginationComponent />
        </div>
    );
};

export default ProductPage;
