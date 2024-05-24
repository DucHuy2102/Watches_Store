import {
    MailOutlined,
    PhoneOutlined,
    ClockCircleOutlined,
} from '@ant-design/icons';

const ContactPage = () => {
    return (
        <div className='flex flex-col justify-center items-center mt-10 mb-10 font-PlayfairDisplay'>
            {/* name page */}
            <h1 className='text-center text-4xl font-bold mb-10 font-PlayfairDisplay'>
                Liên hệ với chúng tôi
            </h1>

            <form className=''>
                {/* name */}
                <div className='flex justify-center gap-10'>
                    {/* firstName */}
                    <div className='mb-5 w-[20vw]'>
                        <label
                            htmlFor='firstName'
                            className='text-xl text-black'
                        >
                            Họ và chữ lót
                        </label>
                        <input
                            autoFocus
                            type='text'
                            id='firstName'
                            name='firstName'
                            className='mt-1 w-full px-3 py-2 border border-gray-300 rounded'
                            placeholder='VD: Nguyễn Văn...'
                        />
                    </div>

                    {/* lastName */}
                    <div className='mb-5 w-[20vw]'>
                        <label
                            htmlFor='lastName'
                            className='text-xl text-black'
                        >
                            Tên
                        </label>
                        <input
                            type='text'
                            id='lastName'
                            name='lastName'
                            className='mt-1 w-full px-3 py-2 border border-gray-300 rounded'
                            placeholder='VD: A...'
                        />
                    </div>
                </div>

                {/* mail & phone */}
                <div className='flex justify-center gap-10'>
                    {/* email */}
                    <div className='mb-5 w-[20vw]'>
                        <label
                            htmlFor='emailAddress'
                            className='text-xl text-black'
                        >
                            Email
                        </label>
                        <input
                            type='text'
                            id='emailAddress'
                            name='emailAddress'
                            className='mt-1 w-full px-3 py-2 border border-gray-300 rounded'
                            placeholder='VD: ngvanA@gmail.com'
                        />
                    </div>

                    {/* phone */}
                    <div className='mb-5 w-[20vw]'>
                        <label
                            htmlFor='numberPhone'
                            className='text-xl text-black'
                        >
                            Số điện thoại
                        </label>
                        <input
                            type='text'
                            id='numberPhone'
                            name='numberPhone'
                            className='mt-1 w-full px-3 py-2 border border-gray-300 rounded'
                            placeholder='Số điện thoại'
                        />
                    </div>
                </div>

                {/* topic */}

                <div className='w-full flex flex-col mb-5'>
                    <label htmlFor='topic' className='text-xl text-black'>
                        Chủ đề thảo luận
                    </label>
                    <select id='options' className='border border-gray-300 p-2'>
                        <option>Thái độ nhân viên</option>
                        <option>Đơn hàng của tôi</option>
                        <option>Các bên liên quan</option>
                        <option>Chính sách đổi trả hàng</option>
                        <option>Chính sách bảo hành</option>
                        <option>Chủ đề khác</option>
                    </select>
                </div>

                {/* comment */}
                <div className='mb-3'>
                    <label htmlFor='comment' className='text-xl text-black'>
                        Tin nhắn
                    </label>
                    <textarea
                        type='text'
                        id='comment'
                        name='comment'
                        className='mt-1 w-full px-3 py-2 border border-gray-300 rounded'
                        placeholder='Để lại tin nhắn của bạn ở đây...'
                    />
                </div>

                {/* button submit */}
                <div>
                    <button
                        type='submit'
                        className='text-2xl w-full transition duration-300 p-2 border bg-black text-white rounded hover:bg-white hover:text-black hover:border-black'
                    >
                        Gửi thông tin
                    </button>
                </div>
            </form>

            {/* contact info */}
            <div className='py-3 mt-5 w-[42.5vw] mb-5 font-Lato'>
                <div>
                    <p className='text-lg font-bold'>
                        Thông tin liên hệ trực tiếp:
                    </p>
                </div>
                <div className='flex justify-between items-center px-10 text-lg mt-1'>
                    {/* mail and phone */}
                    <div>
                        <div className='flex justify-start items-center'>
                            <MailOutlined className='pr-2' />
                            <a href='https://www.facebook.com/Duc.Huy2102'>
                                Nhắn tin ngay
                            </a>
                        </div>
                        <div className='flex justify-start items-center'>
                            <PhoneOutlined className='pr-2' />
                            <p>0979.657.587</p>
                        </div>
                    </div>

                    {/* time */}
                    <div className=''>
                        <div className='flex justify-start items-center'>
                            <p>Thời gian hoạt động:</p>
                        </div>
                        <div className='flex justify-center items-center'>
                            <ClockCircleOutlined className='pr-2' />
                            <p className='font-sans'>
                                Thứ 2 - Thứ 7: 7:00 - 22:00
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
