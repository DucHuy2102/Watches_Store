import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <div className='w-full flex items-center justify-center px-20 py-5'>
            {/* image */}
            <div className='w-[60%]'>
                <img
                    src='https://timex.com/cdn/shop/files/4812_TX_TC23_featured-collectionTW2W51400.jpg?v=1710247987&width=768'
                    alt=''
                    className='w-full h-screen object-cover'
                />
            </div>

            {/* form register */}
            <div className='flex flex-col justify-center items-end h-screen w-[80%] font-serif'>
                <form onSubmit={handleSubmit}>
                    {/* name form */}
                    <h1 className='text-4xl font-bold text-center text-black mb-5'>Sign up</h1>

                    {/* userName */}
                    <div className='mb-5 w-[45vw]'>
                        <label htmlFor='username' className='text-xl text-black'>
                            Username
                        </label>
                        <input
                            autoFocus
                            type='text'
                            id='username'
                            name='username'
                            className='w-full px-3 py-2 border border-gray-300 rounded'
                            placeholder='Enter your username'
                        />
                    </div>

                    {/* email */}
                    <div className='mb-5 w-[45vw]'>
                        <label htmlFor='email' className='text-xl text-black'>
                            Email
                        </label>
                        <input
                            type='text'
                            id='email'
                            name='email'
                            className='w-full px-3 py-2 border border-gray-300 rounded'
                            placeholder='Enter your email'
                        />
                    </div>

                    {/* password */}
                    <div className='mb-5'>
                        <label htmlFor='password' className='block text-black'>
                            Password
                        </label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            className='w-full p-2 border border-gray-300 rounded'
                            placeholder='Enter your password'
                        />
                    </div>

                    {/* button submit register */}
                    <div>
                        <button
                            type='submit'
                            className='w-full text-xl p-2 border bg-black text-white rounded hover:bg-white hover:text-black hover:border-black'
                        >
                            Submit
                        </button>
                    </div>
                </form>

                {/* Register */}
                <div className='mt-5 text-lg flex'>
                    <p>Already have an account?</p>
                    <Link to='/login' className='pl-2 text-gray-500 hover:text-black hover:underline'>
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
