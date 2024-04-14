import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const styleImage = 'h-full w-full object-cover';

const CardComponent = () => {
    return (
        <div className='h-[625px] w-[466px] hover:scale-105 transition-transform duration-300 hover:cursor-pointer'>
            {/* image watches  */}
            <div className='w-[466px] h-[466px] flex items-center justify-center bg-gray-100'>
                {/* image  */}
                <Swiper className='h-[326px] w-[326px]' loop={true} spaceBetween={0}>
                    <SwiperSlide>
                        <img
                            src='https://timex.com/cdn/shop/files/TW2W51400.png?v=1705992149&width=400'
                            className={styleImage}
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img
                            src='https://timex.com/cdn/shop/files/TW2W51400_B.png?v=1705992149&width=400    '
                            className={styleImage}
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img
                            src='https://timex.com/cdn/shop/files/TW2W51400_C.png?v=1705992149&width=400'
                            className={styleImage}
                        />
                    </SwiperSlide>
                </Swiper>
            </div>

            {/* name and price  */}
            <div className='mt-3 mb-3 pl-3 pr-3'>
                {/* name */}
                <div>Marlin® Chronograph Tachymeter 40mm Leather Strap Watch</div>

                {/* size */}
                <div className='text-gray-500'>40 mm | 2 Colors</div>

                {/* price */}
                <div className='font-bold'>6.073.500₫</div>
            </div>

            {/* button buy  */}
            <div className='border text-center py-2 border-gray-200 hover:border-black hover:font-bold hover:cursor-pointer'>
                <Link to='/order'>Quick Buy</Link>
            </div>
        </div>
    );
};

export default CardComponent;
