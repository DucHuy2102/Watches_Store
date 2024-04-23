import { Pagination } from 'antd';

const PaginationComponent = () => {
    return (
        <div className='w-full h-14 flex justify-center items-center font-medium'>
            <Pagination className='text-md' defaultCurrent={2} total={50} />
        </div>
    );
};

export default PaginationComponent;
