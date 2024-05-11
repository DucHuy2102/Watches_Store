import Header_Admin from './Header_Admin';
import Sidebar_Admin from './Sidebar_Admin';

const DefaultPage = ({ children }) => {
    return (
        <div>
            <Header_Admin />
            <div className='flex'>
                <Sidebar_Admin />
                {children}
            </div>
        </div>
    );
};

export default DefaultPage;
