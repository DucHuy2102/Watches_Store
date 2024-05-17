import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { routes } from './routes/exportRoutes';
import { DefaultComponent } from './components/exportComponents';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import {
    AdminLayout,
    Admin_AddProduct,
    Admin_BillPage,
    Admin_CategoryPage,
    Admin_DashboardPage,
    Admin_EditProduct,
    Admin_ListProduct,
    Admin_ProfilePage,
    Admin_UserPage,
} from './pages/Admin/exportPageAdmin';

const routeAdmin = [
    {
        path: '/dashboard',
        component: Admin_DashboardPage,
    },
    {
        path: '/bills',
        component: Admin_BillPage,
    },
    {
        path: '/users',
        component: Admin_UserPage,
    },
    {
        path: '/products',
        component: Admin_ListProduct,
    },
    {
        path: '/products/add',
        component: Admin_AddProduct,
    },
    {
        path: '/products/edit',
        component: Admin_EditProduct,
    },
    {
        path: '/categories',
        component: Admin_CategoryPage,
    },
    {
        path: '/profile',
        component: Admin_ProfilePage,
    },
];

const AdminRoute = ({ element }) => {
    const user = useSelector((state) => state.user);
    const isUserAdmin = true; // const isUserAdmin = user.isAdmin;
    return isUserAdmin ? element : <Navigate to='/login' />;
};

const App = () => {
    return (
        <div>
            <Router>
                <Routes>
                    {/* Route user */}
                    {routes.map((route) => {
                        const Page = route.component;
                        const Layout = route.isShowHeader ? DefaultComponent : Fragment;
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
