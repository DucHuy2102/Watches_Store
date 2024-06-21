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

// import from './slides/...';
import userReducer from './slides/userSlide';
import productReducer from './slides/productSlide';
import orderReducer from './slides/orderSlide';
import adminReducer from './slides/adminSlide';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: ['searchProduct', 'product'],
};
const rootReducer = combineReducers({
    user: userReducer,
    product: productReducer,
    orderProduct: orderReducer,
    admin: adminReducer,
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
