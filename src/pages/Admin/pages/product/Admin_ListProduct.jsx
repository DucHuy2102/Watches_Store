import { useQuery } from '@tanstack/react-query';
import * as ProductService from '../../../../services/ProductService';
import Body_ListProduct from './Body_ListProduct';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const title = [
    'Tên đồng hồ',
    'Trạng thái',
    'Giá',
    'Số lượng tồn kho',
    'Thao tác',
];

const Admin_ListProduct = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const handleNavigation = (path) => {
        return () => navigate(path);
    };

    const getAllProduct = async () => {
        const res = await ProductService.getAllProduct();
        return res;
    };

    const { data, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: getAllProduct,
        keepPreviousData: true,
        onSuccess: (data) => setProducts(data.data),
    });

    const removeProductFromList = (id) => {
        setProducts(products.filter((product) => product.id !== id));
    };

    return (
        <div>
            <div className='mt-3 px-14 flex justify-between items-center'>
                <h1 className='font-bold text-2xl mt-2 text-center'>
                    Danh sách đồng hồ
                </h1>
                <button
                    onClick={handleNavigation('/admin/product/add')}
                    className='border border-black text-lg rounded-lg hover:bg-blue-500 hover:border-blue-500 hover:text-white transition duration-200 px-2 py-3'
                >
                    Thêm sản phẩm mới
                </button>
            </div>
            <div className='w-full'>
                <div className='mt-5'>
                    {/* <p className='font-bold text-xl pl-14 m b-1'>Hãng Casio</p> */}
                    <table className='w-full'>
                        <thead>
                            <tr>
                                {title.map((item, index) => (
                                    <th
                                        key={index}
                                        className='text-center border border-black font-semibold'
                                    >
                                        {item}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        {data?.data?.map((product) => (
                            <Body_ListProduct
                                key={product.id}
                                product={{ ...product, refetch }}
                                removeProductFromList={removeProductFromList}
                            />
                        ))}
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Admin_ListProduct;
