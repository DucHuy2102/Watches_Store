import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
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
                    <h1 className='text-4xl font-bold text-center text-black mb-5'>Forget Password</h1>

                    {/* email */}
                    <div className='mb-5 w-[45vw]'>
                        <label htmlFor='email' className='block text-black'>
                            Email
                        </label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            className='w-full p-2 border border-gray-300 rounded'
                            placeholder='Enter your email'
                        />
                    </div>

                    {/* button submit forget password */}
                    <div>
                        <button
                            type='submit'
                            className='w-full text-xl p-2 border bg-black text-white rounded hover:bg-white hover:text-black hover:border-black'
                        >
                            Submit
                        </button>
                    </div>
                </form>

                {/* comeback to login page */}
                <div className='mt-4 text-lg hover:underline'>
                    <Link to='/login'>Cancel Reset Password</Link>
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

export default ForgotPassword;
