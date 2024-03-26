import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './routes/exportRoutes';
import { DefaultComponent } from './components/exportComponents';
import { Fragment } from 'react';

const App = () => {
    return (
        <div>
            <Router>
                <Routes>
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
                </Routes>
            </Router>
        </div>
    );
};

export default App;
