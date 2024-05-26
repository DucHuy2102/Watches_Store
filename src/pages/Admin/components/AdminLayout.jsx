import { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { BiCategoryAlt } from 'react-icons/bi';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { RiBillLine } from 'react-icons/ri';
import { Layout, Menu, theme } from 'antd';
import Admin_HeaderComponent from './Admin_HeaderComponent';
import { useNavigate } from 'react-router-dom';

const { Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

// const items = [
// more style for menu
// getItem('Quản lý người dùng', 'sub1', <UserOutlined />, [
//     getItem('Tom', '3'),
//     getItem('Bill', '4'),
//     getItem('Alex', '5'),
// ]),
// getItem('Quản lý hóa đơn', 'sub2', <TeamOutlined />, [
//     getItem('Team 1', '6'),
//     getItem('Team 2', '8'),
// ]),
// getItem('Files', '9', <FileOutlined />),
// ];

const AdminLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();

    const items = [
        getItem('Quản lý sản phẩm', '1', <MdOutlineProductionQuantityLimits />),
        getItem('Quản lý danh mục', '2', <BiCategoryAlt />),
        getItem('Quản lý đơn hàng', '3', <UserOutlined />),
        getItem('Quản lý người dùng', '4', <RiBillLine />),
    ];

    const handleNavigationPage = (key) => {
        switch (key) {
            case '1':
                return () => navigate('/admin/product');
            case '2':
                return () => navigate('/admin/category');
            case '3':
                return () => navigate('/admin/bill');
            case '4':
                return () => navigate('/admin/user');
            default:
                return () => navigate('/admin/dashboard');
        }
    };

    return (
        <>
            {/* header */}
            <Admin_HeaderComponent />
            <Layout className='min-h-[100vh]'>
                <Sider
                    width={240}
                    collapsible
                    collapsed={collapsed}
                    onCollapse={(value) => setCollapsed(value)}
                >
                    <div className='demo-logo-vertical' />
                    <Menu
                        onClick={({ key }) => handleNavigationPage(key)()}
                        className='h-full'
                        theme='dark'
                        defaultSelectedKeys={['1']}
                        mode='inline'
                        items={items}
                    />
                </Sider>
                <Layout>
                    {/* content */}
                    <Content
                        style={{
                            margin: '0 16px',
                        }}
                    >
                        <div className='mt-[20px] p-[24px] min-h-[100vh] bg-gray-200 rounded-[10px]'>
                            {children}
                        </div>
                    </Content>

                    {/* footer */}
                    <Footer className='text-center font-sans font-bold'>
                        Nguyễn Đức Huy - Huỳnh Lê Huy ©
                        {new Date().getFullYear()} HCMUTE
                    </Footer>
                </Layout>
            </Layout>
        </>
    );
};
export default AdminLayout;
