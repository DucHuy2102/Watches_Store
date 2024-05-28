import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slides/userSlide';
import adminReducer from './slides/adminSlide';
import productReducer from './slides/productSlide';
import searchReducer from './slides/findProductSlide';

export default configureStore({
    reducer: {
        user: userReducer,
        admin: adminReducer,
        product: productReducer,
        searchProduct: searchReducer,
    },
});
