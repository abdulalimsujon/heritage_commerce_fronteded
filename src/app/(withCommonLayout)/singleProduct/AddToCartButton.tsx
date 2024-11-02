"use client";

import { Button } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

import { addTocart } from "@/src/redux/features/CartSlice";
import { Tproduct } from "@/src/types";
import { AppDispatch } from "@/src/redux/store";

const AddToCartButton = ({ data }: { data: Tproduct }) => {
  const dispatch = useDispatch<AppDispatch>();
  const id = data._id;
  const router = useRouter();

  const handleClick = () => {
    dispatch(
      addTocart({
        id: data._id,
        price: data.price,
        name: data.name,
        quantity: data.stock_quantity,
      }),
    );
    router.push(`/cart/${id}`);
  };

  return (
    <div className="py-2 ">
      <Button className="bg-green-500" onClick={handleClick}>
        Add to Cart
      </Button>
    </div>
  );
};

export default AddToCartButton;
