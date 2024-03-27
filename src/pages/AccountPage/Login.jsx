import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <div className='w-full flex items-center justify-center px-20 py-5'>
            {/* form login */}
            <div className='flex flex-col justify-center items-start h-screen w-[80%] font-serif'>
                <form onSubmit={handleSubmit}>
                    {/* name form */}
                    <h1 className='text-4xl font-bold text-center text-black mb-5'>Login</h1>

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

                    {/* button submit login */}
                    <div>
                        <button
                            type='submit'
                            className='w-full text-xl p-2 border bg-black text-white rounded hover:bg-white hover:text-black hover:border-black'
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                {/* Register */}
                <div className='mt-5 text-lg flex'>
                    <p>If you new here?</p>
                    <Link to='/register' className='pl-2 text-gray-500 hover:text-black hover:underline'>
                        Register
                    </Link>
                </div>

                {/* forgot password */}
                <div className='mt-1 text-lg hover:underline'>
                    <Link to='/forgotPassword'>Forgot your password?</Link>
                </div>
            </div>

            {/* image */}
            <div className='w-[60%]'>
                <img
                    src='https://timex.com/cdn/shop/files/02617_WB23_July_alt_lifestyle_featured_image_TW2V49700_5bdba602-5733-4fb1-83ad-8297308ef20b.jpg?v=1689775668&width=990'
                    alt=''
                    className='w-full h-screen object-cover'
                />
            </div>
        </div>
    );
};

export default Login;
