import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { GiShoppingCart } from 'react-icons/gi';
import {
    decreaseAmount,
    increaseAmount,
    removeProductOrder,
    resetOrder,
} from '../../redux/slides/orderSlide';
import { Modal } from 'antd';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useMutationHook } from '../../hooks/useMutationHook';
import * as ProductService from '../../services/ProductService';

const OrderPage = () => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);

    // get tokenUser from localStorage
    const token = localStorage.getItem('tokenUser');

    // get orders from redux
    const orders = useSelector((state) => state.orderProduct.orderItems);
    console.log(orders);
    const amountProduct = orders?.length;

    // get total price of all product in cart
    const totalPrice = orders.reduce((acc, order) => {
        return acc + order.product.price * order.quantity;
    }, 0);

    // format price
    const priceFormat = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(price);
    };

    // handle change quantity
    const handleChangeQuantity = (type, idProduct) => {
        if (type === 'increase') {
            dispatch(increaseAmount({ idProduct }));
        } else {
            dispatch(decreaseAmount({ idProduct }));
        }
    };

    // show modal when click delete button
    const showModal = (id) => {
        setSelectedProductId(id);
        setIsModalOpen(true);
    };

    // onClick delete button
    const handleOk = () => {
        setIsModalOpen(false);
        dispatch(removeProductOrder({ idProduct: selectedProductId }));
    };

    // onClick cancel button in modal
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // reset order when user logout
    useEffect(() => {
        if (!token) {
            dispatch(resetOrder());
        }
    }, [dispatch, token]);

    // update order
    const mutation = useMutationHook(({ token, data }) =>
        ProductService.updateOrderById(token, data)
    );

    // format data to send to server
    const formatData = useMemo(() => {
        return orders.map((order) => ({
            ...order,
            quantity: order.quantity,
        }));
    }, [orders]);

    // get total quantity of all product in cart
    const total = useMemo(() => {
        return formatData.reduce((acc, order) => {
            return acc + order.quantity;
        }, 0);
    }, [formatData]);

    // update order when total quantity change
    const prevTotalRef = useRef();
    useEffect(() => {
        if (prevTotalRef.current !== total && token) {
            mutation.mutate({ token: token, data: formatData });
        }
        prevTotalRef.current = total;
    }, [total, token, mutation, formatData]);

    // navigate to checkout page
    const navigate = useNavigate();
    const handleCheckout = () => {
        navigate('/checkout');
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
                            <button className='bg-white text-black border border-black hover:bg-blue-500 hover:border-blue-500 hover:text-white transition duration-300 px-4 py-2 rounded-md'>
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
                                            <th className='text-center pl-2'>
                                                <RiDeleteBin6Line size={20} />
                                            </th>
                                        </tr>
                                    </thead>

                                    {/* body product */}
                                    <tbody>
                                        {orders.map((order, index) => {
                                            return (
                                                <tr key={index}>
                                                    {/* image, name */}
                                                    <td className='py-4'>
                                                        <div className='flex items-center'>
                                                            {/* image */}
                                                            <img
                                                                className='h-16 w-16 mr-4'
                                                                src={order.product.img[0]}
                                                                alt='Product image'
                                                            />

                                                            {/* name */}
                                                            <span className='w-80 font-semibold'>
                                                                {order.product.productName}
                                                            </span>
                                                        </div>
                                                    </td>

                                                    {/* price */}
                                                    <td className='py-4 text-center'>
                                                        {priceFormat(order.product.price)}
                                                    </td>

                                                    {/* quantity */}
                                                    <td className='py-4'>
                                                        <div className='flex items-center justify-center'>
                                                            {/* button decrease */}
                                                            <button
                                                                onClick={() =>
                                                                    handleChangeQuantity(
                                                                        'decrease',
                                                                        order.product.id
                                                                    )
                                                                }
                                                                className='border rounded-md py-2 px-4 mr-2'
                                                            >
                                                                -
                                                            </button>

                                                            {/* quantity */}
                                                            <span className='text-center w-8'>
                                                                {order.quantity}
                                                            </span>

                                                            {/* button increase */}
                                                            <button
                                                                onClick={() =>
                                                                    handleChangeQuantity(
                                                                        'increase',
                                                                        order.product.id
                                                                    )
                                                                }
                                                                className='border rounded-md py-2 px-4 ml-2'
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    </td>

                                                    {/* total price = (price * quantity) */}
                                                    <td className='py-4 text-center'>
                                                        {priceFormat(
                                                            order.product.price * order.quantity
                                                        )}
                                                    </td>

                                                    {/* delete product */}
                                                    <td className='pt-2 text-center'>
                                                        <button onClick={() => showModal(order.id)}>
                                                            <RiDeleteBin6Line size={20} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                    {/* modal delete product */}
                                    <Modal
                                        title='Xác nhận xóa sản phẩm'
                                        okText='Xác nhận xóa'
                                        cancelText='Hủy bỏ'
                                        style={{ textAlign: 'center' }}
                                        open={isModalOpen}
                                        okButtonProps={{
                                            className:
                                                'bg-black text-white hover:bg-red-500 hover:text-white',
                                        }}
                                        onOk={handleOk}
                                        onCancel={handleCancel}
                                    >
                                        <p className='text-lg'>
                                            Hành động này sẽ xóa sản phẩm khỏi giỏ hàng của bạn!
                                        </p>
                                    </Modal>
                                </table>
                            </div>
                        </div>

                        {/* Summary */}
                        <div className='md:w-1/4'>
                            <div className='bg-white rounded-lg shadow-md p-6'>
                                <h2 className='text-lg font-semibold mb-4'>Thành tiền</h2>

                                {/* total price */}
                                <div className='flex justify-between mb-2'>
                                    <span>Tạm tính</span>
                                    <span>{priceFormat(totalPrice)}</span>
                                </div>

                                {/* shippingPrice */}
                                <div className='flex justify-between mb-2'>
                                    <span>Phí vận chuyển</span>
                                    <span>0 ₫</span>
                                </div>

                                <hr className='my-2' />
                                <div className='flex justify-between mb-2'>
                                    <span className='text-lg font-semibold'>Tổng tiền</span>
                                    <span className='text-lg font-semibold'>
                                        {priceFormat(totalPrice)}
                                    </span>
                                </div>

                                {/* button checkout */}
                                {/* <Link to='/checkout' className='mt-6 text-center'> */}
                                <button
                                    onClick={() => handleCheckout()}
                                    type='button'
                                    className='group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800'
                                >
                                    Mua hàng
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
                                {/* </Link> */}

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
