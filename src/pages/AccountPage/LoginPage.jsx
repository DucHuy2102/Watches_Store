import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as UserService from '../../services/UserService';
import { useMutationHook } from '../../hooks/useMutationHook';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/slides/userSlide';

const LoginPage = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const mutation = useMutationHook((data) => UserService.loginUser(data));
    const { data } = mutation;

    useEffect(() => {
        const handleGetUserDetail = async (access_token) => {
            const res = await UserService.getUserDetail(access_token);
            dispatch(updateUser({ ...res?.data, access_token: access_token }));
        };

        if (data?.code === 200) {
            navigate('/');
            const access_token = data?.data?.token;
            localStorage.setItem('token', access_token);
            if (access_token) {
                const decode = jwtDecode(access_token);
                if (decode?.sub) {
                    handleGetUserDetail(access_token);
                }
            }
        }
    }, [data, navigate, dispatch]);

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        mutation.mutate({ username, password });
    };

    return (
        <div className='w-full flex items-center justify-center px-20'>
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
                            required
                            autoFocus
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                            type='text'
                            id='username'
                            name='username'
                            className='w-full mt-1 px-3 py-2 border border-gray-300 rounded'
                            placeholder='Tên đăng nhập'
                            onInvalid={(e) => {
                                e.target.setCustomValidity('Tên đăng nhập không được để trống.');
                                e.target.oninput = () => {
                                    e.target.setCustomValidity('');
                                };
                            }}
                        />
                    </div>

                    {/* password */}
                    <div className='mb-5'>
                        <label htmlFor='password' className='text-xl block text-black'>
                            Mật khẩu
                        </label>
                        <input
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type='password'
                            id='password'
                            name='password'
                            className='w-full mt-1 px-3 py-2 border border-gray-300 rounded'
                            placeholder='Mật khẩu'
                            onInvalid={(e) => {
                                e.target.setCustomValidity('Mật khẩu không được để trống.');
                                e.target.oninput = () => {
                                    e.target.setCustomValidity('');
                                };
                            }}
                        />
                    </div>

                    {/* error message */}
                    {data?.code !== 200 && (
                        <p className='text-red-500 text-lg text-center font-medium mt-1 mb-2'>{data?.message}</p>
                    )}

                    {/* button submit login */}
                    <div>
                        <button
                            type='submit'
                            className='w-full text-xl p-2 border bg-black text-white rounded hover:bg-white transition duration-300 hover:text-black hover:border-black'
                        >
                            Đăng nhập
                        </button>
                    </div>
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
