import { Spinner } from "@nextui-org/spinner";
import React from "react";

const LoaderSpinner = () => {
  return (
    <div className="flex justify-center items-center">
      <Spinner color="primary" />
    </div>
  );
};

export default LoaderSpinner;
