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
    id: '',
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
                _id = '',
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
            state._id = _id;
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
            state._id = '';
            state.access_token = '';
        },
    },
});

export const { updateUser, resetUser } = userSlide.actions;

export default userSlide.reducer;
