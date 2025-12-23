import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    requests: [],
    isLoading: false,
    error: null,
};

const requestSlice = createSlice({
    name: "request",
    initialState,
    reducers: {
        addRequest: (state, action) => {
            state.requests = action.payload;
        },
        removeRequest: (state, action) => {
            const newRequests = state.requests.filter((r) => r._id !== action.payload);
            state.requests = newRequests;
        }

    },
});

export default requestSlice.reducer;
export const { addRequest, removeRequest } = requestSlice.actions;
