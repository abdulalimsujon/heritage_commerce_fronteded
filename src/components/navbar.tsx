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
import { Input } from "@nextui-org/input";
import { link as linkStyles, navbar } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";

import CartBadge from "./badge";
import Dropdown from "./Dropdown";

import { siteConfig } from "@/src/config/site";
import { ThemeSwitch } from "@/src/components/theme-switch";
import { TwitterIcon, SearchIcon, Logo } from "@/src/components/icons";
import NavbarInputSearch from "./NavbarInputSearch";
import { getCurrentUser, logout } from "../services/authService";
import LogoutBtn from "./logoutBtn";
import LoginOrLogoutBtn from "./LoginOrLogoutBtn";

export const Navbar = async () => {
  const searchInput = <NavbarInputSearch />;
  const user = await getCurrentUser();

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <NextLink href="/" passHref>
            <Link className="flex justify-start items-center gap-1">
              <Logo />
              <p className="font-bold text-green-700">Heritage Ecommerce</p>
            </Link>
          </NextLink>
        </NavbarBrand>
        <NavbarContent className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink href={item.href} passHref>
                <Link
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-primary data-[active=true]:font-medium"
                  )}
                  color="foreground"
                >
                  {item.label}
                </Link>
              </NextLink>
            </NavbarItem>
          ))}
        </NavbarContent>
        {/* Management Dropdown */}
        <Dropdown />
      </NavbarContent>

      <LoginOrLogoutBtn />
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
          <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>

          <Link
            isExternal
            aria-label="Twitter"
            href={siteConfig.links.twitter}
            className="text-default-500"
          >
            <NavbarItem className="hidden lg:flex">
              <NextLink href="/checkout" passHref>
                <Link
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-primary data-[active=true]:font-medium"
                  )}
                  color="foreground"
                >
                  <CartBadge />
                </Link>
              </NextLink>
            </NavbarItem>
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={item.label}>
              <NextLink href={item.href} passHref>
                <Link
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
      </NavbarMenu>
    </NextUINavbar>
  );
};
