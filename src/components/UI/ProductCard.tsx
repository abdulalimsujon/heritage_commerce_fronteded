"use client";

import { Image, Button } from "@nextui-org/react";
import { MdOutlineAttachMoney } from "react-icons/md";
import { useRouter } from "next/navigation";
import { CiHeart } from "react-icons/ci";

import ProductRatingGenerator from "../ProductRatingGenerator";

import { Tproduct } from "@/src/types";

const ProductCard = ({ product }: { product: Tproduct }) => {
  const { name, image, price, category, rating, _id } = product;
  const router = useRouter();

  return (
    // <div className="h-auto w-full max-w-xs md:max-w-sm lg:max-w-md border p-3 rounded-lg shadow-lg bg-blue-100 relative pb-2 transition-all duration-300 ease-in-out">
    //   {/* Product Image */}
    //   <Image
    //     alt="Product Image"
    //     className="object-cover rounded-lg w-full h-[200px] md:h-[250px] lg:h-[250px]"
    //     src={image}
    //   />

    //   {/* Product Information */}
    //   <div className="mt-2">
    //     <h4 className="font-bold text-base md:text-lg lg:text-xl dark:text-slate-500">
    //       {name}
    //     </h4>
    //     <ProductRatingGenerator stars={rating} />
    //     <p className="text-default-500 font-semibold flex items-center mt-1">
    //       <MdOutlineAttachMoney size={20} /> {price}
    //     </p>
    //   </div>

    //   {/* Show Details Button */}
    //   <Button
    //     className="mt-2"
    //     color="primary"
    //     radius="full"
    //     size="sm"
    //     onClick={() => router.push(`/singleProduct/${_id}`)}
    //   >
    //     Show Details
    //   </Button>
    // </div>

    <div className="bg-blue-50 h-[400px] group relative">
      <div className="flex justify-center items-center mt-3">
        <Image
          alt="Product Image"
          className="object-cover rounded-lg w-full h-[200px] md:h-[250px] lg:h-[250px]"
          src={image}
        />
      </div>
      <div className="flex flex-col pt-2">
        <h1 className="mx-auto dark:text-gray-700">{name}</h1>
        <h1 className="mx-auto dark:text-gray-700">{category}</h1>
        <h1 className="mx-auto font-bold text-black text-xl">${price}</h1>
      </div>
      {/* The details button container */}
      <div className="mt-3 absolute bottom-2 left-1/2 transform -translate-x-1/2 translate-y-4 transition-transform  ease-in-out opacity-0 group-hover:opacity-100 group-hover:translate-y-0 group-hover:rotate-[360deg] duration-50  ">
        <div className="flex gap-2">
          <button
            onClick={() => router.push(`/singleProduct/${_id}`)}
            className="font-bold  px-3 w-16 h-10 text-black bg-white flex justify-center items-center rounded-sm p-5"
          >
            Details
          </button>
          <button className="font-bold h-10 w-10 rounded-full    text-black bg-white flex justify-center items-center ">
            <CiHeart size={25} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
