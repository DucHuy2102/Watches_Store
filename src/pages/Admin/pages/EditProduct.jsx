import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Cascader,
    Checkbox,
    ColorPicker,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Slider,
    Switch,
    TreeSelect,
    Upload,
} from 'antd';
const { TextArea } = Input;
const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};
const AddProduct = () => {
    return (
        <>
            <h1 className='font-bold text-2xl mt-5 pl-14 mb-5'>Chỉnh sửa đồng hồ</h1>
            <Form className='px-14 flex flex-col justify-center'>
                <div className='grid grid-cols-2 gap-x-10'>
                    {/* productName */}
                    <Form.Item
                        label='Tên đồng hồ'
                        name='username'
                        rules={[
                            {
                                required: true,
                                message: 'Tên đồng hồ không được bỏ trống!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    {/* price */}
                    <Form.Item
                        label='Giá đồng hồ'
                        name='price'
                        rules={[
                            {
                                required: true,
                                message: 'Giá đồng hồ không được bỏ trống!',
                            },
                        ]}
                    >
                        <Input />
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
                        <Input />
                    </Form.Item>
                    {/* origin */}
                    <Form.Item
                        label='Xuất xứ đồng hồ'
                        name='origin'
                        rules={[
                            {
                                required: true,
                                message: 'Xuất xứ đồng hồ không được bỏ trống!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>{' '}
                    {/* size */}
                    <Form.Item
                        label='Kích thước đồng hồ'
                        name='size'
                        rules={[
                            {
                                required: true,
                                message: 'Kích thước đồng hồ không được bỏ trống!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>{' '}
                    {/* thickness */}
                    <Form.Item
                        label='Độ dày đồng hồ'
                        name='thickness'
                        rules={[
                            {
                                required: true,
                                message: 'Độ dày đồng hồ không được bỏ trống!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>{' '}
                    {/* wireMaterial */}
                    <Form.Item
                        label='Chất liệu dây đồng hồ'
                        name='wireMaterial'
                        rules={[
                            {
                                required: true,
                                message: 'Chất liệu dây đồng hồ không được bỏ trống!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>{' '}
                    {/* shellMaterial */}
                    <Form.Item
                        label='Chất liệu vỏ đồng hồ'
                        name='shellMaterial'
                        rules={[
                            {
                                required: true,
                                message: 'Chất liệu vỏ đồng hồ không được bỏ trống!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>{' '}
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
                        <Input />
                    </Form.Item>{' '}
                    {/* feature */}
                    <Form.Item
                        label='Tính năng đồng hồ'
                        name='feature'
                        rules={[
                            {
                                required: true,
                                message: 'Tính năng đồng hồ không được bỏ trống!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>{' '}
                    {/* shape */}
                    <Form.Item
                        label='Hình dáng mặt đồng hồ'
                        name='shape'
                        rules={[
                            {
                                required: true,
                                message: 'Hình dáng mặt đồng hồ không được bỏ trống!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    {/* weight */}
                    <Form.Item
                        label='Khối lượng đồng hồ'
                        name='weight'
                        rules={[
                            {
                                required: true,
                                message: 'Khối lượng đồng hồ không được bỏ trống!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    {/* genderUser */}
                    <Form.Item
                        label='Đối tượng sử dụng đồng hồ'
                        name='genderUser'
                        rules={[
                            {
                                required: true,
                                message: 'Đối tượng sử dụng đồng hồ không được bỏ trống!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    {/* condition */}
                    <Form.Item
                        label='Tình trạng đồng hồ'
                        name='condition'
                        rules={[
                            {
                                required: true,
                                message: 'Tình trạng đồng hồ không được bỏ trống!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>{' '}
                    {/* color */}
                    <Form.Item
                        label='Màu sắc đồng hồ'
                        name='color'
                        rules={[
                            {
                                required: true,
                                message: 'Màu sắc đồng hồ không được bỏ trống!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>{' '}
                    {/* state */}
                    <Form.Item
                        label='Trạng thái đồng hồ'
                        name='state'
                        rules={[
                            {
                                required: true,
                                message: 'Trạng thái đồng hồ không được bỏ trống!',
                            },
                        ]}
                    >
                        <Radio.Group>
                            <Radio value='new'> Hàng mới về </Radio>
                            <Radio value='old'> Hàng xả kho </Radio>
                        </Radio.Group>
                    </Form.Item>{' '}
                </div>

                <Form.Item
                    label='Miêu tả đồng hồ'
                    name='description'
                    rules={[
                        {
                            required: true,
                            message: 'Miêu tả đồng hồ không được bỏ trống!',
                        },
                    ]}
                >
                    <TextArea rows={5} />
                </Form.Item>

                <div className='flex '>
                    <Form.Item className='flex-1' label='Upload' valuePropName='fileList' getValueFromEvent={normFile}>
                        <Upload action='/upload.do' listType='picture-card'>
                            <button
                                style={{
                                    border: 0,
                                    background: 'none',
                                }}
                                type='button'
                            >
                                <PlusOutlined />
                                <div
                                    style={{
                                        marginTop: 8,
                                    }}
                                >
                                    Thêm ảnh
                                </div>
                            </button>
                        </Upload>
                    </Form.Item>

                    <div className='bg-gray-300 hover:bg-blue-500 transition duration-300 hover:cursor-pointer rounded-md w-28 h-[101px] flex flex-col justify-center items-center'>
                        <PlusOutlined />
                        <button className='pt-2'>Thêm sản phẩm</button>
                    </div>
                </div>
            </Form>
        </>
    );
};
export default AddProduct;
