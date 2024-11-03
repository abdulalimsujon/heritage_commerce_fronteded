"use client";

import { useAllCategoryQuery } from "@/src/redux/api/categoryApi";
import React from "react";

const CategoryPage = () => {
  const { data } = useAllCategoryQuery(undefined);

  console.log(data);
  return (
    <div>
      <h1>this is category page</h1>
    </div>
  );
};

export default CategoryPage;
