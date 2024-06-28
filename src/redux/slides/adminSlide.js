import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    search: [],
    users: [],
    orders: [],
    productsAdmin: [],
    originalProducts: [],
    orderDetail: [],
    isReload: false,
    product: {
        id: '',
        productName: '',
        img: [],
        amount: 0,
        price: 0,
        brand: '',
        origin: '',
        thickness: '',
        size: '',
        wireMaterial: '',
        shellMaterial: '',
        style: '',
        feature: '',
        shape: '',
        genderUser: '',
        description: '',
        color: '',
        weight: '',
        category: '',
        discount: 0,
        waterproof: 0,
        condition: '',
    },
};

export const adminSlide = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        updateProduct: (state, action) => {
            state.product = { ...state.product, ...action.payload };
        },

        resetProduct: (state) => {
            state.product = { ...initialState.product };
            state.productsAdmin = [];
            state.originalProducts = [];
        },

        addAllProducts: (state, action) => {
            state.originalProducts = action.payload;
            state.productsAdmin = action.payload;
        },

        addProductAdmin: (state, action) => {
            state.productsAdmin = [...state.productsAdmin, action.payload];
        },

        editProductAdmin: (state, action) => {
            const { idProduct, product } = action.payload;
            state.productsAdmin = state.productsAdmin.map((item) =>
                item?.id === idProduct ? product : item
            );
        },

        removeProductAdmin: (state, action) => {
            const { idProduct } = action.payload;
            state.productsAdmin = state.productsAdmin.filter((item) => item?.id !== idProduct);
        },

        addAllUser: (state, action) => {
            state.users = action.payload;
        },

        resetAllUser: (state) => {
            state.users = [];
        },

        blockUser: (state, action) => {
            const { userId } = action.payload;
            state.users = state.users.map((user) => {
                return user?.id === userId ? { ...user, state: 'blocked' } : user;
            });
        },

        unblockUSer: (state, action) => {
            const { userId } = action.payload;
            state.users = state.users.map((user) => {
                return user?.id === userId ? { ...user, state: 'active' } : user;
            });
        },

        deleteUser: (state, action) => {
            const { userId } = action.payload;
            state.users = state.users.filter((user) => user?.id !== userId);
        },

        addOrder: (state, action) => {
            state.orders = action.payload;
        },

        resetOrder: (state) => {
            state.orders = [];
        },

        addOrderDetail: (state, action) => {
            state.orderDetail = action.payload;
        },

        resetOrderDetail: (state) => {
            state.orderDetail = [];
        },

        cancelOrder: (state, action) => {
            const { orderId } = action.payload;
            state.orders = state.orders.map((order) =>
                order.id === orderId ? { ...order, state: 'cancel' } : order
            );
        },

        acceptOrder: (state, action) => {
            const { orderId } = action.payload;
            state.orders = state.orders.map((order) =>
                order.id === orderId ? { ...order, state: 'shipping' } : order
            );
        },
    },
});

export const {
    updateProduct,
    resetProduct,
    addAllProducts,
    removeProductAdmin,
    addProductAdmin,
    editProductAdmin,
    addAllUser,
    resetAllUser,
    blockUser,
    unblockUSer,
    deleteUser,
    addOrder,
    resetOrder,
    addOrderDetail,
    resetOrderDetail,
    cancelOrder,
    acceptOrder,
    resetUser,
} = adminSlide.actions;

export default adminSlide.reducer;
