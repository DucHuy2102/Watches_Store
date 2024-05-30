import { useQuery } from '@tanstack/react-query';
import * as ProductService from '../../../../services/ProductService';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Modal, Space, Table, message } from 'antd';
import { MdDeleteOutline } from 'react-icons/md';
import { EditOutlined } from '@ant-design/icons';
import { useMutationHook } from '../../../../hooks/useMutationHook';
import { useDispatch } from 'react-redux';
import { updateProduct } from '../../../../redux/slides/productSlide';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const Admin_ListProduct = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);

    // go to add product page
    const handleGoToAddProduct = (path) => {
        return () => navigate(path);
    };

    // get all product
    const getAllProduct = async () => {
        const res = await ProductService.getAllProduct();
        return res;
    };
    const { data, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: getAllProduct,
        keepPreviousData: true,
    });

    const mutationNavigate = useMutationHook(async (id) => {
        try {
            const res = await ProductService.getProductById(id);
            if (res.code === 200) {
                dispatch(updateProduct(res.data));
            }
        } catch (error) {
            console.log(error);
        }
    });

    const handleEditProduct = (id) => {
        mutationNavigate.mutate(id, {
            onSuccess: () => {
                message.success('Chuyển đến trang Sửa thông tin sản phẩm');
                navigate(`/admin/product/edit/${id}`);
            },
            onError: () => {
                console.log('Get product by id failed');
            },
        });
    };

    // show modal when click delete button
    const showModal = (id) => {
        setSelectedProductId(id);
        setIsModalOpen(true);
    };

    const token = localStorage.getItem('adminToken');
    const mutationDelete = useMutationHook(({ token, id }) => {
        return ProductService.deleteProduct(token, id);
    });

    // onClick delete button
    const handleOk = () => {
        setIsModalOpen(false);
        try {
            mutationDelete.mutate(
                { token, id: selectedProductId },
                {
                    onSuccess: () => {
                        message.success(
                            'Xóa sản phẩm thành công. Trang sẽ tự động làm mới'
                        );
                    },
                    onError: () => {
                        message.error('Xóa sản phẩm thất bại');
                    },
                    onSettled: () => {
                        if (refetch) {
                            refetch();
                        }
                    },
                }
            );
        } catch (error) {
            console.error('Delete product failed:', error);
            message.error('Lỗi hệ thống! Xóa sản phẩm thất bại');
        }
    };

    // onClick cancel button in modal
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const columns = [
        {
            title: 'Tên đồng hồ',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <p>{text}</p>,
        },
        {
            title: 'Thương hiệu',
            dataIndex: 'brand',
            key: 'brand',
            align: 'center',
        },
        {
            title: 'Xuất sứ',
            dataIndex: 'origin',
            key: 'origin',
            align: 'center',
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            align: 'center',
            render: (price) =>
                new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                }).format(price),
            sorter: (a, b) => a.price - b.price,
        },
        {
            title: 'Số lượng tồn kho',
            dataIndex: 'amount',
            key: 'amount',
            align: 'center',
            sorter: (a, b) => a.amount - b.amount,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'stateWatch',
            key: 'stateWatch',
            align: 'center',
            render: (text) => (
                <button
                    className={`hover:cursor-pointer w-24 py-2 rounded-lg uppercase ${
                        text === 'saling'
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
                        onClick={() => handleEditProduct(item.key)}
                        className='flex justify-center items-center gap-1 hover:cursor-pointer bg-blue-500 text-white px-2 py-2 rounded-lg'
                    >
                        <EditOutlined size={20} />
                        Sửa
                    </button>
                    <button
                        onClick={() => showModal(item.key)}
                        className='flex justify-center items-center gap-1 hover:cursor-pointer bg-red-500 text-white px-2 py-2 rounded-lg'
                    >
                        <MdDeleteOutline size={20} />
                        Xóa
                    </button>
                </Space>
            ),
        },
    ];

    const dataTable = data?.data.map((product, indexProduct) => ({
        key: product.id || indexProduct,
        name: product.productName,
        brand: product.brand,
        origin: product.origin,
        username: product.username,
        price: product.price,
        amount: product.amount,
        stateWatch: product.state,
    }));

    return (
        <div>
            <div className='mt-3 px-14 flex justify-between items-center'>
                <h1 className='font-bold font-PlayfairDisplay text-3xl mt-2 text-center'>
                    Danh sách đồng hồ
                </h1>
                <div className='flex justify-center items-center gap-5'>
                    <button
                        onClick={handleGoToAddProduct('/admin/product/add')}
                        className='border border-gray-400 text-lg rounded-lg hover:bg-blue-500 hover:border-blue-500 hover:text-white transition duration-200 px-3 py-3'
                    >
                        Thêm sản phẩm mới
                    </button>
                </div>
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
            <Modal
                title='Xác nhận xóa sản phẩm'
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
                    Hành động này sẽ xóa sản phẩm khỏi hệ thống và dữ liệu không
                    thể khôi phục!
                </p>
            </Modal>
        </div>
    );
};

export default Admin_ListProduct;
