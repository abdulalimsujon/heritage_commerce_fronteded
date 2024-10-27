import { createSlice } from "@reduxjs/toolkit";

export type Tcart = {
  id: string;
  quantity: number;
  name?: string;
  price: string;
};

type initialStateProps = {
  cart: Tcart[];
};

const initialState: initialStateProps = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addTocart: (state, action) => {
      const existingProductIndex = state.cart.findIndex(
        (product) => product.id === action.payload.id
      );

      if (existingProductIndex !== -1) {
        state.cart[existingProductIndex].quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    decreaseToCart: (state, action) => {
      const existingProductIndex = state.cart.findIndex(
        (product) => product.id === action.payload.id
      );

      if (existingProductIndex !== -1) {
        const existingProduct = state.cart[existingProductIndex];

        if (existingProduct.quantity > 1) {
          existingProduct.quantity -= 1;
        } else {
          state.cart = state.cart.filter(
            (item) => item.id !== action.payload.id
          );
        }
      }
    },
    increaseToCart: (state, action) => {
      const existingProductIndex = state.cart.findIndex(
        (product) => product.id === action.payload.id
      );

      if (existingProductIndex !== -1) {
        state.cart[existingProductIndex].quantity += 1;
      }
    },
    deleteToCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id != action.payload.id);
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const {
  addTocart,
  decreaseToCart,
  increaseToCart,
  deleteToCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
