import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    orderItems: [],
    shippingAddress: {},
    paymentMethod: '',
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
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
            const { orderItem } = action.payload;
            const existItem = state?.orderItems?.find(
                (item) => item?.product === orderItem.product
            );
            if (existItem) {
                existItem.amount += orderItem?.amount;
            } else {
                state.orderItems.push(orderItem);
            }
        },
        removeProductOrder: (state, action) => {
            const { idProduct } = action.payload;
            const itemOrder = state?.orderItems?.find((item) => item?.product !== idProduct);
            itemOrder.orderItems = itemOrder;
        },
    },
});

export const { addProduct, removeProductOrder } = orderSlide.actions;

export default orderSlide.reducer;
