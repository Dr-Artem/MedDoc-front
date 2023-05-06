import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// const URL = 'https://meddoc-backend.herokuapp.com/api/';

// const api = axios.create({
//     baseURL: URL,
//     // params: {
//     //     page: 1,
//     // },
// });
// axios.defaults.baseURL = 'http://localhost:3000/api';
// axios.defaults.baseURL = 'https://meddoc-backend.herokuapp.com/api';
axios.defaults.baseURL = 'https://wild-tan-mackerel-kilt.cyclic.app/api';

const token = {
    set(token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    },

    unset() {
        axios.defaults.headers.common.Authorization = '';
    },
};

export const register = createAsyncThunk('/auth/register', async (credentials, { rejectWithValue }) => {
    try {
        const { data } = await axios.post('/auth/register', credentials);
        token.set(data.token);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.status);
    }
});

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
    try {
        const { data } = await axios.post('/auth/login', credentials);
        token.set(data.token);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.status);
    }
});

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get('/auth/logout');
        token.unset();
        return data;
    } catch (error) {
        return rejectWithValue(error.response.status);
    }
});
