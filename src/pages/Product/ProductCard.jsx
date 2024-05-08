import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import * as ProductService from '../../services/ProductService';
import { useQuery } from '@tanstack/react-query';

const styleImage = 'h-full w-full object-cover';

const ProductCard = (props) => {
    const {
        id,
        band,
        color,
        condition,
        description,
        feature,
        genderUser,
        height,
        img,
        origin,
        price,
        productName,
        shape,
        shellMaterial,
        size,
        state,
        style,
        thickness,
        wireMaterial,
    } = props.product;

    return (
        <div className='h-[625px] w-[466px] font-Lato hover:scale-105 transition-transform duration-300 hover:cursor-pointer'>
            {/* image watches  */}
            <div className='w-[466px] h-[466px] flex items-center justify-center bg-gray-100'>
                {/* image  */}
                <Swiper className='h-[326px] w-[326px]' loop={true} spaceBetween={0}>
                    <SwiperSlide>
                        <img src={img[0]} className={styleImage} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={img[1]} className={styleImage} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={img[2]} className={styleImage} />
                    </SwiperSlide>
                </Swiper>
            </div>

            {/* name and price  */}
            <Link to={`/product/${id}`} className='mt-3 mb-3 pl-3 pr-3'>
                {/* name */}
                <div>{productName}</div>

                {/* size */}
                <div className='text-gray-500'>
                    {size} | {genderUser} giới
                </div>

                {/* price */}
                <div className='font-bold'>{price}₫</div>
            </Link>

            {/* button buy  */}
            <div className='border text-lg text-center py-2 border-gray-200 hover:border-black hover:font-bold hover:cursor-pointer'>
                <Link to='/order'>Mua hàng ngay</Link>
            </div>
        </div>
    );
};

export default ProductCard;
