import { FaUser } from 'react-icons/fa';
import { AreaChart } from '@tremor/react';

// data for the chart
const chartdata = [
    {
        date: 'Jan 22',
        SemiAnalysis: 2890,
        'The Pragmatic Engineer': 2338,
    },
    {
        date: 'Feb 22',
        SemiAnalysis: 2756,
        'The Pragmatic Engineer': 2103,
    },
    {
        date: 'Mar 22',
        SemiAnalysis: 3322,
        'The Pragmatic Engineer': 2194,
    },
    {
        date: 'Apr 22',
        SemiAnalysis: 3470,
        'The Pragmatic Engineer': 2108,
    },
    {
        date: 'May 22',
        SemiAnalysis: 3475,
        'The Pragmatic Engineer': 1812,
    },
    {
        date: 'Jun 22',
        SemiAnalysis: 3129,
        'The Pragmatic Engineer': 1726,
    },
    {
        date: 'Jul 22',
        SemiAnalysis: 3490,
        'The Pragmatic Engineer': 1982,
    },
    {
        date: 'Aug 22',
        SemiAnalysis: 2903,
        'The Pragmatic Engineer': 2012,
    },
    {
        date: 'Sep 22',
        SemiAnalysis: 2643,
        'The Pragmatic Engineer': 2342,
    },
    {
        date: 'Oct 22',
        SemiAnalysis: 2837,
        'The Pragmatic Engineer': 2473,
    },
    {
        date: 'Nov 22',
        SemiAnalysis: 2954,
        'The Pragmatic Engineer': 3848,
    },
    {
        date: 'Dec 22',
        SemiAnalysis: 3239,
        'The Pragmatic Engineer': 3736,
    },
];

// value formatter
const valueFormatter = function (number) {
    return '$ ' + new Intl.NumberFormat('us').format(number).toString();
};

const Admin_DashboardPage = () => {
    return (
        <div>
            <h1 className='text-3xl font-PlayfairDisplay font-bold mt-2 text-center'>Trang quản lý hệ thống</h1>

            {/* overview */}
            <div className='mt-5 px-16'>
                <div className='flex items-center justify-between gap-4'>
                    {/* total user */}
                    <div className='bg-gray-900 px-10 w-[20vw] rounded-md shadow-tremor-card flex justify-between items-center'>
                        <FaUser className='text-white text-4xl' />
                        <div>
                            <h2 className='text-lg font-PlayfairDisplay font-bold text-gray-200'>Tổng số người dùng</h2>
                            <p className='text-2xl font-PlayfairDisplay font-bold text-gray-50'>1,234</p>
                        </div>
                    </div>

                    {/* total revenue */}
                    <div className='bg-gray-900 px-10 w-[20vw] rounded-md shadow-tremor-card flex justify-between items-center'>
                        <FaUser className='text-white text-4xl' />
                        <div>
                            <h2 className='text-lg font-PlayfairDisplay font-bold text-gray-200'>Tổng số người dùng</h2>
                            <p className='text-2xl font-PlayfairDisplay font-bold text-gray-50'>1,234</p>
                        </div>
                    </div>

                    {/* total comment */}
                    <div className='bg-gray-900 px-10 w-[20vw] rounded-md shadow-tremor-card flex justify-between items-center'>
                        <FaUser className='text-white text-4xl' />
                        <div>
                            <h2 className='text-lg font-PlayfairDisplay font-bold text-gray-200'>Tổng số người dùng</h2>
                            <p className='text-2xl font-PlayfairDisplay font-bold text-gray-50'>1,234</p>
                        </div>
                    </div>

                    <div className='bg-gray-900 px-10 w-[20vw] rounded-md shadow-tremor-card flex justify-between items-center'>
                        <FaUser className='text-white text-4xl' />
                        <div>
                            <h2 className='text-lg font-PlayfairDisplay font-bold text-gray-200'>Tổng số người dùng</h2>
                            <p className='text-2xl font-PlayfairDisplay font-bold text-gray-50'>1,234</p>
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
                    categories={['SemiAnalysis', 'The Pragmatic Engineer']}
                    colors={['indigo', 'cyan']}
                    valueFormatter={valueFormatter}
                />
            </div>
        </div>
    );
};
export default Admin_DashboardPage;
