import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    connections: [],
    isLoading: false,
    error: null,
};

const connectionSlice = createSlice({
    name: "connection",
    initialState,
    reducers: {
        addConnection: (state, action) => {
            state.connections = action.payload;
        },
        removeConnection: (state, action) => {
            state.connections = [];
        },

    },

});

export default connectionSlice.reducer;
export const { addConnection, removeConnection } = connectionSlice.actions;