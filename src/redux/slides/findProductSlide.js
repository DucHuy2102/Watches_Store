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
    },
});

export const { updateProduct } = findProductSlide.actions;

export default findProductSlide.reducer;
