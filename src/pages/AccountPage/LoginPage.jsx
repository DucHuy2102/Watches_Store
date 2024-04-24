import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as UserService from '../../services/UserService';
import { useMutationHook } from '../../hooks/useMutationHook';

const LoginPage = () => {
    const [error, setError] = useState('');
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const mutation = useMutationHook((data) => UserService.loginUser(data));
    const { data } = mutation;

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        mutation.mutate({ username, password });
    };

    return (
        <div className='w-full flex items-center justify-center px-20 py-5'>
            {/* form login */}
            <div className='flex flex-col justify-center items-start h-screen w-[80%]'>
                <form onSubmit={handleSubmitLogin}>
                    {/* name form */}
                    <h1 className='text-4xl font-bold text-center text-black mb-5'>Đăng nhập</h1>

                    {/* userName */}
                    <div className='mb-5 w-[45vw]'>
                        <label htmlFor='username' className='text-xl text-black'>
                            Tên đăng nhập
                        </label>
                        <input
                            autoFocus
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                            type='text'
                            id='username'
                            name='username'
                            className='w-full mt-1 px-3 py-2 border border-gray-300 rounded'
                            placeholder='Tên đăng nhập'
                        />
                    </div>

                    {/* password */}
                    <div className='mb-5'>
                        <label htmlFor='password' className='text-xl block text-black'>
                            Mật khẩu
                        </label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type='password'
                            id='password'
                            name='password'
                            className='w-full mt-1 px-3 py-2 border border-gray-300 rounded'
                            placeholder='Mật khẩu'
                        />
                    </div>

                    {/* button submit login */}
                    <div>
                        <button
                            type='submit'
                            className='w-full text-xl p-2 border bg-black text-white rounded hover:bg-white transition duration-300 hover:text-black hover:border-black'
                        >
                            Đăng nhập
                        </button>
                    </div>

                    {/* error message */}
                    {data?.code !== 200 && (
                        <p className='text-red-500 text-lg font-medium text-center mt-1'>{data?.message}</p>
                    )}
                </form>

                {/* Register */}
                <div className='mt-5 text-lg flex'>
                    <p>Bạn chưa có tài khoản để đăng nhập?</p>
                    <Link to='/register' className='pl-2 text-gray-500 hover:text-black hover:underline'>
                        Đăng ký ở đây
                    </Link>
                </div>

                {/* forgot password */}
                <div className='mt-1 text-lg hover:underline'>
                    <Link to='/forgotPassword'>Quên mật khẩu?</Link>
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

export default LoginPage;
