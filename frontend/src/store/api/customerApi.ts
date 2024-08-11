import { BACKEND_URL } from "@/utils/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tag_all_customers, tagTypes } from "@/store/api/tags";
import { RootState } from "@/store/index";
import { Api_AllCustomers } from "@/utils/Types/apiTypes";

export const customerApi = createApi({
  reducerPath: "customerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/admin`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes,
  endpoints: (builder) => ({
    getAllCustomers: builder.query<Api_AllCustomers, void>({
      query: () => "/customer/all",
      providesTags: [tag_all_customers],
    }),
  }),
});
