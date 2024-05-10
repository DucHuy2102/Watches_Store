import Header_Admin from './components/Header_Admin';
import MainContent_AdminPage from './pages/MainContent_AdminPage';

const AdminPage = () => {
    return (
        <div className='flex flex-col'>
            <Header_Admin />
            <MainContent_AdminPage />
        </div>
    );
};

export default AdminPage;
