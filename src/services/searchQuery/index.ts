"use server";

import AxiosInstance from "@/src/lib/AxiosInstance";

export const searchQuery = async (searchTerm: string) => {
  try {
    const res = await AxiosInstance.get(`/get-products?${searchTerm}`);

    return res.data;
  } catch (error: any) {
    throw new Error(error);
  }
};
