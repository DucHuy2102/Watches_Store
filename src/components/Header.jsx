import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faRightToBracket, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons';

// style
const styleButtonAccount =
    'transition-all duration-300 ease-in-out hover:bg-black hover:text-white w-[8vw] py-1 text-center text-lg border border-gray-400 rounded-lg';
const styleButtonPage =
    'transition-all duration-300 hover:rounded-lg hover:py-1 hover:text-white hover:px-3 ease-in-out hover:bg-black text-gray-400 text-xl';

const Header = () => {
    const [clickAccountButton, setClickAccountButton] = useState(false);

    return (
        <nav className='w-full h-16 px-20 flex items-center flex-grow shadow-lg'>
            <div className=''>
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
                    Thông tin
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

            {/* login & register */}
            <div className='flex gap-2'>
                <button
                    onClick={() => setClickAccountButton(!clickAccountButton)}
                    className={`${styleButtonAccount} relative`}
                >
                    <FontAwesomeIcon icon={faUser} className='mr-2' />
                    Tài khoản
                </button>

                {clickAccountButton && (
                    <div className='absolute bg-white rounded-lg top-14 z-10 h-[80px] flex flex-col justify-center items-center gap-1'>
                        <Link to='/login' className={styleButtonAccount}>
                            <FontAwesomeIcon icon={faRightToBracket} className='mr-2' />
                            Đăng nhập
                        </Link>
                        <Link to='/register' className={styleButtonAccount}>
                            <FontAwesomeIcon icon={faUserPlus} className='mr-2' />
                            Đăng ký
                        </Link>
                    </div>
                )}

                <Link to='/order' className={styleButtonAccount}>
                    <FontAwesomeIcon icon={faCartShopping} className='mr-2' />
                    Giỏ hàng
                </Link>
            </div>
        </nav>
    );
};

export default Header;
