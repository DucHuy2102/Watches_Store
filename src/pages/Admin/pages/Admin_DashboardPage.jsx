import { FaUser, FaCartPlus } from 'react-icons/fa';
import { MdAttachMoney } from 'react-icons/md';
import { AreaChart } from '@tremor/react';
import { FaUniversalAccess } from 'react-icons/fa6';

// data for the chart
const chartdata = [
    {
        date: 'Jan 22',
        'Lượt truy cập': 2890,
        'Số lượng đơn hàng': 2338,
    },
    {
        date: 'Feb 22',
        'Lượt truy cập': 2756,
        'Số lượng đơn hàng': 2103,
    },
    {
        date: 'Mar 22',
        'Lượt truy cập': 3322,
        'Số lượng đơn hàng': 2194,
    },
    {
        date: 'Apr 22',
        'Lượt truy cập': 3470,
        'Số lượng đơn hàng': 2108,
    },
    {
        date: 'May 22',
        'Lượt truy cập': 3475,
        'Số lượng đơn hàng': 1812,
    },
    {
        date: 'Jun 22',
        'Lượt truy cập': 3129,
        'Số lượng đơn hàng': 1726,
    },
    {
        date: 'Jul 22',
        'Lượt truy cập': 3490,
        'Số lượng đơn hàng': 1982,
    },
    {
        date: 'Aug 22',
        'Lượt truy cập': 2903,
        'Số lượng đơn hàng': 2012,
    },
    {
        date: 'Sep 22',
        'Lượt truy cập': 2643,
        'Số lượng đơn hàng': 2342,
    },
    {
        date: 'Oct 22',
        'Lượt truy cập': 2837,
        'Số lượng đơn hàng': 2473,
    },
    {
        date: 'Nov 22',
        'Lượt truy cập': 2954,
        'Số lượng đơn hàng': 3848,
    },
    {
        date: 'Dec 22',
        'Lượt truy cập': 3239,
        'Số lượng đơn hàng': 3736,
    },
];

// value formatter
const valueFormatter = function (number) {
    return '$ ' + new Intl.NumberFormat('us').format(number).toString();
};

const Admin_DashboardPage = () => {
    return (
        <div>
            <h1 className='text-3xl font-PlayfairDisplay font-bold text-center'>
                Trang quản lý hệ thống
            </h1>
            {/* overview */}
            <div className='mt-7 px-16'>
                <div className='flex items-center justify-between gap-5'>
                    {/* total user */}
                    <div className='bg-gray-900 hover:bg-gray-700 transition duration-300 h-[20vh] px-5 w-[25vw] rounded-md shadow-tremor-card flex justify-between items-center hover:cursor-pointer'>
                        <FaUniversalAccess className='text-white text-4xl w-[30%] h-[50%]' />
                        <div className='w-[70%]'>
                            <h2 className='text-xl font-bold text-gray-200 text-center'>
                                Lượt truy cập
                            </h2>
                            <p className='text-2xl font-bold text-gray-50 text-center'>
                                12,345 Lượt/Ngày
                            </p>
                        </div>
                    </div>
                    {/* total user */}
                    <div className='bg-gray-900 hover:bg-gray-700 transition duration-300 h-[20vh] px-5 w-[25vw] rounded-md shadow-tremor-card flex justify-between items-center hover:cursor-pointer'>
                        <FaUser className='text-white text-4xl w-[30%] h-[50%]' />
                        <div className='w-[70%]'>
                            <h2 className='text-xl font-bold text-gray-200 text-center'>
                                Số người dùng
                            </h2>
                            <p className='text-2xl font-bold text-gray-50 text-center'>
                                1,234 Người
                            </p>
                        </div>
                    </div>
                    {/* total user */}
                    <div className='bg-gray-900 hover:bg-gray-700 transition duration-300 h-[20vh] px-5 w-[25vw] rounded-md shadow-tremor-card flex justify-between items-center hover:cursor-pointer'>
                        <FaCartPlus className='text-white text-4xl w-[30%] h-[50%]' />
                        <div className='w-[70%]'>
                            <h2 className='text-xl font-bold text-gray-200 text-center'>
                                Số lượng sản phẩm
                            </h2>
                            <p className='text-2xl font-bold text-gray-50 text-center'>
                                123 sản phẩm
                            </p>
                        </div>
                    </div>
                    {/* total user */}
                    <div className='bg-gray-900 hover:bg-gray-700 transition duration-300 h-[20vh] px-5 w-[25vw] rounded-md shadow-tremor-card flex justify-between items-center hover:cursor-pointer'>
                        <MdAttachMoney className='text-white text-4xl w-[30%] h-[50%]' />
                        <div className='w-[70%]'>
                            <h2 className='text-xl font-bold text-gray-200 text-center'>
                                Doanh thu quý 1
                            </h2>
                            <p className='text-2xl font-bold text-gray-50 text-center'>
                                12,345,678 Triệu
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* chart */}
            <div className='mt-2'>
                <AreaChart
                    className='mt-4 h-72'
                    data={chartdata}
                    index='date'
                    yAxisWidth={65}
                    categories={['Lượt truy cập', 'Số lượng đơn hàng']}
                    colors={['indigo', 'cyan']}
                    valueFormatter={valueFormatter}
                />
            </div>
        </div>
    );
};
export default Admin_DashboardPage;
