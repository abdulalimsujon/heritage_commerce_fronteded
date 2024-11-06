"use client";

/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable prettier/prettier */

import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "@/src/redux/store";
import { useCreatePaymentIntentMutation } from "@/src/redux/api/gateway/gatewayApi";
import { toast } from "react-toastify";
// Adjust path as needed

const stripePromise = loadStripe(
  "pk_test_51Ls9jVGslqmvXzFItLmpBXHrEo6T9744iSs0GnDuK92J6daEfjjMPsTYMO7MIwat0J2xARZLaIEUnAvCPzWaMLzU00FQ9kNlVm"
);

interface FormData {
  amount: string;
}

interface PaymentFormProps {
  grandTotalAmount: string;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ grandTotalAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [formData, setFormData] = useState<FormData>({
    amount: grandTotalAmount,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const [createPaymentIntent] = useCreatePaymentIntentMutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    try {
      const response = await createPaymentIntent({
        price: Number(formData.amount),
      }).unwrap();

      if (response.object.clientSecret) {
        toast.success("payment is successfull");
      }
      // Add further handling for the payment response here if needed
    } catch (error) {
      console.error("Payment failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-lg shadow-md p-6 bg-blue-50 dark:bg-slate-50 mx-40">
      <h3 className="text-2xl font-semibold mb-6 text-green-700">Payment</h3>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">
            Accepted Cards
          </p>
          <div className="flex space-x-4">
            <img
              alt="Card 1"
              className="w-20 transition-transform transform hover:scale-110"
              src="https://i.ibb.co/com/xLNQq3Y/card1.png"
            />
            <img
              alt="Card 2"
              className="w-16 transition-transform transform hover:scale-110"
              src="https://i.ibb.co/com/YThSqw4/card2.png"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <input
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
            name="amount"
            placeholder="Enter amount"
            type="number"
            value={formData.amount}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Card Details
          </label>
          <CardElement
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>
        <button
          className="w-full mt-8 py-3 bg-green-700 text-white rounded-lg hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
          disabled={!stripe || loading}
          type="submit"
        >
          {loading ? "Processing..." : "Proceed to Checkout"}
        </button>
      </form>
    </div>
  );
};

const Payment: React.FC = () => {
  const { cart } = useSelector((state: RootState) => state.cart);
  const grandTotalPrice =
    cart?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;

  return (
    <div>
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
      <Elements stripe={stripePromise}>
        <PaymentForm grandTotalAmount={grandTotalPrice.toFixed(2)} />
      </Elements>
    </div>
  );
};

export default Payment;
