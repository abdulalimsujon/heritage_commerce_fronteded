"use client";

import ECform from "@/src/components/form/ECform";
import ECInput from "@/src/components/form/ECInput";
import { useLoginUserMutation } from "@/src/redux/api/user/userApi";
import { setUser } from "@/src/redux/features/authslice";
import { Button } from "@nextui-org/button";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";

const Login = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const redirect = searchParams.get("redirect");
  const [loginUser, { isLoading, isSuccess }] = useLoginUserMutation();

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
        <ECform onSubmit={handleSubmit} className="space-y-4">
          <ECInput name="email" label="Email" type="email" size="lg" required />
          <ECInput
            name="password"
            label="Password"
            type="password"
            size="lg"
            required
          />
          <Button type="submit" className="w-full mt-4">
            Login
          </Button>
        </ECform>
      </div>
    </div>
  );
};

export default Login;
