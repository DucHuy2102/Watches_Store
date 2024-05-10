import React, { useState } from 'react';
import { TagsOutlined, ProductOutlined, UserOutlined, FileTextOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const items = [
    {
        key: '1',
        icon: <ProductOutlined />,
        label: 'Quản Lý Sản Phẩm',
        children: [
            {
                key: '11',
                label: 'Thêm sản phẩm mới',
            },
            {
                key: '12',
                label: 'Chỉnh sửa sản phẩm',
            },
            // {
            //     key: '13',
            //     label: 'Option 3',
            // },
            // {
            //     key: '14',
            //     label: 'Option 4',
            // },
        ],
    },
    {
        key: '2',
        icon: <TagsOutlined />,
        label: 'Quản Lý Danh Mục',
        children: [
            {
                key: '21',
                label: 'Thêm danh mục mới',
            },
            {
                key: '22',
                label: 'Chỉnh sửa danh mục',
            },
            // {
            //     key: '23',
            //     label: 'Submenu',
            //     children: [
            //         {
            //             key: '231',
            //             label: 'Option 1',
            //         },
            //         {
            //             key: '232',
            //             label: 'Option 2',
            //         },
            //         {
            //             key: '233',
            //             label: 'Option 3',
            //         },
            //     ],
            // },
            // {
            //     key: '24',
            //     label: 'Submenu 2',
            //     children: [
            //         {
            //             key: '241',
            //             label: 'Option 1',
            //         },
            //         {
            //             key: '242',
            //             label: 'Option 2',
            //         },
            //         {
            //             key: '243',
            //             label: 'Option 3',
            //         },
            //     ],
            // },
        ],
    },
    {
        key: '3',
        icon: <UserOutlined />,
        label: 'Quản Lý Người Dùng',
        children: [
            {
                key: '31',
                label: 'Thêm người dùng mới',
            },
            {
                key: '32',
                label: 'Cập nhật thông tin mới',
            },
        ],
    },
    {
        key: '4',
        icon: <FileTextOutlined />,
        label: 'Quản Lý Đơn Hàng',
        children: [
            {
                key: '41',
                label: 'Cập nhật đơn hàng',
            },
            {
                key: '42',
                label: 'Trạng thái đơn hàng',
            },
        ],
    },
];
const getLevelKeys = (items1) => {
    const key = {};
    const func = (items2, level = 1) => {
        items2.forEach((item) => {
            if (item.key) {
                key[item.key] = level;
            }
            if (item.children) {
                func(item.children, level + 1);
            }
        });
    };
    func(items1);
    return key;
};
const levelKeys = getLevelKeys(items);
const Sidebar_Admin = () => {
    const [stateOpenKeys, setStateOpenKeys] = useState(['2', '23']);
    const onOpenChange = (openKeys) => {
        const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);
        // open
        if (currentOpenKey !== undefined) {
            const repeatIndex = openKeys
                .filter((key) => key !== currentOpenKey)
                .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
            setStateOpenKeys(
                openKeys
                    // remove repeat key
                    .filter((_, index) => index !== repeatIndex)
                    // remove current level all child
                    .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
            );
        } else {
            // close
            setStateOpenKeys(openKeys);
        }
    };
    return (
        <div className='bg-gray-200 flex flex-col justify-center items-center h-[93vh] font-Lato'>
            <Menu
                mode='inline'
                defaultSelectedKeys={['231']}
                openKeys={stateOpenKeys}
                onOpenChange={onOpenChange}
                style={{
                    width: 256,
                }}
                items={items}
            />
            <div className='mt-auto py-1 bg-white flex flex-col justify-center items-center w-full border border-gray-200'>
                <Link to='' className='hover:bg-gray-200 rounded-md py-2 w-full text-center'>
                    Cài đặt tài khoản
                </Link>
                <Link to='' className='hover:bg-gray-200 rounded-md py-2 w-full text-center'>
                    Cài đặt hệ thống
                </Link>
                <Link to='/admin/login' className='hover:bg-red-500 rounded-md py-2 w-full text-center'>
                    Đăng xuất
                </Link>
            </div>
        </div>
    );
};
export default Sidebar_Admin;
