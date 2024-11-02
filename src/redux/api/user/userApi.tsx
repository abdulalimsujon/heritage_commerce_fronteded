import { RootState } from "../../store";
import { baseApi } from "../baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    userRegistration: builder.mutation({
      query: (formData) => {
        return {
          url: "/users/create-user",
          method: "POST",
          body: formData,
        };
      },
    }),
    loginUser: builder.mutation({
      query: (data) => {
        return {
          url: "/users/login",
          method: "POST",
          body: data,
        };
      },
    }),
    updateUser: builder.mutation({
      query: ({ formData, id }) => {
        //   console.log(id, formData);
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

export const {
  useUpdateUserMutation,
  useUserRegistrationMutation,
  useLoginUserMutation,
} = userApi;
export const selectCurrentUser = (state: RootState) => state.auth.user;
