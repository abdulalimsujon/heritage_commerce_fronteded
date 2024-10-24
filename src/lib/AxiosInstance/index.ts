import axios from "axios";

import envConfig from "@/src/config/envConfig";

const AxiosInstance = axios.create({
  baseURL: envConfig.baseApi,
});

export default AxiosInstance;
