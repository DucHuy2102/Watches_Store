import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as UserService from '../../services/UserService';
import { useMutationHook } from '../../hooks/useMutationHook';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/slides/userSlide';
import { Button, Form, Input } from 'antd';
import * as ProductService from '../../services/ProductService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import { updateOrderItems } from '../../redux/slides/orderSlide';

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // autoFocus on input tag
    const inputTagRef = useRef(null);
    useEffect(() => {
        if (inputTagRef.current) {
            inputTagRef.current.focus();
        }
    }, []);

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    // useMutationHook to login user
    const mutation = useMutationHook((data) => UserService.loginUser(data));
    const { data } = mutation;

    // handle submit login
    const handleSubmitLogin = () => {
        mutation.mutate(
            { username, password },
            {
                onSuccess: () => {
                    toast.success('Đăng nhập thành công!');
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

    // get user detail after login success
    useEffect(() => {
        // handle get user detail
        const handleGetUserDetail = async (token) => {
            const res = await UserService.getUserDetail(token);
            dispatch(updateUser({ ...res?.data }));
        };

        // handle load orders by user id
        const handleGetOrderUser = async () => {
            const tokenUser = localStorage.getItem('tokenUser');
            const response = await ProductService.getOrdersByUserId(tokenUser);
            const ordersData = response?.data;

            // dispatch ordersData to redux
            dispatch(updateOrderItems({ data: ordersData, isBuyNow: false }));
        };

        if (data?.code === 200) {
            const token = data?.data?.token;
            localStorage.setItem('tokenUser', token);
            if (token) {
                const decode = jwtDecode(token);
                if (decode?.sub) {
                    handleGetOrderUser();
                    handleGetUserDetail(token);
                }
            }
        }
    }, [data, dispatch]);

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
                        label={
                            <label className='text-lg font-PlayfairDisplay'>Tên đăng nhập</label>
                        }
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
                            ref={inputTagRef}
                            onChange={(e) => setUserName(e.target.value)}
                            className='w-full mt-1 px-3 py-2 border border-gray-300 rounded'
                        />
                    </Form.Item>

                    {/* password */}
                    <Form.Item
                        label={<label className='text-lg font-PlayfairDisplay'>Mật khẩu</label>}
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
                autoClose={2000}
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
