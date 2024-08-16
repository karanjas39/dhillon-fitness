import { BACKEND_URL } from "@/utils/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tag_admin_details, tagTypes } from "@/store/api/tags";
import {
  Api_AdminDetailType,
  Api_SignInType,
  GeneralResponse,
} from "@/utils/Types/apiTypes";
import { RootState } from "@/store/index";
import {
  z_updateAdmin_type,
  z_updatePassword_type,
} from "@singhjaskaran/dhillonfitness-common";

export const adminApi = createApi({
  reducerPath: "adminApi",
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
    updatePassword: builder.mutation<Api_SignInType, z_updatePassword_type>({
      query: (credentials) => ({
        url: "/update/password",
        method: "PATCH",
        body: credentials,
      }),
    }),
    updateAdmin: builder.mutation<GeneralResponse, z_updateAdmin_type>({
      query: (query) => ({
        url: "/update",
        method: "PATCH",
        body: query,
      }),
      invalidatesTags: [tag_admin_details],
    }),
    getAdminDetails: builder.query<Api_AdminDetailType, void>({
      query: () => "/me",
      providesTags: [tag_admin_details],
    }),
  }),
});
