import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: null,
  price: null,
  brand: null,
  rating: null,
  searchTerm: null,
  sort: null,
  page: 1,
  limit: 8,
};

export type filterType = {
  category: String;
  price: Number;
  brand: String;
  rating: Number;
  searchTerm: String;
  sort: String;
  page: Number;
  limit: Number;
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setBrand: (state, action) => {
      state.brand = action.payload;
    },
    setRating: (state, action) => {
      state.rating = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
    clearAllFilters: (state) => {
      state.category = null;
      state.price = null;
      state.brand = null;
      state.rating = null;
      state.searchTerm = null;
      state.sort = null;
      state.page = 1;
      state.limit = 8;
    },
  },
});

export const {
  setPrice,
  setCategory,
  setBrand,
  setRating,
  clearAllFilters,
  setSort,
  setSearchTerm,
  setPage,
  setLimit,
} = filterSlice.actions;
export default filterSlice.reducer;
