import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Radio, Upload, Image, message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import * as ProductService from '../../../../services/ProductService';
import { useMutationHook } from '../../../../hooks/useMutationHook';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

const AddProduct = () => {
    const navigate = useNavigate();
    const [stateProduct, setStateProduct] = useState({
        productName: '',
        img: [],
        amount: 0,
        price: 0,
        brand: '',
        origin: '',
        thickness: '',
        size: '',
        wireMaterial: '',
        shellMaterial: '',
        style: '',
        feature: '',
        shape: '',
        condition: '',
        height: '',
        genderUser: '',
        description: '',
        color: '',
        weight: '',
    });

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([]);

    // get adminToken from localStorage
    const adminToken = localStorage.getItem('adminToken');

    const mutation = useMutationHook(({ adminToken, product }) => {
        return ProductService.createProduct(adminToken, product);
    });

    // add product function
    const handleAddProduct = async () => {
        const uploadedImages = await uploadImages(fileList);
        const amountNumber = parseInt(stateProduct.amount);
        const priceNumber = parseInt(stateProduct.price);
        const productData = {
            ...stateProduct,
            amount: amountNumber,
            price: priceNumber,
            img: uploadedImages,
        };
        mutation.mutate(
            { adminToken, product: productData },
            {
                onSuccess: () => {
                    message.success('Thêm sản phẩm thành công');
                    navigate('/admin/product');
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
    const handleRadioChange = (e) => {
        setStateProduct((prev) => ({ ...prev, state: e.target.value }));
    };

    // Handle change image
    const handleChange = ({ fileList: newFileList }) =>
        setFileList(newFileList);

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
            <h1 className='font-bold text-2xl mt-5 pl-14 mb-5'>
                Thêm thông tin đồng hồ
            </h1>
            <Form onFinish={handleAddProduct} className='px-14'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <Form.Item
                        label='Tên đồng hồ'
                        name='productName'
                        rules={[
                            {
                                required: true,
                                message: 'Tên đồng hồ không được bỏ trống!',
                            },
                        ]}
                        className='col-span-2 md:col-span-1'
                    >
                        <Input
                            ref={inputTagRef}
                            name='productName'
                            value={stateProduct.productName}
                            onChange={handleOnChange}
                            className='w-full '
                        />
                    </Form.Item>

                    <div className='flex items-center justify-between gap-5'>
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
                                        return new Promise(
                                            (resolve, reject) => {
                                                if (isNaN(value)) {
                                                    reject(
                                                        'Giá đồng hồ phải là một số.'
                                                    );
                                                } else {
                                                    resolve();
                                                }
                                            }
                                        );
                                    },
                                }),
                            ]}
                            className='col-span-2 md:col-span-1 w-[25vw]'
                        >
                            <Input
                                name='price'
                                value={stateProduct.price}
                                onChange={handleOnChange}
                            />
                        </Form.Item>

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
                                        return new Promise(
                                            (resolve, reject) => {
                                                if (isNaN(value)) {
                                                    reject(
                                                        'Số lượng phải là một số.'
                                                    );
                                                } else {
                                                    resolve();
                                                }
                                            }
                                        );
                                    },
                                }),
                            ]}
                            className='col-span-2 md:col-span-1 w-[20vw]'
                        >
                            <Input
                                name='amount'
                                value={stateProduct.amount}
                                onChange={handleOnChange}
                            />
                        </Form.Item>
                    </div>

                    <Form.Item
                        label='Hãng đồng hồ'
                        name='brand'
                        rules={[
                            {
                                required: true,
                                message: 'Hãng đồng hồ không được bỏ trống!',
                            },
                        ]}
                        className='col-span-2 md:col-span-1'
                    >
                        <Input
                            name='brand'
                            value={stateProduct.brand}
                            onChange={handleOnChange}
                            className='w-full'
                        />
                    </Form.Item>

                    <Form.Item
                        label='Xuất xứ đồng hồ'
                        name='origin'
                        rules={[
                            {
                                required: true,
                                message: 'Xuất xứ đồng hồ không được bỏ trống!',
                            },
                        ]}
                        className='col-span-2 md:col-span-1'
                    >
                        <Input
                            name='origin'
                            value={stateProduct.origin}
                            onChange={handleOnChange}
                            className='w-full'
                        />
                    </Form.Item>

                    <Form.Item
                        label='Kích thước đồng hồ'
                        name='size'
                        rules={[
                            {
                                required: true,
                                message:
                                    'Kích thước đồng hồ không được bỏ trống!',
                            },
                        ]}
                        className='col-span-2 md:col-span-1'
                    >
                        <Input
                            name='size'
                            value={stateProduct.size}
                            onChange={handleOnChange}
                            className='w-full'
                        />
                    </Form.Item>

                    <Form.Item
                        label='Độ dày đồng hồ'
                        name='thickness'
                        rules={[
                            {
                                required: true,
                                message: 'Độ dày đồng hồ không được bỏ trống!',
                            },
                        ]}
                        className='col-span-2 md:col-span-1'
                    >
                        <Input
                            name='thickness'
                            value={stateProduct.thickness}
                            onChange={handleOnChange}
                            className='w-full'
                        />
                    </Form.Item>

                    <Form.Item
                        label='Chiều cao đồng hồ'
                        name='height'
                        rules={[
                            {
                                required: true,
                                message:
                                    'Chiều cao đồng hồ không được bỏ trống!',
                            },
                        ]}
                        className='col-span-2 md:col-span-1'
                    >
                        <Input
                            name='height'
                            value={stateProduct.height}
                            onChange={handleOnChange}
                            className='w-full'
                        />
                    </Form.Item>

                    <Form.Item
                        label='Chất liệu dây đồng hồ'
                        name='wireMaterial'
                        rules={[
                            {
                                required: true,
                                message:
                                    'Chất liệu dây đồng hồ không được bỏ trống!',
                            },
                        ]}
                        className='col-span-2 md:col-span-1'
                    >
                        <Input
                            name='wireMaterial'
                            value={stateProduct.wireMaterial}
                            onChange={handleOnChange}
                            className='w-full'
                        />
                    </Form.Item>

                    <Form.Item
                        label='Chất liệu vỏ đồng hồ'
                        name='shellMaterial'
                        rules={[
                            {
                                required: true,
                                message:
                                    'Chất liệu vỏ đồng hồ không được bỏ trống!',
                            },
                        ]}
                        className='col-span-2 md:col-span-1'
                    >
                        <Input
                            name='shellMaterial'
                            value={stateProduct.shellMaterial}
                            onChange={handleOnChange}
                            className='w-full'
                        />
                    </Form.Item>

                    <Form.Item
                        label='Phong cách đồng hồ'
                        name='style'
                        rules={[
                            {
                                required: true,
                                message:
                                    'Phong cách đồng hồ không được bỏ trống!',
                            },
                        ]}
                        className='col-span-2 md:col-span-1'
                    >
                        <Input
                            name='style'
                            value={stateProduct.style}
                            onChange={handleOnChange}
                            className='w-full'
                        />
                    </Form.Item>

                    <Form.Item
                        label='Tính năng đồng hồ'
                        name='feature'
                        rules={[
                            {
                                required: true,
                                message:
                                    'Tính năng đồng hồ không được bỏ trống!',
                            },
                        ]}
                        className='col-span-2 md:col-span-1'
                    >
                        <Input
                            name='feature'
                            value={stateProduct.feature}
                            onChange={handleOnChange}
                            className='w-full'
                        />
                    </Form.Item>

                    <Form.Item
                        label='Hình dáng đồng hồ'
                        name='shape'
                        rules={[
                            {
                                required: true,
                                message:
                                    'Hình dáng đồng hồ không được bỏ trống!',
                            },
                        ]}
                        className='col-span-2 md:col-span-1'
                    >
                        <Input
                            name='shape'
                            value={stateProduct.shape}
                            onChange={handleOnChange}
                            className='w-full'
                        />
                    </Form.Item>

                    <Form.Item
                        label='Trọng lượng đồng hồ'
                        name='weight'
                        rules={[
                            {
                                required: true,
                                message:
                                    'Trọng lượng đồng hồ không được bỏ trống!',
                            },
                        ]}
                        className='col-span-2 md:col-span-1'
                    >
                        <Input
                            name='weight'
                            value={stateProduct.weight}
                            onChange={handleOnChange}
                            className='w-full'
                        />
                    </Form.Item>

                    <Form.Item
                        label='Đối tượng sử dụng'
                        name='genderUser'
                        rules={[
                            {
                                required: true,
                                message:
                                    'Đối tượng sử dụng không được bỏ trống!',
                            },
                        ]}
                        className='col-span-2 md:col-span-1'
                    >
                        <Input
                            name='genderUser'
                            value={stateProduct.genderUser}
                            onChange={handleOnChange}
                            className='w-full'
                        />
                    </Form.Item>

                    <Form.Item
                        label='Màu sắc'
                        name='color'
                        rules={[
                            {
                                required: true,
                                message: 'Màu sắc không được bỏ trống!',
                            },
                        ]}
                        className='col-span-2 md:col-span-1'
                    >
                        <Input
                            name='color'
                            value={stateProduct.color}
                            onChange={handleOnChange}
                            className='w-full'
                        />
                    </Form.Item>

                    <Form.Item
                        label='Trạng thái'
                        name='condition'
                        rules={[
                            {
                                required: true,
                                message: 'Trạng thái không được bỏ trống!',
                            },
                        ]}
                        className='col-span-2 md:col-span-1'
                    >
                        <Radio.Group
                            className='ml-14'
                            onChange={handleRadioChange}
                            value={stateProduct.condition}
                        >
                            <Radio value='Mới'>Mới</Radio>
                            <Radio value='Đã sử dụng'>Đã sử dụng</Radio>
                        </Radio.Group>
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
                                wrapperStyle={{ display: 'none' }}
                                preview={{
                                    visible: previewOpen,
                                    onVisibleChange: (visible) =>
                                        setPreviewOpen(visible),
                                    afterOpenChange: (visible) =>
                                        !visible && setPreviewImage(''),
                                }}
                                src={previewImage}
                            />
                        )}
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type='primary'
                            htmlType='submit'
                            className='bg-gray-300 mt-1 text-black hover:bg-blue-500 transition duration-300 hover:cursor-pointer rounded-md w-28 h-[102px] mb-6 flex flex-col justify-center items-center'
                        >
                            <PlusOutlined />
                            <div className='pt-1'>Thêm sản phẩm</div>
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </>
    );
};

export default AddProduct;
