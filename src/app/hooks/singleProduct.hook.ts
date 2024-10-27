import { useMutation } from "@tanstack/react-query";

import { SingleProductById } from "@/src/services/singleProduct";

export const useGetSingleProduct = () => {
  return useMutation({
    mutationKey: ["GET_SINGLE_PRODUCT"],
    mutationFn: async (id: string) => await SingleProductById(id),
  });
};
