import React, { useEffect, useRef } from 'react';
import { Form, Input } from 'antd';
import { Link } from 'react-router-dom';

const Admin_LoginPage = () => {
    const inputTagRef = useRef(null);
    useEffect(() => {
        if (inputTagRef.current) {
            inputTagRef.current.focus();
        }
    }, []);

    return (
        <div className='bg-gray-200 w-screen h-screen flex flex-col justify-center items-center'>
            <h1 className='text-3xl mb-2 font-bold'>Chào mừng đến với trang</h1>
            <h1 className='h-14 text-4xl mb-5 font-bold text-transparent bg-gradient-to-r from-sky-500 to-red-500 bg-clip-text'>
                Quản lý hệ thống
            </h1>
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
                    <Input ref={inputTagRef} />
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
                    <button className='transition duration-300 mt-5 text-xl hover:bg-black hover:text-white border border-black w-full py-2 rounded-md'>
                        Đăng nhập
                    </button>
                </Form.Item>

                <Form.Item>
                    <p>
                        <span className='font-bold'>Trang chỉ dành cho những thành viên trong Ban quản trị</span>. Vui
                        lòng điền chính xác thông tin để thuận tiện cho việc quản lý và xử lý các tác vụ. Trường hợp
                        không phải là thành viên trong <span className='font-bold'>Ban quản trị</span>, vui lòng quay
                        lại
                        <Link to='/' className='italic pl-1'>
                            Trang chủ
                        </Link>
                        .
                    </p>
                </Form.Item>
            </Form>
        </div>
    );
};
export default Admin_LoginPage;
