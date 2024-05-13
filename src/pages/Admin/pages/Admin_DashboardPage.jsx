import { useNavigate } from 'react-router-dom';
import Admin_HeaderComponent from '../components/Admin_HeaderComponent';

const titlePage = [
    { id: 1, name: 'Quản lý sản phẩm', path: '/admin/product' },
    { id: 2, name: 'Quản lý danh mục', path: '/admin/category' },
    { id: 3, name: 'Quản lý hóa đơn', path: '/admin/bill' },
    { id: 4, name: 'Quản lý người dùng', path: '/admin/user' },
];

const Admin_DashboardPage = () => {
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
            <div className='bg-[#222831] py-2 flex flex-col font-PlayfairDisplay'>
                {/* header */}
                <Admin_HeaderComponent />
            </div>
            {/* menu options */}
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
        </>
    );
};

export default Admin_DashboardPage;
