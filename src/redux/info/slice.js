import { createSlice } from '@reduxjs/toolkit';
import {
    addUserExperience,
    deleteUserExperience,
    getAllInstitution,
    getAllUsersForRole,
    getUserInfo,
    getUserInfoById,
    updateUserExperience,
    updateUserInfo,
} from './operation';

const initialState = {
    currentUserInfo: null,
    userInfoById: null,
    allPatients: null,
    allDoctors: null,
    allInstitution: null,
};

const infoSlice = createSlice({
    name: 'info',
    initialState,
    extraReducers: {
        [getUserInfo.fulfilled](state, action) {
            state.currentUserInfo = action.payload;
        },
        [getUserInfo.rejected](state, action) {
            console.log(action.payload);
        },
        [getUserInfoById.fulfilled](state, action) {
            state.userInfoById = action.payload;
        },
        [getUserInfoById.rejected](state, action) {
            // console.log(action.payload);
        },
        [getAllUsersForRole.fulfilled](state, action) {
            if (action.meta.arg === 'Patient') {
                state.allPatients = action.payload;
            }
            if (action.meta.arg === 'Doctor') {
                state.allDoctors = action.payload;
            }
        },
        [getAllUsersForRole.rejected](state, action) {
            // console.log(action.payload);
        },

        [updateUserInfo.fulfilled](state, action) {
            // console.log(action.payload);
            state.currentUserInfo = action.payload;
        },
        [updateUserInfo.rejected](state, action) {
            console.log('rejected', action.payload);
        },

        [addUserExperience.fulfilled](state, action) {
            state.currentUserInfo = action.payload;
        },
        [addUserExperience.rejected](state, action) {
            // console.log(action.payload);
        },
        [updateUserExperience.fulfilled](state, action) {
            state.currentUserInfo = action.payload;
        },
        [updateUserExperience.rejected](state, action) {
            // console.log(action.payload);
        },
        [deleteUserExperience.fulfilled](state, action) {
            state.currentUserInfo = action.payload;
        },
        [deleteUserExperience.rejected](state, action) {
            // console.log(action.payload);
        },
        [getAllInstitution.fulfilled](state, action) {
            state.allInstitution = action.payload;
        },
        [getAllInstitution.rejected](state, action) {
            // console.log(action.payload);
        },
    },
});

export const infoReducer = infoSlice.reducer;
