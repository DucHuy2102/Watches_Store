import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <div className='w-full flex items-center justify-center px-20'>
            {/* image */}
            <div className='w-[60%]'>
                <img
                    src='https://timex.com/cdn/shop/files/4812_TX_TC23_featured-collectionTW2W51400.jpg?v=1710247987&width=768'
                    alt=''
                    className='w-full h-screen object-cover'
                />
            </div>

            {/* form register */}
            <div className='flex flex-col justify-center items-end h-screen w-[80%]'>
                <form onSubmit={handleSubmit}>
                    {/* name form */}
                    <h1 className='text-4xl font-bold text-center text-black'>Đăng ký tài khoản</h1>

                    {/* userName */}
                    <div className='mb-5 w-[45vw]'>
                        <label htmlFor='username' className='text-xl text-black'>
                            Tên người dùng
                        </label>
                        <input
                            autoFocus
                            type='text'
                            id='username'
                            name='username'
                            className='w-full px-3 py-2 border border-gray-300 rounded'
                            placeholder='VD: huynd...'
                        />
                    </div>

                    {/* phone */}
                    <div className='mb-5 w-[45vw]'>
                        <label htmlFor='username' className='text-xl text-black'>
                            Số điện thoại
                        </label>
                        <input
                            autoFocus
                            type='text'
                            id='username'
                            name='username'
                            className='w-full px-3 py-2 border border-gray-300 rounded'
                            placeholder='VD: 0123456789'
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
                            placeholder='VD: huynd@gmail.com'
                        />
                    </div>

                    {/* password */}
                    <div className='mb-5'>
                        <label htmlFor='password' className='text-xl block text-black'>
                            Mật khẩu
                        </label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            className='w-full p-2 border border-gray-300 rounded'
                            placeholder='VD: 123@456...'
                        />
                    </div>

                    {/* confirm password */}
                    <div className='mb-5'>
                        <label htmlFor='password' className='text-xl block text-black'>
                            Xác thực mật khẩu
                        </label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            className='w-full p-2 border border-gray-300 rounded'
                            placeholder='Nhập mật khẩu lần nữa'
                        />
                    </div>

                    {/* gender */}
                    <div className='mb-5 flex justify-start items-center gap-5'>
                        <p>Giới tính:</p>
                        <label className='flex justify-start items-center gap-1'>
                            <input type='radio' name='gender' value='male' checked />
                            Nam
                        </label>
                        <label className='flex justify-start items-center gap-1'>
                            <input type='radio' name='gender' value='female' />
                            Nữ
                        </label>
                        <label className='flex justify-start items-center gap-1'>
                            <input type='radio' name='gender' value='others' />
                            Không trả lời
                        </label>
                    </div>

                    {/* agree terms */}
                    <div className='mb-5 flex justify-start items-center gap-5'>
                        <label className='flex justify-start items-center gap-1'>
                            <input type='checkbox' name='agree' />I have read and agreed to the
                            <span className='text-blue-500 font-bold hover:cursor-pointer'>Terms and Conditions</span>
                        </label>
                    </div>

                    {/* button submit register */}
                    <div>
                        <button
                            type='submit'
                            className='w-full text-xl p-2 border bg-black text-white rounded hover:bg-white hover:text-black hover:border-black'
                        >
                            Đăng ký tài khoản
                        </button>
                    </div>
                </form>

                {/* Register */}
                <div className='mt-2 text-lg flex'>
                    <p>Bạn đã có tài khoản?</p>
                    <Link to='/login' className='pl-2 text-gray-500 hover:text-black hover:underline'>
                        Đăng nhập
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
