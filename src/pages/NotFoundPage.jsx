import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className='h-screen flex flex-col items-center justify-center'>
            <p className='text-[10rem] font-bold mb-3 text-transparent bg-gradient-to-r from-sky-500 to-red-500 bg-clip-text'>
                Oops!
            </p>
            <p className='uppercase text-xl font-bold mb-3'>404 - page not found</p>
            <p className='mb-3 text-lg'>
                The page you are looking for might have been removed had its name changed or it temporarily unavailable
            </p>
            <Link
                to='/'
                className='transition ease-in-out duration-300 hover:scale-110 hover:bg-blue-500 uppercase text-lg px-7 py-4 text-center rounded-xl bg-black text-white hover:border-none'
            >
                go to homepage
            </Link>
        </div>
    );
};

export default NotFoundPage;
