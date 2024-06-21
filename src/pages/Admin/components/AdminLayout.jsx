import { useEffect, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { BiCategoryAlt } from 'react-icons/bi';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { RiBillLine } from 'react-icons/ri';
import { Layout, Menu } from 'antd';
import Admin_HeaderComponent from './Admin_HeaderComponent';
import { useNavigate } from 'react-router-dom';
import * as ProductService from '../../../services/ProductService';
import { useQuery } from '@tanstack/react-query';
import { addAllProducts } from '../../../redux/slides/adminSlide';
import { useDispatch, useSelector } from 'react-redux';

const { Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const AdminLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const [selectedKeys, setSelectedKeys] = useState([]);

    const items = [
        getItem('Quản lý sản phẩm', '1', <MdOutlineProductionQuantityLimits />),
        getItem('Quản lý đơn hàng', '2', <UserOutlined />),
        getItem('Quản lý người dùng', '3', <RiBillLine />),
    ];

    const handleNavigationPage = (key) => {
        setSelectedKeys([key]);
        switch (key) {
            case '1':
                return () => navigate('/admin/product');
            case '2':
                return () => navigate('/admin/bill');
            case '3':
                return () => navigate('/admin/user');
            default:
                return () => navigate('/admin/dashboard');
        }
    };

    // ----------------- Get Product And Dispatch To Redux -------------------
    const dispatch = useDispatch();

    // get data from redux
    const products_Redux = useSelector((state) => state.admin.productsAdmin);
    const productLength = products_Redux.length;

    // get all product
    const getAllProduct = async () => {
        const res = await ProductService.getAllProduct();
        return res;
    };

    // useQuery to get all product
    const { data } = useQuery({
        queryKey: ['products'],
        queryFn: getAllProduct,
        enabled: productLength === 0,
    });

    // Add all products to redux store
    useEffect(() => {
        if (data?.data && productLength === 0) {
            dispatch(addAllProducts(data.data));
        }
    }, [data, dispatch, productLength]);

    return (
        <>
            {/* header */}
            <Admin_HeaderComponent />

            {/* sidebar */}
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
                        selectedKeys={selectedKeys}
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
                        Nguyễn Đức Huy - Huỳnh Lê Huy ©{new Date().getFullYear()} HCMUTE
                    </Footer>
                </Layout>
            </Layout>
        </>
    );
};

export default AdminLayout;
