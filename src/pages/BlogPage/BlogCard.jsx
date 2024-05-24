import { useNavigate } from 'react-router-dom';

const BlogCard = () => {
    // navigate to blog detail page
    const navigate = useNavigate();
    const handleNavigation = () => {
        navigate('/blog_detail/1');
    };

    

    return (
        <div className='h-[540px] w-[466px] hover:scale-105 transition-transform duration-300 hover:cursor-pointer'>
            {/* image watches  */}
            <div className='w-[466px] h-[466px] flex items-center justify-center bg-gray-100'>
                <img
                    src='https://i1-vnexpress.vnecdn.net/2024/05/02/Clepsydra-of-Karnak-min-7148-1714640356.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=F6H9ZZjykZpEihRbHq940w'
                    alt='Image'
                    className='h-full w-full object-cover'
                />
            </div>

            {/* title blog & date  */}
            <div onClick={handleNavigation} className='mt-3 mb-3'>
                {/* title */}
                <div className='font-bold'>
                    Đồng hồ cổ xưa đo thời gian bằng nước
                </div>

                {/* date */}
                <div className='text-gray-500'>7, Tháng 10, 2021</div>
            </div>
        </div>
    );
};

export default BlogCard;
