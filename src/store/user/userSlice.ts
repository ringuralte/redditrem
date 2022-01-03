import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  loadingUsername: boolean;
  user: string;
  error: string;
}

const initialState: UserState = {
  loadingUsername: false,
  user: "",
  error: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUserRequest: (state) => {
      state.loadingUsername = true;
    },
    fetchUserSuccess: (state, action: PayloadAction<string>) => {
      state.user = action.payload;
    },
    fetchUserFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { fetchUserRequest, fetchUserSuccess, fetchUserFailure } = userSlice.actions

export default userSlice.reducer
