"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";

import CartBadge from "./badge";
import Dropdown from "./Dropdown";
import NavbarInputSearch from "./NavbarInputSearch";
import { siteConfig } from "@/src/config/site";
import { ThemeSwitch } from "@/src/components/theme-switch";
import { Logo } from "@/src/components/icons";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { selectCurrentUser, userLogout } from "../redux/features/Authslice";
import { Button } from "@nextui-org/button";

export const Navbar = () => {
  const searchInput = <NavbarInputSearch />;
  const user = useSelector((state: RootState) => selectCurrentUser(state));
  const dispatch = useDispatch();

  return (
    <NextUINavbar
      maxWidth="xl"
      position="sticky"
      className="px-4 shadow-lg bg-white"
    >
      <NavbarContent className="flex justify-between items-center w-full">
        {/* Navbar Left - Logo and Brand */}
        <NavbarBrand className="flex items-center gap-3">
          <NextLink passHref href="/">
            <Link className="flex items-center gap-2">
              <Logo className="w-8 h-8" />
              <p className="font-bold text-green-700">Heritage Ecommerce</p>
            </Link>
          </NextLink>
        </NavbarBrand>

        {/* Navbar Center - Links for larger screens */}
        <NavbarContent className="hidden lg:flex gap-6 ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink passHref href={item.href}>
                <Link
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-primary data-[active=true]:font-medium text-lg dark:text-gray-700"
                  )}
                >
                  {item.label}
                </Link>
              </NextLink>
            </NavbarItem>
          ))}
          {user && user.role === "admin" && <Dropdown />}
        </NavbarContent>

        {/* Navbar Right - Action Buttons */}
        <NavbarContent className="hidden lg:flex items-center gap-4">
          <ThemeSwitch />
          <NextLink passHref href="/checkout">
            <Link>
              <CartBadge />
            </Link>
          </NextLink>
          {/* Show search input on larger screens */}
          {searchInput}
          {/* Show Login/Logout button */}
          {user ? (
            <Button
              size="sm"
              className="bg-green-500"
              onClick={() => dispatch(userLogout())}
            >
              Logout
            </Button>
          ) : (
            <NextLink passHref href="/login">
              <Link>Login</Link>
            </NextLink>
          )}
        </NavbarContent>

        {/* Menu Toggle for smaller screens */}
        <NavbarContent className="lg:hidden">
          <NavbarMenuToggle />
        </NavbarContent>
      </NavbarContent>

      {/* Navbar Menu for smaller screens */}
      <NavbarMenu>
        <div className="p-4 space-y-4">
          {/* Mobile Search Input */}
          <div className="lg:hidden mb-2">{searchInput}</div>

          {/* Menu items */}
          <div className="flex flex-col gap-2">
            {siteConfig.navMenuItems.map((item, index) => (
              <NavbarMenuItem key={item.label}>
                <NextLink passHref href={item.href}>
                  <Link
                    className="text-lg"
                    color={
                      index === 2
                        ? "primary"
                        : index === siteConfig.navMenuItems.length - 1
                          ? "danger"
                          : "foreground"
                    }
                    size="lg"
                  >
                    {item.label}
                  </Link>
                </NextLink>
              </NavbarMenuItem>
            ))}
          </div>

          {/* Mobile Logout/Login Button */}
          <div className="mt-4">
            {user ? (
              <Button
                fullWidth
                color="primary"
                onClick={() => dispatch(userLogout())}
              >
                Logout
              </Button>
            ) : (
              <NextLink passHref href="/login">
                <Link className="text-center w-full">Login</Link>
              </NextLink>
            )}
          </div>
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
