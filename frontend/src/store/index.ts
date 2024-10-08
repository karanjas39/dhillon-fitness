import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "@/store/slices/authSlice";
import { authApi } from "@/store/api/authApi";
import { statsApi } from "@/store/api/statsApi";
import { customerApi } from "@/store/api/customerApi";
import { membershipApi } from "@/store/api/membershipApi";
import { adminApi } from "@/store/api/adminApt";
import adminReducer from "@/store/slices/adminSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [statsApi.reducerPath]: statsApi.reducer,
    [customerApi.reducerPath]: customerApi.reducer,
    [membershipApi.reducerPath]: membershipApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    auth: authReducer,
    admin: adminReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      adminApi.middleware,
      statsApi.middleware,
      customerApi.middleware,
      membershipApi.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
