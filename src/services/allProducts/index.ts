import envConfig from "@/src/config/envConfig";

export const getAllProduct = async () => {
  const res = await fetch(`${envConfig.baseApi}/products/getAllProduct`);

  return res.json();
};
