import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../utils/apiClient";

export const profileApi = createApi({
    reducerPath: "profileApi",
    baseQuery: axiosBaseQuery({ baseUrl: "" }),
    tagTypes: ["User"],
    endpoints: (builder) => ({
        viewProfile: builder.query({
            query: () => ({
                url: "profile/view",
                method: "GET",
            }),
            providesTags: ["User"],
        }),
        editProfile: builder.mutation({
            query: (body) => ({
                url: "profile/Edit",
                method: "PATCH",
                data: body,
            }),
            invalidatesTags: ["User"],
        }),
    }),
});

export const { useViewProfileQuery, useEditProfileMutation } = profileApi;
