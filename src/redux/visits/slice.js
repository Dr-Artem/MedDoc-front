import { createSlice } from '@reduxjs/toolkit';
import { getAllVisits, addVisit, updateVisit, uploadPDF, deletePDF } from './operation';

const initialState = {
    visits: [],
    isLoading: false,
    error: null,
};

const visitsSlice = createSlice({
    name: 'visits',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getAllVisits.pending, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAllVisits.fulfilled, (state, action) => {
                state.visits = action.payload;
                state.isLoading = false;
            })
            .addCase(getAllVisits.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(addVisit.pending, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addVisit.fulfilled, (state, action) => {
                state.visits.push(action.payload);
                state.isLoading = false;
            })
            .addCase(addVisit.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(updateVisit.pending, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateVisit.fulfilled, (state, action) => {
                const index = state.visits.findIndex(visit => visit.id === action.payload.id);
                if (index !== -1) {
                    state.visits[index] = action.payload;
                }
                state.isLoading = false;
            })
            .addCase(updateVisit.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(uploadPDF.pending, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(uploadPDF.fulfilled, (state, action) => {
                const index = state.visits.findIndex(visit => visit.id === action.payload.id);
                if (index !== -1) {
                    state.visits[index].pdf = action.payload.pdf;
                }
                state.isLoading = false;
            })
            .addCase(uploadPDF.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(deletePDF.pending, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deletePDF.fulfilled, (state, action) => {
                const index = state.visits.findIndex(visit => visit.id === action.payload.id);
                if (index !== -1) {
                    state.visits[index].pdf = null;
                }
                state.isLoading = false;
            })
            .addCase(deletePDF.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            });
    },
});



export const visitsReducer = visitsSlice.reducer;