import Sidebar_Admin from '../components/Sidebar_Admin';
import Content_Admin from './Content_Admin';

const MainContent_AdminPage = () => {
    return (
        <div className='flex w-full'>
            <Sidebar_Admin />
            <Content_Admin />
        </div>
    );
};

export default MainContent_AdminPage;
