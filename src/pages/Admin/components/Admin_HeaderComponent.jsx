import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { resetAllUser } from '../../../redux/slides/adminSlide';
import { resetOrder, resetOrderDetail, resetProduct } from '../../../redux/slides/adminSlide';

const Admin_HeaderComponent = () => {
    const accountRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // get data admin from redux
    const dataAdmin_Redux = useSelector((state) => state.user);

    // state button edit profile and logout
    const [clickedButton, setClickedButton] = useState(false);

    // handle open button edit profile and logout
    const handleOpenButton = () => {
        setClickedButton(!clickedButton);
    };

    // handle logout admin
    const handleLogoutAdmin = () => {
        localStorage.removeItem('adminToken');
        dispatch(resetAllUser());
        dispatch(resetOrderDetail());
        dispatch(resetProduct());
        dispatch(resetOrder());
        navigate('/admin');
    };

    // useRef click outside button edit profile and logout --> close
    useEffect(() => {
        const handleClickOutButtonAccount = (event) => {
            if (accountRef.current && !accountRef.current.contains(event.target)) {
                setClickedButton(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutButtonAccount);
        return () => {
            document.removeEventListener('mousedown', handleClickOutButtonAccount);
        };
    }, []);

    return (
        <div className='w-full bg-[#001529] h-[10vh] flex items-center justify-center px-20 py-7'>
            {/* name website */}
            <div className='w-[20%] flex justify-start'>
                <Link to='/admin/dashboard' className='text-4xl font-bold text-white'>
                    Watc<span className='text-yellow-400 text-5xl'>H</span>es
                </Link>
            </div>

            {/* search */}
            <div className='w-[60%] flex-grow justify-center'>
                <input
                    type='text'
                    placeholder='Search...'
                    className='w-full h-10 px-5 text-lg rounded-md'
                />
            </div>

            {/* button: edit profile & logout */}
            <div className='w-[20%] flex justify-end relative' ref={accountRef}>
                {/* button */}
                <button
                    onClick={handleOpenButton}
                    className={`w-40 flex items-center gap-3 transition duration-200 border border-white cursor-pointer px-5 py-1 rounded-lg ${
                        dataAdmin_Redux?.admin ? 'bg-white text-black' : 'text-white'
                    }`}
                >
                    <img
                        src={
                            dataAdmin_Redux?.avatarImg
                                ? dataAdmin_Redux?.avatarImg
                                : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
                        }
                        alt='Image-User'
                        className='w-8 h-8 object-cover rounded-full'
                    />
                    <p className='pl-2 font-bold'>Admin</p>
                </button>

                {/* button edit profile and logout */}
                {clickedButton && (
                    <div className='absolute right-0 mt-12 w-40 bg-white rounded-lg shadow-lg'>
                        <Link onClick={() => setClickedButton(false)} to='/admin/profile'>
                            <button className='w-full text-lg font-medium py-2 px-3 hover:bg-[#001529] hover:text-white hover:rounded-t-lg'>
                                Trang cá nhân
                            </button>
                        </Link>
                        <div
                            onClick={() => {
                                handleLogoutAdmin();
                                setClickedButton(false);
                            }}
                        >
                            <button className='w-full text-lg font-medium py-2 px-3 hover:bg-[#001529] hover:text-white hover:rounded-b-lg'>
                                Đăng xuất
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin_HeaderComponent;
