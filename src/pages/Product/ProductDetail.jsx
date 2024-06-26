import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import { useDispatch, useSelector } from 'react-redux';
import * as ProductService from '../../services/ProductService';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { resetProduct, updateProduct } from '../../redux/slides/productSlide';
import { addProduct, updateProductInCart } from '../../redux/slides/orderSlide';
import { useEffect, useMemo, useState } from 'react';
import { useMutationHook } from '../../hooks/useMutationHook';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import { Comment } from '../../components/exportComponents';
import * as CommentService from '../../services/CommentService';
import { addCommentToRedux } from '../../redux/slides/commentSlide';

const ProductDetail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // set amount product
    const [quantityProduct, setQuantityProduct] = useState(0);

    // scroll to top when render page
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // get 1 product from redux
    const product_Redux = useSelector((state) => state.product.product);

    // get all products from redux
    const products_Redux = useSelector((state) => state.product.products);

    // destructuring product_Redux
    const {
        brand,
        discount,
        color,
        condition,
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

    // reset product when component unmounts
    useEffect(() => {
        return () => {
            dispatch(resetProduct());
        };
    }, [dispatch]);

    // specifications of product
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

    // format price
    const priceFormat = useMemo(() => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(price);
    }, [price]);

    // format discount price
    const discountPrice = discount !== 0 ? price - (price * discount) / 100 : 0;
    const discountPriceFormat = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(discountPrice);

    // get all products from redux
    const productsRedux = useSelector((state) => state.product.products);

    // get more products from the same brand
    const moreProduct = productsRedux.filter((item) => item.brand === brand);

    // Split products into groups of 4
    const chunkArray = (array, chunkSize) => {
        let result = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            result.push(array.slice(i, i + chunkSize));
        }
        return result;
    };
    const productChunks = moreProduct ? chunkArray(moreProduct, 4) : [];

    // go to product detail page
    const go_ProductDetail_Page = (id, product) => {
        dispatch(updateProduct({ ...product, id }));
        setQuantityProduct(0);
        navigate(`/product_detail/${id}`);
        window.scrollTo(0, 0);
    };

    // increase quantity
    const increaseQuantity = () => {
        setQuantityProduct(quantityProduct + 1);
    };

    // decrease quantity
    const decreaseQuantity = () => {
        setQuantityProduct(quantityProduct - 1);
    };

    // get token user
    const tokenUser = localStorage.getItem('tokenUser');

    // useMutationHook to add product to cart
    const mutationAddToCart = useMutationHook(({ token, productAddToCart }) =>
        ProductService.addProductToCart(token, productAddToCart)
    );

    // handle add to cart
    const handleAddToCart = () => {
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

    // ------------------- COMMENTS ---------------------------
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
                            loop='true'
                            spaceBetween={0}
                            modules={[Navigation, Autoplay]}
                            autoplay={{ delay: 4000 }}
                            className='w-[500px] h-[500px] rounded-xl relative'
                        >
                            {img.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <img
                                        src={item}
                                        alt='Image'
                                        className='w-full h-full object-cover'
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

                        {/* brand & condition */}
                        <div className='flex gap-10 items-center'>
                            {/* brand */}
                            <div className='flex items-center mt-2'>
                                <p className='text-lg text-black'>Thương hiệu:</p>
                                <p className='text-lg text-blue-500 font-bold ml-2'>{brand}</p>
                            </div>

                            {/* condition */}
                            <div className='flex justify-start items-center mt-2'>
                                <p className='text-lg text-black'>Tình trạng:</p>
                                <p className='text-lg text-blue-500 font-bold ml-2'>{condition}</p>
                            </div>
                        </div>

                        {/* 5 reasons */}
                        <div className='bg-yellow-100 px-2 py-2 rounded-lg mt-2'>
                            <p className='font-bold text-md pl-1'>
                                Lý Do Thuyết Phục Khi Mua Tại Watches.vn
                            </p>
                            <div className='flex flex-col items-start justify-center pl-5 gap-1'>
                                <p>- Bảo hành 5 năm - An tâm sử dụng</p>
                                <p>- 5 Cửa Hàng Lớn Ở Hà Nội & HCM</p>
                                <p>- Được Nhiều Hãng Cấp Chứng Nhận</p>
                                <p>- Không Bán Hàng Giả Dù Chỉ 1 Lần</p>
                                <p>- Giá Luôn Tốt Được Cập Nhật Mỗi Ngày</p>
                            </div>
                            <hr className='border-0 border-dotted border-b-2 border-black opacity-50 my-1' />
                            <p className='text-sm pl-1 pt-1'>
                                Nếu 5 lý do trên chưa đủ thuyết phục bạn thì hãy cho chúng tôi 1 cơ
                                hội để được chứng minh điều đó. Xin cảm ơn!
                            </p>
                        </div>

                        {/* contact to buy */}
                        <div className='flex flex-col justify-center items-center mt-2'>
                            <p className='text-md text-black'>Đặt hàng/tư vấn (8h00 - 22h00)</p>
                            <p className='text-md text-blue-500 font-bold ml-2 hover:cursor-pointer'>
                                0979.117.117 - 0979.217.217 - 0979.317.317
                            </p>
                        </div>

                        {/* quantity product */}
                        <div className='pt-2 flex gap-5 items-center'>
                            <p className='text-lg'>Số lượng đặt mua</p>
                            <div className='flex justify-center items-center'>
                                <button
                                    onClick={decreaseQuantity}
                                    disabled={quantityProduct === 0}
                                    className='border text-xl cursor-pointer rounded-md py-1 px-3 hover:bg-blue-500 hover:text-white mr-2'
                                >
                                    -
                                </button>
                                <span className='text-center text-lg w-8'>{quantityProduct}</span>
                                <button
                                    onClick={increaseQuantity}
                                    className='border text-xl cursor-pointer rounded-md py-1 px-3 hover:bg-blue-500 hover:text-white ml-2'
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* button: buy now & add to cart */}
                        <div className='flex flex-wrap items-center justify-between gap-4 mt-2'>
                            <button
                                type='button'
                                className='min-w-[200px] px-4 py-3 bg-black hover:bg-blue-500 text-white text-lg font-bold rounded'
                            >
                                Mua ngay
                            </button>
                            <button
                                onClick={handleAddToCart}
                                type='button'
                                className='min-w-[200px] px-3 py-2.5 border border-black bg-transparent hover:bg-gray-500 hover:border-gray-500 hover:text-white text-black text-lg font-bold rounded'
                            >
                                Thêm vào giỏ hàng
                            </button>
                        </div>
                    </div>
                </div>

                {/* body */}
                <div className='mt-10 shadow-md px-5 pb-5'>
                    <h3 className='text-lg font-bold text-black'>Mô tả sản phẩm</h3>

                    {/* description */}
                    <p className='mt-2 px-5 text-black'>{description}</p>
                    <h3 className='mt-5 text-lg font-bold text-black'>
                        Thông số chi tiết sản phẩm
                    </h3>

                    {/* specifications */}
                    <ul className='mt-2 space-y-6 text-black'>
                        {specifications.map((item) => {
                            return (
                                <li
                                    key={item.id}
                                    className='px-5 text-md hover:bg-gray-100 hover:cursor-pointer'
                                >
                                    {item.title}
                                    <span className='ml-4 float-right'>{item.value}</span>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* more products */}
                <div className='mt-5 shadow-md p-6'>
                    {productChunks.length === 0 ? (
                        ''
                    ) : (
                        <>
                            <h3 className='text-lg font-bold text-black'>
                                Các sản phẩm khác cùng hãng
                            </h3>
                            <Swiper
                                spaceBetween={20}
                                slidesPerView='auto'
                                navigation
                                autoplay={{ delay: 4000 }}
                                className='mt-4'
                            >
                                {productChunks.map((chunk, index) => (
                                    <SwiperSlide key={index} className='grid grid-cols-4 gap-4'>
                                        {chunk.map((product) => (
                                            <div key={product.id} className='p-4 border rounded-lg'>
                                                <img
                                                    src={product.img[0]}
                                                    alt={product.productName}
                                                    className='w-full h-40 object-cover'
                                                />
                                                <div
                                                    onClick={() =>
                                                        go_ProductDetail_Page(product.id, product)
                                                    }
                                                    className='cursor-pointer'
                                                >
                                                    <h3 className='mt-2 text-lg font-semibold'>
                                                        {product.productName}
                                                    </h3>
                                                    <p className='mt-1 text-gray-600'>
                                                        {new Intl.NumberFormat('vi-VN', {
                                                            style: 'currency',
                                                            currency: 'VND',
                                                        }).format(product.price)}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </>
                    )}
                </div>

                {/* comments */}
                <div className='mt-5'>
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
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default ProductDetail;
