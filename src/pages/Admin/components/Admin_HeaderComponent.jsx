import { Link } from 'react-router-dom';

const Admin_HeaderComponent = () => {
    return (
        <div className='w-full h-14 flex items-center justify-center px-20 py-7'>
            {/* name website */}
            <div className='w-[20%] flex justify-start'>
                <Link to='/admin/dashboard' className='text-4xl font-bold text-white'>
                    Watc<span className='text-yellow-400 text-5xl'>H</span>es
                </Link>
            </div>

            {/* search */}
            <div className='w-[60%] flex-grow justify-center'>
                <input type='text' placeholder='Search...' className='w-full h-10 px-5 text-lg rounded-md' />
            </div>

            {/* user */}
            <div className='w-[20%] flex justify-end'>
                <div className='flex items-center text-white transition duration-200 border border-white hover:cursor-pointer hover:bg-white hover:text-black px-5 py-1 rounded-lg'>
                    <img
                        src='https://cdn-icons-png.flaticon.com/512/149/149071.png'
                        alt='user'
                        className='w-8 h-8 rounded-full'
                    />
                    <p className='pl-2'>Admin</p>
                </div>
            </div>
        </div>
    );
};

export default Admin_HeaderComponent;
