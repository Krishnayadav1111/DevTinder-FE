import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import { authApi } from "./authApi";
import { profileApi } from "./profileApi";
import { setAxiosStore } from "../utils/apiClient";

const appStore = configureStore({
    reducer: {
        user: userReducer,
        [authApi.reducerPath]: authApi.reducer,
        [profileApi.reducerPath]: profileApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware, profileApi.middleware),
});

setAxiosStore(appStore);

export default appStore;
