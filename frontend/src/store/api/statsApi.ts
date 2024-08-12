import { BACKEND_URL } from "@/utils/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  tag_daily_stats,
  tag_membership_stats,
  tag_yearly_stats,
  tagTypes,
} from "@/store/api/tags";
import { RootState } from "@/store/index";
import {
  Api_DailyStatType,
  Api_MembershipStat,
  Api_YearlyStatType,
} from "@/utils/Types/apiTypes";

export const statsApi = createApi({
  reducerPath: "statsApi",
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
    getYearlyStats: builder.query<Api_YearlyStatType, void>({
      query: () => "/stats/yearly",
      providesTags: [tag_yearly_stats],
    }),
    getDailyStats: builder.query<Api_DailyStatType, void>({
      query: () => "/stats/daily",
      providesTags: [tag_daily_stats],
    }),
    getMembershipStats: builder.query<Api_MembershipStat, void>({
      query: () => "/stats/membership/today",
      providesTags: [tag_membership_stats],
    }),
  }),
});
