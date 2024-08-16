import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AdminState {
  name: string | undefined;
  email: string | undefined;
  dailyTarget: number | undefined;
}

const initialState: AdminState = {
  name: undefined,
  email: undefined,
  dailyTarget: undefined,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdmin: (state, action: PayloadAction<AdminState>) => {
      state.dailyTarget = action.payload.dailyTarget;
      state.email = action.payload.email;
      state.name = action.payload.name;
    },
  },
});

export const { setAdmin } = adminSlice.actions;
export default adminSlice.reducer;
