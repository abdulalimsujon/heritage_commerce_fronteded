/* eslint-disable jsx-a11y/label-has-associated-control */
"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { RootState } from "@/src/redux/store";

const CheckoutPage = () => {
  const { cart } = useSelector((state: RootState) => state.cart);
  const router = useRouter();

  // Calculate total price for all products in the cart
  const grandTotalPrice = cart?.reduce((total, cartItem) => {
    return total + cartItem.price * cartItem.quantity;
  }, 0);

  // State for form inputs
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    shippingAddress: "",
    billingAddress: "",
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic (e.g., payment processing)
    console.log("Form submitted:", formData);
    router.push("/payment");
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-5 space-y-8">
      <h1 className="text-2xl font-semibold text-center mb-5">Checkout</h1>

      {/* Summary of Items and Total Price */}
      <div className="border p-5 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">Order Summary</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full mb-5">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left font-medium text-gray-700">
                  Product
                </th>
                <th className="px-4 py-2 text-center font-medium text-gray-700">
                  Price
                </th>
                <th className="px-4 py-2 text-center font-medium text-gray-700">
                  Quantity
                </th>
                <th className="px-4 py-2 text-center font-medium text-gray-700">
                  Total Price
                </th>
              </tr>
            </thead>
            <tbody>
              {cart?.map((cartItem) => (
                <tr key={cartItem.id} className="border-b">
                  <td className="px-4 py-2 text-gray-800">{cartItem.name}</td>
                  <td className="px-4 py-2 text-center text-gray-800">
                    ${cartItem.price.toFixed(2)}
                  </td>
                  <td className="px-4 py-2 text-center text-gray-800">
                    {cartItem.quantity}
                  </td>
                  <td className="px-4 py-2 text-center text-gray-800">
                    ${(cartItem.price * cartItem.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-right text-lg font-semibold text-gray-800">
          Grand Total: ${grandTotalPrice.toFixed(2)}
        </div>
      </div>

      {/* Checkout Form */}
      <div className="border p-5 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">
          Shipping & Billing Details
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700">
                Full Name
              </label>
              <input
                required
                className="w-full mt-1 p-2 border border-gray-300 rounded"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">
                Email Address
              </label>
              <input
                required
                className="w-full mt-1 p-2 border border-gray-300 rounded"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <label className="block font-medium text-gray-700">
              Phone Number
            </label>
            <input
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">
              Shipping Address
            </label>
            <input
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              name="shippingAddress"
              type="text"
              value={formData.shippingAddress}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">
              Billing Address
            </label>
            <input
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              name="billingAddress"
              type="text"
              value={formData.billingAddress}
              onChange={handleChange}
            />
          </div>
          <div className="text-right">
            <button
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 font-medium"
              type="submit"
            >
              Proceed to Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
