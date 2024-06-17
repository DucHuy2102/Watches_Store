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
                existItem.quantity += orderItems?.quantity;
            } else {
                state.orderItems.push(orderItems);
            }
        },

        increaseAmount: (state, action) => {
            const { idProduct } = action.payload;
            const itemOrder = state?.orderItems?.find((item) => item?.product.id === idProduct);
            if (itemOrder) {
                itemOrder.quantity += 1;
            }
        },

        decreaseAmount: (state, action) => {
            const { idProduct } = action.payload;
            const itemOrder = state?.orderItems?.find((item) => item?.product.id === idProduct);
            if (itemOrder && itemOrder.quantity > 1) {
                itemOrder.quantity -= 1;
            }
        },

        removeProductOrder: (state, action) => {
            const { idProduct } = action.payload;
            state.orderItems = state.orderItems.filter((item) => item?.id !== idProduct);
        },

        resetOrder: () => {
            return { ...initialState };
        },

        updateOrderItems: (state, action) => {
            state.orderItems = action.payload;
        },
        updateProductInCart: (state, action) => {
            const { oldId, newId } = action.payload;
            const itemOrder = state?.orderItems?.find((item) => item?.id === oldId);
            if (itemOrder) {
                itemOrder.id = newId;
            }
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
    updateProductInCart,
} = orderSlide.actions;

export default orderSlide.reducer;
