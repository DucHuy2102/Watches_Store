import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
};

export const productSlide = createSlice({
    name: 'product',
    initialState,
    reducers: {
        updateProduct: (state, action) => {
            const {
                id = '',
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
                genderUser = '',
                description = '',
                color = '',
                weight = '',
                category = '',
            } = action.payload;
            state.id = id;
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
            state.genderUser = genderUser;
            state.description = description;
            state.color = color;
            state.weight = weight;
            state.category = category;
        },
        resetProduct: (state) => {
            state.id = '';
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
            state.genderUser = '';
            state.description = '';
            state.color = '';
            state.weight = '';
            state.category = '';
        },
    },
});

export const { updateProduct, resetProduct } = productSlide.actions;

export default productSlide.reducer;