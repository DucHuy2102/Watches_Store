import React from 'react';
import { Form, Input } from 'antd';
import { Link } from 'react-router-dom';

const Login_AdminPage = () => (
    <div className='bg-gray-200 w-screen h-screen flex flex-col justify-center items-center'>
        <h1 className='text-4xl mb-10 font-bold'>Chào mừng đến với trang hệ thống</h1>
        <Form className='bg-gray-100 w-[30vw] h-[45vh] py-10 px-10 rounded-md'>
            <Form.Item
                label='Tên đăng nhập'
                name='username'
                rules={[
                    {
                        required: true,
                        message: 'Bạn phải điền tên đăng nhập!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

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
                <Input.Password />
            </Form.Item>

            <Form.Item>
                <button className='mt-5 text-xl hover:bg-black hover:text-white border border-black w-full py-2 rounded-md'>
                    Đăng nhập
                </button>
            </Form.Item>

            <Form.Item>
                <p>
                    Trang dành cho những thành viên trong Ban quản trị hệ thống. Vui lòng điền chính xác thông tin để
                    thuận tiện cho việc quản lý hệ thống. Nếu bạn không phải là thành viên của Ban quản trị, vui lòng
                    quay lại
                    <Link to='/' className='italic pl-1'>
                        Trang chủ
                    </Link>
                    .
                </p>
            </Form.Item>
        </Form>
    </div>
);
export default Login_AdminPage;
