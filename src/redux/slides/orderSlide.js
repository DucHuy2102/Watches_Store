import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    orderItems: [],
    orderDetail: [],
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
        updateOrderItems: (state, action) => {
            state.orderItems = action.payload;
        },

        addProduct: (state, action) => {
            const { products, orderItems } = action.payload;
            state.products = products;
            // state.orderItems = orderItems;
            const productInProducts = state.products.find(
                (product) => product.id === orderItems.product.id
            );

            if (productInProducts) {
                // Find if the product already exists in orderItems
                const existItemInOrder = state.orderItems.find(
                    (item) => item.product.id === orderItems.product.id
                );

                if (existItemInOrder) {
                    // If the product exists in orderItems, update its quantity
                    existItemInOrder.quantity += orderItems.quantity;
                } else {
                    // If the product does not exist in orderItems, add it with the given quantity
                    state.orderItems.push({
                        ...orderItems,
                        quantity: orderItems.quantity,
                    });
                }
            } else {
                // If the product is not found in the products list, push the orderItems directly
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

        updateProductInCart: (state, action) => {
            const { oldId, newId } = action.payload;
            const itemOrder = state?.orderItems?.find((item) => item?.id === oldId);
            if (itemOrder) {
                itemOrder.id = newId;
            }
        },

        addOrderDetail: (state, action) => {
            state.orderDetail = action.payload;
        },

        cancelOrder: (state, action) => {
            const { orderId } = action.payload;
            state.orderDetail = state.orderDetail.filter((order) => order.id !== orderId);
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
    addOrderDetail,
    cancelOrder,
} = orderSlide.actions;

export default orderSlide.reducer;
