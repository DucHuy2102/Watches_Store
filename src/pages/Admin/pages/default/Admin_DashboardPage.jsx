import React, { useEffect, useState } from 'react';
import { AreaChart } from '@tremor/react';
import Admin_OverViewComponent from '../../components/Admin_OverViewComponent';
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from '../../../../services/UserService';
import { useQuery } from '@tanstack/react-query';
import { addAllUser } from '../../../../redux/slides/adminSlide';

// data for the chart
const chartdata = [
    {
        date: 'Tháng 01',
        'Lượt truy cập (lượt/tháng)': 3250,
        'Số lượng đơn hàng (đơn/tháng)': 1615,
    },
    {
        date: 'Tháng 02',
        'Lượt truy cập (lượt/tháng)': 4505,
        'Số lượng đơn hàng (đơn/tháng)': 1802,
    },
    {
        date: 'Tháng 03',
        'Lượt truy cập (lượt/tháng)': 5583,
        'Số lượng đơn hàng (đơn/tháng)': 1955,
    },
    {
        date: 'Tháng 04',
        'Lượt truy cập (lượt/tháng)': 4267,
        'Số lượng đơn hàng (đơn/tháng)': 1757,
    },
    {
        date: 'Tháng 05',
        'Lượt truy cập (lượt/tháng)': 5203,
        'Số lượng đơn hàng (đơn/tháng)': 1853,
    },
    {
        date: 'Tháng 06',
        'Lượt truy cập (lượt/tháng)': 4705,
        'Số lượng đơn hàng (đơn/tháng)': 1705,
    },
    {
        date: 'Tháng 07',
        'Lượt truy cập (lượt/tháng)': 5407,
        'Số lượng đơn hàng (đơn/tháng)': 1907,
    },
    {
        date: 'Tháng 08',
        'Lượt truy cập (lượt/tháng)': 5309,
        'Số lượng đơn hàng (đơn/tháng)': 1855,
    },
    {
        date: 'Tháng 09',
        'Lượt truy cập (lượt/tháng)': 5107,
        'Số lượng đơn hàng (đơn/tháng)': 1803,
    },
    {
        date: 'Tháng 10',
        'Lượt truy cập (lượt/tháng)': 5601,
        'Số lượng đơn hàng (đơn/tháng)': 1957,
    },
    {
        date: 'Tháng 11',
        'Lượt truy cập (lượt/tháng)': 6003,
        'Số lượng đơn hàng (đơn/tháng)': 2003,
    },
    {
        date: 'Tháng 12',
        'Lượt truy cập (lượt/tháng)': 6509,
        'Số lượng đơn hàng (đơn/tháng)': 2107,
    },
];

// value formatter
const valueFormatter = function (number) {
    return new Intl.NumberFormat('vi-VN').format(number);
};

const Admin_DashboardPage = () => {
    const dispatch = useDispatch();
    const tokenAdmin = localStorage.getItem('adminToken');

    // state for time and date
    const [currentTime, setCurrentTime] = useState('');
    const [currentDate, setCurrentDate] = useState('');

    // update time and date every second and every day
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

    // ---------------------------------- GET USERS ----------------------------------
    // get data from redux
    const users_Redux = useSelector((state) => state.admin.users);
    const needReload = users_Redux?.needReload;

    // function to get all users
    const getUsers = async () => {
        const res = await UserService.getAllUser(tokenAdmin);
        return res;
    };

    // using react-query to fetch data
    const { data } = useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
        enabled: needReload === true,
    });

    // add all user to Redux store
    useEffect(() => {
        if (data?.data) {
            dispatch(addAllUser({ data: data.data, needReload: false }));
        }
    }, [data, dispatch, needReload]);

    return (
        <div>
            {/* title and datetime */}
            <div className='flex justify-between items-center px-16'>
                {/* title page */}
                <h1 className='text-3xl font-PlayfairDisplay font-bold text-center'>
                    Trang quản lý cửa hàng
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
            <div className='bg-white p-6 rounded-lg shadow-lg mt-8'>
                <AreaChart
                    className='h-80'
                    data={chartdata}
                    index='date'
                    yAxisWidth={70}
                    categories={['Lượt truy cập (lượt/tháng)', 'Số lượng đơn hàng (đơn/tháng)']}
                    colors={['yellow', 'blue']}
                    valueFormatter={valueFormatter}
                />
            </div>
        </div>
    );
};
export default Admin_DashboardPage;
