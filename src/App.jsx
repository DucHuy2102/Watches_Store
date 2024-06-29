import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { routes } from './routes/exportRoutes';
import { DefaultComponent } from './components/exportComponents';
import React from 'react';
import { useSelector } from 'react-redux';
import {
    AdminLayout,
    Admin_AddProduct,
    Admin_BillPage,
    Admin_CategoryPage,
    Admin_DashboardPage,
    Admin_EditProduct,
    Admin_ListProduct,
    Admin_NotFoundPage,
    Admin_ProfilePage,
    Admin_UserPage,
} from './pages/Admin/exportPageAdmin';

// route admin
const routeAdmin = [
    {
        path: '/dashboard',
        component: Admin_DashboardPage,
    },
    {
        path: '/bill',
        component: Admin_BillPage,
    },
    {
        path: '/user',
        component: Admin_UserPage,
    },
    {
        path: '/product',
        component: Admin_ListProduct,
    },
    {
        path: '/product/add',
        component: Admin_AddProduct,
    },
    {
        path: '/product/edit/:id',
        component: Admin_EditProduct,
    },
    {
        path: '/category',
        component: Admin_CategoryPage,
    },
    {
        path: '/profile',
        component: Admin_ProfilePage,
    },
    {
        path: '*',
        component: Admin_NotFoundPage,
    },
];

// check admin route
const AdminRoute = ({ element }) => {
    const userRedux = useSelector((state) => state.user);
    const isAdmin = userRedux?.admin;

    if (userRedux === undefined) {
        return <div>Loading...</div>;
    }

    if (isAdmin) {
        return element;
    } else if (userRedux.username !== '') {
        return <Navigate to='/' />;
    } else {
        return <Navigate to='/login' />;
    }
};

const App = () => {
    return (
        <div>
            <Router>
                <Routes>
                    {/* Route user */}
                    {routes.map((route) => {
                        const Page = route.component;
                        const Layout = route.isShowHeader ? DefaultComponent : React.Fragment;
                        return (
                            <Route
                                key={route.path}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}

                    {/* Route admin */}
                    <Route
                        path='/admin/*'
                        element={
                            <AdminRoute
                                element={
                                    <AdminLayout>
                                        <Routes>
                                            {routeAdmin.map((route) => (
                                                <Route
                                                    key={route.path}
                                                    path={route.path}
                                                    element={<route.component />}
                                                />
                                            ))}
                                        </Routes>
                                    </AdminLayout>
                                }
                            />
                        }
                    />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
