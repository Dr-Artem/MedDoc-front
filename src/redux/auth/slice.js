import { createSlice } from '@reduxjs/toolkit';
import { login, logout, register } from './operation';

const initialState = {
    user: { id: null, username: null, phone: null, role: null, avatarURL: null },
    accessToken: null,
    refreshToken: null,
    isLoggedIn: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: {
        [register.fulfilled](state, action) {
            // console.log(action.payload);
            state.user.id = action.payload._id;
            state.user.username = action.payload.name;
            state.user.phone = action.payload.number;
            state.user.role = action.payload.role;
            state.user.avatarURL = action.payload.avatarURL;
            state.accessToken = action.payload.token;
        },
        [login.fulfilled](state, action) {
            state.user.id = action.payload._id;
            state.user.username = action.payload.name;
            state.user.phone = action.payload.number;
            state.user.role = action.payload.role;
            state.user.avatarURL = action.payload.avatarURL;
            state.accessToken = action.payload.token;

            state.isLoggedIn = true;
        },
        [register.rejected](state, action) {
            // console.log(action.payload);
        },
        [login.rejected](state, action) {
            // console.log(action.payload);
        },
        [logout.fulfilled](state, action) {
            state.user = { id: null, username: null, phone: null, role: null, avatarURL: null };
            state.accessToken = null;
            state.refreshToken = null;
            state.isLoggedIn = false;
        },
    },
});

export const authReducer = authSlice.reducer;
