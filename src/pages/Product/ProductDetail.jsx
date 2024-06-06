import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import { useDispatch, useSelector } from 'react-redux';
import * as ProductService from '../../services/ProductService';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { updateProduct } from '../../redux/slides/productSlide';
import { addProduct } from '../../redux/slides/orderSlide';
import { useEffect, useMemo, useState } from 'react';
import { useMutationHook } from '../../hooks/useMutationHook';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css';

const ProductDetail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // scroll to top when render page
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // get product from redux
    const product_Redux = useSelector((state) => state.product);

    // destructuring product_Redux
    const {
        id,
        brand,
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
        category,
    } = product_Redux;

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
            title: 'Size mặt',
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
            title: 'Tình trạng',
            value: condition,
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
    const discountPrice = 1506000;
    const discountPriceFormat = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(discountPrice);

    // get products by category
    const getProducts_Category = async () => {
        const res = await ProductService.getProductByCategory(category);
        return res;
    };

    // useQuery to get products by category
    const { data } = useQuery({
        queryKey: ['products'],
        queryFn: getProducts_Category,
        keepPreviousData: true,
    });
    const moreProduct = data?.data.product;

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
        navigate(`/product_detail/${id}`);
        window.scrollTo(0, 0);
    };

    // set amount product
    const [quantityProduct, setQuantityProduct] = useState(0);

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
        // data to add to cart
        const dataAddToCart = {
            product: product_Redux.id,
            quantity: quantityProduct,
        };

        if (quantityProduct !== 0) {
            // add product to order slide in redux
            dispatch(
                addProduct({
                    orderItems: {
                        id: id,
                        name: productName,
                        img: img,
                        amount: quantityProduct,
                        price: price,
                    },
                })
            );
            toast.success('Đã thêm vào giỏ hàng!');

            // call mutationAddToCart to add product to cart in database
            mutationAddToCart.mutate(
                {
                    token: tokenUser,
                    productAddToCart: dataAddToCart,
                },
                {
                    onError: () => {
                        toast.error('Có lỗi xảy ra! Vui lòng thử lại sau!');
                    },
                }
            );
        } else {
            toast.error('Vui lòng chọn số lượng sản phẩm!');
        }
    };

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

                    {/* info product */}
                    <div className='lg:col-span-2'>
                        {/* name product */}
                        <h2 className='text-2xl font-extrabold text-black'>{productName}</h2>

                        {/* price product */}
                        <div className='flex flex-wrap justify-start items-center gap-4 mt-2'>
                            <p className='text-blue-500 text-4xl font-bold'>{priceFormat}</p>
                            <p className='text-gray-400 text-xl flex justify-start items-center'>
                                <strike>{discountPriceFormat}₫</strike>
                                <span className='text-sm bg-red-500 text-white px-2 py-1 rounded-lg ml-3'>
                                    -27%
                                </span>
                            </p>
                        </div>

                        {/* stars */}
                        {/* <div className='flex space-x-2 mt-2'>
                            <p className='text-lg'>Xếp hạng:</p>
                            <svg
                                className='w-5 fill-[#F7FD04]'
                                viewBox='0 0 14 13'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path d='M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z' />
                            </svg>
                            <svg
                                className='w-5 fill-[#F7FD04]'
                                viewBox='0 0 14 13'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path d='M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z' />
                            </svg>
                            <svg
                                className='w-5 fill-[#F7FD04]'
                                viewBox='0 0 14 13'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path d='M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z' />
                            </svg>
                            <svg
                                className='w-5 fill-[#F7FD04]'
                                viewBox='0 0 14 13'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path d='M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z' />
                            </svg>
                            <svg
                                className='w-5 fill-gray-200'
                                viewBox='0 0 14 13'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path d='M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z' />
                            </svg>
                            <h4 className='text-black text-base'>500 Lượt đánh giá</h4>
                        </div> */}

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
                                slidesPerView={1}
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
                <div className='mt-5 shadow-md p-6'>
                    <h3 className='text-lg font-bold text-black'>(10) Lượt đánh giá</h3>
                    <div className='grid md:grid-cols-2 gap-12 mt-2'>
                        <div>
                            <div className='space-y-3'>
                                <div className='flex items-center'>
                                    <p className='text-md text-black font-bold'>5.0</p>
                                    <svg
                                        className='w-5 fill-yellow-400 ml-1'
                                        viewBox='0 0 14 13'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <path d='M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z' />
                                    </svg>
                                    <div className='bg-gray-400 rounded w-full h-2 ml-3'>
                                        <div className='w-2/3 h-full rounded bg-black'></div>
                                    </div>
                                    <p className='text-sm text-black font-bold ml-3'>66%</p>
                                </div>
                                <div className='flex items-center'>
                                    <p className='text-sm text-black font-bold'>4.0</p>
                                    <svg
                                        className='w-5 fill-yellow-400 ml-1'
                                        viewBox='0 0 14 13'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <path d='M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z' />
                                    </svg>
                                    <div className='bg-gray-400 rounded w-full h-2 ml-3'>
                                        <div className='w-1/3 h-full rounded bg-black'></div>
                                    </div>
                                    <p className='text-sm text-black font-bold ml-3'>33%</p>
                                </div>
                                <div className='flex items-center'>
                                    <p className='text-sm text-black font-bold'>3.0</p>
                                    <svg
                                        className='w-5 fill-yellow-400 ml-1'
                                        viewBox='0 0 14 13'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <path d='M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z' />
                                    </svg>
                                    <div className='bg-gray-400 rounded w-full h-2 ml-3'>
                                        <div className='w-1/6 h-full rounded bg-black'></div>
                                    </div>
                                    <p className='text-sm text-black font-bold ml-3'>16%</p>
                                </div>
                                <div className='flex items-center'>
                                    <p className='text-sm text-black font-bold'>2.0</p>
                                    <svg
                                        className='w-5 fill-yellow-400 ml-1'
                                        viewBox='0 0 14 13'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <path d='M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z' />
                                    </svg>
                                    <div className='bg-gray-400 rounded w-full h-2 ml-3'>
                                        <div className='w-1/12 h-full rounded bg-black'></div>
                                    </div>
                                    <p className='text-sm text-black font-bold ml-3'>8%</p>
                                </div>
                                <div className='flex items-center'>
                                    <p className='text-sm text-black font-bold'>1.0</p>
                                    <svg
                                        className='w-5 fill-yellow-400 ml-1'
                                        viewBox='0 0 14 13'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <path d='M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z' />
                                    </svg>
                                    <div className='bg-gray-400 rounded w-full h-2 ml-3'>
                                        <div className='w-[6%] h-full rounded bg-black'></div>
                                    </div>
                                    <p className='text-sm text-black font-bold ml-3'>6%</p>
                                </div>
                            </div>
                        </div>
                        <div className=''>
                            <div className='flex items-start'>
                                <img
                                    src='https://readymadeui.com/team-2.webp'
                                    className='w-12 h-12 rounded-full border-2 border-white'
                                />
                                <div className='ml-3'>
                                    <h4 className='text-sm font-bold text-black'>John Doe</h4>
                                    <div className='flex space-x-1 mt-1'>
                                        <svg
                                            className='w-4 fill-yellow-400'
                                            viewBox='0 0 14 13'
                                            fill='none'
                                            xmlns='http://www.w3.org/2000/svg'
                                        >
                                            <path d='M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z' />
                                        </svg>
                                        <svg
                                            className='w-4 fill-yellow-400'
                                            viewBox='0 0 14 13'
                                            fill='none'
                                            xmlns='http://www.w3.org/2000/svg'
                                        >
                                            <path d='M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z' />
                                        </svg>
                                        <svg
                                            className='w-4 fill-yellow-400'
                                            viewBox='0 0 14 13'
                                            fill='none'
                                            xmlns='http://www.w3.org/2000/svg'
                                        >
                                            <path d='M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z' />
                                        </svg>
                                        <svg
                                            className='w-4 fill-[#CED5D8]'
                                            viewBox='0 0 14 13'
                                            fill='none'
                                            xmlns='http://www.w3.org/2000/svg'
                                        >
                                            <path d='M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z' />
                                        </svg>
                                        <svg
                                            className='w-4 fill-[#CED5D8]'
                                            viewBox='0 0 14 13'
                                            fill='none'
                                            xmlns='http://www.w3.org/2000/svg'
                                        >
                                            <path d='M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z' />
                                        </svg>
                                        <p className='text-xs !ml-2 font-semibold text-black'>
                                            2 mins ago
                                        </p>
                                    </div>
                                    <p className='text-sm mt-4 text-black'>
                                        Lorem ipsum dolor sit amet, consectetur adipisci elit, sed
                                        eiusmod tempor incidunt ut labore et dolore magna aliqua.
                                    </p>
                                </div>
                            </div>
                            <button
                                type='button'
                                className='w-full mt-10 px-4 py-2.5 bg-transparent hover:bg-gray-50 border border-black text-black font-bold rounded'
                            >
                                Đọc thêm bình luận
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* toast */}
            <ToastContainer
                position='top-right'
                autoClose={5000}
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
