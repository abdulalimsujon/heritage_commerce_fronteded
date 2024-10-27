"use client";

import { addTocart } from "@/src/redux/features/CartSlice";
import { Tproduct } from "@/src/types";
import { Button } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/src/redux/store";
import { useRouter } from "next/navigation";

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
      })
    );
    router.push(`/cart/${id}`);
  };

  return (
    <div className="py-2">
      <Button onClick={handleClick}>Add to Cart</Button>
    </div>
  );
};

export default AddToCartButton;
