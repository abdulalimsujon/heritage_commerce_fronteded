"use server";

import envConfig from "@/src/config/envConfig";

export const SingleProductById = async (id: string) => {
  let fetchOptions = {};

  fetchOptions = {
    cache: "no-store",
  };

  const res = await fetch(
    `${envConfig.baseApi}/getSingleProduct/${id}`,
    fetchOptions
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
