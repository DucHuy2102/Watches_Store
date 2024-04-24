import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    email: '',
    phone: '',
    token: '',
};

export const userSlide = createSlice({
    name: 'user',
    initialState,
    reducers: {
        initialUser: (state, action) => {},
    },
});

export const { initialUser } = userSlide.actions;

export default userSlide.reducer;
