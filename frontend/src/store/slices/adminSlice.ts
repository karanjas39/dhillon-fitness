import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AdminState {
  name: string | null;
  email: string | null;
  dailyTarget: number | null;
}

const initialState: AdminState = {
  name: null,
  email: null,
  dailyTarget: null,
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
