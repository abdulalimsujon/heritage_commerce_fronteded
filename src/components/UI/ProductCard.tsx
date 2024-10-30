"use client";

import { Image, Button } from "@nextui-org/react";
import { MdOutlineAttachMoney } from "react-icons/md";
import { useRouter } from "next/navigation";

import ProductRatingGenerator from "../ProductRatingGenerator";

import { Tproduct } from "@/src/types";

const ProductCard = ({ product }: { product: Tproduct }) => {
  const { name, image, price, rating, _id } = product;
  const router = useRouter();

  return (
    <div className="h-auto w-full max-w-xs md:max-w-sm lg:max-w-md border p-3 rounded-lg shadow-lg bg-gray-100 relative pb-2 transition-all duration-300 ease-in-out">
      {/* Product Image */}
      <Image
        alt="Product Image"
        className="object-cover rounded-lg w-full h-[200px] md:h-[250px] lg:h-[250px]"
        src={image}
      />

      {/* Product Information */}
      <div className="mt-2">
        <h4 className="font-bold text-base md:text-lg lg:text-xl dark:text-slate-500">
          {name}
        </h4>
        <ProductRatingGenerator stars={rating} />
        <p className="text-default-500 font-semibold flex items-center mt-1">
          <MdOutlineAttachMoney size={20} /> {price}
        </p>
      </div>

      {/* Show Details Button */}
      <Button
        className="mt-2"
        color="primary"
        radius="full"
        size="sm"
        onClick={() => router.push(`/singleProduct/${_id}`)}
      >
        Show Details
      </Button>
    </div>
  );
};

export default ProductCard;
