import { useQuery } from "@tanstack/react-query";

import { getAlluser } from "@/src/services/management/userManagement";

export const useGetAllUser = () => {
  return useQuery({
    queryKey: ["ALL_USERS"],
    queryFn: async () => await getAlluser(),
  });
};
