import { Space, Table, Modal } from 'antd';
import { CheckCircleOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { acceptOrder, cancelOrder } from '../../redux/slides/orderSlide';
import { useMutationHook } from '../../hooks/useMutationHook';
import * as ProductService from '../../services/ProductService';

// format price
const priceFormat = (price) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(price);
};

// format id order to short code
const generateReadableCode = (orderCode, length) => {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digits = '0123456789';
    const baseChars = uppercaseChars + digits;
    let readableCode = '';
    readableCode += uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];
    for (let i = 1; i < length; i++) {
        let index = parseInt(orderCode.slice((i - 1) * 2, (i - 1) * 2 + 2), 16) % baseChars.length;
        readableCode += baseChars[index];
    }
    return readableCode;
};

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

const ListOrders = () => {
    const dispatch = useDispatch();
    const orderDetailRef = useRef(null);
    const token = localStorage.getItem('tokenUser');

    // Get order detail from Redux
    const order_Redux = useSelector((state) => state.orderProduct.orderDetail);
    console.log('order_Redux', order_Redux);

    // state for modal
    const [modalCancelVisible, setModalCancelVisible] = useState(false);
    const [modalAcceptVisible, setModalAcceptVisible] = useState(false);
    const [orderToCancel, setOrderToCancel] = useState(null);
    const [orderToAccept, setOrderToAccept] = useState(null);
    const [idOrderDetail, setIdOrderDetail] = useState(null);

    // get idOrder when click on button view detail
    const handleGetInfoDetail = (orderId) => {
        if (orderId) {
            setIdOrderDetail(orderId);
        } else {
            console.log('error', orderId);
        }
    };

    // close modal order detail
    const handleCloseModalOrderDetail = () => {
        setIdOrderDetail(null);
        scrollToTop();
    };

    // ------------------------ CANCEL ORDER ------------------------
    // handle get idOrder when click on button cancel order
    const hanleCancelOrder = (idOrder) => {
        setOrderToCancel(idOrder);
        setModalCancelVisible(true);
    };

    // mutation cancel order
    const mutationCancelOrder = useMutationHook(({ token, idOrder }) =>
        ProductService.cancelOrder(token, idOrder)
    );

    // cancel order
    const handleConfirmCancelOrder = () => {
        if (orderToCancel) {
            dispatch(cancelOrder({ orderId: orderToCancel }));
            setModalCancelVisible(false);
            mutationCancelOrder.mutate(
                { token, idOrder: orderToCancel },
                {
                    onSuccess: () => {
                        console.log('Cancel order success');
                    },
                }
            );
        }
    };

    // ------------------------ ACCEPT ORDER ------------------------
    // handle get idOrder when click on button accept order
    const handleAcceptOrder = (idOrder) => {
        setOrderToAccept(idOrder);
        setModalAcceptVisible(true);
    };

    // mutation cancel order
    const mutationAcceptOrder = useMutationHook(({ token, idOrder }) =>
        ProductService.acceptOrder(token, idOrder)
    );

    const handleConfirmAcceptOrder = () => {
        if (orderToAccept) {
            dispatch(acceptOrder({ orderId: orderToAccept }));
            setModalAcceptVisible(false);
            mutationAcceptOrder.mutate(
                { token, idOrder: orderToAccept },
                {
                    onSuccess: () => {
                        console.log('Accept order success');
                    },
                }
            );
        }
    };

    // ------------------------ TABLE ALL ORDER ------------------------
    // Render actions
    const renderActions = (state, item) => {
        switch (state) {
            case 'processing':
                return (
                    <Space size='middle'>
                        <button
                            onClick={() => handleGetInfoDetail(item.idOrder)}
                            className='flex gap-2 justify-center items-center rounded-lg bg-green-500 w-32 px-1 py-2'
                        >
                            <EyeOutlined /> Xem chi tiết
                        </button>
                        <button
                            onClick={() => {
                                hanleCancelOrder(item.idOrder);
                            }}
                            className='flex gap-2 justify-center items-center rounded-lg bg-red-500 w-32 px-1 py-2'
                        >
                            <DeleteOutlined /> Hủy đơn hàng
                        </button>
                    </Space>
                );
            case 'shipping':
                return (
                    <Space size='middle'>
                        <button
                            onClick={() => handleGetInfoDetail(item.idOrder)}
                            className='flex gap-2 justify-center items-center rounded-lg bg-green-500 w-32 px-1 py-2'
                        >
                            <EyeOutlined /> Xem chi tiết
                        </button>
                        <button
                            onClick={() => handleAcceptOrder(item.idOrder)}
                            className='flex gap-2 justify-center items-center rounded-lg bg-blue-500 w-32 px-1 py-2'
                        >
                            <CheckCircleOutlined /> Nhận hàng
                        </button>
                    </Space>
                );
            case 'complete':
                return (
                    <Space size='middle'>
                        <button
                            onClick={() => handleGetInfoDetail(item.idOrder)}
                            className='flex gap-2 justify-center items-center rounded-lg bg-green-500 w-32 px-1 py-2'
                        >
                            <EyeOutlined /> Xem chi tiết
                        </button>
                    </Space>
                );
            case 'cancel':
                return (
                    <Space size='middle'>
                        <button
                            onClick={() => handleGetInfoDetail(item.idOrder)}
                            className='flex gap-2 justify-center items-center rounded-lg bg-green-500 w-32 px-1 py-2'
                        >
                            <EyeOutlined /> Xem chi tiết
                        </button>
                    </Space>
                );
            default:
                return null;
        }
    };

    // Table columns all order
    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            align: 'center',
            width: '5%',
            sorter: (a, b) => a.stt - b.stt,
        },
        {
            title: 'Mã đơn hàng',
            dataIndex: 'idOrder',
            key: 'idOrder',
            align: 'center',
            width: '10%',
            render: (id) => generateReadableCode(id, 10),
        },
        {
            title: 'Địa chỉ nhận hàng',
            dataIndex: 'shippingAddress',
            key: 'shippingAddress',
            align: 'center',
            width: '35%',
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            align: 'center',
            width: '15%',
            render: (price) =>
                new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                }).format(price),
            sorter: (a, b) => a.totalPrice - b.totalPrice,
        },
        {
            title: 'Trạng thái đơn hàng',
            dataIndex: 'state',
            key: 'state',
            align: 'center',
            width: '15%',
            render: (text) => (
                <button
                    className={`w-24 py-2 rounded-lg uppercase ${
                        text === 'processing'
                            ? 'bg-yellow-500 text-white'
                            : text === 'shipping'
                            ? 'bg-blue-500 text-white'
                            : text === 'complete'
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                    }`}
                >
                    {text === 'processing'
                        ? 'Đang xử lý'
                        : text === 'shipping'
                        ? 'Đang giao'
                        : text === 'complete'
                        ? 'Đã giao'
                        : 'Thất bại'}
                </button>
            ),
        },
        {
            title: 'Thao tác',
            key: 'action',
            align: 'center',
            width: '25%',
            render: (record) => renderActions(record.state, record),
        },
    ];

    // Data table all order
    const dataTable = order_Redux?.map((item, index) => ({
        key: item?.id || index,
        stt: index + 1,
        idOrder: item?.id,
        shippingAddress: item?.shippingAddress,
        totalPrice: item?.totalPrice,
        state: item?.state,
    }));

    // ------------------------ TABLE ORDER DETAIL ------------------------
    // format data to map for table order detail
    const dataOrderDetail = order_Redux.filter((item) => item.id === idOrderDetail);
    const totalPriceOrder = dataOrderDetail[0]?.totalPrice;

    // Table columns order detail
    const columnsOrderDetail = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            align: 'center',
            width: '5%',
            render: (text, record, index) => index + 1,
            sorter: (a, b) => a.stt - b.stt,
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
            title: <div className='text-center'>Thông tin sản phẩm</div>,
            dataIndex: 'idOrder',
            key: 'idOrder',
            width: '30%',
            render: (text, record) => (
                <div className='flex justify-start items-center'>
                    <img src={record.img} alt={text} className='w-12 h-12 object-cover mr-5' />
                    <span>{record.productName}</span>
                </div>
            ),
        },
        {
            title: 'Hãng',
            dataIndex: 'brand',
            key: 'brand',
            align: 'center',
            width: '10%',
        },
        {
            title: 'Màu sắc',
            dataIndex: 'color',
            key: 'color',
            align: 'center',
            width: '10%',
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
            key: 'price',
            align: 'center',
            width: '15%',
            render: (price) =>
                new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                }).format(price),
            sorter: (a, b) => a.price - b.price,
        },
        {
            title: 'Số lượng',
            dataIndex: 'amount',
            key: 'amount',
            align: 'center',
            width: '5%',
        },
        {
            title: 'Giảm giá',
            dataIndex: 'discount',
            key: 'discount',
            align: 'center',
            width: '10%',
            render: (discount, record) => {
                const discountAmount = (record.price * discount) / 100;
                return new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                }).format(discountAmount);
            },
            sorter: (a, b) => a.discount - b.discount,
        },
        {
            title: 'Thành tiền',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            align: 'center',
            width: '20%',
            render: (_, record) =>
                new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                }).format(record.price * record.amount),
            sorter: (a, b) => a.totalPrice - b.totalPrice,
        },
    ];

    // Format data for table order detail
    const mapOrder = dataOrderDetail.flatMap((order) =>
        order.productItems.map((item, index) => ({
            key: item?.productId || index,
            stt: index + 1,
            orderId: order.id,
            totalPrice: order.totalPrice,
            img: item.product.img[0],
            productId: item.product.id,
            productName: item.product.productName,
            color: item.product.color,
            price: item.product.price,
            amount: item.quantity,
            brand: item.product.brand,
            createdAt: order.createdAt,
            discount: item.product.discount,
        }))
    );

    // ------------------------ SCROLL ------------------------
    // Scroll to top when render
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // scroll to modal order detail
    useEffect(() => {
        if (idOrderDetail && orderDetailRef.current) {
            orderDetailRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [idOrderDetail]);

    // scroll to top page when click on button close modal order detail
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className='p-5'>
            <div className='w-full min-h-[60vh] bg-white shadow-md rounded-lg p-5'>
                <span className='w-full mb-3 text-2xl font-bold flex justify-center items-center'>
                    Tất cả đơn hàng
                </span>
                <Table columns={columns} dataSource={dataTable} pagination={false} />
            </div>
            {idOrderDetail ? (
                <div ref={orderDetailRef}>
                    <span className='w-full text-2xl py-5 font-bold flex justify-center items-center'>
                        Chi tiết đơn hàng
                    </span>
                    <Table
                        columns={columnsOrderDetail}
                        dataSource={mapOrder}
                        pagination={false}
                        footer={() => (
                            <div className='w-full flex flex-col justify-center items-end gap-2'>
                                <div className='flex flex-col'>
                                    <span className='text-lg text-red-500'>
                                        <span className='text-black'>Tổng tiền hóa đơn:</span>{' '}
                                        {priceFormat(totalPriceOrder)}
                                    </span>
                                    <span className='flex justify-end'>
                                        (Đã được tính giảm giá)
                                    </span>
                                </div>
                                <button
                                    onClick={handleCloseModalOrderDetail}
                                    className='px-10 py-1 cursor-pointer bg-gray-500 text-white rounded-lg hover:bg-blue-500 hover:border-blue-500 hover:text-white border border-gray-500 transition duration-300'
                                >
                                    Đóng cửa sổ
                                </button>
                            </div>
                        )}
                    />
                </div>
            ) : null}

            {/* modal accept order */}
            <Modal
                title='Xác nhận đã nhận đơn hàng'
                open={modalAcceptVisible}
                onCancel={() => setModalAcceptVisible(false)}
                footer={[
                    <button
                        className='rounded-md w-20 py-1 border border-gray-400 hover:bg-gray-400 transition duration-300 hover:text-white cursor-pointer'
                        key='cancel'
                        onClick={() => setModalAcceptVisible(false)}
                    >
                        Hủy
                    </button>,
                    <button
                        className='bg-blue-400 text-white ml-5 rounded-md w-20 py-1 border border-blue-400 transition duration-300 cursor-pointer'
                        key='ok'
                        onClick={handleConfirmAcceptOrder}
                    >
                        Xác nhận
                    </button>,
                ]}
            >
                <p>Cảm ơn quý khách hàng đã lựa chọn dịch vụ của chúng tôi.</p>
            </Modal>

            {/* modal cancel order */}
            <Modal
                title='Xác nhận hủy đơn hàng'
                open={modalCancelVisible}
                onCancel={() => setModalCancelVisible(false)}
                footer={[
                    <button
                        className='rounded-md w-20 py-1 border border-gray-400 hover:bg-gray-400 transition duration-300 hover:text-white cursor-pointer'
                        key='cancel'
                        onClick={() => setModalCancelVisible(false)}
                    >
                        Hủy
                    </button>,
                    <button
                        className='bg-red-400 hover:bg-red-500 text-white ml-5 rounded-md w-20 py-1 border border-red-400 transition duration-300 cursor-pointer'
                        key='ok'
                        onClick={handleConfirmCancelOrder}
                    >
                        Xác nhận
                    </button>,
                ]}
            >
                <p>Bạn có chắc chắn muốn hủy đơn hàng này?</p>
            </Modal>
        </div>
    );
};

export default ListOrders;
