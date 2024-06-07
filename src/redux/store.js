import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// import from './slides/userSlide';
import userReducer from './slides/userSlide';
import adminReducer from './slides/adminSlide';
import productReducer from './slides/productSlide';
import searchReducer from './slides/findProductSlide';
import orderReducer from './slides/orderSlide';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: ['searchProduct', 'product', 'user', 'admin'],
};
const rootReducer = combineReducers({
    user: userReducer,
    admin: adminReducer,
    product: productReducer,
    searchProduct: searchReducer,
    orderProduct: orderReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export let persistor = persistStore(store);
