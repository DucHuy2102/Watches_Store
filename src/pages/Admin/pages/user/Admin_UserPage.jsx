import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { SiAdblock } from 'react-icons/si';
import { MdDeleteOutline } from 'react-icons/md';
import * as UserService from '../../../../services/UserService';
import { Form, Input, Modal, Space, Table, message } from 'antd';
import { useMutationHook } from '../../../../hooks/useMutationHook';

const Admin_UserPage = () => {
    // delete user
    const [isModalOpen, setIsModalOpen] = useState(false);

    // block user
    const [isModalBlockUserOpen, setIsModalBlockUserOpen] = useState(null);
    const [message_Block, setMessage_Block] = useState('');
    const [selectedUserId, setSelectedUserId] = useState(null);

    // list all user
    const tokenAdmin = localStorage.getItem('adminToken');
    const getUsers = async () => {
        const res = await UserService.getAllUser(tokenAdmin);
        return res;
    };
    const { data, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
        keepPreviousData: true,
    });
    console.log('data_users -->', data);

    // cancel modal delete user
    const handleCancel_Delete = () => {
        setIsModalOpen(false);
    };

    // show modal delete user
    const showModal_Delete = (id) => {
        setSelectedUserId(id);
        setIsModalOpen(true);
    };

    // delete user function
    const token = localStorage.getItem('adminToken');
    const mutationDelete = useMutationHook(({ token, id }) => {
        return UserService.deleteUser(token, id);
    });

    // block user function
    const mutationBlock = useMutationHook(({ token, id }) => {
        return UserService.blockUser(token, id);
    });

    const handleOk_Delete = async () => {
        setIsModalOpen(false);
        try {
            mutationDelete.mutate(
                { token, id: selectedUserId },
                {
                    onSuccess: () => {
                        message.success(
                            'Xóa người dùng thành công. Trang sẽ tự động làm mới'
                        );
                    },
                    onError: () => {
                        message.error('Xóa người dùng thất bại');
                    },
                    onSettled: () => {
                        if (refetch) {
                            refetch();
                        }
                    },
                }
            );
        } catch (error) {
            console.error('Delete user failed:', error);
            message.error('Lỗi hệ thống! Xóa người dùng thất bại');
        }
    };

    const handleOk_Block = () => {
        setIsModalBlockUserOpen(false);
        console.log('run block user');
        try {
            mutationBlock.mutate(
                { token, id: selectedUserId },
                {
                    onSuccess: () => {
                        message.success(
                            'Chặn người dùng thành công. Trang sẽ tự động làm mới'
                        );
                    },
                    onError: () => {
                        message.error('Chặn người dùng thất bại');
                    },
                    onSettled: () => {
                        if (refetch) {
                            refetch();
                        }
                    },
                }
            );
        } catch (error) {
            console.error('Block user failed:', error);
            message.error('Lỗi hệ thống! Chặn người dùng thất bại');
        }
    };

    // show modal block user
    const showModal_Block = (id) => {
        setSelectedUserId(id);
        setIsModalBlockUserOpen(true);
    };

    // cancel block user
    const handleCancel_Block = () => {
        setIsModalBlockUserOpen(false);
    };

    // column table
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
            dataIndex: 'state',
            key: 'state',
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
            render: (item, _) => (
                <Space size='middle'>
                    <button
                        onClick={() => showModal_Block(item.key)}
                        className='flex justify-center items-center gap-1 hover:cursor-pointer bg-black text-white px-2 py-2 rounded-lg'
                    >
                        <SiAdblock size={20} />
                        Chặn
                    </button>
                    {item.state === 'blocked' && (
                        <button
                            onClick={() => showModal_Delete(item.key)}
                            className='flex justify-center items-center gap-1 hover:cursor-pointer bg-red-500 text-white px-2 py-2 rounded-lg'
                        >
                            <MdDeleteOutline size={20} />
                            Xóa
                        </button>
                    )}
                </Space>
            ),
        },
    ];

    // data table
    const dataTable = data?.data.map((user, indexUser) => ({
        key: user.id || indexUser,
        fullname: `${user.firstname} ${user.lastname}`,
        username: user.username,
        phone: user.phone,
        address: user.address,
        state: user.state,
    }));

    return (
        <div>
            <div className='mt-3 px-14 flex justify-center items-center'>
                <h1 className='font-bold text-3xl mt-2 text-center'>
                    Danh sách người dùng
                </h1>
            </div>
            <div className='w-full'>
                <div className='mt-5'>
                    <Table
                        columns={columns}
                        dataSource={dataTable}
                        pagination={false}
                    />
                </div>
            </div>

            {/* modal delete user */}
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
                onOk={handleOk_Delete}
                onCancel={handleCancel_Delete}
            >
                <p className='text-lg'>
                    Hành động này sẽ xóa người dùng khỏi hệ thống và dữ liệu
                    không thể khôi phục!
                </p>
            </Modal>

            {/* modal block user */}
            <Modal
                title='Xác nhận chặn người dùng'
                okText='Xác nhận chặn'
                cancelText='Hủy bỏ'
                style={{ textAlign: 'center' }}
                open={isModalBlockUserOpen}
                okButtonProps={{
                    className:
                        'bg-black text-white hover:bg-red-500 hover:text-white',
                }}
                onOk={handleOk_Block}
                onCancel={handleCancel_Block}
            >
                <p className='mb-2 text-lg'>
                    Hành động này sẽ chặn người dùng khỏi hệ thống và người dùng
                    không thể truy cập vào hệ thống!
                </p>
                <Form.Item
                    rules={[
                        {
                            required: true,
                            message: 'Bạn phải điền lí do chặn!',
                        },
                    ]}
                >
                    <Input.TextArea
                        onChange={(e) => setMessage_Block(e.target.value)}
                        placeholder='Lí do chặn người dùng'
                    />
                </Form.Item>
            </Modal>
        </div>
    );
};

export default Admin_UserPage;
