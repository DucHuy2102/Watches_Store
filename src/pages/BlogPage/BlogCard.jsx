import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';

const styleImage = 'h-full w-full object-cover';

const BlogCard = () => {
    return (
        <div className='h-[540px] w-[466px] hover:scale-105 transition-transform duration-300 hover:cursor-pointer'>
            {/* image watches  */}
            <div className='w-[466px] h-[466px] flex items-center justify-center bg-gray-100'>
                <img
                    src='https://timex.com/cdn/shop/articles/TW2V64200_still6_SS23-Final-scaled_1_1.jpg?v=1707340418&width=768'
                    alt='Image'
                    className={styleImage}
                />
            </div>

            {/* title blog & date  */}
            <div className='mt-3 mb-3'>
                {/* title */}
                <div className='font-bold'>HOW DO WATCHES WORK? A SIMPLE GUIDE</div>

                {/* date */}
                <div className='text-gray-500'>7 February 2024</div>
            </div>
        </div>
    );
};

export default BlogCard;
