import { Modal } from 'antd';
import { useState } from 'react';

const title = ['Tên đồng hồ', 'Trạng thái bán', 'Giá', 'Số lượng bán được', 'Số lượng tồn kho', 'Thao tác'];

const ListProduct = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [gotoPage, setGotoPage] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleGotoPage = () => {
        setGotoPage(true);
    };

    return (
        <div>
            <div className=''>
                <p className='font-bold text-xl pl-14 mb-1'>Hãng Casio</p>
                <table className='w-full'>
                    <thead>
                        <tr>
                            {title.map((item, index) => (
                                <th key={index} className='text-center border border-black font-semibold'>
                                    {item}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className='border border-black'>
                        <tr>
                            <td className='py-4 border border-black'>
                                <div className='flex items-center'>
                                    {/* image */}
                                    <img
                                        className='h-16 w-16 mr-4'
                                        src='https://timex.com/cdn/shop/files/TW2W51600.png?v=1711407752&width=400'
                                        alt='Product image'
                                    />

                                    {/* name */}
                                    <span className='w-80 font-semibold'>
                                        Q Timex Chronograph 40mm Stainless Steel Bracelet Watch
                                    </span>
                                </div>
                            </td>

                            {/* state */}
                            <td className='py-4 text-center border border-black'>
                                <button className='rounded-md py-2 px-4 mr-2 bg-blue-500 text-white hover:cursor-pointer hover:text-white '>
                                    Đang bán
                                </button>
                            </td>

                            {/* price */}
                            <td className='py-4 text-center border border-black'>2.075.000</td>

                            {/* size */}
                            <td className='py-4 text-center border border-black'>10 Cái</td>

                            {/* color */}
                            <td className='py-4 text-center border border-black'>27 Cái</td>

                            {/* quantity */}
                            <td className='py-4 border border-black'>
                                <div className='flex flex-col justify-center items-center gap-2'>
                                    <button
                                        onClick={handleGotoPage}
                                        className='bg-gray-300 rounded-md py-2 px-4 hover:bg-yellow-500 hover:cursor-pointer hover:text-white'
                                    >
                                        Sửa
                                    </button>
                                    <button
                                        onClick={showModal}
                                        className='bg-gray-300 rounded-md py-2 px-4 hover:bg-red-500 hover:cursor-pointer hover:text-white'
                                    >
                                        Xóa
                                    </button>

                                    <Modal
                                        title='Bạn có chắc chắn muốn xóa không?'
                                        className='text-center'
                                        open={isModalOpen}
                                        onOk={handleOk}
                                        onCancel={handleCancel}
                                    >
                                        <p>
                                            Hành động của bạn sẽ xóa sản phẩm này ra khỏi danh sách sản phẩm và không
                                            thể khôi phục. Hãy chắc chắn hành động đã được sự cho phép
                                        </p>
                                    </Modal>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListProduct;
