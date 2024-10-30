"use server";

import AxiosInstance from "@/src/lib/AxiosInstance";

export const createUser = async (formData: FormData) => {
  try {
    const { data } = await AxiosInstance.post("/users/create-user", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export const getAlluser = async () => {
  try {
    const res = await AxiosInstance.get(`/users`);

    return res.data;
  } catch (error: any) {
    throw new Error(error);
  }
};
