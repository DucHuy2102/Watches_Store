import { useState } from 'react';
import * as UserService from '../../services/UserService';
import { Link, useNavigate, useNavigation } from 'react-router-dom';
import { useMutationHook } from '../../hooks/useMutationHook';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();

    const mutation = useMutationHook((data) => UserService.registerUser(data));
    const { data } = mutation;

    const handleSubmitRegister = (e) => {
        e.preventDefault();
        mutation.mutate({ email, phone, username, password });
        navigate('/login');
    };

    return (
        <div className='w-full flex items-center justify-center px-20'>
            {/* image */}
            <div className='w-[60%]'>
                <img
                    src='https://timex.com/cdn/shop/files/4812_TX_TC23_featured-collectionTW2W51400.jpg?v=1710247987&width=768'
                    alt=''
                    className='w-full h-screen object-cover'
                />
            </div>

            {/* form register */}
            <div className='flex flex-col justify-center items-end h-screen w-[80%] font-Lato'>
                <form onSubmit={handleSubmitRegister}>
                    {/* name form */}
                    <h1 className='text-4xl font-bold text-center text-black font-PlayfairDisplay'>
                        Đăng ký tài khoản
                    </h1>

                    {/* userName */}
                    <div className='mb-5 w-[45vw]'>
                        <label htmlFor='userName' className='text-xl text-black'>
                            Tên người dùng
                        </label>
                        <input
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                            autoFocus
                            type='text'
                            id='userName'
                            name='userName'
                            className='w-full px-3 py-2 border border-gray-300 rounded'
                            placeholder='Tên người dùng'
                            onInvalid={(e) => {
                                e.target.setCustomValidity('Tên người dùng không được để trống.');
                                e.target.oninput = () => {
                                    e.target.setCustomValidity('');
                                };
                            }}
                        />
                    </div>

                    {/* phone */}
                    <div className='mb-5 w-[45vw]'>
                        <label htmlFor='numberPhone' className='text-xl text-black'>
                            Số điện thoại
                        </label>
                        <input
                            value={phone}
                            onChange={(e) => {
                                const value = e.target.value;
                                const isValid = /^\d*$/.test(value);
                                if (!isValid) {
                                    if (value.length !== 10) {
                                        e.target.setCustomValidity('Số điện thoại phải có đúng 10 chữ số.');
                                    } else {
                                        e.target.setCustomValidity('Số điện thoại chỉ được chứa số.');
                                    }
                                } else {
                                    e.target.setCustomValidity('');
                                }
                                setPhone(value);
                            }}
                            required
                            type='text'
                            id='numberPhone'
                            name='numberPhone'
                            className='w-full px-3 py-2 border border-gray-300 rounded'
                            placeholder='Số điện thoại'
                            onInvalid={(e) => {
                                e.target.setCustomValidity('Số điện thoại không được để trống.');
                                e.target.oninput = () => {
                                    e.target.setCustomValidity('');
                                };
                            }}
                        />
                    </div>

                    {/* email */}
                    <div className='mb-5 w-[45vw]'>
                        <label htmlFor='email' className='text-xl text-black'>
                            Email
                        </label>
                        <input
                            value={email}
                            onChange={(e) => {
                                const value = e.target.value;
                                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                if (!emailRegex.test(value)) {
                                    e.target.setCustomValidity('Email không hợp lệ.');
                                } else {
                                    e.target.setCustomValidity('');
                                }
                                setEmail(value);
                            }}
                            required
                            type='text'
                            id='email'
                            name='email'
                            className='w-full px-3 py-2 border border-gray-300 rounded'
                            placeholder='Email'
                            onInvalid={(e) => {
                                if (!e.target.validity.valid) {
                                    e.target.setCustomValidity('Email không hợp lệ.');
                                }
                                e.target.oninput = () => {
                                    e.target.setCustomValidity('');
                                };
                            }}
                        />
                    </div>

                    {/* password */}
                    <div className='mb-5'>
                        <label htmlFor='password' className='text-xl block text-black'>
                            Mật khẩu
                        </label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            type='password'
                            id='password'
                            name='password'
                            className='w-full p-2 border border-gray-300 rounded'
                            placeholder='Nhập mật khẩu'
                            onInvalid={(e) => {
                                e.target.setCustomValidity('Mật khẩu không được để trống.');
                                e.target.oninput = () => {
                                    e.target.setCustomValidity('');
                                };
                            }}
                        />
                    </div>

                    {/* confirm password */}
                    <div className='mb-5'>
                        <label htmlFor='confirmPassword' className='text-xl block text-black'>
                            Xác thực mật khẩu
                        </label>
                        <input
                            value={confirmPassword}
                            onChange={(e) => {
                                const valueConfirmPassword = e.target.value;
                                setConfirmPassword(valueConfirmPassword);
                                if (valueConfirmPassword !== password) {
                                    e.target.setCustomValidity('Mật khẩu không khớp.');
                                } else {
                                    e.target.setCustomValidity('');
                                }
                            }}
                            required
                            type='password'
                            id='confirmPassword'
                            name='confirmPassword'
                            className='w-full p-2 border border-gray-300 rounded'
                            placeholder='Nhập mật khẩu lần nữa'
                            onInvalid={(e) => {
                                e.target.setCustomValidity('Nhập lại mật khẩu không được để trống.');
                                e.target.oninput = () => {
                                    e.target.setCustomValidity('');
                                };
                            }}
                        />
                    </div>

                    {/* button submit register */}
                    <div>
                        <button
                            type='submit'
                            className='font-PlayfairDisplay w-full text-2xl p-2 border bg-black text-white rounded transition duration-300 hover:bg-white hover:text-black hover:border-black'
                        >
                            Đăng ký tài khoản
                        </button>
                    </div>

                    {/* error message */}
                    {data?.code !== 200 && (
                        <p className='text-red-500 text-lg font-medium text-center mt-1'>{data?.message}</p>
                    )}
                </form>

                {/* Register */}
                <div className='mt-2 text-lg flex font-PlayfairDisplay'>
                    <p>Bạn đã có tài khoản?</p>
                    <Link to='/login' className='pl-2 text-gray-500 hover:text-black hover:font-bold hover:underline'>
                        Đăng nhập
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
