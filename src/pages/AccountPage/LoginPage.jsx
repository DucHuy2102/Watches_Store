import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as UserService from '../../services/UserService';
import { useMutationHook } from '../../hooks/useMutationHook';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/slides/userSlide';
import { Button, Form, Input } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css';

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    // useMutationHook to login user
    const mutation = useMutationHook((data) => UserService.loginUser(data));
    const { data } = mutation;

    // get user detail after login success
    useEffect(() => {
        const handleGetUserDetail = async (access_token) => {
            const res = await UserService.getUserDetail(access_token);
            dispatch(updateUser({ ...res?.data, access_token: access_token }));
        };

        if (data?.code === 200) {
            const access_token = data?.data?.token;
            localStorage.setItem('tokenUser', access_token);
            if (access_token) {
                const decode = jwtDecode(access_token);
                if (decode?.sub) {
                    handleGetUserDetail(access_token);
                }
            }
        }
    }, [data, navigate, dispatch]);

    // handle submit login
    const handleSubmitLogin = () => {
        mutation.mutate(
            { username, password },
            {
                onSuccess: () => {
                    toast.success('Đăng nhập thành công! Đang chuyển hướng...');
                    setTimeout(() => {
                        navigate('/');
                    }, 3000);
                },
                onError: () => {
                    toast.error('Đăng nhập thất bại!');
                },
            }
        );
    };

    return (
        <div className='w-full flex items-center justify-between px-20 font-Lato'>
            {/* form login */}
            <div className='flex flex-col justify-center items-start h-screen'>
                {/* title page */}
                <h1 className='mx-auto text-3xl font-bold text-black mb-5 font-PlayfairDisplay'>
                    Đăng nhập
                </h1>

                {/* form */}
                <Form
                    className='mx-auto w-[40vw] text-center'
                    layout='vertical'
                    name='basic'
                    onFinish={handleSubmitLogin}
                >
                    {/* username */}
                    <Form.Item
                        label={<label className='text-lg'>Tên đăng nhập</label>}
                        name='username'
                        rules={[
                            {
                                required: true,
                                message: 'Tên đăng nhập không được bỏ trống!',
                            },
                        ]}
                        className='text-start mt-1 mb-8'
                    >
                        <Input
                            onChange={(e) => setUserName(e.target.value)}
                            className='w-full mt-1 px-3 py-2 border border-gray-300 rounded'
                        />
                    </Form.Item>

                    {/* password */}
                    <Form.Item
                        label={<label className='text-lg'>Mật khẩu</label>}
                        name='password'
                        rules={[
                            {
                                required: true,
                                message: 'Mật khẩu không được bỏ trống!',
                            },
                        ]}
                        className='text-start mt-1 mb-8'
                    >
                        <Input.Password
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-full mt-1 px-3 py-2 border border-gray-300 rounded'
                        />
                    </Form.Item>

                    {/* button login */}
                    <Form.Item>
                        <Button
                            className='w-full h-10 font-PlayfairDisplay text-xl border bg-black text-white rounded hover:bg-white transition duration-300 hover:text-black hover:border-blue-400'
                            type='primary'
                            htmlType='submit'
                        >
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>

                {/* Register */}
                <div className='text-lg flex'>
                    <p className='font-PlayfairDisplay'>Bạn chưa có tài khoản để đăng nhập?</p>
                    <Link
                        to='/register'
                        className='font-PlayfairDisplay text-lg pl-2 text-gray-400 hover:text-black font-bold transition duration-200'
                    >
                        Đăng ký ở đây
                    </Link>
                </div>

                {/* forgot password */}
                <div className='font-PlayfairDisplay text-lg text-gray-400 hover:text-black font-bold transition duration-200'>
                    <Link to='/forgotPassword'>Quên mật khẩu?</Link>
                </div>
            </div>

            {/* image */}
            <div className='w-[50%]'>
                <img
                    src='https://timex.com/cdn/shop/files/02617_WB23_July_alt_lifestyle_featured_image_TW2V49700_5bdba602-5733-4fb1-83ad-8297308ef20b.jpg?v=1689775668&width=990'
                    alt=''
                    className='w-full h-screen object-cover'
                />
            </div>

            {/* toast */}
            <ToastContainer
                position='top-right'
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default LoginPage;
