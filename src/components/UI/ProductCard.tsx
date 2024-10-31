"use client";

import { Image, Button } from "@nextui-org/react";

import { useRouter } from "next/navigation";
import { CiHeart } from "react-icons/ci";

import { Tproduct } from "@/src/types";

const ProductCard = ({ product }: { product: Tproduct }) => {
  const { name, image, price, brand, _id } = product;
  const router = useRouter();

  return (
    <div className="bg-blue-50 dark:bg-gray-800 h-[400px] group relative transition-colors duration-300">
      <div className="flex justify-center items-center mt-3">
        <Image
          alt="Product Image"
          className="object-cover rounded-lg w-full h-[200px] md:h-[250px] lg:h-[250px]"
          src={image}
        />
      </div>
      <div className="flex flex-col pt-2 text-center">
        <h1 className="text-black dark:text-gray-200">{name}</h1>
        <h1 className="text-gray-600 dark:text-gray-400">{brand}</h1>
        <h1 className="font-bold text-black dark:text-white text-xl">
          ${price}
        </h1>
      </div>
      {/* The details button container */}
      <div className="mt-3 absolute bottom-2 left-1/2 transform -translate-x-1/2 translate-y-4 transition-transform ease-in-out opacity-0 group-hover:opacity-100 group-hover:translate-y-0 duration-50">
        <div className="flex gap-2">
          <button
            onClick={() => router.push(`/singleProduct/${_id}`)}
            className="font-bold px-3 w-16 h-10 text-black dark:text-white bg-white dark:bg-green-700 flex justify-center items-center rounded-sm p-5 hover:bg-green-500 dark:hover:bg-green-600"
          >
            Details
          </button>
          <button className="font-bold h-10 w-10 rounded-full text-black dark:text-white bg-white dark:bg-green-700 flex justify-center items-center transform transition-transform duration-300 hover:rotate-180 hover:bg-green-500 dark:hover:bg-green-600">
            <CiHeart size={25} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
