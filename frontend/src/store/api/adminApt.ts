import { BACKEND_URL } from "@/utils/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tagTypes } from "@/store/api/tags";
import {
  Api_AdminDetailType,
  Api_SignInType,
  GeneralResponse,
} from "@/utils/Types/apiTypes";
import { RootState } from "@/store/index";
import {
  z_setDailyTarget_type,
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
    updateDailyTarget: builder.mutation<GeneralResponse, z_setDailyTarget_type>(
      {
        query: (query) => ({
          url: "/update/daily-target",
          method: "PATCH",
          body: query,
        }),
      }
    ),
    getAdminDetails: builder.query<Api_AdminDetailType, void>({
      query: () => "/me",
    }),
  }),
});
