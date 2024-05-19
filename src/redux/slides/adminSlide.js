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

export const adminSlide = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        updateAdmin: (state, action) => {
            const {
                username = '',
                email = '',
                phone = '',
                firstname = '',
                lastname = '',
                backgroundImg = '',
                avatarImg = '',
                address = '',
                access_token = '',
                admin,
            } = action.payload;
            state.username = username;
            state.email = email;
            state.phone = phone;
            state.firstname = firstname;
            state.lastname = lastname;
            state.backgroundImg = backgroundImg;
            state.avatarImg = avatarImg;
            state.address = address;
            state.admin = admin;
            state.access_token = access_token;
        },
        resetAdmin: (state) => {
            state.username = '';
            state.email = '';
            state.phone = '';
            state.firstname = '';
            state.lastname = '';
            state.backgroundImg = '';
            state.avatarImg = '';
            state.address = '';
            state.admin = false;
            state.access_token = '';
        },
    },
});

export const { updateAdmin, resetAdmin } = adminSlide.actions;

export default adminSlide.reducer;
