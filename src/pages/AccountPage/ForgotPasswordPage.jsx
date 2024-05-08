import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPasswordPage = () => {
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <div className='w-full flex items-center justify-center px-20 py-5'>
            {/* form login */}
            <div className='flex flex-col justify-center items-start h-screen w-[80%] font-Lato'>
                <form onSubmit={handleSubmit}>
                    {/* name form */}
                    <h1 className='text-4xl font-bold text-center text-black mb-5 font-PlayfairDisplay'>
                        Quên mật khẩu
                    </h1>

                    {/* email */}
                    <div className='mb-5 w-[45vw]'>
                        <label htmlFor='email' className='block text-black text-xl'>
                            Email
                        </label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            className='w-full p-2 border border-gray-300 rounded'
                            placeholder='Nhập email liên hệ'
                        />
                    </div>

                    {/* button submit forget password */}
                    <div>
                        <button
                            type='submit'
                            className='w-full font-PlayfairDisplay text-2xl p-2 border bg-black text-white rounded hover:bg-white hover:text-black hover:border-black'
                        >
                            Gửi thông tin
                        </button>
                    </div>
                </form>

                {/* comeback to login page */}
                <div className='mt-4 text-lg'>
                    Quay lại
                    <Link to='/login'>
                        <span className='hover:underline pl-1 font-PlayfairDisplay text-xl hover:font-bold'>
                            Trang đăng nhập
                        </span>
                    </Link>
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

export default ForgotPasswordPage;
