"use client";

import { Input } from "@nextui-org/input";
import React, { useState } from "react";
import { SearchIcon } from "./icons";
import { Button } from "@nextui-org/button";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../redux/features/FilterSlice";
import { useRouter } from "next/navigation";

const NavbarInputSearch = () => {
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSearchClick = () => {
    dispatch(setSearchTerm(searchValue));
    router.push("/category");
    // You can also implement additional logic here, like navigating to a search results page
  };

  return (
    <div className="flex items-center gap-2 ml-3">
      <Input
        aria-label="Search"
        classNames={{
          inputWrapper: "bg-default-100",
          input: "text-sm",
        }}
        labelPlacement="outside"
        placeholder="Search your product"
        startContent={
          <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
        }
        type="search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <Button onPress={handleSearchClick} auto>
        Search
      </Button>
    </div>
  );
};

export default NavbarInputSearch;
