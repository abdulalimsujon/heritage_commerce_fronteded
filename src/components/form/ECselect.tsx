import React from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { useFormContext } from "react-hook-form";
interface Tdata {
  key: string;
  label: string;
}

interface SelectProps {
  label: string;
  name: string;
  placeholder?: string;
  variant?: "flat" | "bordered" | "faded" | "underlined";
  size?: "lg" | "md" | "sm";
  required?: boolean;
  data?: Tdata[] | [];
}

const ECselect = ({
  label = "Favorite Animal",
  name = "favoriteAnimal",
  placeholder = "Select an animal",
  variant = "bordered",
  size = "lg",
  required = false,
  data,
}: SelectProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Select
      label={label}
      placeholder={placeholder}
      variant={variant}
      size={size}
      required={required}
      errorMessage={errors[name] ? (errors[name].message as string) : ""}
      isInvalid={!!errors[name]}
      className="max-w-xs my-1"
      {...register(name)}
    >
      {data?.map((d) => <SelectItem key={d.key}>{d.label}</SelectItem>)}
    </Select>
  );
};

export default ECselect;
