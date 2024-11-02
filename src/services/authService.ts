"use server";

import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { Tuser } from "../types";
import { access } from "fs";

export const getCurrentUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;
  let decode = undefined;

  if (accessToken) {
    decode = jwtDecode(accessToken) as Tuser;

    return {
      _id: decode._id,
      name: decode.name,
      email: decode.email,
      mobile: decode.mobile,
      role: decode.role,
      status: decode.status,
    };
  }
};

export const Logout = async () => {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
};
