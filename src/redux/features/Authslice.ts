import { Tuser } from "@/src/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type InitialStateProps = {
  user: Tuser | null;
};

const initialState: InitialStateProps = {
  user: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Tuser>) => {
      state.user = action.payload;
    },
    userLogout: (state) => {
      state.user = null;
    },
  },
});
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const { setUser, userLogout } = AuthSlice.actions;

export default AuthSlice.reducer;
