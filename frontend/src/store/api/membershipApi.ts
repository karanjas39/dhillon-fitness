import { BACKEND_URL } from "@/utils/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tagTypes } from "@/store/api/tags";
import { RootState } from "@/store/index";
import {
  Api_MembershipDetails,
  Api_MembershipIds,
} from "@/utils/Types/apiTypes";
import {
  z_id_type,
  z_onlyActive_type,
} from "@singhjaskaran/dhillonfitness-common";

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
    getMembershipDetails: builder.query<Api_MembershipDetails, z_id_type>({
      query: (query) => `/membership/detail/${query.id}`,
    }),
    getAllMembershipIds: builder.query<Api_MembershipIds, z_onlyActive_type>({
      query: (query) => `/membership/ids/${query.onlyActive}`,
    }),
  }),
});
