import { useState } from 'react';
import * as UserService from '../../services/UserService';
import { Link, useNavigate, useNavigation } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import { useMutationHook } from '../../hooks/useMutationHook';

const validateMessages = {
    required: '${label} không được bỏ trống!',
    types: {
        email: '${label} không đúng định dạng!',
        number: '${label} chỉ chứa số!',
    },
};

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    console.log(email, phone, username, password, confirmPassword);

    const navigate = useNavigate();

    const mutation = useMutationHook((data) => UserService.registerUser(data));
    const { data } = mutation;

    const handleSubmitRegister = () => {
        mutation.mutate({ email, phone, username, password });
        navigate('/login');
    };

    return (
        <div className='w-full flex items-center justify-between px-20'>
            {/* image */}
            <div className='w-[50%]'>
                <img
                    src='https://timex.com/cdn/shop/files/4812_TX_TC23_featured-collectionTW2W51400.jpg?v=1710247987&width=768'
                    alt=''
                    className='w-full h-screen object-cover'
                />
            </div>

            {/* form register */}
            <div className='flex flex-col justify-center items-end h-screen'>
                <h1 className='mx-auto text-3xl font-bold text-black mb-2 font-PlayfairDisplay'>Đăng ký tài khoản</h1>
                <Form
                    className='mx-auto w-[40vw] text-center'
                    layout='vertical'
                    name='basic'
                    onFinish={handleSubmitRegister}
                    validateMessages={validateMessages}
                >
                    {/* username */}
                    <Form.Item
                        label={<label className='text-lg'>Tên người dùng</label>}
                        name='Tên người dùng'
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        className='text-red-500 text-start mt-1 mb-5'
                    >
                        <Input
                            onChange={(e) => setUserName(e.target.value)}
                            className='w-full mt-1 px-3 py-2 border border-gray-300 rounded'
                        />
                    </Form.Item>

                    {/* phone */}
                    <Form.Item
                        label={<label className='text-lg'>Số điện thoại</label>}
                        name='Số điện thoại'
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        className='text-red-500 text-start mt-1 mb-5'
                    >
                        <Input
                            onChange={(e) => setPhone(e.target.value)}
                            className='w-full mt-1 px-3 py-2 border border-gray-300 rounded'
                        />
                    </Form.Item>

                    {/* email */}
                    <Form.Item
                        label={<label className='text-lg'>Email liên hệ</label>}
                        name='Email liên hệ'
                        rules={[
                            {
                                required: true,
                                type: 'email',
                            },
                        ]}
                        className='text-red-500 text-start mt-1 mb-5'
                    >
                        <Input
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full mt-1 px-3 py-2 border border-gray-300 rounded'
                        />
                    </Form.Item>

                    {/* password */}
                    <Form.Item
                        label={<label className='text-lg'>Mật khẩu</label>}
                        name='Mật khẩu'
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        className='text-red-500 text-start mt-1 mb-5'
                    >
                        <Input.Password
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-full mt-1 px-3 py-2 border border-gray-300 rounded'
                        />
                    </Form.Item>

                    {/* confirm password */}
                    <Form.Item
                        label={<label className='text-lg'>Xác thực mật khẩu</label>}
                        name='Xác thực mật khẩu'
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        className='text-red-500 text-start mt-1 mb-5'
                    >
                        <Input.Password
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className='w-full mt-1 px-3 py-2 border border-gray-300 rounded'
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            className='w-full mt-2 h-10 font-PlayfairDisplay text-xl border bg-black text-white rounded hover:bg-white transition duration-300 hover:text-black hover:border-blue-400'
                            type='primary'
                            htmlType='submit'
                        >
                            Đăng ký
                        </Button>
                    </Form.Item>
                </Form>

                {/* Register */}
                <div className='text-lg flex font-PlayfairDisplay'>
                    <p>Bạn đã có tài khoản?</p>
                    <Link
                        to='/login'
                        className='font-PlayfairDisplay text-lg pl-2 text-gray-400 hover:text-black font-bold transition duration-200'
                    >
                        Đăng nhập
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
