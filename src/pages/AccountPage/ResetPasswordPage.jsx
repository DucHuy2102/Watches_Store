import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Input, message } from 'antd';
import { useMutationHook } from '../../hooks/useMutationHook';
import * as UserService from '../../services/UserService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css';

// validate form
const validateMessages = {
    required: '${label} không được bỏ trống!',
    types: {
        email: '${label} không đúng định dạng!',
        number: '${label} chỉ chứa số!',
    },
};

const ResetPasswordPage = () => {
    const [codePassword, setCodePassword] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const navigate = useNavigate();

    // useMutationHook to call API reset password
    const mutation = useMutationHook((data) => UserService.resetPassword(data));

    // handle submit form
    const handleSubmit = () => {
        mutation.mutate(
            { token: codePassword, password: newPass },
            {
                onSuccess: () => {
                    toast.success('Đã đặt lại mật khẩu! Đang chuyển hướng...');
                    setTimeout(() => {
                        navigate('/login');
                    }, 3000);
                },
                onError: () => {
                    toast.error('Đặt lại mật khẩu thất bại!');
                },
            }
        );
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
                {/* title page */}
                <h1 className='mx-auto text-3xl font-bold text-black mb-2 font-PlayfairDisplay'>
                    Đặt lại mật khẩu
                </h1>

                {/* form */}
                <Form
                    className='mx-auto w-[40vw] text-center'
                    layout='vertical'
                    name='dependencies'
                    onFinish={handleSubmit}
                    validateMessages={validateMessages}
                >
                    {/* codePassword */}
                    <Form.Item
                        label={<label className='text-lg'>Mã code</label>}
                        name='codePassword'
                        rules={[
                            {
                                required: true,
                                message: 'Mã code không được bỏ trống!',
                            },
                        ]}
                        className='text-red-500 text-start mt-1 mb-8'
                    >
                        <Input
                            onChange={(e) => setCodePassword(e.target.value)}
                            className='w-full mt-1 px-3 py-2 border border-gray-300 rounded'
                        />
                    </Form.Item>

                    {/* newPass */}
                    <Form.Item
                        label={<label className='text-lg'>Mật khẩu</label>}
                        name='password'
                        rules={[
                            {
                                required: true,
                                message: 'Mật khẩu không được bỏ trống!',
                            },
                        ]}
                        className='text-red-500 text-start mt-1 mb-8'
                    >
                        <Input.Password
                            onChange={(e) => setNewPass(e.target.value)}
                            className='w-full mt-1 px-3 py-2 border border-gray-300 rounded'
                        />
                    </Form.Item>

                    {/* confirm password */}
                    <Form.Item
                        label={<label className='text-lg'>Xác nhận mật khẩu</label>}
                        name='confirmPassword'
                        dependencies={['password']}
                        rules={[
                            {
                                required: true,
                                message: 'Xác nhận mật khẩu không được bỏ trống!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Mật khẩu không giống nhau!'));
                                },
                            }),
                        ]}
                        className='text-red-500 text-start mt-1 mb-8'
                    >
                        <Input.Password
                            onChange={(e) => setConfirmPass(e.target.value)}
                            className='w-full mt-1 px-3 py-2 border border-gray-300 rounded'
                        />
                    </Form.Item>

                    {/* button register */}
                    <Form.Item>
                        <Button
                            className='w-full mt-2 h-10 font-PlayfairDisplay text-xl border bg-black text-white rounded hover:bg-white transition duration-300 hover:text-black hover:border-blue-400'
                            type='primary'
                            htmlType='submit'
                        >
                            Gửi yêu cầu
                        </Button>
                    </Form.Item>
                </Form>

                {/* navigate to login page */}
                <div className='text-lg flex font-PlayfairDisplay'>
                    <p>Bạn muốn quay về trang đăng nhập?</p>
                    <Link
                        to='/login'
                        className='font-PlayfairDisplay text-lg pl-2 text-gray-400 hover:text-black font-bold transition duration-200'
                    >
                        Trang đăng nhập
                    </Link>
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
        </div>
    );
};

export default ResetPasswordPage;
