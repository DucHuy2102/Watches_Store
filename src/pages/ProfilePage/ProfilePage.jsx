import CoverImg_ProfileUser from './CoverImg_ProfileUser';
import UserProfilePage from './ProfileContent/UserProfilePage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';

const ProfilePage = () => {
    return (
        <div>
            <CoverImg_ProfileUser />
            <UserProfilePage />

            {/* toast */}
            <ToastContainer
                position='top-right'
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default ProfilePage;
