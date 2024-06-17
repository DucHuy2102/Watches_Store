import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCartShopping,
    faCircleArrowLeft,
    faUser,
    faUserGear,
} from '@fortawesome/free-solid-svg-icons';
import { Badge } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { updateSearch } from '../redux/slides/productSlide';
import { resetOrder } from '../redux/slides/orderSlide';
import { resetUser } from '../redux/slides/userSlide';

// style
const styleButton =
    'transition-all duration-300 ease-in-out hover:bg-black hover:text-white w-[9vw] flex items-center justify-center py-1 text-start text-lg border border-gray-400 rounded-lg';
const styleButtonPage =
    'transition-all duration-300 hover:rounded-lg hover:py-1 hover:text-white hover:px-3 ease-in-out hover:bg-black text-gray-400 text-xl';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const accountRef = useRef(null);

    // get data from Redux
    const dataUSer = useSelector((state) => state.user);
    const products = useSelector((state) => state.product.products);
    const orders = useSelector((state) => state.orderProduct.orderItems);
    const amountProduct = orders?.length;

    // state for click button
    const [clickButtonAccount, setClickButtonAccount] = useState(false);
    const [clickButtonWithoutAccount, setClickButtonWithoutAccount] = useState(false);

    // click out button
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

    // logout demo function
    const logout = () => {
        localStorage.removeItem('tokenUser');
        dispatch(resetUser());
        dispatch(resetOrder());
        navigate('/');
    };

    // search product
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    // capitalize first letter
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    // search product by name and navigate to page products
    const handleSearchChange = (e) => {
        const capitalizedValue = capitalizeFirstLetter(e.target.value);
        setSearchValue(capitalizedValue);
    };

    // search product by name and navigate to page products
    const handleKeyPress = () => {
        if (searchValue) {
            const res = products.filter((item) => item.productName.includes(searchValue));
            setSearchResults(res);
            navigate('/products');
            setSearchValue('');
            dispatch(updateSearch(searchResults));
        } else {
            setSearchResults([]);
        }
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
                <Link to='/contact' className={styleButtonPage}>
                    Liên hệ
                </Link>
            </div>

            {/* search input */}
            <div className='w-[10rem] flex-grow relative'>
                <input
                    onChange={handleSearchChange}
                    onKeyPress={handleKeyPress}
                    type='text'
                    value={searchValue}
                    placeholder='Tên đồng hồ...'
                    className='h-9 border text-lg border-gray-400 px-3 py-1 rounded-lg w-[95%] font-PlayfairDisplay'
                />
            </div>

            {/* buttons: account & cart */}
            <div className='flex gap-2 font-PlayfairDisplay' ref={accountRef}>
                {/* button account */}
                {dataUSer?.username ? (
                    // login success
                    <>
                        <div
                            onClick={() => setClickButtonAccount(!clickButtonAccount)}
                            className={`${styleButton} cursor-pointer mr-2 w-[10rem] rounded-lg flex justify-center items-center text-lg gap-1`}
                        >
                            Chào:
                            <span className='text-blue-500 font-medium hover:text-white'>
                                {dataUSer?.username}
                            </span>
                        </div>

                        {/* click vào button */}
                        {clickButtonAccount && (
                            <div className='absolute bg-white rounded-lg top-14 z-10 h-[80px] flex flex-col justify-center items-center gap-1'>
                                {/* Quản lý tài khoản */}
                                <Link
                                    to={`/profile`}
                                    onClick={() => setClickButtonAccount(false)}
                                    className='transition-all duration-300 ease-in-out hover:bg-black hover:text-white w-[9vw] flex items-center justify-center py-1 text-start text-lg border border-gray-300 rounded-lg'
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
                                    className='transition-all duration-300 ease-in-out hover:bg-black hover:text-white w-[9vw] flex items-center justify-center py-1 text-start text-lg border border-gray-300 rounded-lg'
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
                    </>
                )}

                {/* button shopping cart */}
                <Badge count={amountProduct}>
                    <Link
                        to='/order'
                        // onClick={handleClickOrder}
                        className={`${styleButton} font-PlayfairDisplay`}
                    >
                        <FontAwesomeIcon icon={faCartShopping} className='mr-2' />
                        Giỏ hàng
                    </Link>
                </Badge>
            </div>
        </nav>
    );
};

export default Header;
