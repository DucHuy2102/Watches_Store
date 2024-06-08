import React from 'react';
import { FaCartPlus, FaUniversalAccess, FaUser } from 'react-icons/fa';
import { MdAttachMoney } from 'react-icons/md';

const overViewValue = [
    {
        icon: (
            <FaUniversalAccess className='text-white text-4xl sm:text-5xl md:text-4xl w-[30%] h-[50%]' />
        ),
        title: 'Lượt truy cập',
        value: '12,345 Lượt/Ngày',
        backgroundColor: 'bg-orange-500',
    },
    {
        icon: <FaUser className='text-white text-4xl sm:text-5xl md:text-4xl w-[30%] h-[50%]' />,
        title: 'Số người dùng',
        value: '1,234 Người',
        backgroundColor: 'bg-purple-500',
    },
    {
        icon: (
            <FaCartPlus className='text-white text-4xl sm:text-5xl md:text-4xl w-[30%] h-[50%]' />
        ),
        title: 'Số lượng sản phẩm',
        value: '123 sản phẩm',
        backgroundColor: 'bg-green-500',
    },
    {
        icon: (
            <MdAttachMoney className='text-white text-4xl sm:text-5xl md:text-4xl w-[30%] h-[50%]' />
        ),
        title: 'Doanh thu quý 1',
        value: '12,345,678 Triệu',
        backgroundColor: 'bg-blue-500',
    },
];

const Admin_OverViewComponent = () => {
    return (
        <div className='mt-7 px-4 sm:px-8 md:px-16 w-full flex justify-center gap-x-5 sm:gap-x-8 md:gap-x-10'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8 md:gap-10 w-full max-w-6xl mx-auto'>
                {overViewValue.map((item, index) => (
                    <div
                        key={index}
                        className={`${item.backgroundColor} hover:bg-[#001529] transition duration-300 h-[20vh] sm:h-[25vh] md:h-[20vh] px-5 w-full rounded-md shadow-tremor-card flex justify-between items-center hover:cursor-pointer`}
                    >
                        {item.icon}
                        <div className='w-[70%]'>
                            <h2 className='text-lg sm:text-xl font-bold text-gray-200 text-center'>
                                {item.title}
                            </h2>
                            <p className='text-xl sm:text-2xl font-bold text-gray-50 text-center'>
                                {item.value}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Admin_OverViewComponent;
