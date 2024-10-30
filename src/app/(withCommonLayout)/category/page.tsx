"use client";

import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";

import CategoryDropdown from "@/src/components/modules/category/CategoryDropdown";
import ShowSearchProduct from "@/src/components/modules/category/ShowSearchProduct";

const Category = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div>
      <div className="container w-full max-w-full py-3 bg-slate-400 mb-4">
        <h1 className="text-center text-2xl font-bold">Products</h1>
      </div>

      {/* Toggle button for smaller screens */}
      <div className="md:hidden flex mb-4 pl-4">
        <button
          className="flex items-center p-2 bg-gray-300 text-white rounded shadow"
          onClick={toggleDrawer}
        >
          <GiHamburgerMenu className="m-2" size={20} />
        </button>
      </div>

      {/* Drawer for screens smaller than md */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-50 transition-transform transform ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="bg-white w-80 h-3/4 shadow-lg relative">
          <button
            className="absolute top-4 right-4 p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
            onClick={toggleDrawer}
          >
            <AiOutlineClose size={20} />
          </button>
          <div className="p-4">
            <CategoryDropdown />
          </div>
        </div>
      </div>

      {/* CategoryDropdown for larger screens */}
      <div className="flex">
        <div className="hidden md:block w-80">
          <CategoryDropdown />
        </div>

        {/* Main content */}
        <div className="flex-grow">
          <ShowSearchProduct />
        </div>
      </div>
    </div>
  );
};

export default Category;
