import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutationHook } from '../hooks/useMutationHook';
import * as ProductService from '../services/ProductService';
import { sortProducts, updateSearch } from '../redux/slides/productSlide';
import { useDispatch, useSelector } from 'react-redux';
import { Select } from 'antd';

const Sort_Filter = () => {
    const dispatch = useDispatch();

    // Lấy dữ liệu sản phẩm từ Redux
    const productsRedux = useSelector((state) => state.product.products);
    const searchRedux = useSelector((state) => state.product.search);
    const numberProduct = searchRedux?.length;

    // filter
    const [isOpenFilter, setIsOpenFilter] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('Bộ lọc');

    // sort
    const [isOpenSort, setIsOpenSort] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Sắp xếp theo');

    // Hook xử lý tìm kiếm sản phẩm theo tên
    const mutationFindProduct = useMutationHook((name) => ProductService.findProductByName(name));

    // Xử lý mở / đóng menu lọc
    const toggleMenuFilter = () => {
        if (isOpenFilter) {
            if (selectedFilter === 'Bộ lọc') {
                setSelectedFilter('Bộ lọc');
            }
        }
        setIsOpenFilter(!isOpenFilter);
    };

    // Xử lý lựa chọn một tùy chọn lọc
    const handleFilterClick = (filter) => {
        const filterName = filter === 'Đồng hồ nam' ? 'Nam' : 'Nữ';
        setSelectedFilter(filter);
        setIsOpenSort(false);
        const filterGenderProduct = productsRedux.filter(
            (product) => product.genderUser === filterName
        );
        if (filterGenderProduct.length > 0) {
            dispatch(updateSearch(filterGenderProduct));
            setIsOpenFilter(false);
        }
    };

    // Xử lý lựa chọn một tùy chọn
    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpenFilter(false);
        // Thêm xử lý logic sắp xếp sản phẩm ở đây
    };

    // Hook xử lý tìm kiếm sản phẩm theo tên sản phẩm và loại sản phẩm
    const filterRef = useRef(null);
    const sortRef = useRef(null);

    // Xử lý click ngoài menu lọc và menu sắp xếp
    useEffect(() => {
        const handleClickOutsideFilter = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setIsOpenFilter(false);
            }
        };
        const handleClickOutsideSort = (event) => {
            if (sortRef.current && !sortRef.current.contains(event.target)) {
                setIsOpenSort(false);
            }
        };
        document.addEventListener('click', handleClickOutsideFilter);
        document.addEventListener('click', handleClickOutsideSort);
        return () => {
            document.removeEventListener('click', handleClickOutsideFilter);
            document.removeEventListener('click', handleClickOutsideSort);
        };
    }, []);

    const handleSort = (value) => {
        console.log(`selected ${value}`);
        dispatch(sortProducts(value));
    };

    const displaySearch = () => {
        if (searchRedux && searchRedux.length > 0) {
            return `Tìm được ${searchRedux.length} sản phẩm`;
        }
        return 'Tất cả sản phẩm';
    };

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
                    {selectedFilter === 'Bộ lọc' ? 'Tất cả sản phẩm' : selectedFilter}
                </p>
            </div>

            {/* sort and filter */}
            <div className='flex items-center justify-end gap-2'>
                {/* filter */}
                {/* <Select
                    placeholder='Bộ lọc'
                    className='select-filter'
                    allowClear
                    onChange={handleChange}
                    options={[
                        {
                            value: 'Nam',
                            label: 'Đồng hồ nam',
                        },
                        {
                            value: 'Nữ',
                            label: 'Đồng hồ nữ',
                        },
                        {
                            value: 'Yiminghe',
                            label: 'yiminghe',
                        },
                        {
                            value: 'disabled',
                            label: 'Disabled',
                            disabled: true,
                        },
                    ]}
                /> */}

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
