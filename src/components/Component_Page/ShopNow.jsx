import React from 'react';
import { useDispatch } from 'react-redux';
import { filterProducts } from '../../redux/slides/productSlide';
import { useNavigate } from 'react-router-dom';

const ShopNow = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleFilterProduct = (value) => {
        dispatch(filterProducts([{ key: value, title: 'Đối tượng' }]));
        navigate('/products');
    };

    return (
        <div className='px-10 font-PlayfairDisplay'>
            <div className='flex justify-center items-center gap-5'>
                {/* men */}
                <div className='relative w-[50%] cursor-pointer'>
                    <div className='overflow-hidden'>
                        <img
                            src='https://timex.com/cdn/shop/files/4967_TX_TC24_collection_mod_TW2W51600_dd9b2b52-2099-4a6e-9e76-f3cb0449ba06.jpg?v=1714968502'
                            alt=''
                            className='w-full h-full object-cover transform transition-transform duration-500 hover:scale-110'
                        />
                    </div>
                    <div className='absolute top-[80vh] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[30vw] h-full flex justify-center items-center'>
                        <button
                            onClick={() => handleFilterProduct('Nam')}
                            type='button'
                            className='group inline-flex w-full items-center justify-center rounded-md bg-white px-6 py-4 text-lg font-semibold text-black transition-all duration-500 ease-in-out focus:shadow hover:bg-black hover:text-white'
                        >
                            Đồng hồ Nam
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='group-hover:ml-8 ml-4 h-6 w-6 transition-all duration-500 ease-in-out'
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
                </div>

                {/* women */}
                <div className='relative w-[50%] cursor-pointer'>
                    <div className='overflow-hidden'>
                        <img
                            src='https://timex.com/cdn/shop/files/TW2W32200_CollectionMod.jpg?v=1711979408'
                            className='w-full h-full object-cover transform transition-transform duration-500 hover:scale-110'
                            alt=''
                        />
                    </div>
                    <div className='absolute top-[80vh] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[30vw] h-full flex justify-center items-center'>
                        <button
                            type='button'
                            onClick={() => handleFilterProduct('Nữ')}
                            className='group inline-flex w-full items-center justify-center rounded-md bg-white px-6 py-4 text-lg font-semibold text-black transition-all duration-500 ease-in-out focus:shadow hover:bg-black hover:text-white'
                        >
                            Đồng hồ Nữ
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='group-hover:ml-8 ml-4 h-6 w-6 transition-all duration-500 ease-in-out'
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
                </div>
            </div>
        </div>
    );
};

export default ShopNow;
