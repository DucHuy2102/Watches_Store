import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Input, message } from 'antd';

// validate form
const validateMessages = {
    required: '${label} không được bỏ trống!',
    types: {
        email: '${label} không đúng định dạng!',
        number: '${label} chỉ chứa số!',
    },
};

const ResetPasswordPage = () => {
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
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
                <h1 className='mx-auto text-3xl font-bold text-black mb-2 font-PlayfairDisplay'>
                    Đặt lại mật khẩu
                </h1>
                <Form
                    className='mx-auto w-[40vw] text-center'
                    layout='vertical'
                    name='basic'
                    onFinish={handleSubmit}
                    validateMessages={validateMessages}
                >
                    {/* newPass */}
                    <Form.Item
                        label={<label className='text-lg'>Mật khẩu mới</label>}
                        name='Mật khẩu mới'
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        className='text-red-500 text-start mt-1 mb-8'
                    >
                        <Input
                            onChange={(e) => setNewPass(e.target.value)}
                            className='w-full mt-1 px-3 py-2 border border-gray-300 rounded'
                        />
                    </Form.Item>

                    {/* username */}
                    <Form.Item
                        label={
                            <label className='text-lg'>Xác nhận mật khẩu</label>
                        }
                        name='Xác nhận mật khẩu'
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        className='text-red-500 text-start mt-1 mb-8'
                    >
                        <Input
                            onChange={(e) => setConfirmPass(e.target.value)}
                            className='w-full mt-1 px-3 py-2 border border-gray-300 rounded'
                        />
                    </Form.Item>

                    {/* error */}
                    {/* {isError && (
                        <div className='text-red-500 font-bold text-xl text-center mt-1 mb-5'>
                            <p>Đăng nhập thất bại!</p>
                        </div>
                    )} */}

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

                {/* Register */}
                <div className='text-lg flex font-PlayfairDisplay'>
                    <p>Bạn muốn quay về trang đăng nhập?</p>
                    <Link
                        to='/login'
                        className='font-PlayfairDisplay text-lg pl-2 text-gray-400 hover:text-black font-bold transition duration-200'
                    >
                        Trang đăng nhập
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
