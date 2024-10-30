import React from "react";
import { Textarea } from "@nextui-org/react";
import { useFormContext, Controller } from "react-hook-form";

interface ReusableTextareaProps {
  name: string;
  label?: string;
  labelPlacement?: "inside" | "outside";
  placeholder?: string;
  isRequired?: boolean;
  maxWidth?: string;
  variant?: "flat" | "faded" | "bordered" | "underlined"; // Add variant prop
}

const ReusableTextarea: React.FC<ReusableTextareaProps> = ({
  name,
  label,
  labelPlacement = "outside",
  placeholder = "Enter text",
  isRequired = false,
  maxWidth = "max-w-lg",
  variant,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Textarea
          {...field}
          className={maxWidth}
          isRequired={isRequired}
          label={label}
          labelPlacement={labelPlacement}
          placeholder={placeholder}
          variant={variant} // Apply variant prop here
        />
      )}
    />
  );
};

export default ReusableTextarea;
