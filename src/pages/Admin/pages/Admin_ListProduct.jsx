import { useNavigate } from 'react-router-dom';
import Admin_HeaderComponent from '../components/Admin_HeaderComponent';
import ListProduct from './ListProduct';

const titlePage = [
    { id: 1, name: 'Quản lý sản phẩm', path: '/admin/product' },
    { id: 2, name: 'Quản lý danh mục', path: '/admin/category' },
    { id: 3, name: 'Quản lý hóa đơn', path: '/admin/bill' },
    { id: 4, name: 'Quản lý người dùng', path: '/admin/user' },
];

const Admin_ListProduct = () => {
    const navigate = useNavigate();
    const handleNavigationPage = (path) => {
        switch (path) {
            case '/admin/product':
                return () => navigate('/admin/product');
            case '/admin/category':
                return () => navigate('/admin/category');
            case '/admin/bill':
                return () => navigate('/admin/bill');
            case '/admin/user':
                return () => navigate('/admin/user');
            default:
                return () => navigate('/admin/product');
        }
    };
    return (
        <>
            {/* header */}
            <div>
                <div className='bg-[#222831] py-2 flex flex-col font-PlayfairDisplay'>
                    <Admin_HeaderComponent />
                </div>
                <table className='bg-white w-full h-10'>
                    <tbody>
                        <tr>
                            {titlePage.map((item) => (
                                <th
                                    onClick={handleNavigationPage(item.path)}
                                    key={item.id}
                                    className='text-white bg-[#222831] hover:cursor-pointer hover:bg-[#526D82] hover:text-white'
                                >
                                    {item.name}
                                </th>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* content */}
            <h1 className='font-bold text-2xl mt-2 text-center'>Danh sách đồng hồ</h1>
            <div className='w-full'>
                <ListProduct />
            </div>
        </>
    );
};

export default Admin_ListProduct;
