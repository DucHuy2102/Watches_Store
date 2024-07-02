import { useEffect, useMemo, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { SiAdblock } from 'react-icons/si';
import * as ProductService from '../../../../services/ProductService';
import { Modal, Space, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
    acceptOrder,
    addOrder,
    addOrderDetail,
    cancelOrder,
} from '../../../../redux/slides/adminSlide';
import {
    EyeOutlined,
    TruckOutlined,
    MailOutlined,
    PhoneOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import { useMutationHook } from '../../../../hooks/useMutationHook';

// format date from isoString to "dd/mm/yyyy"
function convertDate(isoString) {
    const date = new Date(isoString);

    // get day, month, year from object date
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();

    // format value "dd/mm/yyyy"
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
}

// format price
const priceFormat = (price) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(price);
};

const Admin_BillPage = () => {
    const dispatch = useDispatch();
    const adminToken = localStorage.getItem('adminToken');

    // state to control data in table
    const [selectedStatus, setSelectedStatus] = useState('processing');

    // select status when click on option status
    const handleStatusClick = (value) => {
        setSelectedStatus(value);
    };

    useEffect(() => {
        handleStatusClick('processing');
    }, []);

    const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
    const [isAcceptModalVisible, setIsAcceptModalVisible] = useState(false);
    const [currentOrderId, setCurrentOrderId] = useState(null);

    // ---------------------- STATE ----------------------
    const users_Redux = useSelector((state) => state.admin.users);
    const orders_Redux = useSelector((state) => state.admin.orders);
    const reloadFetch = orders_Redux?.needReload;

    // state to control modal
    const [isModalVisible, setIsModalVisible] = useState(false);
    const orderDetailRef = useRef(null);

    // ---------------------- FUNCTION GET ALL ORDERS ----------------------
    // function get all orders
    const getAllOrders = async () => {
        const res = await ProductService.getAllOrders(adminToken);
        return res;
    };

    // using react-query to fetch data
    const { data } = useQuery({
        queryKey: ['orders'],
        queryFn: getAllOrders,
        enabled: reloadFetch === true,
    });

    // useEffect to dispatch data to redux
    useEffect(() => {
        if (data?.data) {
            dispatch(addOrder({ data: data.data, needReload: false }));
        }
    }, [data, dispatch]);

    // ---------------------- FUNCTION GET DETAIL ORDER ----------------------
    // function get order detail
    const mutationGetDetailOrder = useMutationHook(({ token, orderId }) => {
        return ProductService.getOrderDetail(token, orderId);
    });

    const { data: dataOrderDetail } = mutationGetDetailOrder;
    const dataTableOrderDetail = dataOrderDetail?.data?.productItems;

    // get value user
    const valueUser = users_Redux?.data.find((user) => user?.id === dataOrderDetail?.data.user.id);

    const totalPrice = dataOrderDetail?.data?.totalPrice;

    // get detail order by id
    const handleGetDetailOrder = (orderId) => {
        if (orderId) {
            mutationGetDetailOrder.mutate(
                { token: adminToken, orderId },
                {
                    onSuccess: () => {
                        setIsModalVisible(true);
                    },
                }
            );
        } else {
            console.log('error', orderId, adminToken);
        }
    };

    // scroll to modal order detail
    useEffect(() => {
        if (isModalVisible && orderDetailRef.current) {
            orderDetailRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [isModalVisible]);

    // scroll to top page when click on button close modal order detail
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // show modal accept order
    const showModalAccept = (orderId) => {
        setCurrentOrderId(orderId);
        setIsAcceptModalVisible(true);
    };

    // function to accept order
    const mutationAcceptOrder = useMutationHook(({ token, orderId }) => {
        return ProductService.acceptOrder(token, orderId);
    });

    // handle accept order
    const handleAcceptOrder = () => {
        dispatch(acceptOrder({ orderId: currentOrderId }));
        setIsAcceptModalVisible(false);
        setCurrentOrderId(null);
        toast.success('Đơn hàng đã được chấp nhận');
        mutationAcceptOrder.mutate(
            { token: adminToken, orderId: currentOrderId },
            {
                onError: (e) => {
                    console.log('Accept order error', e);
                },
            }
        );
    };

    // show modal cancel order
    const showModalCancel = (orderId) => {
        setCurrentOrderId(orderId);
        setIsCancelModalVisible(true);
    };

    // function to accept order
    const mutationCancelOrder = useMutationHook(({ token, orderId }) => {
        return ProductService.cancelOrder(token, orderId);
    });

    // handle cancel order
    const handleCancelOrder = () => {
        dispatch(cancelOrder({ orderId: currentOrderId }));
        setIsCancelModalVisible(false);
        setCurrentOrderId(null);
        toast.success('Đơn hàng đã được hủy');
        mutationCancelOrder.mutate(
            { token: adminToken, orderId: currentOrderId },
            {
                onError: (e) => {
                    console.log('Cancel order error', e);
                },
            }
        );
    };

    // ---------------------- TABLE ----------------------
    // column display all orders
    const columns = [
        {
            title: 'STT',
            dataIndex: 'indexTable',
            align: 'center',
            width: '5%',
            key: 'indexTable',
            render: (text) => <p>{text}</p>,
            sort: (a, b) => a.indexTable - b.indexTable,
        },
        {
            title: 'Ngày đặt hàng',
            dataIndex: 'createdAt',
            align: 'center',
            width: '10%',
            key: 'createdAt',
            render: (text) => <p>{convertDate(text)}</p>,
        },
        {
            title: 'Mã khách hàng',
            dataIndex: 'user',
            width: '10%',
            align: 'center',
            key: 'user',
            render: (text) => <p>{text}</p>,
        },
        {
            title: 'Địa chỉ nhận hàng',
            dataIndex: 'shippingAddress',
            align: 'center',
            width: '20%',
            key: 'shippingAddress',
            render: (text) => <p>{text}</p>,
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'totalPrice',
            align: 'center',
            key: 'totalPrice',
            render: (price) =>
                new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                }).format(price),
            sorter: (a, b) => a.totalPrice - b.totalPrice,
        },
        {
            title: 'Phương thức thanh toán',
            dataIndex: 'paymentMethod',
            width: '10%',
            key: 'paymentMethod',
            align: 'center',
            render: (text) => (
                <button
                    className={`hover:cursor-pointer w-24 py-2 rounded-lg uppercase ${
                        text === 'vnpay' ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'
                    }`}
                >
                    {text === 'vnpay' ? 'VNPAY' : 'tiền mặt'}
                </button>
            ),
        },
        {
            title: 'Trạng thái thanh toán',
            dataIndex: 'paid',
            width: '10%',
            key: 'paid',
            align: 'center',
            render: (text) => (
                <button
                    className={`hover:cursor-pointer w-24 py-2 rounded-lg uppercase ${
                        text ? 'bg-blue-500 text-white' : 'bg-gray-500 text-white'
                    }`}
                >
                    {text ? 'rồi' : 'chưa'}
                </button>
            ),
            sorter: (a, b) => a.paid - b.paid,
        },
        {
            title: 'Thao tác',
            key: 'action',
            width: '15%',
            align: 'center',
            render: (item, _) => {
                if (!item.action) {
                    return null; // hoặc hiển thị một thông báo khác tương ứng
                }

                // Nếu đơn hàng là "Đơn hàng chờ xử lý"
                if (item.action === 'processing') {
                    return (
                        <Space size='middle'>
                            <div className='flex flex-col justify-center items-center gap-2'>
                                <button
                                    onClick={() => showModalAccept(item.key)}
                                    className='w-[10vw] flex justify-center items-center gap-2 hover:cursor-pointer bg-green-500 text-white px-2 py-2 rounded-lg'
                                >
                                    <TruckOutlined size={25} />
                                    Chấp nhận
                                </button>

                                <button
                                    onClick={() => handleGetDetailOrder(item.key)}
                                    className='w-[10vw] flex justify-center items-center gap-2 hover:cursor-pointer bg-blue-500 text-white px-2 py-2 rounded-lg'
                                >
                                    <EyeOutlined size={20} />
                                    Xem đơn
                                </button>

                                <button
                                    onClick={() => showModalCancel(item.key)}
                                    className='w-[10vw] flex justify-center items-center gap-2 hover:cursor-pointer bg-red-500 text-white px-2 py-2 rounded-lg'
                                >
                                    <SiAdblock size={15} />
                                    Hủy đơn
                                </button>
                            </div>
                        </Space>
                    );
                }

                // Nếu đơn hàng là "Đơn hàng đang giao"
                if (item.action === 'shipping') {
                    return (
                        <Space size='middle'>
                            <div className='flex flex-col justify-center items-center gap-2'>
                                <button
                                    onClick={() => handleGetDetailOrder(item.key)}
                                    className='w-[10vw] flex justify-center items-center gap-2 hover:cursor-pointer bg-blue-500 text-white px-2 py-2 rounded-lg'
                                >
                                    <EyeOutlined size={20} />
                                    Xem đơn
                                </button>
                            </div>
                        </Space>
                    );
                }

                // Nếu đơn hàng là "Đơn hàng thành công"
                if (item.action === 'complete') {
                    return (
                        <Space size='middle'>
                            <div className='flex flex-col justify-center items-center gap-2'>
                                <button
                                    onClick={() => handleGetDetailOrder(item.key)}
                                    className='w-[10vw] flex justify-center items-center gap-2 hover:cursor-pointer bg-blue-500 text-white px-2 py-2 rounded-lg'
                                >
                                    <EyeOutlined size={20} />
                                    Xem đơn
                                </button>
                            </div>
                        </Space>
                    );
                }

                // Nếu đơn hàng là "Đơn hàng bị hủy"
                if (item.action === 'cancel') {
                    return (
                        <Space size='middle'>
                            <div className='flex flex-col justify-center items-center gap-2'>
                                <button
                                    onClick={() => handleGetDetailOrder(item.key)}
                                    className='w-[10vw] flex justify-center items-center gap-2 hover:cursor-pointer bg-gray-500 text-white px-2 py-2 rounded-lg'
                                >
                                    <EyeOutlined size={20} />
                                    Xem đơn
                                </button>
                                <span className='bg-red-500 cursor-not-allowed text-white rounded-lg px-2 py-2 font-bold'>
                                    Đơn hàng đã bị hủy
                                </span>
                            </div>
                        </Space>
                    );
                }

                return null;
            },
        },
    ];

    // data all orders
    const dataTable = orders_Redux
        ? orders_Redux?.data
              .filter((order) => order?.state === selectedStatus)
              .map((order, indexorder) => ({
                  key: order?.id || indexorder,
                  indexTable: indexorder + 1,
                  createdAt: order.createdAt,
                  user: order.user,
                  shippingAddress: order.shippingAddress,
                  totalPrice: order.totalPrice,
                  paymentMethod: order.paymentMethod,
                  paid: order.paid,
                  action: order.state,
              }))
        : [];

    // column display order detail
    const columnOrder = [
        {
            title: 'Tên đồng hồ',
            dataIndex: 'productName',
            align: 'center',
            width: '25%',
            key: 'productName',
            render: (text) => <p>{text}</p>,
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
            width: '10%',
            align: 'center',
            key: 'price',
            render: (price) =>
                new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                }).format(price),
            sorter: (a, b) => a.totalPrice - b.totalPrice,
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            align: 'center',
            width: '10%',
            key: 'quantity',
            render: (text) => <p>{text}</p>,
        },
        {
            title: 'Màu sắc',
            dataIndex: 'color',
            align: 'center',
            width: '10%',
            key: 'color',
            render: (text) => <p>{text}</p>,
        },
        {
            title: 'Hãng',
            dataIndex: 'brand',
            align: 'center',
            width: '10%',
            key: 'brand',
            render: (text) => <p>{text}</p>,
        },
        {
            title: 'Xuất sứ',
            dataIndex: 'origin',
            align: 'center',
            width: '15%',
            key: 'origin',
            render: (text) => <p>{text}</p>,
        },
        {
            title: 'Tính năng',
            dataIndex: 'feature',
            align: 'center',
            width: '20%',
            key: 'feature',
            render: (text) => <p>{text}</p>,
        },
    ];

    // // data order detail
    const dataOrderTable = dataTableOrderDetail
        ? dataTableOrderDetail.map((item, indexorder) => ({
              key: item?.id || indexorder,
              productName: item.product.productName,
              price: item.product.price,
              quantity: item.quantity,
              color: item.product.color,
              brand: item.product.brand,
              origin: item.product.origin,
              feature: item.product.feature,
          }))
        : [];

    // ---------------------- FUNCTION CLOSE MODAL ----------------------
    // close modal order detail
    const handleCloseModalOrderDetail = () => {
        setIsModalVisible(false);
        scrollToTop();
    };

    return (
        <div>
            {/* title page */}
            <div className='mt-1 px-14 flex justify-center items-center'>
                <h1 className='font-bold text-3xl text-center'>Danh sách đơn hàng</h1>
            </div>

            {/* content page */}
            <div className='w-full mt-5'>
                {/* options to choose */}
                <div className='w-full flex justify-center items-center gap-5'>
                    {[
                        {
                            id: 1,
                            label: 'Đơn hàng chờ xử lý',
                            color: 'yellow',
                            value: 'processing',
                        },
                        { id: 2, label: 'Đơn hàng đang giao', color: 'green', value: 'shipping' },
                        { id: 3, label: 'Đơn hàng thành công', color: 'blue', value: 'complete' },
                        { id: 4, label: 'Đơn hàng bị hủy', color: 'red', value: 'cancel' },
                    ].map((status) => (
                        <div
                            key={status.id}
                            onClick={() => handleStatusClick(status.value)}
                            className={`relative bg-${status.color}-500 bg-opacity-${
                                selectedStatus === status.value ? '100' : '20'
                            } cursor-pointer w-[25vw] h-[10vh] rounded-lg flex justify-center items-center text-lg font-Montserrat font-bold text-${
                                status.color
                            }-900 transition-opacity duration-300`}
                        >
                            {status.label}
                        </div>
                    ))}
                </div>

                {/* table display data */}
                <div className='mt-5'>
                    <Table columns={columns} dataSource={dataTable} pagination={false} />

                    {/* modal accept */}
                    <Modal
                        title='Xác nhận chấp nhận đơn hàng'
                        open={isAcceptModalVisible}
                        onOk={handleAcceptOrder}
                        onCancel={() => setIsAcceptModalVisible(false)}
                        okText='Xác nhận'
                        okButtonProps={{
                            className: 'bg-blue-400 text-white hover:text-white',
                        }}
                        cancelText='Hủy'
                    >
                        <p>Xác nhận giao đơn hàng này?</p>
                    </Modal>

                    {/* modal refuse */}
                    <Modal
                        title='Xác nhận hủy đơn hàng'
                        open={isCancelModalVisible}
                        onOk={handleCancelOrder}
                        onCancel={() => setIsCancelModalVisible(false)}
                        okText='Xác nhận'
                        okButtonProps={{
                            className: 'bg-gray-500 text-white hover:text-white',
                        }}
                        cancelText='Hủy'
                    >
                        <p>Bạn có chắc chắn muốn hủy đơn hàng này?</p>
                    </Modal>
                </div>

                {/* display order detail */}
                {isModalVisible && (
                    <div ref={orderDetailRef} className='mt-5'>
                        <Table
                            // ref={orderDetailRef}
                            columns={columnOrder}
                            dataSource={dataOrderTable}
                            bordered
                            pagination={false}
                            title={() => (
                                <div className='w-full flex justify-center gap-2 items-center'>
                                    <span className='rounded-lg flex gap-2 justify-center items-center px-5 py-2 min-w-[15vw] bg-blue-500'>
                                        <UserOutlined size={20} />{' '}
                                        {`${valueUser.firstname} ${valueUser.lastname}`}
                                    </span>
                                    <span className='rounded-lg flex gap-2 justify-center items-center px-5 py-2 min-w-[15vw] bg-green-500'>
                                        <MailOutlined size={20} /> {valueUser.email}
                                    </span>
                                    <span className='rounded-lg flex gap-2 justify-center items-center px-5 py-2 min-w-[15vw] bg-yellow-500'>
                                        <PhoneOutlined size={20} /> {valueUser.phone}
                                    </span>
                                </div>
                            )}
                            footer={() => (
                                <div className='w-full flex flex-col justify-center items-end gap-2'>
                                    <div>
                                        <span className='text-lg text-red-500'>
                                            <span className='text-black'>Tổng tiền hóa đơn:</span>{' '}
                                            {priceFormat(totalPrice)}
                                        </span>
                                    </div>
                                    <button
                                        onClick={handleCloseModalOrderDetail}
                                        className='px-10 py-1 cursor-pointer bg-white text-black rounded-lg hover:bg-gray-500 hover:text-white border border-gray-500 transition duration-300'
                                    >
                                        Đóng cửa sổ
                                    </button>
                                </div>
                            )}
                        />
                    </div>
                )}
            </div>

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

export default Admin_BillPage;
