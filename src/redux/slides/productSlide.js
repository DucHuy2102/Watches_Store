import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
    height: '',
    genderUser: '',
    description: '',
    color: '',
    category: null,
    stateProduct: '',
};

export const productSlide = createSlice({
    name: 'product',
    initialState,
    reducers: {
        updateProduct: (state, action) => {
            const {
                productName = '',
                img = [],
                amount = 0,
                price = 0,
                brand = '',
                origin = '',
                thickness = '',
                size = '',
                wireMaterial = '',
                shellMaterial = '',
                style = '',
                feature = '',
                shape = '',
                condition = '',
                height = '',
                genderUser = '',
                description = '',
                color = '',
                category = null,
                stateProduct = '',
            } = action.payload;
            state.productName = productName;
            state.img = img;
            state.amount = amount;
            state.price = price;
            state.brand = brand;
            state.origin = origin;
            state.thickness = thickness;
            state.size = size;
            state.wireMaterial = wireMaterial;
            state.shellMaterial = shellMaterial;
            state.style = style;
            state.feature = feature;
            state.shape = shape;
            state.condition = condition;
            state.height = height;
            state.genderUser = genderUser;
            state.description = description;
            state.color = color;
            state.category = category;
            state.stateProduct = stateProduct;
        },
        resetProduct: (state) => {
            state.productName = '';
            state.img = [];
            state.amount = 0;
            state.price = 0;
            state.brand = '';
            state.origin = '';
            state.thickness = '';
            state.size = '';
            state.wireMaterial = '';
            state.shellMaterial = '';
            state.style = '';
            state.feature = '';
            state.shape = '';
            state.condition = '';
            state.height = '';
            state.genderUser = '';
            state.description = '';
            state.color = '';
            state.category = '';
            state.stateProduct = '';
        },
    },
});

export const { updateProduct, resetProduct } = productSlide.actions;

export default productSlide.reducer;
