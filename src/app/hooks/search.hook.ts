import { useMutation } from "@tanstack/react-query";

import { searchQuery } from "@/src/services/searchQuery";

export const useSearch = () => {
  return useMutation({
    mutationKey: ["SEARCH_QUERY"],
    mutationFn: async (searchTerm: string) => await searchQuery(searchTerm),
  });
};
