import { BACKEND_URL } from "@/utils/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tag_all_customers, tagTypes } from "@/store/api/tags";
import { RootState } from "@/store/index";
import {
  Api_AllCustomers,
  Api_CustomerDetail,
  Api_CustomerMemberships,
  GeneralResponse,
} from "@/utils/Types/apiTypes";
import { z_createUser_type } from "@singhjaskaran/dhillonfitness-common";

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
    createNewCustomer: builder.mutation<GeneralResponse, z_createUser_type>({
      query: (query) => ({
        url: "/customer/create",
        method: "POST",
        body: query,
      }),
      invalidatesTags: [tag_all_customers],
    }),
    getCustomerDetails: builder.query<Api_CustomerDetail, { id: string }>({
      query: (query) => `/customer/detail/${query.id}`,
    }),
    getCustomerMemberships: builder.query<
      Api_CustomerMemberships,
      { id: string }
    >({
      query: (query) => `/customer/memberships/${query.id}`,
    }),
  }),
});
