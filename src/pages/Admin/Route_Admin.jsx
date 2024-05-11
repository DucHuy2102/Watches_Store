import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './exportRoutes_Admin';
import DefaultPage from './components/DefaultPage';

const Route_Admin = () => {
    return (
        <div>
            <Router>
                <Routes>
                    {routes.map((route) => {
                        const Page = route.component;
                        return (
                            <Route
                                key={route.path}
                                path={route.path}
                                element={
                                    <DefaultPage>
                                        <Page />
                                    </DefaultPage>
                                }
                            />
                        );
                    })}
                </Routes>
            </Router>
        </div>
    );
};

export default Route_Admin;
