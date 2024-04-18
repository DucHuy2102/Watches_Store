import { ProductCard } from '../exportPages';
import { PaginationComponent, Sort_Filter } from '../../components/exportComponents';

const ProductPage = () => {
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
