"use client";

import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { FaMinus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseToCart,
  increaseToCart,
  Tcart,
} from "@/src/redux/features/CartSlice";
import { RootState } from "@/src/redux/store";
import { useRouter } from "next/navigation";

const ManageQuantity = ({ id }: { id: string }) => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state: RootState) => state.cart);
  const router = useRouter();

  // Calculate total price
  const totalPrice = cart?.reduce((total: number, cartItem: Tcart) => {
    return total + Number(cartItem.price) * cartItem.quantity;
  }, 0);

  const handleCheckOut = () => {
    router.push("/checkout");
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-5">
      <h1 className="text-2xl font-semibold text-center mb-5">Cart</h1>
      <div className="overflow-x-auto mb-5">
        <table className="min-w-full border border-gray-300 mb-5">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 border-b border-gray-300 text-left font-medium text-gray-700">
                Product
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-center font-medium text-gray-700">
                Price
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-center font-medium text-gray-700">
                Quantity
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-center font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {cart?.map((cartItem) => (
              <tr key={cartItem.id} className="border-b border-gray-200">
                <td className="px-6 py-4 text-gray-800">{cartItem.name}</td>
                <td className="px-6 py-4 text-center text-gray-800">
                  ${cartItem.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-center text-gray-800">
                  {cartItem.quantity}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      className="p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                      onClick={() =>
                        dispatch(increaseToCart({ id: cartItem.id }))
                      }
                    >
                      <IoMdAdd />
                    </button>
                    <button
                      className="p-2 text-white bg-red-500 rounded hover:bg-red-600"
                      onClick={() =>
                        dispatch(decreaseToCart({ id: cartItem.id }))
                      }
                    >
                      <FaMinus />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-right text-lg font-semibold text-gray-800 mb-5">
        Total Price: ${totalPrice.toFixed(2)}
      </div>

      {/* Checkout Button */}
      <div className="text-center">
        <button
          onClick={handleCheckOut}
          className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default ManageQuantity;
