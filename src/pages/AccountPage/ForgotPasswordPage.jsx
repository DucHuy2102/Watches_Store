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

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className='w-full flex items-center justify-between px-20 font-Lato'>
            {/* form login */}
            <div className='flex flex-col justify-center items-start h-screen'>
                <h1 className='mx-auto text-3xl font-bold text-black mb-5 font-PlayfairDisplay'>
                    Quên mật khẩu
                </h1>
                <Form
                    className='mx-auto w-[40vw] text-center'
                    layout='vertical'
                    name='basic'
                    onFinish={handleSubmit}
                    validateMessages={validateMessages}
                >
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

                    {/* error */}
                    {/* {isError && (
                        <div className='text-red-500 font-bold text-xl text-center mt-1 mb-5'>
                            <p>Hệ thống gửi email thất bại! Vui lòng truy cập sau 30 phút</p>
                        </div>
                    )} */}

                    {/* button login */}
                    <Form.Item>
                        <Button
                            className='w-full mt-5 h-10 font-PlayfairDisplay text-xl border bg-black text-white rounded hover:bg-white transition duration-300 hover:text-black hover:border-blue-400'
                            type='primary'
                            htmlType='submit'
                        >
                            Gửi thông tin
                        </Button>
                    </Form.Item>
                </Form>

                {/* Register */}
                <div className='text-lg flex'>
                    <p className='font-PlayfairDisplay'>
                        Bạn muốn quay về trang đăng nhập?
                    </p>
                    <Link
                        to='/register'
                        className='font-PlayfairDisplay text-lg pl-2 text-gray-400 hover:text-black font-bold transition duration-200'
                    >
                        Trang đăng nhập
                    </Link>
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
        </div>
    );
};

export default ForgotPasswordPage;
