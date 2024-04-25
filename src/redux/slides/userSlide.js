import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    username: '',
    email: '',
    access_token: '',
};

export const userSlide = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const { username, email, access_token } = action.payload;
            state.username = username;
            state.email = email;
            state.access_token = access_token;
        },
    },
});

export const { updateUser } = userSlide.actions;

export default userSlide.reducer;
