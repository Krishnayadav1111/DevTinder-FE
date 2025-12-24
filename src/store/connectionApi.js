import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../utils/apiClient";

export const connectionApi = createApi({
    reducerPath: "connectionApi",
    baseQuery: axiosBaseQuery({
        baseUrl: "http://localhost:3000/",
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
