import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Tproduct = {
  _id: string;
  name: string;
  description: string;
  category: { name: string }[] | string;
  brand: string;
  stock_quantity: number;
  rating: number;
  product_description: string;
  price: number;
  image: string;
};
export interface IInput {
  variant?: "flat" | "bordered" | "faded" | "underlined";
  size?: "sm" | "md" | "lg";
  required?: boolean;
  type?: string;
  label: string;
  name: string;
  disabled?: boolean;
}
export type Tuser = {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  status: "Active" | "Inactive";
  password: string;
  image: string;
  role: "user" | "admin";
};
