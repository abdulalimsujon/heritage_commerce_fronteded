"use client";

import LoaderSpinner from "@/src/components/utilities/LoaderSpinner";
import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center">
      <LoaderSpinner />
    </div>
  );
};

export default Loading;
