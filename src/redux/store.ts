import { configureStore } from "@reduxjs/toolkit";

import { baseApi } from "./api/baseApi";
import cartSlice from "./features/CartSlice";
import filterSlice from "./features/FilterSlice";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    cart: cartSlice,
    filters: filterSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
