import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Radio, Upload, Image, message, Select } from 'antd';
import { useEffect, useRef, useState } from 'react';
import * as ProductService from '../../../../services/ProductService';
import { useMutationHook } from '../../../../hooks/useMutationHook';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import { editProductAdmin, resetProduct } from '../../../../redux/slides/adminSlide';

const { TextArea } = Input;

// normFile: upload image
const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

// getBase64: get base64 image
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

// uploadImages: upload image to cloudinary
const uploadImages = async (fileList) => {
    const uploadedImages = await Promise.all(
        fileList.map(async (file) => {
            if (file.originFileObj) {
                const formData = new FormData();
                formData.append('file', file.originFileObj);
                formData.append('upload_preset', 'product');
                try {
                    const res = await axios.post(
                        'https://api.cloudinary.com/v1_1/dajzl4hdt/image/upload',
                        formData
                    );
                    const response = res.data;
                    return response.secure_url;
                } catch (error) {
                    console.error('Upload failed:', error);
                    message.error(
                        'Không thể thêm hình ảnh này vì kích thước quá lớn! Hãy chọn ảnh khác'
                    );
                    return null;
                }
            } else {
                return file.url;
            }
        })
    );
    return uploadedImages.filter((url) => url !== null);
};

const Admin_EditProduct = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // get token from localStorage
    const adminToken = localStorage.getItem('adminToken');

    // get product from redux
    const product_Redux = useSelector((state) => state?.admin.product);

    // state for product and fileList
    const [stateProduct, setStateProduct] = useState(product_Redux);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([]);

    // Set initial state for product and fileList
    // when the page is loaded or product_Redux is changed
    useEffect(() => {
        setStateProduct(product_Redux);
        const initialFileList = product_Redux.img.map((url, index) => ({
            uid: index.toString(),
            name: `image-${index}`,
            status: 'done',
            url: url,
        }));
        setFileList(initialFileList);
    }, [product_Redux]);

    // useMutationHook to edit product
    const mutation = useMutationHook(({ adminToken, product }) => {
        return ProductService.editProduct(adminToken, product);
    });

    // add product function
    const handleEditProduct = async () => {
        const uploadedImages = await uploadImages(fileList);
        const amountNumber = parseInt(stateProduct.amount);
        const priceNumber = parseInt(stateProduct.price);
        const productData = {
            ...stateProduct,
            amount: amountNumber,
            price: priceNumber,
            img: uploadedImages,
        };
        dispatch(editProductAdmin({ idProduct: product_Redux.id, product: productData }));
        // dispatch(resetProduct());
        toast.success('Cập nhật sản phẩm thành công');
        mutation.mutate(
            { adminToken, product: productData },
            {
                onSuccess: () => {
                    navigate('/admin/product');
                },
                onError: (error) => {
                    console.log('Edit product failed', error);
                },
            }
        );
    };

    // Handle input change
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setStateProduct((prev) => ({ ...prev, [name]: value }));
    };

    // Handle radio change
    const handleSelectChange = (value) => {
        setStateProduct((prev) => ({ ...prev, state: value }));
    };

    // Handle change image
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

    // Handle preview image
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    // Upload button
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div>Thêm ảnh</div>
        </div>
    );

    // autoFocus: Focus on the first input tag when the page is loaded
    const inputTagRef = useRef(null);
    useEffect(() => {
        if (inputTagRef.current) {
            inputTagRef.current.focus();
        }
    }, []);

    return (
        <>
            <h1 className='font-bold text-2xl mt-5 pl-14 mb-5'>Sửa thông tin đồng hồ</h1>

            {/* form */}
            <Form
                initialValues={stateProduct}
                onFinish={handleEditProduct}
                className='px-14'
                layout='vertical'
            >
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {/* product name */}
                    <Form.Item
                        label='Tên đồng hồ'
                        name='productName'
                        rules={[
                            {
                                required: true,
                                message: 'Tên đồng hồ không được bỏ trống!',
                            },
                        ]}
                    >
                        <Input
                            ref={inputTagRef}
                            name='productName'
                            value={stateProduct.productName}
                            onChange={handleOnChange}
                            className='w-full '
                        />
                    </Form.Item>

                    {/* brand */}
                    <Form.Item
                        label='Hãng đồng hồ'
                        name='brand'
                        rules={[
                            {
                                required: true,
                                message: 'Hãng đồng hồ không được bỏ trống!',
                            },
                        ]}
                    >
                        <Input
                            name='brand'
                            value={stateProduct.brand}
                            onChange={handleOnChange}
                            className='w-full'
                        />
                    </Form.Item>

                    {/* price & amount */}
                    <div className='w-full flex items-center justify-between gap-5'>
                        {/* price */}
                        <Form.Item
                            label='Giá đồng hồ (VNĐ)'
                            name='price'
                            rules={[
                                {
                                    required: true,
                                    message: 'Giá đồng hồ không được bỏ trống!',
                                },
                                () => ({
                                    validator(_, value) {
                                        return new Promise((resolve, reject) => {
                                            if (isNaN(value)) {
                                                reject('Giá đồng hồ phải là một số.');
                                            } else {
                                                resolve();
                                            }
                                        });
                                    },
                                }),
                            ]}
                            className='w-full'
                        >
                            <Input
                                name='price'
                                value={stateProduct.price}
                                onChange={handleOnChange}
                                className='text-right'
                            />
                        </Form.Item>

                        {/* amount */}
                        <Form.Item
                            label='Số lượng'
                            name='amount'
                            rules={[
                                {
                                    required: true,
                                    message: 'Số lượng không được bỏ trống!',
                                },
                                () => ({
                                    validator(_, value) {
                                        return new Promise((resolve, reject) => {
                                            if (isNaN(value)) {
                                                reject('Số lượng phải là một số.');
                                            } else {
                                                resolve();
                                            }
                                        });
                                    },
                                }),
                            ]}
                            className='w-full'
                        >
                            <Input
                                name='amount'
                                value={stateProduct.amount}
                                onChange={handleOnChange}
                                className='text-right'
                            />
                        </Form.Item>
                    </div>

                    {/* condition & discount percent */}
                    <div className='w-full flex items-center justify-between gap-5'>
                        {/* condition */}
                        <Form.Item
                            label='Trạng thái'
                            name='condition'
                            rules={[
                                {
                                    required: true,
                                    message: 'Trạng thái không được bỏ trống!',
                                },
                            ]}
                            className='w-full'
                        >
                            <Select
                                allowClear
                                onChange={handleSelectChange}
                                value={stateProduct.condition}
                            >
                                <Select.Option value='Mới'>Hàng mới nhập</Select.Option>
                                <Select.Option value='Đã sử dụng'>
                                    Hàng đã qua sử dụng
                                </Select.Option>
                            </Select>
                        </Form.Item>

                        {/* discount percent */}
                        <Form.Item
                            label='Giảm giá (%)'
                            name='discount'
                            rules={[
                                {
                                    required: true,
                                    message: 'Giảm giá không được bỏ trống!',
                                },
                            ]}
                            className='w-full'
                        >
                            <Input
                                name='discount'
                                value={stateProduct.discount}
                                onChange={handleOnChange}
                                className='w-full'
                            />
                        </Form.Item>
                    </div>

                    {/* origin */}
                    <Form.Item
                        label='Xuất xứ'
                        name='origin'
                        rules={[
                            {
                                required: true,
                                message: 'Xuất xứ không được bỏ trống!',
                            },
                        ]}
                    >
                        <Input
                            name='origin'
                            value={stateProduct.origin}
                            onChange={handleOnChange}
                            className='w-full'
                        />
                    </Form.Item>

                    {/* size product */}
                    <Form.Item
                        label='Kích thước'
                        name='size'
                        rules={[
                            {
                                required: true,
                                message: 'Kích thước không được bỏ trống!',
                            },
                        ]}
                    >
                        <Input
                            name='size'
                            value={stateProduct.size}
                            onChange={handleOnChange}
                            className='w-full'
                        />
                    </Form.Item>

                    {/* thichness */}
                    <Form.Item
                        label='Độ dày'
                        name='thickness'
                        rules={[
                            {
                                required: true,
                                message: 'Độ dày không được bỏ trống!',
                            },
                        ]}
                    >
                        <Input
                            name='thickness'
                            value={stateProduct.thickness}
                            onChange={handleOnChange}
                            className='w-full'
                        />
                    </Form.Item>

                    {/* wireMaterial */}
                    <Form.Item
                        label='Chất liệu dây'
                        name='wireMaterial'
                        rules={[
                            {
                                required: true,
                                message: 'Chất liệu dây không được bỏ trống!',
                            },
                        ]}
                    >
                        <Input
                            name='wireMaterial'
                            value={stateProduct.wireMaterial}
                            onChange={handleOnChange}
                            className='w-full'
                        />
                    </Form.Item>

                    {/* shellMaterial */}
                    <Form.Item
                        label='Chất liệu vỏ'
                        name='shellMaterial'
                        rules={[
                            {
                                required: true,
                                message: 'Chất liệu vỏ không được bỏ trống!',
                            },
                        ]}
                    >
                        <Input
                            name='shellMaterial'
                            value={stateProduct.shellMaterial}
                            onChange={handleOnChange}
                            className='w-full'
                        />
                    </Form.Item>

                    {/* style */}
                    <Form.Item
                        label='Phong cách đồng hồ'
                        name='style'
                        rules={[
                            {
                                required: true,
                                message: 'Phong cách đồng hồ không được bỏ trống!',
                            },
                        ]}
                    >
                        <Input
                            name='style'
                            value={stateProduct.style}
                            onChange={handleOnChange}
                            className='w-full'
                        />
                    </Form.Item>

                    {/* feature */}
                    <Form.Item
                        label='Tính năng'
                        name='feature'
                        rules={[
                            {
                                required: true,
                                message: 'Tính năng không được bỏ trống!',
                            },
                        ]}
                    >
                        <Input
                            name='feature'
                            value={stateProduct.feature}
                            onChange={handleOnChange}
                            className='w-full'
                        />
                    </Form.Item>

                    {/* shape */}
                    <Form.Item
                        label='Hình dáng đồng hồ'
                        name='shape'
                        rules={[
                            {
                                required: true,
                                message: 'Hình dáng đồng hồ không được bỏ trống!',
                            },
                        ]}
                    >
                        <Input
                            name='shape'
                            value={stateProduct.shape}
                            onChange={handleOnChange}
                            className='w-full'
                        />
                    </Form.Item>

                    {/* weight */}
                    <Form.Item
                        label='Trọng lượng đồng hồ'
                        name='weight'
                        rules={[
                            {
                                required: true,
                                message: 'Trọng lượng đồng hồ không được bỏ trống!',
                            },
                        ]}
                    >
                        <Input
                            name='weight'
                            value={stateProduct.weight}
                            onChange={handleOnChange}
                            className='w-full'
                        />
                    </Form.Item>

                    {/* genderUser */}
                    <Form.Item
                        label='Đối tượng sử dụng'
                        name='genderUser'
                        rules={[
                            {
                                required: true,
                                message: 'Đối tượng sử dụng không được bỏ trống!',
                            },
                        ]}
                    >
                        <Input
                            name='genderUser'
                            value={stateProduct.genderUser}
                            onChange={handleOnChange}
                            className='w-full'
                        />
                    </Form.Item>

                    {/* color */}
                    <Form.Item
                        label='Màu sắc'
                        name='color'
                        rules={[
                            {
                                required: true,
                                message: 'Màu sắc không được bỏ trống!',
                            },
                        ]}
                    >
                        <Input
                            name='color'
                            value={stateProduct.color}
                            onChange={handleOnChange}
                            className='w-full'
                        />
                    </Form.Item>

                    {/* waterproof */}
                    <Form.Item
                        label='Kháng nước'
                        name='waterproof'
                        rules={[
                            {
                                required: true,
                                message: 'Kháng nước không được bỏ trống!',
                            },
                        ]}
                    >
                        <Input
                            name='waterproof'
                            value={stateProduct.waterproof}
                            onChange={handleOnChange}
                            className='w-full'
                        />
                    </Form.Item>
                </div>
                <Form.Item
                    label='Mô tả'
                    name='description'
                    rules={[
                        {
                            required: true,
                            message: 'Mô tả không được bỏ trống!',
                        },
                    ]}
                    className='col-span-2 md:col-span-1'
                >
                    <TextArea
                        rows={4}
                        name='description'
                        value={stateProduct.description}
                        onChange={handleOnChange}
                    />
                </Form.Item>
                <div className='flex items-center justify-between'>
                    <Form.Item
                        label='Ảnh sản phẩm'
                        name='img'
                        valuePropName='fileList'
                        getValueFromEvent={normFile}
                        className='col-span-2'
                    >
                        <>
                            <Upload
                                beforeUpload={() => false}
                                listType='picture-card'
                                fileList={fileList}
                                onPreview={handlePreview}
                                onChange={handleChange}
                            >
                                {fileList.length >= 10 ? null : uploadButton}
                            </Upload>
                            {previewImage && (
                                <Image
                                    key={
                                        fileList.find((file) => file.url === previewImage)?.uid ||
                                        'preview'
                                    }
                                    wrapperStyle={{ display: 'none' }}
                                    preview={{
                                        visible: previewOpen,
                                        onVisibleChange: (visible) => setPreviewOpen(visible),
                                        afterOpenChange: (visible) =>
                                            !visible && setPreviewImage(''),
                                    }}
                                    src={previewImage}
                                />
                            )}
                        </>
                    </Form.Item>

                    <Button
                        type='primary'
                        htmlType='submit'
                        className='bg-gray-300 mt-1 text-black hover:bg-blue-500 transition duration-300 hover:cursor-pointer rounded-md w-28 h-[102px] mb-6 flex flex-col justify-center items-center'
                    >
                        <PlusOutlined />
                        <div className='pt-1'>Lưu thông tin</div>
                    </Button>
                </div>
            </Form>

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
        </>
    );
};

export default Admin_EditProduct;
