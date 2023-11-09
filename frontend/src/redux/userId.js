import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
  isLog: false,
};

export const userSlice = createSlice({
  name: "userId",
  initialState,
  reducers: {
    getUserId: (state, action) => {
      state.userId = action.payload;
    },
    isLog: (state, action) => {
      state.isLog = action.payload;
    },
  },
});

export const { getUserId, isLog } = userSlice.actions;

export default userSlice.reducer;
