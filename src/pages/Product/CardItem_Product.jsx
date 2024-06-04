import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct } from '../../redux/slides/productSlide';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css';

const CardItem_Product = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userRedux = useSelector((state) => state.user);

    // get data from props
    const { id, genderUser, img, price, productName, size } = props.product;

    // go to product detail page
    const go_ProductDetail_Page = (id) => {
        dispatch(updateProduct({ ...props.product, id }));
        navigate(`/product_detail/${id}`);
    };

    // format price
    const priceFormat = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(price);

    // handle buy now
    const handleBuyNow = () => {
        if (userRedux.username) {
            navigate('/order');
        } else {
            toast.info('Vui lòng đăng nhập để mua hàng!');
        }
    };

    return (
        <div className='h-[625px] w-[466px] font-Lato hover:scale-105 transition-transform duration-300 hover:cursor-pointer'>
            {/* image watches  */}
            <div className='w-[466px] h-[466px] flex items-center justify-center bg-gray-100'>
                {/* image  */}
                <Swiper className='h-[430px] w-[430px]' loop={true} spaceBetween={0}>
                    {img.map((item, index) => (
                        <SwiperSlide key={index}>
                            <img src={item} className='h-full w-full object-cover' />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* name and price  */}
            <div onClick={() => go_ProductDetail_Page(id)} className='mt-3 mb-3 pl-3 pr-3'>
                {/* name */}
                <div>{productName}</div>

                {/* size */}
                <div className='text-gray-500'>
                    {size} | {genderUser} giới
                </div>

                {/* price */}
                <div className='font-bold'>{priceFormat}₫</div>
            </div>

            {/* button buy  */}
            <div
                onClick={handleBuyNow}
                className={`border text-lg text-center py-2 border-gray-200 hover:border-black transition duration-300 hover:font-bold cursor-pointer ${
                    userRedux.username ? '' : 'bg-gray-900 text-white'
                }`}
            >
                Mua hàng ngay
            </div>

            {/* toast */}
            <ToastContainer
                position='top-right'
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable={false}
                pauseOnFocusLoss
                pauseOnHover
            />
        </div>
    );
};

export default CardItem_Product;
