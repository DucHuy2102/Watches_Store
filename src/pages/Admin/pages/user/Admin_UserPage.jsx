import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { SiAdblock } from 'react-icons/si';
import { MdDeleteOutline } from 'react-icons/md';
import * as UserService from '../../../../services/UserService';
import { Form, Input, Modal, Space, Table } from 'antd';
import { useMutationHook } from '../../../../hooks/useMutationHook';
import { useDispatch, useSelector } from 'react-redux';
import {
    addAllUser,
    blockUser,
    deleteUser,
    unblockUSer,
} from '../../../../redux/slides/adminSlide';
import { UnlockOutlined } from '@ant-design/icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css';

const Admin_UserPage = () => {
    const dispatch = useDispatch();
    // ---------------------------------- STATE ----------------------------------
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState('');

    // ---------------------------------- GET USERS ----------------------------------
    const tokenAdmin = localStorage.getItem('adminToken');

    // get data from redux
    const users_Redux = useSelector((state) => state.admin.users);
    const usersLength = users_Redux.length;

    // list all user
    const getUsers = async () => {
        const res = await UserService.getAllUser(tokenAdmin);
        return res;
    };

    // using react-query to fetch data
    const { data } = useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
        enabled: usersLength === 0,
    });

    // add all user to Redux store
    useEffect(() => {
        if (data?.data && usersLength === 0) {
            dispatch(addAllUser(data.data));
        }
    }, [data, dispatch, usersLength]);

    // ---------------------------------- DELETE USER ----------------------------------

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

    const handleOk_Delete = async () => {
        setIsModalOpen(false);
        dispatch(deleteUser({ userId: selectedUserId }));
        toast.success('Xóa người dùng thành công!');
        mutationDelete.mutate(
            { token, id: selectedUserId },
            {
                onError: (e) => {
                    console.log('Delete User Error:', e);
                },
            }
        );
    };

    // ---------------------------------- BLOCK USER ----------------------------------
    const [isModalBlockUserOpen, setIsModalBlockUserOpen] = useState(false);
    const [message_Block, setMessage_Block] = useState('');

    // show modal block user
    const showModal_Block = (id) => {
        setSelectedUserId(id);
        setIsModalBlockUserOpen(true);
    };

    // close modal block user
    const handleCancel_Block = () => {
        setIsModalBlockUserOpen(false);
    };

    // block user function
    const mutationBlock = useMutationHook(({ token, id }) => {
        return UserService.blockUser(token, id);
    });

    // handle block user function
    const handleOk_Block = () => {
        setIsModalBlockUserOpen(false);
        dispatch(blockUser({ userId: selectedUserId }));
        toast.success('Chặn người dùng thành công!');
        mutationBlock.mutate(
            { token, id: selectedUserId, message: message_Block },
            {
                onError: (e) => {
                    console.log('Block User Error:', e);
                },
            }
        );
    };

    // ---------------------------------- UNBLOCK USER ----------------------------------
    const mutationUnblock = useMutationHook(({ token, id }) => {
        return UserService.unblockUser(token, id);
    });

    const handleUnblockUser = (id) => {
        dispatch(unblockUSer({ userId: id }));
        mutationUnblock.mutate(
            { token, id },
            {
                onError: (e) => {
                    console.log('Unblock User Error:', e);
                },
            }
        );
        toast.success('Bỏ chặn người dùng thành công!');
    };

    // column table and render data
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
                        text === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-500 text-white'
                    }`}
                >
                    {text === 'active' ? 'hoạt động' : 'đã chặn'}
                </button>
            ),
        },
        {
            title: 'Thao tác',
            key: 'action',
            align: 'center',
            render: (item, _) => (
                <Space size='middle'>
                    {item.state === 'active' ? (
                        <button
                            onClick={() => showModal_Block(item.key)}
                            className='flex justify-center items-center gap-1 hover:cursor-pointer bg-yellow-500 text-white px-2 py-2 rounded-lg'
                        >
                            <SiAdblock size={20} />
                            Chặn
                        </button>
                    ) : (
                        <button
                            onClick={() => handleUnblockUser(item.key)}
                            className='flex justify-center items-center gap-1 hover:cursor-pointer bg-green-500 text-white px-2 py-2 rounded-lg'
                        >
                            <UnlockOutlined size={20} />
                            Bỏ chặn
                        </button>
                    )}
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

    // data to display in table
    const dataTable = users_Redux?.map((user, indexUser) => ({
        key: user?.id || indexUser,
        fullname: `${user.firstname} ${user.lastname}`,
        username: user.username,
        phone: user.phone,
        address: user.address,
        state: user.state === 'active' ? 'active' : 'blocked',
    }));

    return (
        <div>
            <div className='mt-1 px-14 flex justify-center items-center'>
                <h1 className='font-bold text-3xl text-center'>Danh sách người dùng</h1>
            </div>
            <div className='w-full'>
                <div className='mt-5'>
                    <Table columns={columns} dataSource={dataTable} pagination={false} />
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
                    className: 'bg-black text-white hover:bg-red-500 hover:text-white',
                }}
                onOk={handleOk_Delete}
                onCancel={handleCancel_Delete}
            >
                <p className='text-lg'>
                    Hành động này sẽ xóa người dùng khỏi hệ thống và dữ liệu không thể khôi phục!
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
                    className: 'bg-yellow-500 text-white hover:bg-red-500 hover:text-white',
                }}
                onOk={handleOk_Block}
                onCancel={handleCancel_Block}
            >
                <p className='mb-2 text-lg'>
                    Hành động này sẽ chặn người dùng khỏi hệ thống và người dùng không thể truy cập
                    vào hệ thống!
                </p>
                <Form.Item>
                    <Input.TextArea
                        onChange={(e) => setMessage_Block(e.target.value)}
                        placeholder='Lí do chặn người dùng'
                    />
                </Form.Item>
            </Modal>

            {/* toast */}
            <ToastContainer
                position='top-right'
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default Admin_UserPage;
