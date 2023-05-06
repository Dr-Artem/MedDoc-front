import { createSlice } from '@reduxjs/toolkit';
import { addVisit, getAllVisits, updateVisit, uploadPDF } from './operation';

const initialState = {
    visits: [],
    isLoading: false,
    error: null,
};

const visitsSlice = createSlice({
    name: 'visits',
    initialState,

    extraReducers: {
        [getAllVisits.fulfilled](state, action) {
            state.visits = action.payload;
        },
        [getAllVisits.rejected](state, action) {
            state.visits = [];
            state.error = action.payload || 'Something went wrong.';

            console.log(action.payload);
        },
        [addVisit.fulfilled](state, action) {
            state.visits.push(action.payload);
        },
        [addVisit.rejected](state, action) {
            // console.log(action.payload);
        },
        [updateVisit.fulfilled](state, action) {
            const updatedVisit = action.payload;
            const visitIndex = state.visits.findIndex(visit => visit._id === updatedVisit._id);

            if (visitIndex !== -1) {
                state.visits.splice(visitIndex, 1, updatedVisit);
            }
            // console.log(action.payload);
        },
        [updateVisit.rejected](state, action) {
            console.log(action.payload);
        },
        [uploadPDF.fulfilled](state, action) {
            const updatedVisit = action.payload;
            const visitIndex = state.visits.findIndex(visit => visit._id === updatedVisit._id);

            if (visitIndex !== -1) {
                state.visits.splice(visitIndex, 1, updatedVisit);
            }
        },
        [uploadPDF.rejected](state, action) {
            console.log(action.payload);
        },
    },
});

export const visitsReducer = visitsSlice.reducer;

// const visitsSlice = createSlice({
//     name: 'visits',
//     initialState,
//     reducers: {},
//     extraReducers: builder => {
//         builder
//             .addCase(getAllVisits.pending, state => {
//                 state.isLoading = true;
//                 state.error = null;
//             })
//             .addCase(getAllVisits.fulfilled, (state, action) => {
//                 state.visits = action.payload;
//                 state.isLoading = false;
//             })
//             .addCase(getAllVisits.rejected, (state, action) => {
//                 state.error = action.payload;
//                 state.isLoading = false;
//             })
//             .addCase(addVisit.pending, state => {
//                 state.isLoading = true;
//                 state.error = null;
//             })
//             .addCase(addVisit.fulfilled, (state, action) => {
//                 state.visits.push(action.payload);
//                 state.isLoading = false;
//             })
//             .addCase(addVisit.rejected, (state, action) => {
//                 state.error = action.payload;
//                 state.isLoading = false;
//             })
//             .addCase(updateVisit.pending, state => {
//                 state.isLoading = true;
//                 state.error = null;
//             })
//             .addCase(updateVisit.fulfilled, (state, action) => {
//                 const index = state.visits.findIndex(visit => visit.id === action.payload.id);
//                 if (index !== -1) {
//                     state.visits[index] = action.payload;
//                 }
//                 state.isLoading = false;
//             })
//             .addCase(updateVisit.rejected, (state, action) => {
//                 state.error = action.payload;
//                 state.isLoading = false;
//             })
//             .addCase(uploadPDF.pending, state => {
//                 state.isLoading = true;
//                 state.error = null;
//             })
//             .addCase(uploadPDF.fulfilled, (state, action) => {
//                 const index = state.visits.findIndex(visit => visit.id === action.payload.id);
//                 if (index !== -1) {
//                     state.visits[index].pdf = action.payload.pdf;
//                 }
//                 state.isLoading = false;
//             })
//             .addCase(uploadPDF.rejected, (state, action) => {
//                 state.error = action.payload;
//                 state.isLoading = false;
//             })
//             .addCase(deletePDF.pending, state => {
//                 state.isLoading = true;
//                 state.error = null;
//             })
//             .addCase(deletePDF.fulfilled, (state, action) => {
//                 const index = state.visits.findIndex(visit => visit.id === action.payload.id);
//                 if (index !== -1) {
//                     state.visits[index].pdf = null;
//                 }
//                 state.isLoading = false;
//             })
//             .addCase(deletePDF.rejected, (state, action) => {
//                 state.error = action.payload;
//                 state.isLoading = false;
//             });
//     },
// });
