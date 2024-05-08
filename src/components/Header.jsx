import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCartShopping,
    faCircleArrowLeft,
    faRightToBracket,
    faUser,
    faUserGear,
    faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { Badge } from 'antd';
import { useSelector } from 'react-redux';

// style
const styleButton =
    'transition-all duration-300 ease-in-out hover:bg-black hover:text-white w-[9vw] flex items-center justify-center py-1 text-start text-lg border border-gray-400 rounded-lg';
const styleButtonPage =
    'transition-all duration-300 hover:rounded-lg hover:py-1 hover:text-white hover:px-3 ease-in-out hover:bg-black text-gray-400 text-xl';

const Header = () => {
    const [clickButtonWithoutAccount, setClickButtonWithoutAccount] = useState(false);
    const [clickButtonAccount, setClickButtonAccount] = useState(false);

    const dataUSer = useSelector((state) => state.user);
    const accountRef = useRef(null);
    useEffect(() => {
        const handleClickOutButtonAccout = (event) => {
            if (accountRef.current && !accountRef.current.contains(event.target)) {
                setClickButtonAccount(false);
            }
        };
        const handleClickoutButtonWithoutAccount = (event) => {
            if (accountRef.current && !accountRef.current.contains(event.target)) {
                setClickButtonWithoutAccount(false);
            }
        };

        document.addEventListener('click', handleClickOutButtonAccout);
        document.addEventListener('click', handleClickoutButtonWithoutAccount);
        return () => {
            document.removeEventListener('click', handleClickOutButtonAccout);
            document.removeEventListener('click', handleClickoutButtonWithoutAccount);
        };
    }, []);

    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('token');
        navigate('/');
        window.location.reload();
    };

    return (
        <nav className='w-full h-16 px-10 flex items-center flex-grow shadow-lg'>
            {/* name website */}
            <div>
                <Link to='/' className='text-3xl font-bold font-PlayfairDisplay'>
                    Watc<span className='text-yellow-400 text-4xl'>H</span>es
                </Link>
            </div>

            {/* pages */}
            <div className='w-[25rem] flex items-center justify-center gap-4 font-PlayfairDisplay'>
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
            <div className='w-[10rem] flex-grow'>
                <input
                    type='text'
                    placeholder='Tìm kiếm...'
                    className='h-9 border text-xl border-gray-400 px-3 py-1 rounded-lg w-[95%] font-PlayfairDisplay'
                />
            </div>

            {/* 3 buttons: login, register & order button */}
            <div className='flex gap-2 font-PlayfairDisplay' ref={accountRef}>
                {dataUSer?.username ? (
                    // login success
                    <>
                        <div
                            onClick={() => setClickButtonAccount(!clickButtonAccount)}
                            className={`${styleButton} hover:cursor-pointer mr-2 w-[10rem] rounded-lg flex justify-center items-center text-lg gap-1`}
                        >
                            Chào:
                            <span className='text-blue-500 font-medium hover:text-white'>{dataUSer?.username}</span>
                        </div>

                        {/* click vào button */}
                        {clickButtonAccount && (
                            <div className='absolute bg-white rounded-lg top-14 z-10 h-[80px] flex flex-col justify-center items-center gap-1'>
                                {/* Quản lý tài khoản */}
                                <Link
                                    to={`/profile`}
                                    onClick={() => setClickButtonAccount(false)}
                                    className='transition-all duration-300 ease-in-out hover:bg-black hover:text-white w-[9vw] flex items-center justify-start pl-3 py-1 text-start text-lg border border-gray-400 rounded-lg'
                                >
                                    <FontAwesomeIcon icon={faUserGear} className='mr-2' />
                                    Tài khoản
                                </Link>

                                {/* Đăng xuất */}
                                <button
                                    onClick={() => {
                                        logout();
                                        setClickButtonAccount(false);
                                    }}
                                    className='transition-all duration-300 ease-in-out hover:bg-black hover:text-white w-[9vw] flex items-center justify-start pl-3 py-1 text-start text-lg border border-gray-400 rounded-lg'
                                >
                                    <FontAwesomeIcon icon={faCircleArrowLeft} className='mr-2' />
                                    Đăng xuất
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    // not login
                    <>
                        <Link
                            to='/login'
                            onClick={() => setClickButtonWithoutAccount(!clickButtonWithoutAccount)}
                            className={`${styleButton} relative`}
                        >
                            <FontAwesomeIcon icon={faUser} className='mr-2' />
                            Đăng nhập
                        </Link>

                        {/* {clickButtonWithoutAccount && (
                            <div className='absolute bg-white rounded-lg top-14 z-10 h-[80px] flex flex-col justify-center items-center gap-1'>
                                <button>
                                    <Link
                                        to='/login'
                                        onClick={() => setClickButtonWithoutAccount(false)}
                                        className='transition-all duration-300 ease-in-out hover:bg-black hover:text-white w-[9vw] flex items-center justify-start pl-3 py-1 text-start text-lg border border-gray-400 rounded-lg'
                                    >
                                        <FontAwesomeIcon icon={faRightToBracket} className='mr-2' />
                                        Đăng nhập
                                    </Link>
                                </button>
                                <button>
                                    <Link
                                        to='/register'
                                        onClick={() => setClickButtonWithoutAccount(false)}
                                        className='transition-all duration-300 ease-in-out hover:bg-black hover:text-white w-[9vw] flex items-center justify-start pl-3 py-1 text-start text-lg border border-gray-400 rounded-lg'
                                    >
                                        <FontAwesomeIcon icon={faUserPlus} className='mr-2' />
                                        Đăng ký
                                    </Link>
                                </button>
                            </div>
                        )} */}
                    </>
                )}

                {/* shopping cart */}
                <Badge count={5}>
                    <Link to='/order' className={`${styleButton} font-PlayfairDisplay`}>
                        <FontAwesomeIcon icon={faCartShopping} className='mr-2' />
                        Giỏ hàng
                    </Link>
                </Badge>
            </div>
        </nav>
    );
};

export default Header;
