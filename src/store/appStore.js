import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import { authApi } from "./authApi";

const appStore = configureStore({
    reducer: {
        user: userReducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
});

export default appStore;
