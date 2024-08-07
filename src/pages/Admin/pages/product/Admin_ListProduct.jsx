import * as ProductService from '../../../../services/ProductService';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Modal, Space, Table } from 'antd';
import { MdDeleteOutline } from 'react-icons/md';
import { EditOutlined } from '@ant-design/icons';
import { useMutationHook } from '../../../../hooks/useMutationHook';
import { useDispatch, useSelector } from 'react-redux';
import {
    addAllProducts,
    removeProductAdmin,
    getDetailProduct,
} from '../../../../redux/slides/adminSlide';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import { useQuery } from '@tanstack/react-query';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const Admin_ListProduct = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // get token from localStorage
    const token = localStorage.getItem('adminToken');

    // state for modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);

    // navigate to Add_Product_Page
    const handleGoToAddProduct = (path) => {
        return () => navigate(path);
    };

    // get data from redux
    const products_Redux = useSelector((state) => state.admin.productsAdmin);
    console.log('products_Redux:', products_Redux);
    const reloadFetch = products_Redux?.needReload;

    // ------------------------------- GET ALL PRODUCTS & DISPATCH TO REDUX STORE -------------------------------
    // Function to get all products from API
    const getProducts = async () => {
        const res = await ProductService.getAllProduct();
        return res;
    };

    // Fetch data from API using react-query
    const { data, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: getProducts,
        enabled: reloadFetch === true,
        staleTime: 0,
    });

    // Add all products to redux store after fetching data
    useEffect(() => {
        if (data?.data) {
            dispatch(addAllProducts({ data: data.data }));
        }
    }, [data, dispatch]);

    // Show toast when loading data
    useEffect(() => {
        if (isLoading) {
            toast.info('Đang tải dữ liệu, vui lòng đợi!');
        }
    }, [isLoading]);

    // ---------------------------------- EDIT PRODUCT ----------------------------------
    // handle edit product
    const handleEditProduct = (id) => {
        const product = products_Redux?.data?.find((product) => product.id === id);
        if (product) {
            dispatch(getDetailProduct(product));
            navigate(`/admin/product/edit/${id}`);
        } else {
            console.error(`Product with id ${id} not found`);
        }
    };

    // ---------------------------------- DELETE PRODUCT ----------------------------------
    // show modal when click delete button
    const showModal = (id) => {
        setSelectedProductId(id);
        setIsModalOpen(true);
    };

    // useMutationHook to delete product
    const mutationDelete = useMutationHook(({ token, id }) => {
        return ProductService.deleteProduct(token, id);
    });

    // click delete button
    const handleOk = () => {
        setIsModalOpen(false);
        mutationDelete.mutate(
            { token, id: selectedProductId },
            {
                onSuccess: () => {
                    dispatch(removeProductAdmin({ idProduct: selectedProductId }));
                    toast.success('Xóa sản phẩm thành công!');
                },
                onError: (error) => {
                    toast.error('Lỗi hệ thống! Vui lòng thử lại sau!');
                    console.error('Error when admin delete product:', error);
                },
            }
        );
    };

    // onClick cancel button in modal
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // ---------------------------------- TABLE ----------------------------------
    // column for table
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
                        text === 'saling' ? 'bg-blue-500 text-white' : 'bg-gray-500 text-white'
                    }`}
                >
                    {text === 'saling' ? 'đang bán' : 'hết hàng'}
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

    // data for table
    const dataTable = products_Redux?.data?.map((product, indexProduct) => ({
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
            {/* top */}
            <div className='mt-3 px-14 flex justify-between items-center'>
                {/* title page */}
                <h1 className='font-bold font-PlayfairDisplay text-3xl mt-2 text-center'>
                    Danh sách đồng hồ
                </h1>

                {/* button add new product */}
                <div className='flex justify-center items-center gap-5'>
                    <button
                        onClick={handleGoToAddProduct('/admin/product/add')}
                        className='border border-gray-400 text-lg rounded-lg hover:bg-blue-500 hover:border-blue-500 hover:text-white transition duration-200 px-3 py-3'
                    >
                        Thêm sản phẩm mới
                    </button>
                </div>
            </div>

            {/* content */}
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

            {/* modal delete product */}
            <Modal
                title='Xác nhận xóa sản phẩm'
                okText='Xác nhận xóa'
                cancelText='Hủy bỏ'
                style={{ textAlign: 'center' }}
                open={isModalOpen}
                okButtonProps={{
                    className: 'bg-black text-white hover:bg-red-500 hover:text-white',
                }}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p className='text-lg'>
                    Hành động này sẽ xóa sản phẩm khỏi hệ thống và dữ liệu không thể khôi phục!
                </p>
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

export default Admin_ListProduct;
