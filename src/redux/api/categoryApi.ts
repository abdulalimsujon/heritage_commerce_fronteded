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
  }),
});

export const { useAllCategoryQuery } = categoryApi;
