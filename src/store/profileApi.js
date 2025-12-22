import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../utils/apiClient";

export const profileApi = createApi({
    reducerPath: "profileApi",
    baseQuery: axiosBaseQuery({ baseUrl: "" }),
    endpoints: (builder) => ({
        viewProfile: builder.query({
            query: () => ({
                url: "/profile/view",
                method: "GET",
            }),
        }),
    }),
});

export const { useViewProfileQuery } = profileApi;
