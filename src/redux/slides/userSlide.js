import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    username: '',
    email: '',
    phone: '',
    firstname: '',
    lastname: '',
    address: '',
    backgroundImg: '',
    avatarImg: '',
    companyID: '',
    companyName: '',
    companyEmail: '',
    companySize: '',
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
                address = '',
                backgroundImg = '',
                avatarImg = '',
                companyID = '',
                companyName = '',
                companyEmail = '',
                companySize = '',
                access_token = '',
            } = action.payload;
            state.username = username;
            state.email = email;
            state.phone = phone;
            state.firstname = firstname;
            state.lastname = lastname;
            state.address = address;
            state.backgroundImg = backgroundImg;
            state.avatarImg = avatarImg;
            state.companyID = companyID;
            state.companyName = companyName;
            state.companyEmail = companyEmail;
            state.companySize = companySize;
            state.access_token = access_token;
        },
        resetUser: (state) => {
            state.username = '';
            state.email = '';
            state.phone = '';
            state.firstname = '';
            state.lastname = '';
            state.address = '';
            state.backgroundImg = '';
            state.avatarImg = '';
            state.companyID = '';
            state.companyName = '';
            state.companyEmail = '';
            state.companySize = '';
            state.access_token = '';
        },
    },
});

export const { updateUser } = userSlide.actions;

export default userSlide.reducer;
