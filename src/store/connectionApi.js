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
    endpoints: (builder) => ({
        getConnections: builder.query({
            query: () => ({
                url: "user/connections",
                method: "GET",
            }),
        }),
        getRequests: builder.query({
            query: () => ({
                url: "user/requests/pending",
                method: "GET",
            }),
        }),
        reviewRequest: builder.mutation({
            query: ({ status, requestId }) => ({
                url: `request/respond/${status}/${requestId}`,
                method: "POST",
            }),
        }),
    }),
});

export const { useGetConnectionsQuery, useGetRequestsQuery, useReviewRequestMutation } = connectionApi;
