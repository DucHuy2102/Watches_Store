import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Radio, Upload } from 'antd';
import { useEffect, useRef, useState } from 'react';
import * as ProductService from '../../../../services/ProductService';
import { useMutationHook } from '../../../../hooks/useMutationHook';
import { Axios } from 'axios';

const { TextArea } = Input;

// normFile: upload image
const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

const AddProduct = () => {
    const [stateProduct, setStateProduct] = useState({
        productName: '',
        price: 0,
        amount: 0,
        brand: '',
        origin: '',
        size: '',
        thickness: '',
        wireMaterial: '',
        shellMaterial: '',
        style: '',
        feature: '',
        shape: '',
        weight: '',
        genderUser: '',
        condition: '',
        color: '',
        state: '',
        description: '',
        image: [],
    });

    const mutation = useMutationHook(
        ({
            productName,
            price,
            amount,
            brand,
            origin,
            size,
            thickness,
            wireMaterial,
            shellMaterial,
            style,
            feature,
            shape,
            weight,
            genderUser,
            condition,
            color,
            state,
            description,
            image,
        }) => {
            ProductService.createProduct({
                productName,
                price,
                amount,
                brand,
                origin,
                size,
                thickness,
                wireMaterial,
                shellMaterial,
                style,
                feature,
                shape,
                weight,
                genderUser,
                condition,
                color,
                state,
                description,
                image,
            });
        }
    );
    const { data } = mutation;
    console.log(data);

    // add product function
    const handleAddProduct = () => {
        mutation.mutate(stateProduct);
    };

    // handle input change
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setStateProduct((prev) => ({ ...prev, [name]: value }));
    };

    // handle radio change
    const handleRadioChange = (e) => {
        setStateProduct((prev) => ({ ...prev, state: e.target.value }));
    };

    const handleUpload = async ({ file }) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'product');

        try {
            const res = await Axios.post('https://api.cloudinary.com/v1_1/your_cloudinary_name/image/upload', formData);
            const response = res.data;
            setStateProduct((prev) => ({
                ...prev,
                images: [...prev.images, response.secure_url],
            }));
        } catch (error) {
            console.error('Upload failed:', error);
        }
    };

    // autoFocus
    const inputTagRef = useRef(null);
    useEffect(() => {
        if (inputTagRef.current) {
            inputTagRef.current.focus();
        }
    }, []);

    return (
        <>
            <h1 className='font-bold text-2xl mt-5 pl-14 mb-5'>Thêm thông tin đồng hồ</h1>
            <Form onFinish={handleAddProduct} className='px-14'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {/* name */}
                    <Form.Item
                        label='Tên đồng hồ'
                        name='productName'
                        rules={[{ required: true, message: 'Tên đồng hồ không được bỏ trống!' }]}
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

                    {/* price & amount */}
                    <div className='flex items-center justify-between gap-5'>
                        {/* price */}
                        <Form.Item
                            label='Giá đồng hồ (VNĐ)'
                            name='price'
                            rules={[
                                { required: true, message: 'Giá đồng hồ không được bỏ trống!' },
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
                            className='col-span-2 md:col-span-1 w-[25vw]'
                        >
                            <Input name='price' value={stateProduct.price} onChange={handleOnChange} />
                        </Form.Item>

                        {/* amount */}
                        <Form.Item
                            label='Số lượng'
                            name='amount'
                            rules={[
                                { required: true, message: 'Số lượng không được bỏ trống!' },
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
                            className='col-span-2 md:col-span-1 w-[20vw]'
                        >
                            <Input name='amount' value={stateProduct.amount} onChange={handleOnChange} />
                        </Form.Item>
                    </div>

                    {/* brand */}
                    <Form.Item
                        label='Hãng đồng hồ'
                        name='brand'
                        rules={[{ required: true, message: 'Hãng đồng hồ không được bỏ trống!' }]}
                        className='col-span-2 md:col-span-1'
                    >
                        <Input name='brand' value={stateProduct.brand} onChange={handleOnChange} className='w-full' />
                    </Form.Item>

                    {/* origin */}
                    <Form.Item
                        label='Xuất xứ đồng hồ'
                        name='origin'
                        rules={[{ required: true, message: 'Xuất xứ đồng hồ không được bỏ trống!' }]}
                        className='col-span-2 md:col-span-1'
                    >
                        <Input name='origin' value={stateProduct.origin} onChange={handleOnChange} className='w-full' />
                    </Form.Item>

                    {/* size */}
                    <Form.Item
                        label='Kích thước đồng hồ'
                        name='size'
                        rules={[{ required: true, message: 'Kích thước đồng hồ không được bỏ trống!' }]}
                        className='col-span-2 md:col-span-1'
                    >
                        <Input name='size' value={stateProduct.size} onChange={handleOnChange} className='w-full' />
                    </Form.Item>

                    {/* thickness */}
                    <Form.Item
                        label='Độ dày đồng hồ'
                        name='thickness'
                        rules={[{ required: true, message: 'Độ dày đồng hồ không được bỏ trống!' }]}
                        className='col-span-2 md:col-span-1'
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
                        label='Chất liệu dây đồng hồ'
                        name='wireMaterial'
                        rules={[{ required: true, message: 'Chất liệu dây đồng hồ không được bỏ trống!' }]}
                        className='col-span-2 md:col-span-1'
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
                        label='Chất liệu vỏ đồng hồ'
                        name='shellMaterial'
                        rules={[{ required: true, message: 'Chất liệu vỏ đồng hồ không được bỏ trống!' }]}
                        className='col-span-2 md:col-span-1'
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
                        rules={[{ required: true, message: 'Phong cách đồng hồ không được bỏ trống!' }]}
                        className='col-span-2 md:col-span-1'
                    >
                        <Input name='style' value={stateProduct.style} onChange={handleOnChange} className='w-full' />
                    </Form.Item>

                    {/* feature */}
                    <Form.Item
                        label='Tính năng đồng hồ'
                        name='feature'
                        rules={[{ required: true, message: 'Tính năng đồng hồ không được bỏ trống!' }]}
                        className='col-span-2 md:col-span-1'
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
                        label='Hình dáng mặt đồng hồ'
                        name='shape'
                        rules={[{ required: true, message: 'Hình dáng mặt đồng hồ không được bỏ trống!' }]}
                        className='col-span-2 md:col-span-1'
                    >
                        <Input name='shape' value={stateProduct.shape} onChange={handleOnChange} className='w-full' />
                    </Form.Item>

                    {/* weight */}
                    <Form.Item
                        label='Khối lượng đồng hồ'
                        name='weight'
                        rules={[{ required: true, message: 'Khối lượng đồng hồ không được bỏ trống!' }]}
                        className='col-span-2 md:col-span-1'
                    >
                        <Input name='weight' value={stateProduct.weight} onChange={handleOnChange} className='w-full' />
                    </Form.Item>

                    {/* genderUser */}
                    <Form.Item
                        label='Đối tượng sử dụng đồng hồ'
                        name='genderUser'
                        rules={[{ required: true, message: 'Đối tượng sử dụng đồng hồ không được bỏ trống!' }]}
                        className='col-span-2 md:col-span-1'
                    >
                        <Input
                            name='genderUser'
                            value={stateProduct.genderUser}
                            onChange={handleOnChange}
                            className='w-full'
                        />
                    </Form.Item>

                    {/* condition */}
                    <Form.Item
                        label='Tình trạng đồng hồ'
                        name='condition'
                        rules={[{ required: true, message: 'Tình trạng đồng hồ không được bỏ trống!' }]}
                        className='col-span-2 md:col-span-1'
                    >
                        <Input
                            name='condition'
                            value={stateProduct.condition}
                            onChange={handleOnChange}
                            className='w-full'
                        />
                    </Form.Item>

                    {/* color */}
                    <Form.Item
                        label='Màu sắc đồng hồ'
                        name='color'
                        rules={[{ required: true, message: 'Màu sắc đồng hồ không được bỏ trống!' }]}
                        className='col-span-2 md:col-span-1'
                    >
                        <Input name='color' value={stateProduct.color} onChange={handleOnChange} className='w-full' />
                    </Form.Item>

                    {/* state */}
                    <Form.Item
                        label='Trạng thái đồng hồ'
                        name='state'
                        rules={[{ required: true, message: 'Trạng thái đồng hồ không được bỏ trống!' }]}
                        className='col-span-2 md:col-span-1'
                    >
                        <Radio.Group value={stateProduct.state} onChange={handleRadioChange} className='w-full'>
                            <Radio value='new'> Hàng mới về </Radio>
                            <Radio value='old'> Hàng xả kho </Radio>
                        </Radio.Group>
                    </Form.Item>
                </div>

                {/* description */}
                <Form.Item
                    label='Miêu tả đồng hồ'
                    name='description'
                    rules={[{ required: true, message: 'Miêu tả đồng hồ không được bỏ trống!' }]}
                >
                    <TextArea
                        name='description'
                        value={stateProduct.description}
                        onChange={handleOnChange}
                        rows={5}
                        className='w-full'
                    />
                </Form.Item>

                {/* upload & button: addProduct*/}
                <div className='flex w-full justify-between items-center'>
                    {/* upload */}
                    <Form.Item label='Upload' valuePropName='fileList' getValueFromEvent={normFile}>
                        <Upload action='/upload.do' listType='picture-card' customRequest={handleUpload}>
                            <div>
                                <PlusOutlined />
                                <div>Thêm ảnh</div>
                            </div>
                        </Upload>
                    </Form.Item>

                    {/* button: addProduct */}
                    <Button
                        type='primary'
                        htmlType='submit'
                        className='bg-gray-300 text-black hover:bg-blue-500 transition duration-300 hover:cursor-pointer rounded-md w-28 h-[100px] mb-6 flex flex-col justify-center items-center'
                    >
                        <PlusOutlined />
                        <div className='pt-1'>Thêm sản phẩm</div>
                    </Button>
                </div>
            </Form>
        </>
    );
};

export default AddProduct;
