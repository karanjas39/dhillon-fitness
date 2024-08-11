import { BACKEND_URL } from "@/utils/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tagTypes } from "@/store/api/tags";
import { RootState } from "@/store/index";
import { Api_AllMemberships, Api_MembershipIds } from "@/utils/Types/apiTypes";

export const membershipApi = createApi({
  reducerPath: "membershipApi",
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
    getAllMemberships: builder.query<Api_AllMemberships, void>({
      query: () => "/membership/all",
    }),
    getAllMembershipIds: builder.query<Api_MembershipIds, void>({
      query: () => "/membership/ids",
    }),
  }),
});
