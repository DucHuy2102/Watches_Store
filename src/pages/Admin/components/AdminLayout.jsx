import { useNavigate } from 'react-router-dom';
import Admin_HeaderComponent from './Admin_HeaderComponent';

const titlePage = [
    { id: 1, name: 'Quản lý sản phẩm', path: '/admin/products' },
    { id: 2, name: 'Quản lý danh mục', path: '/admin/categories' },
    { id: 3, name: 'Quản lý hóa đơn', path: '/admin/bills' },
    { id: 4, name: 'Quản lý người dùng', path: '/admin/users' },
];

const AdminLayout = ({ children }) => {
    const navigate = useNavigate();
    const handleNavigationPage = (path) => {
        switch (path) {
            case '/admin/products':
                return () => navigate('/admin/products');
            case '/admin/categories':
                return () => navigate('/admin/categories');
            case '/admin/bills':
                return () => navigate('/admin/bills');
            case '/admin/users':
                return () => navigate('/admin/users');
            default:
                return () => navigate('/admin/dashboard');
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

            {/* children pages */}
            {children}
        </>
    );
};

export default AdminLayout;
