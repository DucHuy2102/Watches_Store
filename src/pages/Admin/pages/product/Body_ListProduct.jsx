import { useNavigate } from 'react-router-dom';
import { useMutationHook } from '../../../../hooks/useMutationHook';
import * as ProductService from '../../../../services/ProductService';
import { useDispatch } from 'react-redux';
import { updateProduct } from '../../../../redux/slides/productSlide';
import { Modal, message } from 'antd';
import { useState } from 'react';

const Body_ListProduct = (props) => {
    const { id, productName, price, img, amount, state, removeProductFromList } = props.product;
    const priceFormat = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    const navigate = useNavigate();
    const dispatch = useDispatch();

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

    const handleNavigation = (id) => {
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

    const token = localStorage.getItem('adminToken');
    const mutationDelete = useMutationHook(({ token, id }) => {
        return ProductService.deleteProduct(token, id);
    });

    const [isModalOpen, setIsModalOpen] = useState(false);

    // show modal when click delete button
    const showModal = () => {
        setIsModalOpen(true);
        console.log('id modal', id);
    };

    // onClick delete button
    const handleOk = () => {
        setIsModalOpen(false);
        try {
            mutationDelete.mutate(
                { token, id },
                {
                    onSuccess: () => {
                        message.success('Xóa sản phẩm thành công');
                        navigate('/admin/product', { replace: true });
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

    return (
        <tbody className='border border-black'>
            <tr>
                <td className='py-4 border border-black'>
                    <div className='flex items-center pl-10'>
                        {/* image */}
                        <img className='h-20 w-20' src={img[0]} alt='Product image' />

                        {/* name */}
                        <span className='w-80 font-semibold'>{productName}</span>
                    </div>
                </td>

                {/* state */}
                <td className='py-4 text-center border border-black'>
                    <button className='rounded-md py-2 px-4 mr-2 bg-blue-500 text-white hover:cursor-pointer hover:text-white '>
                        {state ? 'Còn hàng' : 'Hết hàng'}
                    </button>
                </td>

                {/* price */}
                <td className='py-4 text-center border border-black'>{priceFormat}</td>

                {/* amount */}
                <td className='py-4 text-center border border-black'>{amount}</td>

                {/* actions: edit or delete */}
                <td className='py-4 border border-black'>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        {/* edit button */}
                        <button
                            onClick={() => handleNavigation(id)}
                            className='bg-gray-300 rounded-md py-2 px-4 hover:bg-yellow-500 hover:cursor-pointer hover:text-white'
                        >
                            Sửa
                        </button>

                        {/* delete button */}
                        <button
                            onClick={showModal}
                            className='bg-gray-300 rounded-md py-2 px-4 hover:bg-red-500 hover:cursor-pointer hover:text-white'
                        >
                            Xóa
                        </button>
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
                    </div>
                </td>
            </tr>
        </tbody>
    );
};

export default Body_ListProduct;
