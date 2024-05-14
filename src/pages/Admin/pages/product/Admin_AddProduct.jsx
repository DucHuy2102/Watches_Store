import { PlusOutlined } from '@ant-design/icons';
import { Form, Input, InputNumber, Radio, Upload } from 'antd';
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
            <h1 className='font-bold text-2xl mt-5 pl-14 mb-5'>Thêm thông tin đồng hồ</h1>
            <Form className='px-14'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <Form.Item
                        label='Tên đồng hồ'
                        name='productName'
                        rules={[{ required: true, message: 'Tên đồng hồ không được bỏ trống!' }]}
                        className='col-span-2 md:col-span-1'
                    >
                        <Input className='w-full ' />
                    </Form.Item>

                    <div className='flex items-center justify-between'>
                        <Form.Item
                            label='Giá đồng hồ (VNĐ)'
                            name='price'
                            rules={[{ required: true, message: 'Giá đồng hồ không được bỏ trống!' }]}
                            className='col-span-2 md:col-span-1'
                        >
                            <Input className='w-[15rem]' />
                        </Form.Item>
                        <Form.Item
                            label='Số lượng đồng hồ'
                            name='price'
                            rules={[{ required: true, message: 'Giá đồng hồ không được bỏ trống!' }]}
                            className='col-span-2 md:col-span-1'
                        >
                            <InputNumber />
                        </Form.Item>
                    </div>

                    <Form.Item
                        label='Số lượng đồng hồ'
                        name='sellNumber'
                        rules={[{ required: true, message: 'Số lượng đồng hồ không được bỏ trống!' }]}
                        className='col-span-2 md:col-span-1'
                    >
                        <InputNumber className='w-full' />
                    </Form.Item>

                    <Form.Item
                        label='Hãng đồng hồ'
                        name='brand'
                        rules={[{ required: true, message: 'Hãng đồng hồ không được bỏ trống!' }]}
                        className='col-span-2 md:col-span-1'
                    >
                        <Input className='w-full' />
                    </Form.Item>

                    <Form.Item
                        label='Xuất xứ đồng hồ'
                        name='origin'
                        rules={[{ required: true, message: 'Xuất xứ đồng hồ không được bỏ trống!' }]}
                        className='col-span-2 md:col-span-1'
                    >
                        <Input className='w-full' />
                    </Form.Item>

                    <Form.Item
                        label='Kích thước đồng hồ'
                        name='size'
                        rules={[{ required: true, message: 'Kích thước đồng hồ không được bỏ trống!' }]}
                        className='col-span-2 md:col-span-1'
                    >
                        <Input className='w-full' />
                    </Form.Item>

                    <Form.Item
                        label='Độ dày đồng hồ'
                        name='thickness'
                        rules={[{ required: true, message: 'Độ dày đồng hồ không được bỏ trống!' }]}
                        className='col-span-2 md:col-span-1'
                    >
                        <Input className='w-full' />
                    </Form.Item>

                    <Form.Item
                        label='Chất liệu dây đồng hồ'
                        name='wireMaterial'
                        rules={[{ required: true, message: 'Chất liệu dây đồng hồ không được bỏ trống!' }]}
                        className='col-span-2 md:col-span-1'
                    >
                        <Input className='w-full' />
                    </Form.Item>

                    <Form.Item
                        label='Chất liệu vỏ đồng hồ'
                        name='shellMaterial'
                        rules={[{ required: true, message: 'Chất liệu vỏ đồng hồ không được bỏ trống!' }]}
                        className='col-span-2 md:col-span-1'
                    >
                        <Input className='w-full' />
                    </Form.Item>

                    <Form.Item
                        label='Phong cách đồng hồ'
                        name='style'
                        rules={[{ required: true, message: 'Phong cách đồng hồ không được bỏ trống!' }]}
                        className='col-span-2 md:col-span-1'
                    >
                        <Input className='w-full' />
                    </Form.Item>

                    <Form.Item
                        label='Tính năng đồng hồ'
                        name='feature'
                        rules={[{ required: true, message: 'Tính năng đồng hồ không được bỏ trống!' }]}
                        className='col-span-2 md:col-span-1'
                    >
                        <Input className='w-full' />
                    </Form.Item>

                    <Form.Item
                        label='Hình dáng mặt đồng hồ'
                        name='shape'
                        rules={[{ required: true, message: 'Hình dáng mặt đồng hồ không được bỏ trống!' }]}
                        className='col-span-2 md:col-span-1'
                    >
                        <Input className='w-full' />
                    </Form.Item>

                    <Form.Item
                        label='Khối lượng đồng hồ'
                        name='weight'
                        rules={[{ required: true, message: 'Khối lượng đồng hồ không được bỏ trống!' }]}
                        className='col-span-2 md:col-span-1'
                    >
                        <Input className='w-full' />
                    </Form.Item>

                    <Form.Item
                        label='Đối tượng sử dụng đồng hồ'
                        name='genderUser'
                        rules={[{ required: true, message: 'Đối tượng sử dụng đồng hồ không được bỏ trống!' }]}
                        className='col-span-2 md:col-span-1'
                    >
                        <Input className='w-full' />
                    </Form.Item>

                    <Form.Item
                        label='Tình trạng đồng hồ'
                        name='condition'
                        rules={[{ required: true, message: 'Tình trạng đồng hồ không được bỏ trống!' }]}
                        className='col-span-2 md:col-span-1'
                    >
                        <Input className='w-full' />
                    </Form.Item>

                    <Form.Item
                        label='Màu sắc đồng hồ'
                        name='color'
                        rules={[{ required: true, message: 'Màu sắc đồng hồ không được bỏ trống!' }]}
                        className='col-span-2 md:col-span-1'
                    >
                        <Input className='w-full' />
                    </Form.Item>

                    <Form.Item
                        label='Trạng thái đồng hồ'
                        name='state'
                        rules={[{ required: true, message: 'Trạng thái đồng hồ không được bỏ trống!' }]}
                        className='col-span-2 md:col-span-1'
                    >
                        <Radio.Group className='w-full'>
                            <Radio value='new'> Hàng mới về </Radio>
                            <Radio value='old'> Hàng xả kho </Radio>
                        </Radio.Group>
                    </Form.Item>
                </div>

                <Form.Item
                    label='Miêu tả đồng hồ'
                    name='description'
                    rules={[{ required: true, message: 'Miêu tả đồng hồ không được bỏ trống!' }]}
                >
                    <TextArea rows={5} className='w-full' />
                </Form.Item>

                <div className='flex w-full justify-between items-center'>
                    <Form.Item label='Upload' valuePropName='fileList' getValueFromEvent={normFile}>
                        <Upload action='/upload.do' listType='picture-card'>
                            <div>
                                <PlusOutlined />
                                <div>Thêm ảnh</div>
                            </div>
                        </Upload>
                    </Form.Item>
                    <div className='bg-gray-300 hover:bg-blue-500 transition duration-300 hover:cursor-pointer rounded-md w-28 h-[100px] mb-6 flex flex-col justify-center items-center'>
                        <PlusOutlined />
                        <div className='pt-1'>Thêm sản phẩm</div>
                    </div>
                </div>
            </Form>
        </>
    );
};

export default AddProduct;
