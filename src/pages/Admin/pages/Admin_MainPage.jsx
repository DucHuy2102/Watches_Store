const Admin_MainPage = () => {
    return <div>Admin_MainPage</div>;
};

export default Admin_MainPage;

// import React, { useState } from 'react';
// import { TagsOutlined, ProductOutlined, UserOutlined, FileTextOutlined } from '@ant-design/icons';
// import { Menu } from 'antd';
// import { Link } from 'react-router-dom';
// import Header_Admin from '../components/Header_Admin';
// import {
//     AddCategory,
//     AddProduct,
//     AddUser,
//     Admin_DashboardPage,
//     EditCategory,
//     EditUser,
//     ListProduct,
// } from './exportPageAdmin';

// const items = [
//     {
//         key: '1',
//         icon: <ProductOutlined />,
//         label: 'Quản Lý Sản Phẩm',
//         children: [
//             {
//                 key: '11',
//                 label: 'Thêm sản phẩm mới',
//             },
//             {
//                 key: '12',
//                 label: 'Chỉnh sửa sản phẩm',
//             },
//         ],
//     },
//     {
//         key: '2',
//         icon: <TagsOutlined />,
//         label: 'Quản Lý Danh Mục',
//         children: [
//             {
//                 key: '21',
//                 label: 'Thêm danh mục mới',
//             },
//             {
//                 key: '22',
//                 label: 'Chỉnh sửa danh mục',
//             },
//         ],
//     },
//     {
//         key: '3',
//         icon: <UserOutlined />,
//         label: 'Quản Lý Người Dùng',
//         children: [
//             {
//                 key: '31',
//                 label: 'Thêm người dùng mới',
//             },
//             {
//                 key: '32',
//                 label: 'Cập nhật thông tin mới',
//             },
//         ],
//     },
//     {
//         key: '4',
//         icon: <FileTextOutlined />,
//         label: 'Quản Lý Đơn Hàng',
//         children: [
//             {
//                 key: '41',
//                 label: 'Cập nhật đơn hàng',
//             },
//             {
//                 key: '42',
//                 label: 'Trạng thái đơn hàng',
//             },
//         ],
//     },
// ];
// const getLevelKeys = (items1) => {
//     const key = {};
//     const func = (items2, level = 1) => {
//         items2.forEach((item) => {
//             if (item.key) {
//                 key[item.key] = level;
//             }
//             if (item.children) {
//                 func(item.children, level + 1);
//             }
//         });
//     };
//     func(items1);
//     return key;
// };
// const levelKeys = getLevelKeys(items);
// const Admin_MainPage = () => {
//     const [stateOpenKeys, setStateOpenKeys] = useState('');
//     const onOpenChange = (openKeys) => {
//         const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);
//         // open
//         if (currentOpenKey !== undefined) {
//             const repeatIndex = openKeys
//                 .filter((key) => key !== currentOpenKey)
//                 .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
//             setStateOpenKeys(
//                 openKeys
//                     // remove repeat key
//                     .filter((_, index) => index !== repeatIndex)
//                     // remove current level all child
//                     .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
//             );
//         } else {
//             // close
//             setStateOpenKeys(openKeys);
//         }
//     };

//     const [stateSelectedKeys, setStateSelectedKeys] = useState('');
//     const handleClick = ({ key }) => {
//         setStateSelectedKeys(key);
//     };

//     return (
//         <>
//             {/* header */}
//             <Header_Admin />

//             {/* sidebar */}
//             <div className='flex'>
//                 <div className='bg-gray-200 flex flex-col justify-center items-center h-[93vh] font-Lato'>
//                     <Menu
//                         onClick={handleClick}
//                         mode='inline'
//                         // defaultSelectedKeys={['231']}
//                         openKeys={stateOpenKeys}
//                         onOpenChange={onOpenChange}
//                         style={{
//                             width: 256,
//                         }}
//                         items={items}
//                     />
//                     <div className='mt-auto py-1 bg-white flex flex-col justify-center items-center w-full border border-gray-200'>
//                         <Link to='' className='hover:bg-gray-200 rounded-md py-2 w-full text-center'>
//                             Cài đặt tài khoản
//                         </Link>
//                         <Link to='' className='hover:bg-gray-200 rounded-md py-2 w-full text-center'>
//                             Cài đặt hệ thống
//                         </Link>
//                         <Link to='/admin/login' className='hover:bg-red-500 rounded-md py-2 w-full text-center'>
//                             Đăng xuất
//                         </Link>
//                     </div>
//                 </div>

//                 {/* content */}
//                 <div className='w-full'>
//                     {!stateSelectedKeys ? <Admin_DashboardPage /> : stateSelectedKeys === '11' && <AddProduct />}
//                     {stateSelectedKeys === '12' && <ListProduct />}
//                     {stateSelectedKeys === '21' && <AddCategory />}
//                     {stateSelectedKeys === '22' && <EditCategory />}
//                     {stateSelectedKeys === '31' && <AddUser />}
//                     {stateSelectedKeys === '32' && <EditUser />}
//                 </div>
//             </div>
//         </>
//     );
// };
// export default Admin_MainPage;
