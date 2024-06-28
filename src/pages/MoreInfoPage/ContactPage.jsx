import { MailOutlined, PhoneOutlined, ClockCircleOutlined } from '@ant-design/icons';

const ContactPage = () => {
    return (
        <div className='flex flex-col justify-center items-center mt-10 mb-10 font-PlayfairDisplay'>
            {/* name page */}
            <h1 className='text-center text-4xl font-bold mb-12 font-PlayfairDisplay text-gray-800'>
                Liên hệ với chúng tôi
            </h1>

            <form className='w-[80%]'>
                {/* name */}
                <div className='flex justify-between gap-10 mb-8'>
                    {/* firstName */}
                    <div className='w-full'>
                        <label htmlFor='firstName' className='text-2xl text-gray-700'>
                            Họ và chữ lót
                        </label>
                        <input
                            autoFocus
                            type='text'
                            id='firstName'
                            name='firstName'
                            className='mt-2 w-full px-4 py-3 border border-gray-300 rounded focus:border-black focus:ring-black'
                            placeholder='VD: Nguyễn Văn...'
                        />
                    </div>

                    {/* lastName */}
                    <div className='w-full'>
                        <label htmlFor='lastName' className='text-2xl text-gray-700'>
                            Tên
                        </label>
                        <input
                            type='text'
                            id='lastName'
                            name='lastName'
                            className='mt-2 w-full px-4 py-3 border border-gray-300 rounded focus:border-black focus:ring-black'
                            placeholder='VD: A...'
                        />
                    </div>
                </div>

                {/* mail & phone */}
                <div className='flex justify-between gap-10 mb-8'>
                    {/* email */}
                    <div className='w-full'>
                        <label htmlFor='emailAddress' className='text-2xl text-gray-700'>
                            Email
                        </label>
                        <input
                            type='email'
                            id='emailAddress'
                            name='emailAddress'
                            className='mt-2 w-full px-4 py-3 border border-gray-300 rounded focus:border-black focus:ring-black'
                            placeholder='VD: ngvanA@gmail.com'
                        />
                    </div>

                    {/* phone */}
                    <div className='w-full'>
                        <label htmlFor='numberPhone' className='text-2xl text-gray-700'>
                            Số điện thoại
                        </label>
                        <input
                            type='text'
                            id='numberPhone'
                            name='numberPhone'
                            className='mt-2 w-full px-4 py-3 border border-gray-300 rounded focus:border-black focus:ring-black'
                            placeholder='Số điện thoại'
                        />
                    </div>
                </div>

                {/* topic */}
                <div className='mb-8'>
                    <label htmlFor='topic' className='text-2xl text-gray-700'>
                        Chủ đề thảo luận
                    </label>
                    <select
                        id='topic'
                        className='mt-2 w-full px-4 py-3 border border-gray-300 rounded focus:border-black focus:ring-black'
                    >
                        <option>Thái độ nhân viên</option>
                        <option>Đơn hàng của tôi</option>
                        <option>Các bên liên quan</option>
                        <option>Chính sách đổi trả hàng</option>
                        <option>Chính sách bảo hành</option>
                        <option>Chủ đề khác</option>
                    </select>
                </div>

                {/* comment */}
                <div className='mb-8'>
                    <label htmlFor='comment' className='text-2xl text-gray-700'>
                        Tin nhắn
                    </label>
                    <textarea
                        id='comment'
                        name='comment'
                        className='mt-2 w-full px-4 py-3 border border-gray-300 rounded focus:border-black focus:ring-black'
                        placeholder='Để lại tin nhắn của bạn ở đây...'
                    />
                </div>

                {/* button submit */}
                <div>
                    <button
                        type='submit'
                        className='text-2xl w-full transition duration-300 py-3 bg-black text-white rounded hover:bg-white hover:text-black hover:border-black border border-transparent'
                    >
                        Gửi thông tin
                    </button>
                </div>
            </form>

            {/* contact info */}
            <div className='py-6 mt-10 w-full text-center bg-gray-100 rounded'>
                <div>
                    <p className='text-xl font-bold font-PlayfairDisplay text-gray-800'>
                        Thông tin liên hệ trực tiếp:
                    </p>
                </div>
                <div className='flex justify-center items-center gap-56 mt-5 text-xl text-gray-700'>
                    {/* mail and phone */}
                    <div>
                        <div className='flex justify-start items-center mb-4'>
                            <MailOutlined className='pr-3 text-2xl text-black' />
                            <a
                                href='https://www.facebook.com/Duc.Huy2102'
                                className='hover:underline'
                            >
                                Nhắn tin ngay
                            </a>
                        </div>
                        <div className='flex justify-start items-center'>
                            <PhoneOutlined className='pr-3 text-2xl text-black' />
                            <p className='font-Lato'>0979.657.587</p>
                        </div>
                    </div>

                    {/* time */}
                    <div>
                        <div className='flex justify-start items-center mb-4'>
                            <ClockCircleOutlined className='pr-3 text-2xl text-black' />
                            <p>Thời gian hoạt động:</p>
                        </div>
                        <div className='flex justify-start items-center'>
                            <p className='font-Lato'>Thứ 2 - Thứ 7: 7:00 - 22:00</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
