"use client";

import { Button } from "@nextui-org/button";
import Link from "next/link";
// Ensure clsx is imported if it's used for conditional classes
import { useDispatch, useSelector } from "react-redux";

import { Logout } from "../services/authService"; // Make sure logout is correctly imported
import { RootState } from "../redux/store";
import { useEffect } from "react";
import { userLogout } from "../redux/features/Authslice";

const LoginOrLogoutBtn = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  console.log(user);
  useEffect(() => {}, [user]);
  return (
    <div className="mr-3">
      {!user || Object.keys(user).length === 0 ? (
        <Link href={"/login"}>Login</Link>
      ) : (
        <Button onClick={() => dispatch(userLogout())}>Logout</Button> // Using logout directly
      )}
    </div>
  );
};

export default LoginOrLogoutBtn;
