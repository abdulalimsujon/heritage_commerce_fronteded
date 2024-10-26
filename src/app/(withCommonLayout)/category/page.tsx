"use client";

import { useState } from "react";
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
      <div className="md:hidden">
        <button
          className="p-2 bg-blue-500 text-white rounded"
          onClick={toggleDrawer}
        >
          {isDrawerOpen ? "Close Menu" : "Open Menu"}
        </button>
      </div>

      {/* Drawer for small screens */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-50 transition-transform transform ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="bg-white h-full shadow-lg">
          <CategoryDropdown />
          <button
            className="p-2 bg-blue-500 text-white rounded m-4"
            onClick={toggleDrawer}
          >
            Close
          </button>
        </div>
      </div>

      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-12 gap-4">
        {/* CategoryDropdown for larger screens */}
        <div className="hidden md:block col-span-4">
          <CategoryDropdown />
        </div>

        {/* Main content for products */}
        <div className="col-span-12 md:col-span-8">
          <ShowSearchProduct />
        </div>
      </div>
    </div>
  );
};

export default Category;
