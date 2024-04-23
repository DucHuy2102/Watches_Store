import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faRightToBracket, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Badge } from 'antd';

// style
const styleButton =
    'transition-all duration-300 ease-in-out hover:bg-black hover:text-white w-[9vw] flex items-center justify-center py-1 text-start text-lg border border-gray-400 rounded-lg';
const styleButtonPage =
    'transition-all duration-300 hover:rounded-lg hover:py-1 hover:text-white hover:px-3 ease-in-out hover:bg-black text-gray-400 text-xl';

const Header = () => {
    const [clickAccountButton, setClickAccountButton] = useState(false);

    return (
        <nav className='w-full h-16 px-10 flex items-center flex-grow shadow-lg'>
            {/* name website */}
            <div>
                <Link to='/' className='text-3xl font-bold'>
                    Watc<span className='text-yellow-400 text-4xl'>H</span>es
                </Link>
            </div>

            {/* pages */}
            <div className='w-[25rem] flex items-center justify-center gap-4'>
                <Link to='/' className={styleButtonPage}>
                    Trang chủ
                </Link>
                <Link to='/products' className={styleButtonPage}>
                    Sản phẩm
                </Link>
                <Link to='/blogs' className={styleButtonPage}>
                    Blog
                </Link>
                <Link to='/contact' className={styleButtonPage}>
                    Liên hệ
                </Link>
            </div>

            {/* search */}
            <div className='w-[10rem] flex-grow mr-5'>
                <input
                    type='text'
                    placeholder='Tìm kiếm...'
                    className='h-9 border text-xl border-gray-400 px-3 py-1 rounded-lg w-full'
                />
            </div>

            {/* 3 buttons: login, register & order button */}
            <div className='flex gap-2'>
                <button
                    onClick={() => setClickAccountButton(!clickAccountButton)}
                    className={`${styleButton} relative`}
                >
                    <FontAwesomeIcon icon={faUser} className='mr-2' />
                    Tài khoản
                </button>

                {clickAccountButton && (
                    <div className='absolute bg-white rounded-lg top-14 z-10 h-[80px] flex flex-col justify-center items-center gap-1'>
                        <Link
                            to='/login'
                            onClick={() => setClickAccountButton(false)}
                            className='transition-all duration-300 ease-in-out hover:bg-black hover:text-white w-[9vw] flex items-center justify-start pl-3 py-1 text-start text-lg border border-gray-400 rounded-lg'
                        >
                            <FontAwesomeIcon icon={faRightToBracket} className='mr-2' />
                            Đăng nhập
                        </Link>
                        <Link
                            to='/register'
                            onClick={() => setClickAccountButton(false)}
                            className='transition-all duration-300 ease-in-out hover:bg-black hover:text-white w-[9vw] flex items-center justify-start pl-3 py-1 text-start text-lg border border-gray-400 rounded-lg'
                        >
                            <FontAwesomeIcon icon={faUserPlus} className='mr-2' />
                            Đăng ký
                        </Link>
                    </div>
                )}

                <Badge count={5}>
                    <Link to='/order' className={styleButton}>
                        <FontAwesomeIcon icon={faCartShopping} className='mr-2' />
                        Giỏ hàng
                    </Link>
                </Badge>
            </div>
        </nav>
    );
};

export default Header;
