import { Link } from 'react-router-dom';

const ReadMoreToBlogs = () => {
    return (
        <div className='h-44 flex justify-center items-center'>
            {/* image */}
            <img
                src='https://timex.com/cdn/shop/files/3831_TC23_blog_banner_desktop.jpg?v=1698135652&width=1440'
                alt=''
                className='relative w-full object-cover'
            />

            {/* text */}
            <div className='absolute text-white left-36'>
                <p className='text-left font-medium text-3xl'>Never Miss A Second</p>
                <p className='text-left text-xl'>Discover stories on our blog</p>
            </div>

            {/* read more: click to blogs */}
            <Link to='/blogs' className='absolute text-white right-16'>
                <button
                    type='button'
                    className='group inline-flex w-full items-center justify-center rounded-md bg-white px-6 py-4 text-lg font-semibold text-black transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800 hover:text-white'
                >
                    Read More
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='group-hover:ml-8 ml-4 h-6 w-6 transition-all'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        strokeWidth='2'
                    >
                        <path strokeLinecap='round' strokeLinejoin='round' d='M13 7l5 5m0 0l-5 5m5-5H6' />
                    </svg>
                </button>
            </Link>
        </div>
    );
};

export default ReadMoreToBlogs;
