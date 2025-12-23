import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import { authApi } from "./authApi";
import { profileApi } from "./profileApi";
import { feedApi } from "./feedApi";
import feedReducer from "./feedSlice";
import { setAxiosStore } from "../utils/apiClient";
import connectionReducer from "./connectionSlice";
import requestReducer from "./requestSlice";
import { connectionApi } from "./connectionApi";

const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        connection: connectionReducer,
        request: requestReducer,
        [authApi.reducerPath]: authApi.reducer,
        [profileApi.reducerPath]: profileApi.reducer,
        [feedApi.reducerPath]: feedApi.reducer,
        [connectionApi.reducerPath]: connectionApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware, profileApi.middleware, feedApi.middleware, connectionApi.middleware),
});

setAxiosStore(appStore);

export default appStore;
