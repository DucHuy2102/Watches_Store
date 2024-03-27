import { Link } from 'react-router-dom';
import { LoginOutlined, UserAddOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useState } from 'react';

const Header = () => {
    return (
        <nav className='w-full h-16 px-20 flex items-center flex-grow shadow-lg font-serif'>
            <div className=''>
                <Link to='/' className='text-3xl font-bold'>
                    Watc<span className='text-yellow-400 text-4xl'>H</span>es
                </Link>
            </div>

            {/* pages */}
            <div className='w-[20rem] flex items-center justify-center gap-2'>
                <Link to='/' className='text-lg hover:underline hover:text-xl'>
                    Home
                </Link>
                <Link to='/products' className='text-lg hover:underline hover:text-xl'>
                    Product
                </Link>
                <Link to='/about' className='text-lg hover:underline hover:text-xl'>
                    About
                </Link>
                <Link to='/contact' className='text-lg hover:underline hover:text-xl'>
                    Contact
                </Link>
            </div>

            {/* search */}
            <div className='w-[30rem] flex-grow mr-10'>
                <input
                    type='text'
                    placeholder='Search'
                    className='h-9 border text-xl border-gray-400 px-3 py-1 rounded-lg w-full'
                />
            </div>

            {/* login & register */}
            <div className='flex gap-2'>
                <Link to='/login' className={styleButton}>
                    <LoginOutlined className='pr-2' />
                    Login
                </Link>
                <Link to='/register' className={styleButton}>
                    <UserAddOutlined className='pr-2' />
                    Register
                </Link>
                <Link to='/order' className={styleButton}>
                    <ShoppingCartOutlined className='pr-2' />
                    Order
                </Link>
            </div>
        </nav>
    );
};

export default Header;

const styleButton = 'hover:bg-black hover:text-white px-2 py-1 text-center text-lg border border-gray-400 rounded-lg';
