import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    search: [],
    products: [],
    originalProducts: [],
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
        condition: '',
        genderUser: '',
        description: '',
        color: '',
        weight: '',
        category: '',
        discount: 0,
    },
};

export const productSlide = createSlice({
    name: 'product',
    initialState,
    reducers: {
        updateSearch: (state, action) => {
            state.search = action.payload;
        },
        clearSearch: (state) => {
            state.search = [];
        },
        updateProduct: (state, action) => {
            state.product = { ...state.product, ...action.payload };
        },
        resetProduct: (state) => {
            state.product = { ...initialState.product };
        },
        addAllProducts: (state, action) => {
            state.products = action.payload;
            state.originalProducts = action.payload;
        },
        sortProducts: (state, action) => {
            const option = action.payload;
            if (option === undefined || option === 'undefined') {
                state.products = [...state.originalProducts];
            } else if (option === 'increase') {
                state.products = [...state.products].sort((a, b) => a.price - b.price);
            } else if (option === 'decrease') {
                state.products = [...state.products].sort((a, b) => b.price - a.price);
            } else if (option === 'A-Z') {
                state.products = [...state.products].sort((a, b) =>
                    a.productName.localeCompare(b.productName)
                );
            } else if (option === 'Z-A') {
                state.products = [...state.products].sort((a, b) =>
                    b.productName.localeCompare(a.productName)
                );
            }
        },
    },
});

export const {
    updateSearch,
    clearSearch,
    sortProducts,
    updateProduct,
    resetProduct,
    addAllProducts,
} = productSlide.actions;

export default productSlide.reducer;
