const CheckoutPage = () => {
    return (
        <div className='bg-gray-100 min-h-screen py-8'>
            <div className='container mx-auto px-4'>
                <h1 className='text-3xl text-center font-bold mb-4'>Thanh toán hóa đơn</h1>
                <div className='container py-5'>
                    <div className='lg:flex justify-between'>
                        <div className='lg:w-2/3'>
                            <div className='bg-white shadow-md rounded-lg mb-4'>
                                <div className='px-6 py-4'>
                                    <h4 className='text-lg font-semibold mb-2'>Billing address</h4>
                                    <form className='space-y-4'>
                                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                            <div>
                                                <label
                                                    htmlFor='firstName'
                                                    className='block text-sm font-medium text-gray-700'
                                                >
                                                    First name
                                                </label>
                                                <input
                                                    type='text'
                                                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                                                    id='firstName'
                                                    placeholder=''
                                                    required
                                                />
                                                <div className='text-red-600 text-xs mt-1'>
                                                    Valid first name is required.
                                                </div>
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor='lastName'
                                                    className='block text-sm font-medium text-gray-700'
                                                >
                                                    Last name
                                                </label>
                                                <input
                                                    type='text'
                                                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                                                    id='lastName'
                                                    placeholder=''
                                                    required
                                                />
                                                <div className='text-red-600 text-xs mt-1'>
                                                    Valid last name is required.
                                                </div>
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor='email'
                                                    className='block text-sm font-medium text-gray-700'
                                                >
                                                    Email
                                                </label>
                                                <input
                                                    type='email'
                                                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                                                    id='email'
                                                    placeholder='you@example.com'
                                                    required
                                                />
                                                <div className='text-red-600 text-xs mt-1'>
                                                    Please enter a valid email address for shipping
                                                    updates.
                                                </div>
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor='address'
                                                    className='block text-sm font-medium text-gray-700'
                                                >
                                                    Address
                                                </label>
                                                <input
                                                    type='text'
                                                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                                                    id='address'
                                                    placeholder='1234 Main St'
                                                    required
                                                />
                                                <div className='text-red-600 text-xs mt-1'>
                                                    Please enter your shipping address.
                                                </div>
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor='address2'
                                                    className='block text-sm font-medium text-gray-700'
                                                >
                                                    Address 2{' '}
                                                    <span className='text-gray-400'>
                                                        (Optional)
                                                    </span>
                                                </label>
                                                <input
                                                    type='text'
                                                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                                                    id='address2'
                                                    placeholder='Apartment or suite'
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor='country'
                                                    className='block text-sm font-medium text-gray-700'
                                                >
                                                    Country
                                                </label>
                                                <select
                                                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                                                    id='country'
                                                    required
                                                >
                                                    <option value=''>Choose...</option>
                                                    <option>India</option>
                                                </select>
                                                <div className='text-red-600 text-xs mt-1'>
                                                    Please select a valid country.
                                                </div>
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor='state'
                                                    className='block text-sm font-medium text-gray-700'
                                                >
                                                    State
                                                </label>
                                                <select
                                                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                                                    id='state'
                                                    required
                                                >
                                                    <option value=''>Choose...</option>
                                                    <option>Punjab</option>
                                                </select>
                                                <div className='text-red-600 text-xs mt-1'>
                                                    Please provide a valid state.
                                                </div>
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor='zip'
                                                    className='block text-sm font-medium text-gray-700'
                                                >
                                                    Zip
                                                </label>
                                                <input
                                                    type='text'
                                                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                                                    id='zip'
                                                    placeholder=''
                                                    required
                                                />
                                                <div className='text-red-600 text-xs mt-1'>
                                                    Zip code required.
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className='lg:w-1/3'>
                            <div className='bg-white shadow-md rounded-lg mb-4'>
                                <div className='px-6 py-4'>
                                    <h4 className='text-lg font-semibold mb-2'>Payment</h4>
                                    <form className='space-y-4'>
                                        <div className='grid grid-cols-1 gap-4'>
                                            <div>
                                                <label
                                                    htmlFor='cc-name'
                                                    className='block text-sm font-medium text-gray-700'
                                                >
                                                    Name on card
                                                </label>
                                                <input
                                                    type='text'
                                                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                                                    id='cc-name'
                                                    placeholder=''
                                                    required
                                                />
                                                <small className='block text-xs text-gray-400'>
                                                    Full name as displayed on card
                                                </small>
                                                <div className='text-red-600 text-xs mt-1'>
                                                    Name on card is required
                                                </div>
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor='cc-number'
                                                    className='block text-sm font-medium text-gray-700'
                                                >
                                                    Credit card number
                                                </label>
                                                <input
                                                    type='text'
                                                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                                                    id='cc-number'
                                                    placeholder=''
                                                    required
                                                />
                                                <div className='text-red-600 text-xs mt-1'>
                                                    Credit card number is required
                                                </div>
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor='cc-expiration'
                                                    className='block text-sm font-medium text-gray-700'
                                                >
                                                    Expiration
                                                </label>
                                                <input
                                                    type='text'
                                                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                                                    id='cc-expiration'
                                                    placeholder=''
                                                    required
                                                />
                                                <div className='text-red-600 text-xs mt-1'>
                                                    Expiration date required
                                                </div>
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor='cc-cvv'
                                                    className='block text-sm font-medium text-gray-700'
                                                >
                                                    CVV
                                                </label>
                                                <input
                                                    type='text'
                                                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                                                    id='cc-cvv'
                                                    placeholder=''
                                                    required
                                                />
                                                <div className='text-red-600 text-xs mt-1'>
                                                    Security code required
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            className='w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                            type='submit'
                                            disabled
                                        >
                                            Hoàn tất thanh toán
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
