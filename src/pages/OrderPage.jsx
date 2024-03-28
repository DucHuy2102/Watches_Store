const flexStyle = 'flex justify-center items-center';

const OrderPage = () => {
    return (
        <div className='flex items-center gap-2 bg-gray-600 w-full px-20'>
            {/* items */}
            <div className='bg-green-500 w-[60%]'>
                <h1 className='text-2xl font-bold'>Your Order</h1>
            </div>

            {/* price */}
            <div className={`${flexStyle} flex-col w-[40%] bg-blue-500`}>
                {/* name */}
                <h1 className='text-2xl font-bold'>Order Summary</h1>
                <div className={`${flexStyle}`}>
                    <div>
                        <h1>Subtotal</h1>
                        <h2>22,305,800</h2>
                    </div>
                    <div>
                        <h1>Shipping</h1>
                        <h2>Calculated at next step</h2>
                    </div>
                </div>
                <div className={`${flexStyle}`}>
                    <h1>Total</h1>
                    <h2>22,305,800</h2>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;
