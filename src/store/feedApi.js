import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../utils/apiClient";

export const feedApi = createApi({
    reducerPath: "feedApi",
    baseQuery: axiosBaseQuery({
        baseUrl: "http://localhost:3000/",
        prepareHeaders: (headers) => {
            return headers;
        },
        credentials: "include",
    }),
    endpoints: (builder) => ({
        getFeed: builder.query({
            query: ({ page = 1, limit = 100, emailId } = {}) => ({
                url: "feed",
                method: "GET",
                params: { page, limit },
                data: emailId ? { emailId } : undefined,
            }),
        }),
        sendRequest: builder.mutation({
            query: ({ status, userId }) => ({
                url: `request/send/${status}/${userId}`,
                method: "POST",
            }),
        }),
    }),
});

export const { useGetFeedQuery, useSendRequestMutation } = feedApi;