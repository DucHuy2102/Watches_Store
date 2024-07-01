import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    orderItems: {
        data: [],
        productBuyNow: null,
        isBuyNow: false,
    },
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
            const {
                data = state.orderItems.data,
                productBuyNow = state.orderItems.productBuyNow,
                isBuyNow = state.orderItems.isBuyNow,
            } = action.payload;

            state.orderItems.data = data;
            state.orderItems.productBuyNow = productBuyNow;
            state.orderItems.isBuyNow = isBuyNow;
        },

        addProduct: (state, action) => {
            const { products, orderItems } = action.payload;
            state.products = products;
            const productInProducts = state.products.find(
                (product) => product.id === orderItems.product.id
            );

            if (productInProducts) {
                // Find if the product already exists in orderItems
                const existItemInOrder = state.orderItems.data.find(
                    (item) => item.product.id === orderItems.product.id
                );

                if (existItemInOrder) {
                    // If the product exists in orderItems, update its quantity
                    existItemInOrder.quantity += orderItems.quantity;
                } else {
                    // If the product does not exist in orderItems, add it with the given quantity
                    state.orderItems.data.push({
                        ...orderItems,
                        quantity: orderItems.quantity,
                    });
                }
            } else {
                // If the product is not found in the products list, push the orderItems directly
                state.orderItems.data.push(orderItems);
            }
        },

        increaseAmount: (state, action) => {
            const { idProduct } = action.payload;
            const itemOrder = state?.orderItems?.data.find(
                (item) => item?.product.id === idProduct
            );
            if (itemOrder) {
                itemOrder.quantity += 1;
            }
        },

        decreaseAmount: (state, action) => {
            const { idProduct } = action.payload;
            const itemOrder = state?.orderItems?.data.find(
                (item) => item?.product.id === idProduct
            );
            if (itemOrder && itemOrder.quantity > 1) {
                itemOrder.quantity -= 1;
            }
        },

        removeProductOrder: (state, action) => {
            const { idProduct } = action.payload;
            state.orderItems.data = state.orderItems.data.filter((item) => item?.id !== idProduct);
        },

        resetOrder: () => {
            return { ...initialState };
        },

        updateProductInCart: (state, action) => {
            const { oldId, newId } = action.payload;
            const itemOrder = state?.orderItems?.data.find((item) => item?.id === oldId);
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

        acceptOrder: (state, action) => {
            const { orderId } = action.payload;
            const order = state.orderDetail.find((order) => order.id === orderId);
            if (order) {
                order.state = 'complete';
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
    addOrderDetail,
    cancelOrder,
    acceptOrder,
} = orderSlide.actions;

export default orderSlide.reducer;
