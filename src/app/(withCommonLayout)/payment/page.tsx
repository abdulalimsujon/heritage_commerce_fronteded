/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable prettier/prettier */
"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "@/src/redux/store";

const PaymentPage = () => {
  const { cart } = useSelector((state: RootState) => state.cart);

  // Calculate total price for all products in the cart
  const grandTotalPrice = cart?.reduce((total, cartItem) => {
    return total + (cartItem.price as number) * (cartItem.quantity as number);
  }, 0);

  // State for payment form inputs
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setPaymentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle payment submission logic (e.g., payment processing)
    console.log("Payment submitted:", paymentData);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-5 space-y-8">
      <h1 className="text-2xl font-semibold text-center mb-5">Payment</h1>

      {/* Order Summary */}
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

      {/* Payment Form */}
      <div className="border p-5 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">Payment Details</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium text-gray-700">
              Card Number
            </label>
            <input
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              type="text"
              value={paymentData.cardNumber}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">
              Card Holder Name
            </label>
            <input
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              name="cardHolder"
              placeholder="John Doe"
              type="text"
              value={paymentData.cardHolder}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700">
                Expiry Date
              </label>
              <input
                required
                className="w-full mt-1 p-2 border border-gray-300 rounded"
                name="expiryDate"
                placeholder="MM/YY"
                type="text"
                value={paymentData.expiryDate}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">CVV</label>
              <input
                required
                className="w-full mt-1 p-2 border border-gray-300 rounded"
                name="cvv"
                placeholder="123"
                type="text"
                value={paymentData.cvv}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="text-right">
            <button
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 font-medium"
              type="submit"
            >
              Complete Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
