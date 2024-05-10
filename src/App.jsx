import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './routes/exportRoutes';
import { DefaultComponent } from './components/exportComponents';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';

const App = () => {
    // const getUser_From_Redux = useSelector((state) => state.user);

    return (
        <div>
            <Router>
                <Routes>
                    {routes.map((route) => {
                        const Page = route.component;
                        // const checkAdmin = !route.isPrivate || getUser_From_Redux.isAdmin;
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
                </Routes>
            </Router>
        </div>
    );
};

export default App;
