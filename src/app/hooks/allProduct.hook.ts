import { useQuery } from "@tanstack/react-query";

import { getAllProduct } from "@/src/services/allProducts";

export const useGetAllProduct = () => {
  return useQuery({
    queryKey: ["ALL_PRODUCT"],
    queryFn: getAllProduct, // No need to wrap in async function
  });
};
