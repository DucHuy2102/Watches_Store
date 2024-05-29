import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { SiAdblock } from 'react-icons/si';
import { MdDeleteOutline } from 'react-icons/md';
import * as UserService from '../../../../services/UserService';
import { Modal, Space, Table } from 'antd';
import { useState } from 'react';
import { useMutationHook } from '../../../../hooks/useMutationHook';

const Admin_UserPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const token = localStorage.getItem('adminToken');
    const mutationDelete = useMutationHook(({ token, id }) => {
        return UserService.deleteProduct(token, id);
    });
    const handleOk = () => {
        setIsModalOpen(false);
        // try {
        //     mutationDelete.mutate(
        //         { token, id },
        //         {
        //             onSuccess: () => {
        //                 message.success(
        //                     'Xóa sản phẩm thành công. Trang sẽ tự động làm mới'
        //                 );
        //             },
        //             onSettled: () => {
        //                 if (refetch) {
        //                     refetch();
        //                 }
        //             },
        //         }
        //     );
        // } catch (error) {
        //     console.error('Delete product failed:', error);
        //     message.error('Lỗi hệ thống! Xóa sản phẩm thất bại');
        // }
    };

    const handleNavigation = (path) => {
        return () => navigate(path);
    };

    const tokenAdmin = localStorage.getItem('adminToken');
    const getUsers = async () => {
        const res = await UserService.getAllUser(tokenAdmin);
        return res;
    };

    const { data } = useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
        keepPreviousData: true,
    });

    const columns = [
        {
            title: 'Họ và tên',
            dataIndex: 'fullname',
            key: 'fullname',
            render: (text) => <p>{text}</p>,
        },
        {
            title: 'Tên người dùng',
            dataIndex: 'username',
            key: 'username',
            render: (text) => <p>{text}</p>,
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'stateUser',
            key: 'stateUser',
            align: 'center',
            render: (text) => (
                <button
                    className={`hover:cursor-pointer w-24 py-2 rounded-lg uppercase ${
                        text === 'online'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-500 text-white'
                    }`}
                >
                    {text}
                </button>
            ),
        },
        {
            title: 'Thao tác',
            key: 'action',
            align: 'center',
            render: () => (
                <Space size='middle'>
                    <button className='flex justify-center items-center gap-1 hover:cursor-pointer bg-black text-white px-2 py-2 rounded-lg'>
                        <SiAdblock size={20} />
                        Chặn
                    </button>
                    <button
                        onClick={showModal}
                        className='flex justify-center items-center gap-1 hover:cursor-pointer bg-red-500 text-white px-2 py-2 rounded-lg'
                    >
                        <MdDeleteOutline size={20} />
                        Xóa
                    </button>
                    <Modal
                        title='Xác nhận xóa người dùng'
                        okText='Xác nhận xóa'
                        cancelText='Hủy bỏ'
                        style={{ textAlign: 'center' }}
                        open={isModalOpen}
                        okButtonProps={{
                            className:
                                'bg-black text-white hover:bg-red-500 hover:text-white',
                        }}
                        onOk={handleOk}
                        onCancel={handleCancel}
                    >
                        <p className='text-lg'>
                            Hành động này sẽ xóa người dùng khỏi hệ thống và dữ
                            liệu không thể khôi phục!
                        </p>
                    </Modal>
                </Space>
            ),
        },
    ];

    const dataTable = data?.data.map((user, indexUser) => ({
        key: user.id || indexUser,
        fullname: `${user.firstname} ${user.lastname}`,
        username: user.username,
        phone: user.phone,
        address: user.address,
        stateUser: user.state,
    }));

    return (
        <div>
            <div className='mt-3 px-14 flex justify-center items-center'>
                <h1 className='font-bold text-3xl mt-2 text-center'>
                    Danh sách người dùng
                </h1>
                {/* <button
                    onClick={handleNavigation('/admin/product/add')}
                    className='border border-black text-lg rounded-lg hover:bg-blue-500 hover:border-blue-500 hover:text-white transition duration-200 px-3 py-3'
                >
                    Thêm hãng mới
                </button> */}
            </div>
            <div className='w-full'>
                <div className='mt-5'>
                    <Table
                        className=''
                        columns={columns}
                        dataSource={dataTable}
                        pagination={false}
                    />
                </div>
            </div>
        </div>
    );
};

export default Admin_UserPage;
