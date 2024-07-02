import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    productsAdmin: {
        data: [],
        needReload: true,
    },
    users: {
        data: [],
        needReload: true,
    },
    orders: {
        data: [],
        needReload: true,
    },
    orderDetail: [],
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
        // ---------------------------- PRODUCT ----------------------------
        addAllProducts: (state, action) => {
            const { data } = action.payload;
            state.productsAdmin.data = data;
            state.productsAdmin.needReload = false;
        },
        getDetailProduct: (state, action) => {
            state.product = action.payload;
        },
        resetProduct: (state) => {
            state.product = { ...initialState.product };
            state.productsAdmin = {
                ...state.productsAdmin,
                data: [],
                needReload: true,
            };
        },
        addNewProductAdmin: (state, action) => {
            const { data } = action.payload;
            state.productsAdmin.data = [...state.productsAdmin.data, data];
            state.productsAdmin.needReload = true;
        },
        removeProductAdmin: (state, action) => {
            const { idProduct } = action.payload;
            state.productsAdmin.data = state.productsAdmin.data.filter(
                (item) => item?.id !== idProduct
            );
            // state.productsAdmin.needReload = true;
        },

        // ---------------------------- USER ----------------------------
        addAllUser: (state, action) => {
            const { data, needReload } = action.payload;
            state.users.data = data;
            state.users.needReload = needReload;
        },
        resetAllUser: (state) => {
            state.users = {
                ...state.users,
                data: [],
                needReload: true,
            };
        },
        blockUser: (state, action) => {
            const { userId } = action.payload;
            state.users.data = state.users.data.map((user) => {
                return user?.id === userId ? { ...user, state: 'blocked' } : user;
            });
        },
        unblockUser: (state, action) => {
            const { userId } = action.payload;
            state.users.data = state.users.data.map((user) => {
                return user?.id === userId ? { ...user, state: 'active' } : user;
            });
        },
        deleteUser: (state, action) => {
            const { userId } = action.payload;
            state.users.data = state.users.data.filter((user) => user?.id !== userId);
        },

        // ---------------------------- ORDER ----------------------------
        addOrder: (state, action) => {
            const { data, needReload } = action.payload;
            state.orders.data = data;
            state.orders.needReload = needReload;
        },
        resetOrder: (state) => {
            state.orders = {
                ...state.orders,
                data: [],
                needReload: true,
            };
        },
        addOrderDetail: (state, action) => {
            state.orderDetail = action.payload;
        },
        resetOrderDetail: (state) => {
            state.orderDetail = [];
        },
        cancelOrder: (state, action) => {
            const { orderId } = action.payload;
            state.orders.data = state.orders.data.map((order) =>
                order.id === orderId ? { ...order, state: 'cancel' } : order
            );
        },
        acceptOrder: (state, action) => {
            const { orderId } = action.payload;
            state.orders.data = state.orders.data.map((order) =>
                order.id === orderId ? { ...order, state: 'shipping' } : order
            );
        },
    },
});

export const {
    addAllProducts,
    getDetailProduct,
    resetProduct,
    addNewProductAdmin,
    removeProductAdmin,
    addAllUser,
    resetAllUser,
    blockUser,
    unblockUser,
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
