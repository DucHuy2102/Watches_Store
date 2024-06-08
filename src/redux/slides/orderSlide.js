import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    orderItems: [],
    shippingAddress: {},
    paymentMethod: '',
    itemsPrice: 0,
    shippingPrice: 0,
    totalPrice: 0,
    user: '',
    isPaid: false,
    paidAt: '',
    isDelivered: false,
    deliveredAt: '',
};

export const orderSlide = createSlice({
    name: 'orderProduct',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            const { orderItems } = action.payload;
            const existItem = state?.orderItems?.find((item) => item?.id === orderItems.id);
            if (existItem) {
                existItem.amount += orderItems?.amount;
            } else {
                state.orderItems.push(orderItems);
            }
        },

        increaseAmount: (state, action) => {
            const { idProduct } = action.payload;
            const itemOrder = state?.orderItems?.find((item) => item?.id === idProduct);
            if (itemOrder) {
                itemOrder.amount += 1;
            }
        },

        decreaseAmount: (state, action) => {
            const { idProduct } = action.payload;
            const itemOrder = state?.orderItems?.find((item) => item?.id === idProduct);
            if (itemOrder && itemOrder.amount > 1) {
                itemOrder.amount -= 1;
            }
        },

        removeProductOrder: (state, action) => {
            const { idProduct } = action.payload;
            state.orderItems = state.orderItems.filter((item) => item?.id !== idProduct);
        },

        resetOrder: () => {
            return { ...initialState };
        },

        // Thêm action cập nhật toàn bộ orderItems
        updateOrderItems: (state, action) => {
            state.orderItems = action.payload;
        },
    },
});

export const {
    addProduct,
    removeProductOrder,
    increaseAmount,
    decreaseAmount,
    resetOrder,
    updateOrderItems,
} = orderSlide.actions;

export default orderSlide.reducer;
