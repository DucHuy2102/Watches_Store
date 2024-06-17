import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { sortProducts } from '../redux/slides/productSlide';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Modal, Select, Table } from 'antd';

const Sort_Filter = () => {
    const dispatch = useDispatch();

    // Lấy dữ liệu sản phẩm từ Redux
    const products_Redux = useSelector((state) => state.product.products);
    const searchRedux = useSelector((state) => state.product.search);
    const numberProduct = searchRedux?.length;

    // handle sort product
    const handleSort = (value) => {
        console.log(`selected ${value}`);
        dispatch(sortProducts(value));
    };

    // handle filter product
    const handleFilter = () => {};

    const displaySearch = () => {
        if (searchRedux && searchRedux.length > 0) {
            return `Tìm được ${searchRedux.length} sản phẩm`;
        }
        return 'Tất cả sản phẩm';
    };

    // //////////////////////////////////////////////////
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const options = [
        {
            key: 'Nam',
            label: 'Đồng hồ nam',
        },
        {
            key: 'Nữ',
            label: 'Đồng hồ nữ',
        },
        {
            key: 'Yiminghe',
            label: 'yiminghe',
        },
    ];

    const columns = [
        {
            title: 'Label',
            dataIndex: 'label',
            key: 'label',
        },
    ];

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleSelect = (record) => {
        setSelectedValue(record.label);
        setIsModalVisible(false);
    };

    const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <div className='mt-3 h-10 font-medium w-full px-10 grid grid-cols-3 items-center font-PlayfairDisplay'>
            {/* link to page */}
            <div className='w-[30vw]'>
                <Link to='/'>Trang chủ</Link> / {displaySearch()}
                {/* {selectedFilter !== 'Bộ lọc'
                    ? `Lọc được ${numberProduct} sản phẩm`
                    : 'Tất cả sản phẩm'} */}
            </div>

            {/* name page */}
            <div className='w-full text-center'>
                <p className='font-bold text-xl'>
                    Sản phẩm
                    {/* {selectedFilter === 'Bộ lọc' ? 'Tất cả sản phẩm' : selectedFilter} */}
                </p>
            </div>

            {/* sort and filter */}
            <div className='flex items-center justify-end gap-2'>
                {/* filter */}
                <Input
                    placeholder='Bộ lọc'
                    value={selectedValue}
                    onClick={showModal}
                    readOnly
                    style={{ width: 200, marginBottom: 20 }}
                />
                <Modal
                    title='Bộ lọc'
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <Input
                        placeholder='Tìm kiếm bộ lọc...'
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        style={{ marginBottom: 20 }}
                    />
                    <Table
                        dataSource={filteredOptions}
                        columns={columns}
                        rowKey='key'
                        pagination={false}
                        onRow={(record) => ({
                            onClick: () => handleSelect(record),
                        })}
                        rowClassName={(record) => (record.disabled ? 'ant-table-row-disabled' : '')}
                    />
                </Modal>

                {/* sort */}
                <Select
                    placeholder='Sắp xếp'
                    className='select-sort'
                    allowClear
                    onChange={handleSort}
                    options={[
                        {
                            value: 'decrease',
                            label: 'Giá cao tới thấp',
                        },
                        {
                            value: 'increase',
                            label: 'Giá thấp tới cao',
                        },
                        {
                            value: 'A-Z',
                            label: 'Tên: A-Z',
                        },
                        {
                            value: 'Z-A',
                            label: 'Tên: Z-A',
                        },
                    ]}
                />
            </div>
        </div>
    );
};

export default Sort_Filter;
