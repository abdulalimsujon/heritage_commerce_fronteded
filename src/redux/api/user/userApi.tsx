import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseApi } from "../baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    userRegistration: builder.mutation({
      query: (formData) => {
        return {
          url: "/create-product",
          method: "POST",
          body: formData,
        };
      },
    }),
    updateUser: builder.mutation({
      query: ({ formData, id }) => {
        // Destructure formData and id from a single object
        console.log(id, formData);
        return {
          url: `/users/update-user/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
    }),
    deleteProduct: builder.mutation({
      query: (id) => {
        return {
          url: `/delete-product/${id}`,
          method: "DELETE",
          body: { id },
        };
      },
    }),
    updateProduct: builder.mutation({
      query: (options) => {
        return {
          url: `/update-product/${options.id}`,
          method: "PATCH",
          body: options.data,
        };
      },
    }),
  }),
});

export const { useUpdateUserMutation } = userApi;
