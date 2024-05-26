import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Admin_HeaderComponent = () => {
    // get data admin from redux
    const dataAdmin_Redux = useSelector((state) => state.admin);

    return (
        <div className='w-full bg-[#001529] h-[10vh] flex items-center justify-center px-20 py-7'>
            {/* name website */}
            <div className='w-[20%] flex justify-start'>
                <Link
                    to='/admin/dashboard'
                    className='text-4xl font-bold text-white'
                >
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
                    className={
                        dataAdmin_Redux
                            ? 'flex items-center text-black transition duration-200 border border-white hover:cursor-pointer hover:bg-white hover:text-black px-5 py-1 rounded-lg bg-white'
                            : 'flex items-center text-white transition duration-200 border border-white hover:cursor-pointer hover:bg-white hover:text-black px-5 py-1 rounded-lg'
                    }
                >
                    <img
                        src={
                            dataAdmin_Redux?.avatarImg
                                ? dataAdmin_Redux?.avatarImg
                                : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
                        }
                        alt='user'
                        className='w-8 h-8 rounded-full'
                    />
                    <p className='pl-2'>Admin</p>
                </div>
            </Link>
        </div>
    );
};

export default Admin_HeaderComponent;
