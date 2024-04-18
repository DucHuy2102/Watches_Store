import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

const OrderPage = () => {
    return (
        <div className='bg-gray-100 h-screen py-8'>
            <div className='container mx-auto px-4'>
                <h1 className='text-3xl text-center font-bold mb-4'>Giỏ hàng của bạn</h1>
                <div className='flex flex-col md:flex-row gap-4'>
                    <div className='md:w-3/4'>
                        <div className='bg-white rounded-lg shadow-md p-6 mb-4'>
                            <table className='w-full'>
                                <thead>
                                    <tr>
                                        <th className='text-left font-semibold'>Sản phẩm</th>
                                        <th className='text-center font-semibold'>Kích thước</th>
                                        <th className='text-center font-semibold'>Màu sắc</th>
                                        <th className='text-center font-semibold'>Giá tiền</th>
                                        <th className='font-semibold text-center'>Số lượng</th>
                                        <th className='text-center font-semibold'>Tổng tiền (VNĐ)</th>
                                    </tr>
                                </thead>

                                {/* body product: 1 <tr> là 1 sản phẩm */}
                                <tbody>
                                    <tr>
                                        <td className='py-4'>
                                            <div className='flex items-center'>
                                                {/* image */}
                                                <img
                                                    className='h-16 w-16 mr-4'
                                                    src='https://timex.com/cdn/shop/files/TW2W51600.png?v=1711407752&width=400'
                                                    alt='Product image'
                                                />

                                                {/* name */}
                                                <span className='w-80 font-semibold'>
                                                    Q Timex Chronograph 40mm Stainless Steel Bracelet Watch
                                                </span>
                                            </div>
                                        </td>

                                        {/* size */}
                                        <td className='py-4 text-center'>40mm</td>

                                        {/* color */}
                                        <td className='py-4 text-center'>Đen</td>

                                        {/* price */}
                                        <td className='py-4 text-center'>2.075.000</td>

                                        {/* quantity */}
                                        <td className='py-4'>
                                            <div className='flex items-center justify-center'>
                                                <button className='border rounded-md py-2 px-4 mr-2'>-</button>
                                                <span className='text-center w-8'>1</span>
                                                <button className='border rounded-md py-2 px-4 ml-2'>+</button>
                                            </div>
                                        </td>

                                        {/* total price = (price * quantity) */}
                                        <td className='py-4 font-bold text-center'>2.075.000</td>
                                    </tr>
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
                                    <p className='ml-2'>Thanh toán an toàn với các phương thức:</p>
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
            </div>
        </div>
    );
};

export default OrderPage;
