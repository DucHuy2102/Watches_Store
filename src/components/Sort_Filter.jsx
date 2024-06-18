import { useState } from 'react';
import { Link } from 'react-router-dom';
import { filterProducts, sortProducts } from '../redux/slides/productSlide';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Modal, Select, Table } from 'antd';
import { MdDelete } from 'react-icons/md';

const Sort_Filter = () => {
    const dispatch = useDispatch();

    // get data from Redux
    const search_Redux = useSelector((state) => state.product.search);
    const products_Redux = useSelector((state) => state.product.products);

    // ------------------------------ SORT FUNCTION ---------------------------

    // handle sort product
    const handleSort = (value) => {
        dispatch(sortProducts(value));
    };

    // ------------------------------ FILTER FUNCTION ---------------------------
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [_, setSelectedValue] = useState('');
    const [selectedFilters, setSelectedFilters] = useState([]);

    // option values for filter
    const options = [
        {
            title: 'Đối tượng',
            choices: [
                { key: 'Nữ', label: 'Đồng hồ nữ' },
                { key: 'Nam', label: 'Đồng hồ nam' },
            ],
        },
        {
            title: 'Chất liệu dây',
            choices: [
                { key: 'Dây Da', label: 'Dây Da' },
                { key: 'Dây Nhựa', label: 'Dây Nhựa' },
                { key: 'Dây Kim Loại', label: 'Dây Kim Loại' },
                { key: 'Dây Thép Không Gỉ Mạ Vàng PVD', label: 'Dây Thép Không Gỉ Mạ Vàng PVD' },
            ],
        },
        {
            title: 'Hình dáng mặt đồng hồ',
            choices: [
                { key: 'Mặt tròn', label: 'Mặt tròn' },
                { key: 'Mặt vuông', label: 'Mặt vuông' },
            ],
        },
        {
            title: 'Kháng nước',
            choices: [
                { key: '3', label: '3atm' },
                { key: '5', label: '5atm' },
                { key: '10', label: '10atm' },
                { key: '20', label: '20atm' },
            ],
        },
    ];

    // columns for filter
    const columns = [
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
            render: (text) => <b>{text}</b>,
        },
        {
            title: 'Lựa chọn',
            dataIndex: 'choices',
            key: 'choices',
            render: (choices, record) => (
                <div>
                    {choices.map((choice) => (
                        <div
                            key={choice.key}
                            onClick={() => handleSelect(record.title, choice)}
                            className='cursor-pointer hover:text-blue-500'
                        >
                            {choice.label}
                        </div>
                    ))}
                </div>
            ),
        },
    ];

    // show modal filter
    const showModal = () => {
        setIsModalVisible(true);
    };

    // close modal filter
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // handle logic and dispatch options to Redux
    const handleOk = () => {
        setIsModalVisible(false);
        dispatch(filterProducts(selectedFilters));
    };

    // handle select filter
    const handleSelect = (title, record) => {
        setSelectedValue(record.label);
        setSelectedFilters((prev) => {
            const isExist = prev.some((filter) => filter.key === record.key);
            if (!isExist) {
                return [...prev, { key: record.key, label: record.label, title }];
            }
            return prev;
        });
    };

    // handle remove filter
    const handleRemoveFilter = (filter) => {
        setSelectedFilters((prevFilters) => prevFilters.filter((f) => f.key !== filter.key));
    };

    // search filter label or filter options in modal filter by searchValue
    const filteredOptions = options.filter(
        (option) =>
            option.title.toLowerCase().includes(searchValue.toLowerCase()) ||
            option.choices.some((choice) =>
                choice.label.toLowerCase().includes(searchValue.toLowerCase())
            )
    );

    // display information of product
    const displayInfoProduct = () => {
        if (search_Redux.length > 0) {
            return `Tìm thấy ${search_Redux.length} kết quả cho từ khóa: ${search_Redux[0].brand}`;
        } else if (selectedFilters.length > 0) {
            return 'Kết quả lọc: ' + products_Redux.length + ' sản phẩm';
        } else {
            return 'Tất cả sản phẩm';
        }
    };

    return (
        <div className='mt-3 h-10 font-medium w-full px-10 grid grid-cols-3 items-center font-PlayfairDisplay'>
            {/* link to page */}
            <div className='w-[30vw]'>
                <Link to='/'>Trang chủ</Link> / {displayInfoProduct()}
            </div>

            {/* name page */}
            <div className='w-full text-center'>
                <p className='font-bold text-xl'>Sản phẩm</p>
            </div>

            {/* sort and filter */}
            <div className='flex items-center justify-end gap-2'>
                {/* filter */}
                <Input
                    placeholder='Bộ lọc'
                    value={selectedFilters.length > 0 ? `Bộ lọc: ${selectedFilters.length}` : ''}
                    onClick={showModal}
                    readOnly
                    style={{
                        width: 100,
                        height: 40,
                        cursor: 'pointer',
                        paddingLeft: '15px',
                        textAlign: 'left',
                    }}
                />

                {/* modal filter */}
                <Modal
                    title='Bộ lọc'
                    style={{ textAlign: 'center' }}
                    open={isModalVisible}
                    okText='Lọc'
                    cancelText='Hủy bỏ'
                    onOk={handleOk}
                    onCancel={handleCancel}
                    okButtonProps={{
                        className: 'bg-blue-500 text-white hover:bg-red-500 hover:text-white',
                    }}
                >
                    {/* search filter options */}
                    <Input
                        placeholder='Tìm kiếm bộ lọc...'
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />

                    {/* display options have been chosen */}
                    <div className='flex items-center flex-wrap gap-2 mt-3 mb-3'>
                        {selectedFilters.map((filter) => (
                            <div
                                key={filter.key}
                                className='bg-blue-500 text-white px-2 py-1 rounded-lg flex items-center gap-1'
                            >
                                <span>{filter.label}</span>
                                <span
                                    onClick={() => handleRemoveFilter(filter)}
                                    className='cursor-pointer'
                                >
                                    <MdDelete />
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* table filter options */}
                    <Table
                        dataSource={filteredOptions}
                        columns={columns}
                        rowKey='title'
                        pagination={false}
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
                            key: 'decrease',
                        },
                        {
                            value: 'increase',
                            label: 'Giá thấp tới cao',
                            key: 'increase',
                        },
                        {
                            value: 'A-Z',
                            label: 'Tên: A-Z',
                            key: 'A-Z',
                        },
                        {
                            value: 'Z-A',
                            label: 'Tên: Z-A',
                            key: 'Z-A',
                        },
                    ]}
                />
            </div>
        </div>
    );
};

export default Sort_Filter;
