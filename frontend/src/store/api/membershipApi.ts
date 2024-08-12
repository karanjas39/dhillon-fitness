import { BACKEND_URL } from "@/utils/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  tag_all_memberships,
  tag_membership_detail,
  tagTypes,
} from "@/store/api/tags";
import { RootState } from "@/store/index";
import {
  Api_MembershipDetails,
  Api_MembershipIds,
  GeneralResponse,
} from "@/utils/Types/apiTypes";
import {
  z_createMembership_type,
  z_id_type,
  z_onlyActive_type,
  z_updateMembership_type,
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
      providesTags: (result, error, arg) => [
        { type: tag_membership_detail, id: arg.id },
      ],
    }),
    getAllMembershipIds: builder.query<Api_MembershipIds, z_onlyActive_type>({
      query: (query) => `/membership/ids/${query.onlyActive}`,
      providesTags: [tag_all_memberships],
    }),
    updateMembership: builder.mutation<
      GeneralResponse,
      z_updateMembership_type
    >({
      query: (query) => ({
        url: "/membership/update",
        method: "PUT",
        body: query,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: tag_membership_detail, id: arg.id },
        tag_all_memberships,
      ],
    }),
    createMembership: builder.mutation<
      GeneralResponse,
      z_createMembership_type
    >({
      query: (query) => ({
        url: "/membership/create",
        method: "POST",
        body: query,
      }),
      invalidatesTags: [tag_all_memberships],
    }),
  }),
});
