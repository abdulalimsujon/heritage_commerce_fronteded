"use client";

import { Input } from "@nextui-org/input";
import { useFormContext } from "react-hook-form";

import { IInput } from "@/src/types";

interface InputProps extends IInput {
  variant?: "flat" | "bordered" | "faded" | "underlined";
  size?: "lg" | "md" | "sm";
  required?: boolean;
  type?: string;
  label: string;
  name: string;
}

const ECInput = ({
  variant = "bordered",
  size = "md",
  required = false,
  type = "text",
  label,
  name,
}: InputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Input
      errorMessage={errors[name] ? (errors[name].message as string) : ""}
      isInvalid={!!errors[name]}
      {...register(name)}
      className="my-2"
      label={label}
      required={required}
      size={size}
      type={type}
      variant={variant}
    />
  );
};

export default ECInput;
