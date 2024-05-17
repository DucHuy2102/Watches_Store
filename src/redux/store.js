import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slides/userSlide';
import adminReducer from './slides/adminSlide';

export default configureStore({
    reducer: {
        user: userReducer,
        admin: adminReducer,
    },
});
