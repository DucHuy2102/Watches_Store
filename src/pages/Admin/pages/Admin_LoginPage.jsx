import React, { useEffect, useRef, useState } from 'react';
import { Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useMutationHook } from '../../../hooks/useMutationHook';
import * as UserService from '../../../services/UserService';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../../redux/slides/userSlide';
import { jwtDecode } from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css';

const Admin_LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const inputTagRef = useRef(null);

    // state username and password
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    // autoFocus on input tag
    useEffect(() => {
        if (inputTagRef.current) {
            inputTagRef.current.focus();
        }
    }, []);

    // logic login admin and get data admin
    const mutation = useMutationHook((data) => UserService.loginUser(data));
    const { data } = mutation;

    // handle submit login and navigate to dashboard
    const handleSubmitLogin = () => {
        mutation.mutate(
            { username, password },
            {
                onSuccess: () => {
                    toast.success('Đăng nhập thành công! Đang chuyển hướng...');
                    setTimeout(() => {
                        navigate('/admin/dashboard');
                    }, 3000);
                },
                onError: () => {
                    toast.error('Đăng nhập thất bại!');
                },
            }
        );
    };

    useEffect(() => {
        const handleGetAdminDetail = async (access_token) => {
            const res = await UserService.getUserDetail(access_token);
            dispatch(updateUser({ ...res?.data, access_token: access_token }));
        };

        const fetchAPI = () => {
            if (data?.code === 200) {
                const access_token = data?.data?.token;
                localStorage.setItem('adminToken', access_token);
                if (access_token) {
                    const decode = jwtDecode(access_token);
                    if (decode?.sub) {
                        handleGetAdminDetail(access_token);
                    }
                }
            }
        };
        fetchAPI();
    }, [data, dispatch]);

    return (
        <div className='bg-gray-200 w-screen h-screen flex flex-col justify-center items-center'>
            {/* title page */}
            <h1 className='text-3xl mb-2 font-bold'>Chào mừng đến với trang</h1>
            <h1 className='h-14 text-4xl mb-5 font-bold text-transparent bg-gradient-to-r from-sky-500 to-red-500 bg-clip-text'>
                Quản lý hệ thống
            </h1>

            {/* form */}
            <Form
                onFinish={handleSubmitLogin}
                className='bg-gray-100 w-[30vw] py-10 px-10 rounded-md'
            >
                {/* username */}
                <Form.Item
                    className='mt-5'
                    label='Tên đăng nhập'
                    name='username'
                    rules={[
                        {
                            required: true,
                            message: 'Bạn phải điền tên đăng nhập!',
                        },
                    ]}
                >
                    <Input
                        ref={inputTagRef}
                        name='username'
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </Form.Item>

                {/* password */}
                <Form.Item
                    label='Mật khẩu'
                    name='password'
                    rules={[
                        {
                            required: true,
                            message: 'Bạn phải điền mật khẩu!',
                        },
                    ]}
                >
                    <Input.Password
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Item>

                {/* button submit */}
                <Form.Item>
                    <button className='transition duration-300 mt-5 text-xl hover:bg-black hover:text-white border border-black w-full py-2 rounded-md'>
                        Đăng nhập
                    </button>
                </Form.Item>

                {/* note */}
                <Form.Item>
                    <p>
                        <span className='font-bold'>
                            Trang chỉ dành cho những thành viên trong Ban quản trị
                        </span>
                        . Vui lòng điền chính xác thông tin để thuận tiện cho việc quản lý và xử lý
                        các tác vụ. Trường hợp không phải là thành viên trong{' '}
                        <span className='font-bold'>Ban quản trị</span>, vui lòng quay lại
                        <Link to='/' className='italic pl-1'>
                            Trang chủ
                        </Link>
                    </p>
                </Form.Item>
            </Form>

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
export default Admin_LoginPage;
