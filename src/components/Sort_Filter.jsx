import { useEffect, useRef, useState } from 'react';
import {
    faChevronDown,
    faChevronUp,
    faEye,
    faFilter,
    faPerson,
    faPersonDress,
    faSort,
    faSortAmountDownAlt,
    faSortAmountUp,
    faTags,
    faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Sort_Filter = () => {
    // filter
    const [isOpenFilter, setIsOpenFilter] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('Bộ lọc');
    // sort
    const [isOpenSort, setIsOpenSort] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Sắp xếp theo');

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
        setSelectedFilter(filter);
        setIsOpenSort(false);
        // Thêm xử lý logic lọc sản phẩm ở đây
    };

    // Xử lý lựa chọn một tùy chọn
    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpenFilter(false);
        // Thêm xử lý logic sắp xếp sản phẩm ở đây
    };

    const filterRef = useRef(null);
    const sortRef = useRef(null);
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

    return (
        <div className='mt-3 h-10 font-medium w-full px-10 flex justify-between items-center font-PlayfairDisplay'>
            {/* link to page */}
            <div className='justify-start'>
                <p>Trang chủ / Tất cả sản phẩm /</p>
            </div>

            {/* name page */}
            <div className='justify-center ml-20'>
                <p className='font-bold text-xl'>{selectedFilter === 'Bộ lọc' ? 'Tất cả sản phẩm' : selectedFilter}</p>
            </div>

            {/* sort and filter */}
            <div className='flex items-center justify-end gap-2'>
                <div className='relative mt-1' ref={filterRef}>
                    <button
                        className='border border-black flex justify-center items-center bg-white text-black px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-300'
                        onClick={toggleMenuFilter}
                    >
                        <span className='mr-2'>{selectedFilter}</span>
                        <FontAwesomeIcon icon={faFilter} />
                    </button>
                    {/* Menu tùy chọn lọc */}
                    {isOpenFilter && (
                        <div className='absolute right-0 mt-2 w-44 bg-white rounded shadow-lg z-10'>
                            <ul className='text-black'>
                                <li
                                    className='pl-7 flex items-center px-2 py-2 hover:bg-black hover:text-white cursor-pointer'
                                    onClick={() => handleFilterClick('Đồng hồ nam')}
                                >
                                    <FontAwesomeIcon icon={faPerson} className='mr-2' />
                                    Đồng hồ nam
                                </li>
                                <li
                                    className='pl-7 flex items-center px-2 py-2 hover:bg-black hover:text-white cursor-pointer'
                                    onClick={() => handleFilterClick('Đồng hồ nữ')}
                                >
                                    <FontAwesomeIcon icon={faPersonDress} className='mr-2' />
                                    Đồng hồ nữ
                                </li>
                                {/* Thêm các tùy chọn lọc khác tại đây */}
                            </ul>
                        </div>
                    )}
                </div>

                {/* sort */}
                <div className='relative mt-1' ref={sortRef}>
                    <button
                        className='border border-black flex justify-center items-center bg-white text-black px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-300'
                        onClick={() => setIsOpenSort(!isOpenSort)}
                    >
                        <span className='mr-2'>{selectedOption}</span>
                        {isOpenSort ? <FontAwesomeIcon icon={faChevronDown} /> : <FontAwesomeIcon icon={faSort} />}
                    </button>
                    {/* Menu tùy chọn */}
                    {isOpenSort && (
                        <div className='absolute right-0 mt-2 w-48 bg-white rounded shadow-lg z-10'>
                            <ul className='text-gray-800'>
                                <li
                                    className='flex items-center px-4 py-2 hover:bg-black hover:text-white cursor-pointer'
                                    onClick={() => handleOptionClick('Được xem nhiều')}
                                >
                                    <FontAwesomeIcon icon={faEye} className='mr-2' />
                                    Được xem nhiều
                                </li>
                                <li
                                    className='flex items-center px-4 py-2 hover:bg-black hover:text-white cursor-pointer'
                                    onClick={() => handleOptionClick('Giá cao tới thấp')}
                                >
                                    <FontAwesomeIcon icon={faSortAmountDownAlt} className='mr-2' />
                                    Giá cao tới thấp
                                </li>
                                <li
                                    className='flex items-center px-4 py-2 hover:bg-black hover:text-white cursor-pointer'
                                    onClick={() => handleOptionClick('Giá thấp tới cao')}
                                >
                                    <FontAwesomeIcon icon={faSortAmountUp} className='mr-2' />
                                    Giá thấp tới cao
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sort_Filter;
