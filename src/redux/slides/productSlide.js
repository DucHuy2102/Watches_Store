import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    search: [],
    products: [],
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
        },
    },
});

export const { updateSearch, clearSearch, updateProduct, resetProduct, addAllProducts } =
    productSlide.actions;

export default productSlide.reducer;
