import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    search: [],
};

export const findProductSlide = createSlice({
    name: 'searchProduct',
    initialState,
    reducers: {
        searchProduct: (state, action) => {
            state.search += action.payload;
        },
    },
});

export const { searchProduct } = findProductSlide.actions;

export default findProductSlide.reducer;
