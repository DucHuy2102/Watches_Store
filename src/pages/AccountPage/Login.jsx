import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [error, setError] = useState('');

    const handleSubmit = (e) => {};
    return (
        <div>
            <div className='w-full flex justify-center items-center h-[80vh] '>
                <form
                    onSubmit={handleSubmit}
                    className='flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]'
                >
                    <h1 className='text-2xl font-bold text-left'>Log in to your account</h1>

                    {/* email */}
                    <input
                        className='w-full px-4 py-2 border-2 border-black outline-0'
                        type='text'
                        placeholder='Enter your email'
                    />

                    {/* password */}
                    <input
                        className='w-full px-4 py-2 border-2 border-black outline-0'
                        type='password'
                        placeholder='Enter your password'
                    />

                    {/* button login */}
                    <button
                        type='submit'
                        className='w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black '
                    >
                        Log in
                    </button>
                    {error && <h3 className='text-red-500 text-sm '>Something went wrong</h3>}
                    <div className='flex justify-center items-center space-x-3'>
                        <p>New here?</p>
                        <p className='text-gray-500 hover:text-black'>
                            <Link to='/register'>Register</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
