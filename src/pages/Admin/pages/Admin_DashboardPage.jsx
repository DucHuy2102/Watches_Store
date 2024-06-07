import React, { useEffect, useState } from 'react';
import { AreaChart } from '@tremor/react';
import Admin_OverViewComponent from '../components/Admin_OverViewComponent';

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
    const [currentTime, setCurrentTime] = useState('');
    const [currentDate, setCurrentDate] = useState('');

    // update time and date
    useEffect(() => {
        const updateTimeAndDate = () => {
            const now = new Date();
            const optionsTime = {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
            };
            const optionsDate = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                timeZone: 'Asia/Ho_Chi_Minh',
            };

            setCurrentTime(new Intl.DateTimeFormat('vi-VN', optionsTime).format(now));
            setCurrentDate(new Intl.DateTimeFormat('vi-VN', optionsDate).format(now));
        };

        updateTimeAndDate();
        const intervalId = setInterval(updateTimeAndDate, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            {/* title and datetime */}
            <div className='flex justify-between items-center px-16'>
                {/* title page */}
                <h1 className='text-3xl font-PlayfairDisplay font-bold text-center'>
                    Trang quản lý hệ thống
                </h1>

                {/* date */}
                <div
                    className='flex justify-center items-center gap-2 text-lg font-Lato font-bold text-center
                    bg-gray-300 rounded-md px-5 py-2 shadow-tremor-card hover:cursor-not-allowed'
                >
                    <p>{currentTime}</p>
                    <p>{currentDate}</p>
                </div>
            </div>

            {/* overview */}
            <Admin_OverViewComponent />

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
