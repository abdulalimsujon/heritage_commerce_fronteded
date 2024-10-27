"use client";

import { AiOutlineShoppingCart } from "react-icons/ai";
import { Badge } from "@nextui-org/badge";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const CartBadge = () => {
  const cart = useSelector((state: RootState) => state.cart.cart);

  return (
    <div>
      <Badge content={cart.length} color="danger" placement="top-right">
        <AiOutlineShoppingCart size={25} />
      </Badge>
    </div>
  );
};

export default CartBadge;
