/* eslint-disable jsx-a11y/no-static-element-interactions */
"use client";

import React, { useState, useEffect } from "react";
import NextLink from "next/link";

const Dropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Function to handle dropdown toggle
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Function to handle dropdown close when clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;

    if (dropdownOpen && !target.closest(".dropdown-container")) {
      setDropdownOpen(false);
    }
  };

  // Attach the click outside handler to the document
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <div className="relative dropdown-container">
      <div
        className="cursor-pointer"
        onClick={toggleDropdown} // Toggle dropdown on click
      >
        Management
      </div>
      {/* Dropdown Content */}
      {dropdownOpen && (
        <div className="absolute left-0 z-10 w-48 mt-2 bg-white border rounded-md shadow-lg dropdown-content">
          <NextLink passHref href="/admin/user-management">
            <div className="px-4 py-3 hover:bg-gray-100 cursor-pointer">
              User Management
            </div>
          </NextLink>
          <NextLink passHref href="/admin/product-management">
            <div className="px-4 py-3 hover:bg-gray-100 cursor-pointer">
              Product Management
            </div>
          </NextLink>
          <NextLink passHref href="/admin/category-management">
            <div className="px-4 py-3 hover:bg-gray-100 cursor-pointer">
              category Management
            </div>
          </NextLink>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
