import { createSlice } from "@reduxjs/toolkit";

type userProps = {
  name: string;
  email: string;
};

type initialStateProps = {
  user: userProps[];
};

const initialState: initialStateProps = {
  user: [],
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = AuthSlice.actions;

export default AuthSlice.reducer;
