import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { GiShoppingCart } from 'react-icons/gi';

const OrderPage = () => {
    const orders = useSelector((state) => state.orderProduct);
    console.log(orders);
    const amountProduct = orders?.orderItems?.length;

    // format price
    const priceFormat = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(price);
    };

    // set amount product
    const [quantityProduct, setQuantityProduct] = useState(0);

    // handle change quantity
    const handleChangeQuantity = (type) => {
        if (type === 'increase') {
            increaseQuantity();
        } else {
            decreaseQuantity();
        }
    };

    // increase quantity
    const increaseQuantity = () => {
        setQuantityProduct(quantityProduct + 1);
    };

    // decrease quantity
    const decreaseQuantity = () => {
        setQuantityProduct(quantityProduct - 1);
    };

    return (
        <div className='bg-gray-100 min-h-screen py-8'>
            <div className='container mx-auto px-4'>
                {/* title page */}
                <h1 className='text-4xl text-center font-bold mb-4 font-PlayfairDisplay'>
                    Giỏ hàng của bạn
                </h1>

                {/* content order page */}
                {amountProduct === 0 ? (
                    // no product in cart
                    <div className='flex flex-col items-center justify-center'>
                        {/* icon cart */}
                        <GiShoppingCart size={200} className='text-blue-500' />

                        {/* no product in cart */}
                        <div className='text-center text-lg font-semibold'>
                            <p>Không có sản phẩm nào trong giỏ hàng của bạn</p>
                        </div>

                        {/* button go to products */}
                        <Link to='/products' className='mt-4'>
                            <button className='bg-white text-black border border-black hover:bg-black hover:text-white transition duration-300 px-4 py-2 rounded-md'>
                                Mua sắm ngay
                            </button>
                        </Link>
                    </div>
                ) : (
                    // have product in cart
                    <div className='flex flex-col md:flex-row gap-4'>
                        {/* product info */}
                        <div className='md:w-3/4'>
                            <div className='bg-white rounded-lg shadow-md p-6 mb-4'>
                                {/* table */}
                                <table className='w-full'>
                                    {/* header table */}
                                    <thead>
                                        <tr>
                                            <th className='text-left font-semibold'>
                                                Tất cả ( {amountProduct} sản phẩm )
                                            </th>
                                            <th className='font-semibold text-center'>
                                                Đơn giá (VNĐ)
                                            </th>
                                            <th className='font-semibold text-center'>Số lượng</th>
                                            <th className='text-center font-semibold'>
                                                Thành tiền (VNĐ)
                                            </th>
                                        </tr>
                                    </thead>

                                    {/* body product: 1 <tr> là 1 sản phẩm */}
                                    <tbody>
                                        {orders?.orderItems.map((order, index) => (
                                            <tr key={index}>
                                                <td className='py-4'>
                                                    <div className='flex items-center'>
                                                        {/* image */}
                                                        <img
                                                            className='h-16 w-16 mr-4'
                                                            src={order.img[0]}
                                                            alt='Product image'
                                                        />

                                                        {/* name */}
                                                        <span className='w-80 font-semibold'>
                                                            {order.name}
                                                        </span>
                                                    </div>
                                                </td>

                                                {/* price */}
                                                <td className='py-4 text-center'>
                                                    {priceFormat(order.price)}
                                                </td>

                                                {/* quantity */}
                                                <td className='py-4'>
                                                    <div className='flex items-center justify-center'>
                                                        <button
                                                            onClick={() =>
                                                                handleChangeQuantity('decrease')
                                                            }
                                                            disabled={quantityProduct === 0}
                                                            className='border rounded-md py-2 px-4 mr-2'
                                                        >
                                                            -
                                                        </button>
                                                        <span className='text-center w-8'>
                                                            {order.amount}
                                                        </span>
                                                        <button
                                                            onClick={() =>
                                                                handleChangeQuantity('increase')
                                                            }
                                                            className='border rounded-md py-2 px-4 ml-2'
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </td>

                                                {/* total price = (price * quantity) */}
                                                <td className='py-4 font-bold text-center'>
                                                    {priceFormat(order.price * order.amount)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Summary */}
                        <div className='md:w-1/4'>
                            <div className='bg-white rounded-lg shadow-md p-6'>
                                <h2 className='text-lg font-semibold mb-4'>Hóa đơn</h2>
                                <div className='flex justify-between mb-2'>
                                    <span>Giá tiền</span>
                                    <span>2.075.000</span>
                                </div>
                                <div className='flex justify-between mb-2'>
                                    <span>Giá thuế</span>
                                    <span>0.75%</span>
                                </div>
                                <div className='flex justify-between mb-2'>
                                    <span>Tiền ship</span>
                                    <span>27.000</span>
                                </div>
                                <hr className='my-2' />
                                <div className='flex justify-between mb-2'>
                                    <span className='text-lg font-semibold'>Tổng tiền</span>
                                    <span className='text-lg font-semibold'>2.075.000 VNĐ</span>
                                </div>

                                {/* button checkout */}
                                <Link to='/checkout' className='mt-6 text-center'>
                                    <button
                                        type='button'
                                        className='group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800'
                                    >
                                        Thanh toán hóa đơn
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            className='group-hover:ml-8 ml-4 h-6 w-6 transition-all'
                                            fill='none'
                                            viewBox='0 0 24 24'
                                            stroke='currentColor'
                                            strokeWidth='2'
                                        >
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                d='M13 7l5 5m0 0l-5 5m5-5H6'
                                            />
                                        </svg>
                                    </button>
                                </Link>

                                {/* Secured Payment info */}
                                <div className='flex flex-col items-center justify-center mt-3'>
                                    <div className='flex items-center justify-center'>
                                        <FontAwesomeIcon icon={faLock} />
                                        <p className='ml-2'>
                                            Thanh toán an toàn với các phương thức:
                                        </p>
                                    </div>

                                    {/* Payment methods */}
                                    <div className='flex items-center justify-center gap-3'>
                                        <img
                                            className='rounded-sm w-10 h-10 object-cover cursor-pointer transform hover:scale-110 transition-transform duration-300'
                                            src='https://www.material-tailwind.com/image/logos/visa.svg'
                                            alt=''
                                        />
                                        <img
                                            className='rounded-sm w-10 h-7 object-cover cursor-pointer transform hover:scale-110 transition-transform duration-300'
                                            src='https://www.material-tailwind.com/image/logos/master-card.png'
                                            alt=''
                                        />
                                        <img
                                            className='rounded-sm w-10 h-10 object-cover cursor-pointer transform hover:scale-110 transition-transform duration-300'
                                            src='https://www.material-tailwind.com/image/logos/american-express-logo.svg'
                                            alt=''
                                        />
                                        <img
                                            className='rounded-sm w-10 h-10 object-cover cursor-pointer transform hover:scale-110 transition-transform duration-300'
                                            src='https://www.material-tailwind.com/image/logos/paypal.png'
                                            alt=''
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderPage;
