import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    username: '',
    email: '',
    phone: '',
    firstname: '',
    lastname: '',
    backgroundImg: '',
    avatarImg: '',
    address: '',
    admin: false,
    access_token: '',
};

export const userSlide = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            return { ...state, ...action.payload };
        },

        resetUser: () => {
            return { ...initialState };
        },
    },
});

export const { updateUser, resetUser } = userSlide.actions;

export default userSlide.reducer;
