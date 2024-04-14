import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const OrderPage = () => {
    return (
        // <section classNameName='h-screen bg-gray-100 py-12 sm:py-16 lg:py-10'>
        //     <div classNameName='mx-auto px-4 sm:px-6 lg:px-8'>
        //         {/* name page */}
        //         <div classNameName='flex items-center justify-center'>
        //             <h1 classNameName='text-2xl font-semibold text-gray-900'>Your Cart</h1>
        //         </div>

        //         {/* body page */}
        //         <div classNameName='mx-auto mt-8 max-w-2xl md:mt-12'>
        //             <div classNameName='bg-white shadow'>
        //                 <div classNameName='px-4 py-6 sm:px-8 sm:py-10'>
        //                     <div classNameName='flow-root'>
        //                         <ul classNameName='-my-8'>
        //                             {/* item */}
        //                             <li classNameName='flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0'>
        //                                 <div classNameName='shrink-0'>
        //                                     <img
        //                                         classNameName='h-24 w-24 max-w-full rounded-lg object-cover'
        //                                         src='https://timex.com/cdn/shop/files/TW2W51600.png?v=1711407752&width=400'
        //                                         alt=''
        //                                     />
        //                                 </div>

        //                                 <div classNameName='relative flex flex-1 flex-col justify-between'>
        //                                     <div classNameName='sm:col-gap-5 sm:grid sm:grid-cols-2'>
        //                                         <div classNameName='pr-8 sm:pr-5'>
        //                                             <p classNameName='text-base font-semibold text-gray-900'>
        //                                                 Q Timex Chronograph 40mm Stainless Steel Bracelet Watch
        //                                             </p>
        //                                             <p classNameName='mx-0 mt-1 mb-0 text-sm text-gray-400'>
        //                                                 Lorem ipsum dolor sit amet consectetur adipisicing elit.
        //                                                 Recusandae, neque.
        //                                             </p>
        //                                         </div>

        //                                         <div classNameName='mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end'>
        //                                             <p className='shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right'>
        //                                                 $21.25
        //                                             </p>

        //                                             <div className='sm:order-1'>
        //                                                 <div className='mx-auto flex h-8 items-stretch text-gray-600'>
        //                                                     <button className='flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white'>
        //                                                         -
        //                                                     </button>
        //                                                     <div className='flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition'>
        //                                                         2
        //                                                     </div>
        //                                                     <button className='flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white'>
        //                                                         +
        //                                                     </button>
        //                                                 </div>
        //                                             </div>
        //                                         </div>
        //                                     </div>

        //                                     <div className='absolute top-0 right-0 flex sm:bottom-0 sm:top-auto'>
        //                                         <button
        //                                             type='button'
        //                                             className='flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900'
        //                                         >
        //                                             <svg
        //                                                 className='h-5 w-5'
        //                                                 xmlns='http://www.w3.org/2000/svg'
        //                                                 fill='none'
        //                                                 viewBox='0 0 24 24'
        //                                                 stroke='currentColor'
        //                                             >
        //                                                 <path
        //                                                     strokeLinecap='round'
        //                                                     strokeLinejoin='round'
        //                                                     strokeWidth='2'
        //                                                     d='M6 18L18 6M6 6l12 12'
        //                                                     className=''
        //                                                 ></path>
        //                                             </svg>
        //                                         </button>
        //                                     </div>
        //                                 </div>
        //                             </li>
        //                         </ul>
        //                     </div>

        //                     {/* price */}
        //                     <div className='mt-6 border-t border-b py-2'>
        //                         <div className='flex items-center justify-between'>
        //                             <p className='text-sm text-gray-400'>Subtotal</p>
        //                             <p className='text-lg font-semibold text-gray-900'>$25</p>
        //                         </div>
        //                         <div className='flex items-center justify-between'>
        //                             <p className='text-sm text-gray-400'>Shipping</p>
        //                             <p className='text-lg font-semibold text-gray-900'>$8.00</p>
        //                         </div>
        //                     </div>
        //                     {/* total price */}
        //                     <div className='mt-6 flex items-center justify-between'>
        //                         <p className='text-sm font-medium text-gray-900'>Total</p>
        //                         <p className='text-2xl font-semibold text-gray-900'>
        //                             <span className='text-xs font-normal text-gray-400'>USD</span> 288.82
        //                         </p>
        //                     </div>
        //                     {/* checkout */}
        //                     <div className='mt-6 text-center'>
        //                         <button
        //                             type='button'
        //                             className='group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800'
        //                         >
        //                             Checkout
        //                             <svg
        //                                 xmlns='http://www.w3.org/2000/svg'
        //                                 className='group-hover:ml-8 ml-4 h-6 w-6 transition-all'
        //                                 fill='none'
        //                                 viewBox='0 0 24 24'
        //                                 stroke='currentColor'
        //                                 strokeWidth='2'
        //                             >
        //                                 <path
        //                                     strokeLinecap='round'
        //                                     strokeLinejoin='round'
        //                                     d='M13 7l5 5m0 0l-5 5m5-5H6'
        //                                 />
        //                             </svg>
        //                         </button>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </section>
        <div className='bg-gray-100 h-screen py-8'>
            <div className='container mx-auto px-4'>
                <h1 className='text-2xl text-center font-bold mb-4'>Shopping Cart</h1>
                <div className='flex flex-col md:flex-row gap-4'>
                    <div className='md:w-3/4'>
                        <div className='bg-white rounded-lg shadow-md p-6 mb-4'>
                            <table className='w-full'>
                                <thead>
                                    <tr>
                                        <th className='text-left font-semibold'>Product</th>
                                        <th className='text-center font-semibold'>Size</th>
                                        <th className='text-center font-semibold'>Color</th>
                                        <th className='text-center font-semibold'>Price</th>
                                        <th className='font-semibold text-center'>Quantity</th>
                                        <th className='text-center font-semibold'>Total</th>
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
                                        <td className='py-4 text-center'>Black</td>

                                        {/* price */}
                                        <td className='py-4 text-center'>$19.99</td>

                                        {/* quantity */}
                                        <td className='py-4'>
                                            <div className='flex items-center justify-center'>
                                                <button className='border rounded-md py-2 px-4 mr-2'>-</button>
                                                <span className='text-center w-8'>1</span>
                                                <button className='border rounded-md py-2 px-4 ml-2'>+</button>
                                            </div>
                                        </td>

                                        {/* total price = (price * quantity) */}
                                        <td className='py-4 font-bold text-center'>$19.99</td>
                                    </tr>
                                    <tr>
                                        <td className='py-4'>
                                            <div className='flex items-center'>
                                                {/* image */}
                                                <img
                                                    className='h-16 w-16 mr-4'
                                                    src='https://timex.com/cdn/shop/files/TW2W44700.png?v=1712600249&width=400'
                                                    alt='Product image'
                                                />

                                                {/* name */}
                                                <span className='w-80 font-semibold'>
                                                    Q Timex 1978 Day/Date 37.5 mm Leather Strap Watch
                                                </span>
                                            </div>
                                        </td>

                                        {/* size */}
                                        <td className='py-4 text-center'>40mm</td>

                                        {/* color */}
                                        <td className='py-4 text-center'>Black</td>

                                        {/* price */}
                                        <td className='py-4 text-center'>$19.99</td>

                                        {/* quantity */}
                                        <td className='py-4'>
                                            <div className='flex items-center justify-center'>
                                                <button className='border rounded-md py-2 px-4 mr-2'>-</button>
                                                <span className='text-center w-8'>1</span>
                                                <button className='border rounded-md py-2 px-4 ml-2'>+</button>
                                            </div>
                                        </td>

                                        {/* total price = (price * quantity) */}
                                        <td className='py-4 font-bold text-center'>$19.99</td>
                                    </tr>
                                    <tr>
                                        <td className='py-4'>
                                            <div className='flex items-center'>
                                                {/* image */}
                                                <img
                                                    className='h-16 w-16 mr-4'
                                                    src='https://timex.com/cdn/shop/files/TW2V99200.png?v=1710714735&width=400'
                                                    alt='Product image'
                                                />

                                                {/* name */}
                                                <span className='w-80 font-semibold'>
                                                    Timex UFC King 45mm Silicone Strap Watch
                                                </span>
                                            </div>
                                        </td>

                                        {/* size */}
                                        <td className='py-4 text-center'>40mm</td>

                                        {/* color */}
                                        <td className='py-4 text-center'>Black</td>

                                        {/* price */}
                                        <td className='py-4 text-center'>$19.99</td>

                                        {/* quantity */}
                                        <td className='py-4'>
                                            <div className='flex items-center justify-center'>
                                                <button className='border rounded-md py-2 px-4 mr-2'>-</button>
                                                <span className='text-center w-8'>1</span>
                                                <button className='border rounded-md py-2 px-4 ml-2'>+</button>
                                            </div>
                                        </td>

                                        {/* total price = (price * quantity) */}
                                        <td className='py-4 font-bold text-center'>$19.99</td>
                                    </tr>

                                    {/*  More product rows  */}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Summary */}
                    <div className='md:w-1/4'>
                        <div className='bg-white rounded-lg shadow-md p-6'>
                            <h2 className='text-lg font-semibold mb-4'>Summary</h2>
                            <div className='flex justify-between mb-2'>
                                <span>Subtotal</span>
                                <span>$19.99</span>
                            </div>
                            <div className='flex justify-between mb-2'>
                                <span>Taxes</span>
                                <span>$1.99</span>
                            </div>
                            <div className='flex justify-between mb-2'>
                                <span>Shipping</span>
                                <span>$0.00</span>
                            </div>
                            <hr className='my-2' />
                            <div className='flex justify-between mb-2'>
                                <span className='text-lg font-semibold'>Total</span>
                                <span className='text-lg font-semibold'>$21.98</span>
                            </div>

                            {/* button checkout */}
                            <div className='mt-6 text-center'>
                                <button
                                    type='button'
                                    className='group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800'
                                >
                                    Checkout
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
                            </div>

                            {/* Secured Payment info */}
                            <div className='flex flex-col items-center justify-center mt-3'>
                                <div className='flex items-center justify-center'>
                                    <FontAwesomeIcon icon={faLock} />
                                    <p className='ml-2'>Secured Payment by Paddle with:</p>
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
