import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../utils/apiClient";
import { API_BASE_URL } from "../utils/constants";

export const connectionApi = createApi({
    reducerPath: "connectionApi",
    baseQuery: axiosBaseQuery({
        baseUrl: API_BASE_URL,
        prepareHeaders: (headers) => {
            return headers;
        },
    }),
    tagTypes: ["Connection", "Request"],
    endpoints: (builder) => ({
        getConnections: builder.query({
            query: () => ({
                url: "user/connections",
                method: "GET",
            }),
            providesTags: ["Connection"],
        }),
        getRequests: builder.query({
            query: () => ({
                url: "user/requests/pending",
                method: "GET",
            }),
            providesTags: ["Request"],
        }),
        reviewRequest: builder.mutation({
            query: ({ status, requestId }) => ({
                url: `request/respond/${status}/${requestId}`,
                method: "POST",
            }),
            invalidatesTags: ["Request", "Connection"],
        }),
    }),
});

export const { useGetConnectionsQuery, useGetRequestsQuery, useReviewRequestMutation } = connectionApi;
