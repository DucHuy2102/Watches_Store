import { ProductCard } from '../exportPages';
import { PaginationComponent, Sort_Filter } from '../../components/exportComponents';
import { useQuery } from '@tanstack/react-query';
import * as ProductService from '../../services/ProductService';

const ProductPage = () => {
    // get all products
    const getAllProduct = async () => {
        const res = await ProductService.getAllProduct();
        return res;
    };

    const { data } = useQuery({ queryKey: ['products'], queryFn: getAllProduct });
    console.log('List_Products:', data);

    return (
        <div className='w-full mb-2 flex flex-col items-center justify-center'>
            {/* sort and filter */}
            <Sort_Filter />

            {/* products */}
            <div className='mt-7 mb-3 grid grid-cols-3 gap-5'>
                {data?.data?.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {/* pagination */}
            <PaginationComponent />
        </div>
    );
};

export default ProductPage;
