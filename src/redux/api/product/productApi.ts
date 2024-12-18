import { baseApi } from "../baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allProduct: builder.query({
      query: ({
        category,
        price,
        brand,
        rating,
        searchTerm,
        sort,
        page,
        limit,
      }) => {
        // Create a new URLSearchParams object
        const params = new URLSearchParams();

        if (category) {
          params.append("category", category);
        }
        if (price) {
          params.append("price", price);
        }
        if (brand) {
          params.append("brand", brand);
        }
        if (rating) {
          params.append("rating", rating);
        }
        if (searchTerm) {
          params.append("searchTerm", searchTerm);
        }
        if (sort) {
          params.append("sort", sort);
        }
        if (page) {
          params.append("page", page);
        }
        if (limit) {
          params.append("limit", limit);
        }

        return {
          url: `/products/get-products?${params.toString()}`, // Construct the URL with the query string
          method: "GET",
        };
      },
    }),
    createProduct: builder.mutation({
      query: (data) => {
        return {
          url: "/products/create-product",
          method: "POST",
          body: data,
        };
      },
    }),

    allProductFromDb: builder.query({
      query: () => {
        return {
          url: "/products/getAllProduct",
          method: "GET",
        };
      },
    }),
    deleteProduct: builder.mutation({
      query: (productId) => {
        return {
          url: `/products/delete-product/${productId}`,
          method: "DELETE",
        };
      },
    }),

    updateProduct: builder.mutation({
      query: ({ id, formData }) => {
        return {
          url: `/products/update-product/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
    }),
  }),
});

export const {
  useAllProductQuery,
  useAllProductFromDbQuery,
  useUpdateProductMutation,
  useCreateProductMutation,
  useDeleteProductMutation,
} = productApi;
