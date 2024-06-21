import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    search: [],
    isFilter: false,
    products: [],
    originalProducts: [],
    productsAdmin: [],
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
            state.productsAdmin = action.payload;
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

        filterProducts: (state, action) => {
            const filters = action.payload;
            let count = 0;
            if (filters.length === 0) {
                state.products = state.originalProducts;
                return;
            } else {
                state.products = state.originalProducts.filter((item) => {
                    return filters.every((filter) => {
                        switch (filter.title) {
                            case 'Đối tượng':
                                count++;
                                return item.genderUser === filter.key;
                            case 'Chất liệu dây':
                                count++;
                                return item.wireMaterial === filter.key;
                            case 'Hình dáng mặt đồng hồ':
                                count++;
                                return item.shape === filter.key;
                            case 'Kháng nước':
                                count++;
                                return item.waterproof === Number(filter.key);
                            default:
                                return true;
                        }
                    });
                });
            }
            if (count !== 0) {
                state.isFilter = true;
            }
        },

        clearFilter: (state) => {
            state.isFilter = false;
            state.products = state.originalProducts;
        },

        addProductAdmin: (state, action) => {
            state.productsAdmin = [...state.productsAdmin, action.payload];
        },

        editProductAdmin: (state, action) => {
            const { idProduct, product } = action.payload;
            state.productsAdmin = state.productsAdmin.map((item) =>
                item?.id === idProduct ? product : item
            );
        },

        removeProductAdmin: (state, action) => {
            const { idProduct } = action.payload;
            state.productsAdmin = state.productsAdmin.filter((item) => item?.id !== idProduct);
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
    filterProducts,
    clearFilter,
    removeProductAdmin,
    addProductAdmin,
    editProductAdmin,
} = productSlide.actions;

export default productSlide.reducer;
