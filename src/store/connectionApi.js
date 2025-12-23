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
    }),
});

export const { useGetConnectionsQuery } = connectionApi;
