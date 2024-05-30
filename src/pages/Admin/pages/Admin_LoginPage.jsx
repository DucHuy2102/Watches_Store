import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useMutationHook } from '../../../hooks/useMutationHook';
import * as UserService from '../../../services/UserService';
import { useDispatch } from 'react-redux';
import { updateAdmin } from '../../../redux/slides/adminSlide';
import { jwtDecode } from 'jwt-decode';

const Admin_LoginPage = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const inputTagRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // autoFocus on input tag
    useEffect(() => {
        if (inputTagRef.current) {
            inputTagRef.current.focus();
        }
    }, []);

    // logic login
    const mutation = useMutationHook((data) => UserService.loginUser(data));
    const { data } = mutation;
    useEffect(() => {
        const handleGetAdminDetail = async (access_token) => {
            const res = await UserService.getUserDetail(access_token);
            dispatch(updateAdmin({ ...res?.data, access_token: access_token }));
        };

        if (data?.code === 200) {
            navigate('/admin/dashboard');
            const access_token = data?.data?.token;
            localStorage.setItem('adminToken', access_token);
            if (access_token) {
                const decode = jwtDecode(access_token);
                if (decode?.sub) {
                    handleGetAdminDetail(access_token);
                }
            }
        }
    }, [data, dispatch, navigate]);

    const handleSubmitLogin = () => {
        mutation.mutate(
            { username, password },
            {
                onError: () => {
                    message.error(
                        'Tên đăng nhập hoặc mật khẩu không chính xác!'
                    );
                },
                onSuccess: () => {
                    message.success('Đăng nhập thành công!');
                },
            }
        );
    };

    return (
        <div className='bg-gray-200 w-screen h-screen flex flex-col justify-center items-center'>
            <h1 className='text-3xl mb-2 font-bold'>Chào mừng đến với trang</h1>
            <h1 className='h-14 text-4xl mb-5 font-bold text-transparent bg-gradient-to-r from-sky-500 to-red-500 bg-clip-text'>
                Quản lý hệ thống
            </h1>
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
                            Trang chỉ dành cho những thành viên trong Ban quản
                            trị
                        </span>
                        . Vui lòng điền chính xác thông tin để thuận tiện cho
                        việc quản lý và xử lý các tác vụ. Trường hợp không phải
                        là thành viên trong{' '}
                        <span className='font-bold'>Ban quản trị</span>, vui
                        lòng quay lại
                        <Link to='/' className='italic pl-1'>
                            Trang chủ
                        </Link>
                    </p>
                </Form.Item>
            </Form>
        </div>
    );
};
export default Admin_LoginPage;
