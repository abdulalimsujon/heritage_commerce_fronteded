"use client";

import { Button } from "@nextui-org/button";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";

import ECform from "@/src/components/form/ECform";
import ECInput from "@/src/components/form/ECInput";
import { useLoginUserMutation } from "@/src/redux/api/user/userApi";
import { setUser } from "@/src/redux/features/Authslice";
import { Tuser } from "@/src/types";

const Login = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const redirect = searchParams.get("redirect");
  const [loginUser, { data, isLoading, isSuccess }] = useLoginUserMutation();
  const token = data?.data?.accessToken;

  if (token) {
    const decoded = jwtDecode(token);

    dispatch(setUser(decoded as Tuser));
  }

  const handleSubmit = async (data: { emai: string; password: string }) => {
    await loginUser(data);
  };

  if (!isLoading && isSuccess) {
    if (redirect) {
      router.push(redirect);
    } else {
      router.push("/");
    }
  }

  return (
    <div className="flex justify-center items-center border  bg-blue-50 dark:bg-gray-700 w-full h-screen overflow-hidden">
      <div className=" w-full max-w-md border p-10  rounded-md bg-gray">
        <h2 className="text-2xl font-semibold text-center dark:text-green-400">
          Login
        </h2>
        <ECform className="space-y-4" onSubmit={handleSubmit}>
          <ECInput required label="Email" name="email" size="lg" type="email" />
          <ECInput
            required
            label="Password"
            name="password"
            size="lg"
            type="password"
          />
          <Button className="w-full mt-4" type="submit">
            Login
          </Button>
        </ECform>
      </div>
    </div>
  );
};

export default Login;
