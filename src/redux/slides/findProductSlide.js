import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    search: [],
};

export const findProductSlide = createSlice({
    name: 'searchProduct',
    initialState,
    reducers: {
        updateProduct: (state, action) => {
            state.search = action.payload;
        },
        clearSearch: (state) => {
            state.search = [];
        },
    },
});

export const { updateProduct, clearSearch } = findProductSlide.actions;

export default findProductSlide.reducer;
