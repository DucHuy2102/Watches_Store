import { Pagination } from 'antd';

const PaginationComponent = ({ totalProducts, productPerPage, setCurrentPageValue }) => {
    return (
        <div className='w-full h-14 flex justify-center items-center font-medium'>
            <Pagination
                className='text-md'
                total={totalProducts}
                pageSize={productPerPage}
                onChange={(page) => setCurrentPageValue(page)}
            />
        </div>
    );
};

export default PaginationComponent;
