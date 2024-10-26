"use server";

import AxiosInstance from "@/src/lib/AxiosInstance";

export const getCategories = async () => {
  try {
    const { data } = await AxiosInstance.get("/item-categories");

    return data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
