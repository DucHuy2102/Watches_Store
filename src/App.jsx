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
];

const AdminRoute = ({ element, ...rest }) => {
    const user = useSelector((state) => state.user);
    // const isUserAdmin = user.isAdmin;
    const isUserAdmin = true;
    return isUserAdmin ? element : <Navigate to='/login' />;
};

const App = () => {
    // const dispatch = useDispatch();
    // const user = useSelector((state) => state.user);
    // console.log(user);

    // useEffect(() => {
    //     const handleGetUserDetail = async (access_token) => {
    //         const res = await UserService.getUserDetail(access_token);
    //         dispatch(updateUser({ ...res?.data, access_token: access_token }));
    //     };

    //     const access_token = localStorage.getItem('access_token');
    //     if (access_token) {
    //         handleGetUserDetail(access_token);
    //     }
    // }, [dispatch]);

    return (
        <div>
            <Router>
                {/* <Routes>
                    {routes.map((route) => {
                        const Page = route.component;
                        // const checkAdmin = !route.isPrivate || user.isAdmin;
                        // console.log(route.path, ' <--> ', checkAdmin);
                        const Layout = route.isShowHeader ? DefaultComponent : Fragment;
                        return (
                            <>
                                <Route
                                    key={route.path}
                                    path={route.path}
                                    // path={checkAdmin ? route.path : null}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                                // route admin
                                <Route />
                            </>
                        );
                    })}
                </Routes> */}
                <Routes>
                    {/* route user */}
                    {routes.map((route) => {
                        const Page = route.component;
                        const Layout = route.isShowHeader ? DefaultComponent : Fragment;
                        return (
                            <>
                                {/* route user */}
                                <Route
                                    key={route.path}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            </>
                        );
                    })}
                    {/* route admin */}
                    <Route
                        path='/admin/*'
                        element={
                            <AdminRoute
                                element={
                                    <AdminLayout>
                                        <Routes>
                                            <Route path='/dashboard' element={<Admin_DashboardPage />} />

                                            {/* bill */}
                                            <Route path='/bills' element={<Admin_BillPage />} />

                                            {/* user */}
                                            <Route path='/users' element={<Admin_UserPage />} />

                                            {/* product */}
                                            <Route path='/products' element={<Admin_ListProduct />} />
                                            <Route path='/products/add' element={<Admin_AddProduct />} />
                                            <Route path='/products/edit' element={<Admin_EditProduct />} />

                                            {/* category */}
                                            <Route path='/categories' element={<Admin_CategoryPage />} />
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
