"use client";

import {
  Navbar as NextUINavbar,
  NavbarItem,
  NavbarContent,
} from "@nextui-org/navbar";
import { getCurrentUser, Logout, logout } from "../services/authService"; // Make sure logout is correctly imported
import NextLink from "next/link";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import clsx from "clsx"; // Ensure clsx is imported if it's used for conditional classes
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const LoginOrLogoutBtn = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="mr-3">
      {!user || Object.keys(user).length === 0 ? (
        <Link href={"/login"}>Login</Link>
      ) : (
        <Button onClick={() => Logout()}>Logout</Button> // Using logout directly
      )}
    </div>
  );
};

export default LoginOrLogoutBtn;
