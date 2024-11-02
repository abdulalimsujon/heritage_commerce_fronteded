"use client";

import React from "react";

import LoaderSpinner from "@/src/components/utilities/LoaderSpinner";

const Loading = () => {
  return (
    <div className="flex justify-center items-center">
      <LoaderSpinner />
    </div>
  );
};

export default Loading;
