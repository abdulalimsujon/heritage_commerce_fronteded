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
    deleteUser: builder.mutation({
      query: (id) => {
        return {
          url: `/users/delete-user/${id}`,
          method: "DELETE",
          body: { id },
        };
      },
    }),
  }),
});

export const {
  useUpdateUserMutation,
  useUserRegistrationMutation,
  useLoginUserMutation,
  useDeleteUserMutation,
} = userApi;
