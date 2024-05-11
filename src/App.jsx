import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './routes/exportRoutes';
import { DefaultComponent } from './components/exportComponents';
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from './services/UserService';
import { updateUser } from './redux/slides/userSlide';

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
                <Routes>
                    {routes.map((route) => {
                        const Page = route.component;
                        // const checkAdmin = !route.isPrivate || user.isAdmin;
                        // console.log(route.path, ' <--> ', checkAdmin);
                        const Layout = route.isShowHeader ? DefaultComponent : Fragment;
                        return (
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
                        );
                    })}
                </Routes>
            </Router>
        </div>
    );
};

export default App;
