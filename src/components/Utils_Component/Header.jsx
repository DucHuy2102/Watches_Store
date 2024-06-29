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
import { resetAllProducts, updateSearch } from '../../redux/slides/productSlide';
import { resetOrder } from '../../redux/slides/orderSlide';
import { resetUser } from '../../redux/slides/userSlide';

// style
const styleButton =
    'transition-all duration-300 ease-in-out hover:bg-black hover:text-white w-[10vw] h-10 flex items-center justify-center py-1 text-start text-lg border border-gray-400 rounded-lg';
const styleButtonPage =
    'transition-all duration-300 hover:rounded-lg hover:py-1 hover:text-white hover:px-3 ease-in-out hover:bg-black text-gray-400 text-xl';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const accountRef = useRef(null);
    const token = localStorage.getItem('tokenUser');

    // get data from Redux
    const dataUSer = useSelector((state) => state.user);
    const products = useSelector((state) => state.product.products);
    const orders = useSelector((state) => state.orderProduct.orderItems);
    const amountProduct = orders?.data.length;

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
        localStorage.removeItem('adminToken');
        dispatch(resetUser());
        dispatch(resetOrder());
        dispatch(resetAllProducts());
        navigate('/');
    };

    // search product
    const [searchValue, setSearchValue] = useState('');

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
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && searchValue) {
            const res = products.filter((item) => item.productName.includes(searchValue));
            dispatch(updateSearch(res, searchValue));
            navigate('/products');
            setSearchValue('');
        }
    };

    return (
        <nav className='w-full h-16 px-10 flex items-center justify-between shadow-lg'>
            {/* name website */}
            <Link to='/' className='text-4xl font-bold font-PlayfairDisplay'>
                Watc<span className='text-yellow-400 text-4xl'>H</span>es
            </Link>

            {/* pages */}
            <div className='w-[25vw] flex items-center justify-center gap-4 font-PlayfairDisplay'>
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
            <div className='w-[30vw] flex-grow'>
                <input
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyPress}
                    type='text'
                    value={searchValue}
                    placeholder='Tên đồng hồ...'
                    className='h-10 border text-lg border-gray-400 px-3 py-1 rounded-lg w-full font-PlayfairDisplay'
                />
            </div>

            {/* buttons: account & cart */}
            <div
                className='w-[20vw] flex justify-end flex-grow gap-2 font-PlayfairDisplay'
                ref={accountRef}
            >
                {/* button account */}
                {dataUSer?.username && token ? (
                    // login success
                    <>
                        <div
                            onClick={() => setClickButtonAccount(!clickButtonAccount)}
                            className={`${styleButton} relative cursor-pointer w-[10vw] rounded-lg flex justify-center items-center text-lg gap-1 transition-all duration-300`}
                        >
                            <img
                                src={
                                    dataUSer?.avatarImg
                                        ? dataUSer?.avatarImg
                                        : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
                                }
                                alt='Image-User'
                                className='w-8 h-8 object-cover rounded-full'
                            />
                            <span className='pl-2 font-bold'>{dataUSer.username}</span>
                        </div>

                        {clickButtonAccount && (
                            <div className='absolute bg-white rounded-lg shadow-lg top-14 right-[202px] z-10 w-[10vw] flex flex-col justify-center items-start'>
                                <Link
                                    to={`/profile`}
                                    onClick={() => setClickButtonAccount(false)}
                                    className='transition-all duration-200 ease-in-out hover:bg-black hover:text-white w-full flex items-center justify-center rounded-lg px-4 py-2 text-lg border-b border-gray-300'
                                >
                                    <FontAwesomeIcon icon={faUserGear} className='mr-2' />
                                    Tài khoản
                                </Link>
                                <button
                                    onClick={() => {
                                        logout();
                                        setClickButtonAccount(false);
                                    }}
                                    className='transition-all duration-200 ease-in-out hover:bg-black hover:text-white w-full flex items-center justify-center rounded-lg px-4 py-2 text-lg'
                                >
                                    <FontAwesomeIcon icon={faCircleArrowLeft} className='mr-2' />
                                    Đăng xuất
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    // not login
                    <Link
                        to='/login'
                        onClick={() => setClickButtonWithoutAccount(!clickButtonWithoutAccount)}
                        className={`${styleButton}`}
                    >
                        <FontAwesomeIcon icon={faUser} className='mr-2' />
                        Đăng nhập
                    </Link>
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
