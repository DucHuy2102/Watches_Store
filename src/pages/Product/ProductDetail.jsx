import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import { useDispatch, useSelector } from 'react-redux';
import * as ProductService from '../../services/ProductService';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { resetProduct, updateProduct } from '../../redux/slides/productSlide';
import { addProduct, updateOrderItems, updateProductInCart } from '../../redux/slides/orderSlide';
import { useEffect, useMemo, useState } from 'react';
import { useMutationHook } from '../../hooks/useMutationHook';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import { Comment } from '../../components/exportComponents';
import * as CommentService from '../../services/CommentService';
import { addCommentToRedux } from '../../redux/slides/commentSlide';

// pr text
const prProduct = [
    {
        id: 1,
        url: '//timex.com/cdn/shop/files/Steel.svg?v=1688056464&width=40',
        title: 'Chất liệu vỏ đồng hồ',
        description:
            'Vỏ đồng hồ được làm từ các chất liệu cao cấp, mang đến độ bền và sang trọng cho sản phẩm.',
    },
    {
        id: 2,
        url: '//timex.com/cdn/shop/files/Adjustable_Watch.svg?v=1688056476&width=40',
        title: 'Chất lượng dây đồng hồ',
        description:
            'Dây đồng hồ được làm từ các chất liệu chọn lọc, có khả năng chịu nước ở độ sâu nhất định, giúp bạn thoải mái sử dụng trong mọi hoàn cảnh.',
    },
    {
        id: 3,
        url: '//timex.com/cdn/shop/files/Stopwatch_bc7a4d6c-d8af-4131-a0f5-a68fa54e5f5c.svg?v=1688056464&width=40',
        title: 'Đồng hồ bấm giờ',
        description:
            'Đồng hồ có tính năng bấm giờ chính xác, kích thước mặt đồng hồ phù hợp với cỡ cổ tay của bạn, giúp bạn tự tin và thoải mái hơn.',
    },
    {
        id: 4,
        url: '//timex.com/cdn/shop/files/Water_Resistant.svg?v=1687971970&width=40',
        title: 'Khả năng chống nước',
        description:
            'Đồng hồ có khả năng chống nước đáp ứng các tiêu chuẩn an toàn, dây đồng hồ được làm từ chất liệu cao cấp, giúp bạn thoải mái sử dụng trong thời gian dài.',
    },
    {
        id: 5,
        url: 'https://timex.com/cdn/shop/files/Calendar.svg?v=1687971335&width=40',
        title: 'Tính năng xem ngày',
        description:
            'Đồng hồ có tính năng xem ngày hiện đại và tiện dụng, độ dày phù hợp với cỡ cổ tay của bạn, giúp bạn tự tin và thoải mái hơn khi sử dụng.',
    },
    {
        id: 6,
        url: 'https://timex.com/cdn/shop/files/Fits_Wrist.svg?v=1688403513&width=40',
        title: 'Tương thích với cỡ cổ tay',
        description:
            'Đồng hồ nhẹ và tương thích với mọi cỡ cổ tay, trọng lượng nhẹ giúp bạn thoải mái sử dụng trong thời gian dài mà không gây khó chịu.',
    },
];

const ProductDetail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // get token user
    const tokenUser = localStorage.getItem('tokenUser');

    // scroll to top when render page
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // reset product when component unmounts
    useEffect(() => {
        return () => {
            dispatch(resetProduct());
        };
    }, [dispatch]);

    // state for description expanded
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

    // toggle description
    const toggleDescription = () => {
        setIsDescriptionExpanded(!isDescriptionExpanded);
    };

    // set amount product to buy in cart
    const [quantityProduct, setQuantityProduct] = useState(0);

    // ----------------- GET DATA FROM REDUX -----------------
    // get 1 product from redux
    const product_Redux = useSelector((state) => state.product.product);

    // get all products from redux
    const products_Redux = useSelector((state) => state.product.products);

    // destructuring product_Redux
    const {
        id,
        brand,
        discount,
        color,
        description,
        feature,
        genderUser,
        img,
        origin,
        price,
        productName,
        shape,
        shellMaterial,
        size,
        style,
        thickness,
        wireMaterial,
        weight,
        waterproof,
    } = product_Redux;

    // specifications of product detail
    const specifications = [
        {
            id: 1,
            title: 'Thương Hiệu',
            value: brand,
        },
        {
            id: 2,
            title: 'Xuất xứ',
            value: origin,
        },
        {
            id: 3,
            title: 'Độ dầy',
            value: thickness,
        },
        {
            id: 4,
            title: 'Kích thước mặt',
            value: size,
        },
        {
            id: 5,
            title: 'Chất liệu dây',
            value: wireMaterial,
        },
        {
            id: 6,
            title: 'Chất liệu vỏ',
            value: shellMaterial,
        },
        {
            id: 7,
            title: 'Phong cách',
            value: style,
        },
        {
            id: 8,
            title: 'Tính năng',
            value: feature,
        },
        {
            id: 9,
            title: 'Hình dạng',
            value: shape,
        },
        {
            id: 10,
            title: 'Kháng nước',
            value: `${waterproof}atm`,
        },
        {
            id: 11,
            title: 'Trọng lượng',
            value: weight,
        },
        {
            id: 12,
            title: 'Màu sắc',
            value: color,
        },
        {
            id: 13,
            title: 'Đối tượng sử dụng',
            value: genderUser,
        },
    ];

    // format price product
    const priceFormat = useMemo(() => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(price);
    }, [price]);

    // format discount price
    const discountPrice = discount !== 0 ? price * ((100 - discount) / 100) : 0;
    const discountPriceFormat = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(discountPrice);

    // get more products from the same brand
    const moreProduct = products_Redux.filter((item) => item.brand === brand);

    // go to product detail page
    const go_ProductDetail_Page = (id, product) => {
        dispatch(updateProduct({ ...product, id }));
        setQuantityProduct(0);
        navigate(`/product_detail/${id}`);
        window.scrollTo(0, 0);
    };

    // ------------------- QUANTITY PRODUCT ---------------------------
    // increase quantity
    const increaseQuantity = () => {
        setQuantityProduct(quantityProduct + 1);
    };

    // decrease quantity
    const decreaseQuantity = () => {
        setQuantityProduct(quantityProduct - 1);
    };

    // ---------------------- ADD TO CART ------------------------------
    // useMutationHook to add product to cart
    const mutationAddToCart = useMutationHook(({ token, productAddToCart }) =>
        ProductService.addProductToCart(token, productAddToCart)
    );

    // handle add to cart
    const handleAddToCart = () => {
        // format data to add to cart
        const dataAddToCart = {
            product: product_Redux.id,
            quantity: quantityProduct,
        };

        if (tokenUser) {
            if (quantityProduct !== 0) {
                const tempIdCart = 'tempId_' + new Date().getTime();
                dispatch(
                    addProduct({
                        products: products_Redux,
                        orderItems: {
                            id: tempIdCart,
                            product: {
                                id: product_Redux.id,
                                productName: productName,
                                img: img,
                                price: price,
                            },
                            quantity: quantityProduct,
                        },
                    })
                );
                toast.success('Đã thêm vào giỏ hàng!');

                const retryMutation = (retries) => {
                    mutationAddToCart.mutate(
                        {
                            token: tokenUser,
                            productAddToCart: dataAddToCart,
                        },
                        {
                            onSuccess: (data) => {
                                const idCart = data?.data;
                                dispatch(
                                    updateProductInCart({
                                        oldId: tempIdCart,
                                        newId: idCart,
                                    })
                                );
                            },
                            onError: () => {
                                if (retries > 0) {
                                    setTimeout(() => retryMutation(retries - 1), 1000);
                                } else {
                                    toast.error('Có lỗi xảy ra! Vui lòng thử lại sau!');
                                }
                            },
                        }
                    );
                };

                retryMutation(3);
            } else {
                toast.error('Vui lòng chọn số lượng sản phẩm!');
            }
        } else {
            toast.error('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!');
        }
    };

    // ------------------------ BUY NOW ---------------------------
    // get all properties of product
    const propertiesProduct = products_Redux.find((item) => item.id === id);

    // handle buy now
    const handleBuyNow = () => {
        if (tokenUser) {
            if (quantityProduct !== 0) {
                const valueDispatch = [
                    {
                        product: propertiesProduct,
                        quantity: quantityProduct,
                    },
                ];
                dispatch(updateOrderItems({ productBuyNow: valueDispatch, isBuyNow: true }));
                toast.success('Đang chuyển đến trang đặt hàng!');
                setTimeout(() => {
                    navigate('/checkout');
                }, 1500);
            } else {
                toast.error('Vui lòng chọn số lượng sản phẩm!');
            }
        } else {
            toast.error('Vui lòng đăng nhập để mua sản phẩm!');
        }
    };

    // --------------------- GET COMMENT BY ID ---------------------------
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await CommentService.getCommentByIdProduct(product_Redux.id);
                dispatch(addCommentToRedux(res?.data));
            } catch (error) {
                console.error('Fetch comments error:', error);
            }
        };

        fetchComments();
    }, [dispatch, product_Redux.id]);

    return (
        <div className='font-Lato bg-white'>
            <div className='p-6 lg:max-w-7xl max-w-4xl mx-auto'>
                {/* top: images & info product */}
                <div className='grid items-start grid-cols-1 lg:grid-cols-5 gap-12 shadow-md p-6'>
                    {/* image product */}
                    <div className='lg:col-span-3 w-full lg:sticky top-0 text-center'>
                        <Swiper
                            loop={true}
                            spaceBetween={0}
                            modules={[Navigation, Autoplay]}
                            autoplay={{ delay: 4000 }}
                            navigation
                            className='w-[500px] h-[500px] rounded-xl relative'
                        >
                            {img.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <img
                                        src={item}
                                        alt='Image'
                                        className='w-full h-full object-cover rounded-xl'
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    {/* info product & button: buy now and add to cart */}
                    <div className='lg:col-span-2'>
                        {/* name product */}
                        <h2 className='text-2xl font-extrabold text-black'>{productName}</h2>

                        {/* price product */}
                        <div className='flex flex-wrap justify-start items-center gap-4 mt-2'>
                            <p className='text-blue-500 text-4xl font-bold'>
                                {discountPriceFormat}
                            </p>
                            <p className='text-gray-400 text-xl flex justify-start items-center'>
                                <strike>{priceFormat}</strike>
                                <span className='text-sm bg-red-500 text-white px-2 py-1 rounded-lg ml-3'>
                                    -{discount}%
                                </span>
                            </p>
                        </div>

                        {/* description */}
                        <div className='text-gray-600 mt-4'>
                            <p>
                                {isDescriptionExpanded
                                    ? description
                                    : `${description.substring(0, 100)}...`}
                            </p>
                            <button onClick={toggleDescription} className='text-blue-500 underline'>
                                {isDescriptionExpanded ? 'Thu gọn' : 'Đọc thêm'}
                            </button>
                        </div>

                        {/* specifications */}
                        <ul className='mt-4'>
                            {specifications.map((spec) => (
                                <li
                                    key={spec.id}
                                    className='w-full flex justify-between items-center py-2 border-b border-gray-200'
                                >
                                    <span className='text-gray-500'>{spec.title}</span>
                                    <span className='text-gray-900 font-medium w-[50%]'>
                                        {spec.value}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        {/* quantity */}
                        <div className='pt-4 flex gap-5 items-center'>
                            <p className='text-lg font-semibold'>Số lượng đặt mua:</p>
                            <div className='flex items-center border border-gray-300 rounded-md'>
                                <button
                                    onClick={decreaseQuantity}
                                    disabled={quantityProduct === 0}
                                    className='text-xl cursor-pointer p-2 hover:bg-blue-500 hover:text-white transition-colors duration-200 rounded-l-md'
                                >
                                    -
                                </button>
                                <span className='text-lg text-center w-12 border-l border-r border-gray-300'>
                                    {quantityProduct}
                                </span>
                                <button
                                    onClick={increaseQuantity}
                                    className='text-xl cursor-pointer p-2 hover:bg-blue-500 hover:text-white transition-colors duration-200 rounded-r-md'
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* buttons */}
                        <div className='flex justify-center items-center mt-4 gap-4'>
                            <button
                                onClick={handleBuyNow}
                                className='bg-green-500 w-[50%] text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors duration-200'
                            >
                                Mua ngay
                            </button>
                            <button
                                onClick={handleAddToCart}
                                className='bg-blue-500 w-[50%] text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200'
                            >
                                Thêm vào giỏ hàng
                            </button>
                        </div>
                    </div>
                </div>

                {/* related products */}
                <div className='mt-12'>
                    <h3 className='text-xl font-bold text-gray-900 mb-4'>
                        Sản phẩm cùng thương hiệu
                    </h3>
                    <Swiper
                        className='flex items-center px-4 py-2 bg-gray-100'
                        spaceBetween={20}
                        slidesPerView={1}
                        navigation
                        autoplay={{ delay: 4000 }}
                        breakpoints={{
                            640: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                            1280: { slidesPerView: 4 },
                        }}
                    >
                        {moreProduct.map((product) => (
                            <SwiperSlide key={product.id}>
                                <div
                                    className='bg-white p-4 h-[60vh] rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer'
                                    onClick={() => go_ProductDetail_Page(product.id, product)}
                                >
                                    <img
                                        src={product.img[0]}
                                        alt={product.productName}
                                        className='w-full h-[40vh] object-cover rounded-lg'
                                    />
                                    <h4 className='mt-4 w-full text-gray-800 text-lg font-semibold'>
                                        {product.productName}
                                    </h4>
                                    <p className='text-gray-500 text-sm'>{product.brand}</p>
                                    <p className='mt-2 text-blue-500 text-xl font-bold'>
                                        {new Intl.NumberFormat('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND',
                                        }).format(product.price)}
                                    </p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* pr product */}
                <div className='mt-10 w-full grid grid-cols-1 lg:grid-cols-3 gap-5 bg-gray-100 rounded-lg shadow-md p-6'>
                    {prProduct.map((item) => (
                        <div
                            key={item.id}
                            className='flex flex-col justify-center items-center bg-white rounded-lg p-6'
                        >
                            <img
                                src={item.url}
                                alt={item.title}
                                className='object-fit h-[10vh] w-[8vw] mb-4 p-2'
                            />
                            <h4 className='text-lg font-semibold mb-2'>{item.title}</h4>
                            <p className='text-gray-600 text-center'>{item.description}</p>
                        </div>
                    ))}
                </div>

                {/* comments */}
                <div className='mt-12'>
                    <h3 className='text-xl font-bold text-gray-900 mb-4'>Nhận xét sản phẩm</h3>
                    <Comment idProduct={product_Redux.id} />
                </div>
            </div>

            {/* toast */}
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

export default ProductDetail;
