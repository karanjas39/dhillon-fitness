import { BACKEND_URL } from "@/utils/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  tag_all_customers,
  tag_customer_detail,
  tag_customer_memberships,
  tagTypes,
} from "@/store/api/tags";
import { RootState } from "@/store/index";
import {
  Api_AllCustomers,
  Api_CustomerDetail,
  Api_CustomerMemberships,
  GeneralResponse,
} from "@/utils/Types/apiTypes";
import {
  z_clearBalance_type,
  z_createUser_type,
  z_createUserMembership_type,
  z_deleteUserMembership_type,
  z_id_type,
  z_updateUser_type,
  z_updateUserMembership_type,
  z_userActivation_type,
} from "@singhjaskaran/dhillonfitness-common";

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
      // invalidatesTags: [tag_all_customers],
    }),
    deleteCustomer: builder.mutation<GeneralResponse, z_id_type>({
      query: (query) => ({
        url: "/customer/delete",
        method: "DELETE",
        body: query,
      }),
      // invalidatesTags: [tag_all_customers],
    }),
    createCustomerMembership: builder.mutation<
      GeneralResponse,
      z_createUserMembership_type
    >({
      query: (query) => ({
        url: "/customer/membership/renew",
        method: "POST",
        body: query,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: tag_customer_memberships, id: arg.userId },
        tag_customer_detail,
      ],
    }),
    updateCustomer: builder.mutation<GeneralResponse, z_updateUser_type>({
      query: (query) => ({
        url: "/customer/update",
        method: "PUT",
        body: query,
      }),
      // invalidatesTags: (result, error, arg) => [
      //   { type: tag_customer_detail, id: arg.id },
      //   tag_all_customers,
      // ],
    }),
    getCustomerDetails: builder.query<Api_CustomerDetail, { id: string }>({
      query: (query) => `/customer/detail/${query.id}`,
      providesTags: (result, error, arg) => [
        { type: tag_customer_detail, id: arg.id },
      ],
    }),
    customerActivation: builder.mutation<
      GeneralResponse,
      z_userActivation_type
    >({
      query: (query) => ({
        url: "/customer/activation",
        method: "POST",
        body: query,
      }),
      // invalidatesTags: (result, error, arg) => [
      //   { type: tag_customer_detail, id: arg.userId },
      //   tag_all_customers,
      // ],
    }),
    clearCustomerBalance: builder.mutation<
      GeneralResponse,
      z_clearBalance_type
    >({
      query: (query) => ({
        url: "/customer/balance-adjustment",
        method: "POST",
        body: query,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: tag_customer_detail, id: arg.userId },
      ],
    }),
    deleteCustomerMembership: builder.mutation<
      GeneralResponse,
      z_deleteUserMembership_type
    >({
      query: (query) => ({
        url: "/customer/membership/delete",
        method: "DELETE",
        body: query,
      }),
      invalidatesTags: [tag_customer_detail, tag_customer_memberships],
    }),
    updateCustomerMembership: builder.mutation<
      GeneralResponse,
      z_updateUserMembership_type
    >({
      query: (query) => ({
        url: "/customer/membership/update",
        method: "PATCH",
        body: query,
      }),
      invalidatesTags: [tag_customer_memberships],
    }),
    getCustomerMemberships: builder.query<
      Api_CustomerMemberships,
      { id: string }
    >({
      query: (query) => `/customer/memberships/${query.id}`,
      providesTags: (result, error, arg) => [
        { type: tag_customer_memberships, id: arg.id },
      ],
    }),
  }),
});
