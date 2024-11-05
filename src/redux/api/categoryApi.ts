import { baseApi } from "./baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allCategory: builder.query({
      query: (args) => {
        return {
          url: `/categories/getAllCategories`,
          method: "GET",
          body: args,
        };
      },
    }),
    createCategory: builder.mutation({
      query: (data) => {
        return {
          url: `/categories/create-category`,
          method: "POST",
          body: data,
        };
      },
    }),
    editNameCategory: builder.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: `/categories/update-category`,
          method: "PATCH",
          body: data,
        };
      },
    }),
    deleteCategory: builder.mutation({
      query: (data) => {
        return {
          url: `/categories/delete-category/${data.name}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useEditNameCategoryMutation,
  useAllCategoryQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
