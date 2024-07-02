import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct } from '../../redux/slides/productSlide';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import { useEffect, useMemo, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { updateOrderItems } from '../../redux/slides/orderSlide';

const CardItem_Product = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const tokenUser = localStorage.getItem('tokenUser');
    const [showProductDetail, setShowProductDetail] = useState(false);

    // scroll to top when render page
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // state for quantity and idProduct
    const [quantityProduct, setQuantityProduct] = useState(1);
    // const [idProduct, setIdProduct] = useState('');

    // get data from redux
    const allProduct = useSelector((state) => state.product.products);

    // get data from props
    const { id, genderUser, img, price, productName, size } = props.product;

    // get all properties of product
    const propertiesProduct = allProduct.find((item) => item.id === id);

    // go to product detail page
    const go_ProductDetail_Page = (id) => {
        dispatch(updateProduct({ ...props.product, id }));
        navigate(`/product_detail/${id}`);
    };

    // format price
    const priceFormat = useMemo(() => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(price);
    }, [price]);

    // handle change quantity
    const handleChangeQuantity = (type) => {
        if (type === 'increase') {
            setQuantityProduct(quantityProduct + 1);
        } else {
            if (quantityProduct > 1) {
                setQuantityProduct(quantityProduct - 1);
            }
        }
    };

    // handle display modal
    const handleDisplayModal = (id) => {
        if (tokenUser) {
            setShowProductDetail(true);
            // setIdProduct(id);
        } else {
            toast.info('Vui lòng đăng nhập để mua hàng!');
        }
    };

    // ----------------- Handle buy now product -----------------
    // handle buy now product and navigate to checkout page
    const handleBuyNow = () => {
        const valueDispatch = [
            {
                product: propertiesProduct,
                quantity: quantityProduct,
            },
        ];
        dispatch(updateOrderItems({ productBuyNow: valueDispatch, isBuyNow: true }));
        toast.success('Đang chuyển đến trang đặt hàng!');
        setTimeout(() => {
            setShowProductDetail(false);
            navigate('/checkout');
        }, 1500);
    };

    return (
        <div className='relative h-[625px] w-[466px] font-Lato hover:scale-105 transition-transform duration-300 hover:cursor-pointer bg-white shadow-xl rounded-xl overflow-hidden'>
            {/* Image watches */}
            <div className='w-full h-[466px] flex items-center justify-center bg-gray-200 rounded-t-xl'>
                <Swiper className='h-[430px] w-[430px]' loop={true} spaceBetween={0}>
                    {img.map((item, index) => (
                        <SwiperSlide key={index}>
                            <img
                                src={item}
                                className='h-full w-full object-cover rounded-lg shadow-md'
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Name and price */}
            <div
                onClick={() => go_ProductDetail_Page(id)}
                className='mt-3 mb-3 px-4 cursor-pointer'
            >
                <div className='text-lg font-semibold text-gray-800'>{productName}</div>
                <div className='text-gray-500'>
                    {size} | {genderUser} giới
                </div>
                <div className='font-bold text-xl text-gray-900'>{priceFormat}</div>
            </div>

            {/* Button buy */}
            <div
                onClick={() => handleDisplayModal(id)}
                className={`border text-lg text-center py-2 transition duration-300 hover:font-bold cursor-pointer ${
                    tokenUser
                        ? 'bg-gray-900 text-white '
                        : 'border-gray-300 text-gray-800 hover:bg-gray-300 hover:text-gray-900'
                } rounded-lg mx-4`}
            >
                Mua hàng ngay
            </div>

            {/* Product detail overlay */}
            {showProductDetail && (
                <div
                    className='absolute inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50'
                    onClick={() => setShowProductDetail(false)}
                >
                    <div
                        className='relative w-[350px] bg-white shadow-2xl p-6 rounded-lg'
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className='flex justify-between items-center mb-4'>
                            <h2 className='text-lg font-bold text-gray-800'>Thông tin sản phẩm</h2>
                            <button onClick={() => setShowProductDetail(false)}>
                                <CloseOutlined className='text-gray-500 hover:text-black transition duration-200' />
                            </button>
                        </div>
                        <div className='text-center'>
                            <img
                                src={img[0]}
                                className='h-[200px] w-[200px] object-cover mx-auto rounded-lg shadow-md'
                            />
                            <h3 className='mt-2 text-xl font-semibold text-gray-800'>
                                {productName}
                            </h3>
                            <p className='text-lg text-gray-900'>{priceFormat}</p>
                            <div className='flex items-center justify-center mt-4'>
                                <button
                                    onClick={() => handleChangeQuantity('decrease')}
                                    className='bg-gray-200 hover:bg-gray-300 transition duration-200 rounded-full py-2 px-4 mr-2'
                                >
                                    -
                                </button>
                                <span className='text-center w-8'>{quantityProduct}</span>
                                <button
                                    onClick={() => handleChangeQuantity('increase')}
                                    className='bg-gray-200 hover:bg-gray-300 transition duration-200 rounded-full py-2 px-4 ml-2'
                                >
                                    +
                                </button>
                            </div>
                            <button
                                onClick={handleBuyNow}
                                className='mt-4 w-full bg-gray-900 hover:bg-black text-white py-2 rounded-lg'
                            >
                                Mua
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast */}
            <ToastContainer
                position='top-right'
                autoClose={2000}
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
