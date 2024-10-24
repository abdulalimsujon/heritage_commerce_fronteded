import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Tproduct = {
  _id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  stock_quantity: number;
  rating: number;
  product_description: string;
  price: number;
  image: string;
};
