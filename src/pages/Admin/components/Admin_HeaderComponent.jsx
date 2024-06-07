import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Admin_HeaderComponent = () => {
    // get data admin from redux
    const dataAdmin_Redux = useSelector((state) => state.user);

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

            {/* user */}
            <Link to='/admin/profile' className='w-[20%] flex justify-end'>
                <div
                    className={`flex items-center transition duration-200 border border-white cursor-pointer px-5 py-1 rounded-lg ${
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
                        className='w-8 h-8 rounded-full'
                    />
                    <p className='pl-2'>Admin</p>
                </div>
            </Link>
        </div>
    );
};

export default Admin_HeaderComponent;
