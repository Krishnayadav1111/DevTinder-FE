import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../utils/constants";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL,
        prepareHeaders: (headers) => {
            // Add any default headers here if needed
            return headers;
        },
        credentials: "include",
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: "login",
                method: "POST",
                body: credentials,
            }),
            providesTags: ["User"],
        }),
        signup: builder.mutation({
            query: (userData) => ({
                url: "signup",
                method: "POST",
                body: userData,
            }),
            invalidatesTags: ["User"],
        }),
        logout: builder.mutation({
            query: () => ({
                url: "logout",
                method: "POST",
            }),
        }),
        // Simple endpoint to fetch current user profile if needed
        getProfile: builder.query({
            query: () => "profile/view",
        }),
    }),
});

export const { useLoginMutation, useSignupMutation, useLogoutMutation, useGetProfileQuery } = authApi;
