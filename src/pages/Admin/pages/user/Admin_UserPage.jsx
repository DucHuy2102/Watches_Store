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
    unblockUser,
} from '../../../../redux/slides/adminSlide';
import { UnlockOutlined } from '@ant-design/icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css';

const Admin_UserPage = () => {
    const dispatch = useDispatch();
    const tokenAdmin = localStorage.getItem('adminToken');

    // ---------------------------------- STATE ----------------------------------
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    // ---------------------------------- GET USERS ----------------------------------
    // get data from redux
    const users_Redux = useSelector((state) => state.admin.users);
    const needReload = users_Redux.needReload;

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
    const mutationDelete = useMutationHook(({ token, id }) => {
        return UserService.deleteUser(token, id);
    });

    const handleOk_Delete = async () => {
        setIsModalOpen(false);
        dispatch(deleteUser({ userId: selectedUserId }));
        toast.success('Xóa người dùng thành công!');
        mutationDelete.mutate(
            { token: tokenAdmin, id: selectedUserId },
            {
                onError: (e) => {
                    console.log('Delete User Error:', e);
                },
            }
        );
    };

    // ---------------------------------- BLOCK USER ----------------------------------
    const [message_Block, setMessage_Block] = useState('');
    const [isModalBlockUserOpen, setIsModalBlockUserOpen] = useState(false);

    // show modal block user
    const showModal_Block = (id) => {
        setSelectedUserId(id);
        setIsModalBlockUserOpen(true);
    };

    // close modal block user
    const handleCancel_Block = () => {
        setIsModalBlockUserOpen(false);
    };

    // function block user
    const mutationBlock = useMutationHook(({ access_token, id, message }) => {
        return UserService.blockUser(access_token, id, message);
    });

    // click button block user
    const handleOk_Block = () => {
        setIsModalBlockUserOpen(false);
        dispatch(blockUser({ userId: selectedUserId }));
        toast.success('Chặn người dùng thành công!');
        mutationBlock.mutate(
            { access_token: tokenAdmin, id: selectedUserId, message: message_Block },
            {
                onError: (e) => {
                    toast.error('Lỗi hệ thống! Vui lòng thử lại sau');
                    console.log('Block User Error:', e);
                },
            }
        );
    };

    // ---------------------------------- UNBLOCK USER ----------------------------------
    // function unblock user
    const mutationUnblock = useMutationHook(({ token, id }) => {
        return UserService.unblockUser(token, id);
    });

    // click button unblock user
    const handleUnblockUser = (id) => {
        dispatch(unblockUser({ userId: id }));
        toast.success('Bỏ chặn người dùng thành công!');
        mutationUnblock.mutate(
            { token: tokenAdmin, id },
            {
                onError: (e) => {
                    toast.error('Lỗi hệ thống! Vui lòng thử lại sau');
                    console.log('Unblock User Error:', e);
                },
            }
        );
    };

    // ---------------------------------- TABLE ----------------------------------
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
    const dataTable = users_Redux?.data
        .filter((user) => user.username !== 'admin')
        .map((user, indexUser) => ({
            key: user?.id || indexUser,
            fullname: `${user.firstname} ${user.lastname}`,
            username: user.username,
            phone: user.phone,
            address: user.address,
            state: user.state === 'active' ? 'active' : 'blocked',
        }));

    return (
        <div>
            {/* title page */}
            <div className='mt-1 px-14 flex justify-center items-center'>
                <h1 className='font-bold text-3xl text-center'>Danh sách người dùng</h1>
            </div>

            {/* table */}
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
