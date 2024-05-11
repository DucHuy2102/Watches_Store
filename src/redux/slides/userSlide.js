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
    isAdmin: false,
    access_token: '',
};

export const userSlide = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
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
                idAdmin,
            } = action.payload;
            state.username = username;
            state.email = email;
            state.phone = phone;
            state.firstname = firstname;
            state.lastname = lastname;
            state.backgroundImg = backgroundImg;
            state.avatarImg = avatarImg;
            state.address = address;
            state.isAdmin = idAdmin;
            state.access_token = access_token;
        },
        resetUser: (state) => {
            state.username = '';
            state.email = '';
            state.phone = '';
            state.firstname = '';
            state.lastname = '';
            state.backgroundImg = '';
            state.avatarImg = '';
            state.address = '';
            state.isAdmin = false;
            state.access_token = '';
        },
    },
});

export const { updateUser, resetUser } = userSlide.actions;

export default userSlide.reducer;
