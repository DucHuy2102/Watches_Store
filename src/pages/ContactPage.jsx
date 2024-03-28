import { MailOutlined, PhoneOutlined, ClockCircleOutlined } from '@ant-design/icons';

const ContactPage = () => {
    return (
        <div className='flex flex-col justify-center items-center mt-10 mb-10'>
            {/* name page */}
            <h1 className='text-center text-4xl font-bold mb-10 font-serif'>Contact Us</h1>

            <form className='font-serif'>
                {/* name */}
                <div className='flex justify-center gap-10'>
                    {/* firstName */}
                    <div className='mb-5 w-[20vw]'>
                        <label htmlFor='firstName' className='text-xl text-black'>
                            First Name
                        </label>
                        <input
                            autoFocus
                            type='text'
                            id='firstName'
                            name='firstName'
                            className='w-full px-3 py-2 border border-gray-300 rounded'
                            placeholder='First Name'
                        />
                    </div>

                    {/* lastName */}
                    <div className='mb-5 w-[20vw]'>
                        <label htmlFor='lastName' className='text-xl text-black'>
                            Last Name
                        </label>
                        <input
                            autoFocus
                            type='text'
                            id='lastName'
                            name='lastName'
                            className='w-full px-3 py-2 border border-gray-300 rounded'
                            placeholder='Last Name'
                        />
                    </div>
                </div>

                {/* mail & phone */}
                <div className='flex justify-center gap-10'>
                    {/* email */}
                    <div className='mb-5 w-[20vw]'>
                        <label htmlFor='emailAddress' className='text-xl text-black'>
                            Email Address
                        </label>
                        <input
                            autoFocus
                            type='text'
                            id='emailAddress'
                            name='emailAddress'
                            className='w-full px-3 py-2 border border-gray-300 rounded'
                            placeholder='Email Address'
                        />
                    </div>

                    {/* phone */}
                    <div className='mb-5 w-[20vw]'>
                        <label htmlFor='numberPhone' className='text-xl text-black'>
                            Phone Number
                        </label>
                        <input
                            autoFocus
                            type='text'
                            id='numberPhone'
                            name='numberPhone'
                            className='w-full px-3 py-2 border border-gray-300 rounded'
                            placeholder='Phone Number'
                        />
                    </div>
                </div>

                {/* topic */}

                <div className='w-full flex flex-col mb-5'>
                    <label htmlFor='topic' className='text-xl text-black'>
                        Topic
                    </label>
                    <select id='options' className='border border-gray-300 p-2'>
                        <option>Please Select</option>
                        <option>Your Order</option>
                        <option>Site Related</option>
                        <option>Repair Request</option>
                        <option>Warranty Infomation</option>
                        <option>Other</option>
                    </select>
                </div>

                {/* comment */}
                <div className='mb-3'>
                    <label htmlFor='comment' className='text-xl text-black'>
                        Comment
                    </label>
                    <textarea
                        autoFocus
                        type='text'
                        id='comment'
                        name='comment'
                        className='w-full px-3 py-2 border border-gray-300 rounded'
                        placeholder='Start Typing here...'
                    />
                </div>

                {/* button submit */}
                <div>
                    <button
                        type='submit'
                        className='w-full text-xl p-2 border bg-black text-white rounded hover:bg-white hover:text-black hover:border-black'
                    >
                        Submit
                    </button>
                </div>
            </form>

            {/* contact info */}
            <div className='py-3 mt-5 w-[42.5vw] mb-5'>
                <div>
                    <p className='text-xl font-serif'>Get in touch</p>
                </div>
                <div className='flex justify-between items-center px-10 text-lg mt-1'>
                    {/* mail and phone */}
                    <div>
                        <div className='flex justify-start items-center'>
                            <MailOutlined className='pr-2' />
                            <a className='font-serif' href='https://www.facebook.com/Duc.Huy2102'>
                                Chat now
                            </a>
                        </div>
                        <div className='flex justify-center items-center'>
                            <PhoneOutlined className='pr-2' />
                            <p>0979.657.587</p>
                        </div>
                    </div>

                    {/* time */}
                    <div className=''>
                        <div className='flex justify-start items-center'>
                            <p>Hours of Operations:</p>
                        </div>
                        <div className='flex justify-center items-center'>
                            <ClockCircleOutlined className='pr-2' />
                            <p className='font-sans'>Mon - Fri: 9:00am - 7:00pm EST</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
