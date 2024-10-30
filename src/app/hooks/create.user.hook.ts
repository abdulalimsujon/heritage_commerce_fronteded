import { useMutation } from "@tanstack/react-query";

import { createUser } from "@/src/services/management/userManagement";

export const useCreateUser = () => {
  return useMutation<ReturnType<typeof createUser>, Error, FormData>({
    mutationKey: ["CREATE_USER"],
    mutationFn: async (userData) => await createUser(userData), // Replace ; with ,
    onSuccess: () => {
      console.log("User successfully registered");
    },
    onError: (error) => {
      console.log(error); // Improved error logging
    },
  });
};
