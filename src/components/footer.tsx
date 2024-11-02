import React from "react";

import FooterInput from "./utilities/FooterInput";

const Footer = () => {
  return (
    <div className="mt-10 bg-blue-100 dark:bg-gray-900">
      <div className="flex justify-center items-center h-80 w-full">
        <div className="flex gap-[40px] mx-20">
          <div className="w-[400px] gap-3">
            <h1 className="w-full text-3xl font-bold mb-3 text-gray-800 dark:text-gray-200">
              Heritage Ecommerce
            </h1>
            <p className="text-gray-700 dark:text-gray-400">
              Address: 60-49 Road 11378 New York
            </p>
            <p className="text-gray-700 dark:text-gray-400">
              Phone: +65 11.188.888
            </p>
            <p className="text-gray-700 dark:text-gray-400">
              Email: hello@colorlib.com
            </p>
          </div>
          <div className="w-[350px]">
            <h1 className="text-lg font-bold text-gray-800 dark:text-gray-200">
              Useful Links
            </h1>
            <div className="flex gap-3">
              <div className="flex flex-col gap-1">
                <h1 className="text-gray-700 dark:text-gray-400">About Us</h1>
                <h1 className="text-gray-700 dark:text-gray-400">
                  Secure Shopping
                </h1>
                <h1 className="text-gray-700 dark:text-gray-400">
                  Delivery Information
                </h1>
                <h1 className="text-gray-700 dark:text-gray-400">
                  Privacy Policy
                </h1>
                <h1 className="text-gray-700 dark:text-gray-400">
                  Our Sitemap
                </h1>
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="text-gray-700 dark:text-gray-400">Who We Are</h1>
                <h1 className="text-gray-700 dark:text-gray-400">
                  Our Services
                </h1>
                <h1 className="text-gray-700 dark:text-gray-400">Projects</h1>
                <h1 className="text-gray-700 dark:text-gray-400">Contact</h1>
                <h1 className="text-gray-700 dark:text-gray-400">Innovation</h1>
              </div>
            </div>
          </div>
          <div className="w-[350px]">
            <h1 className="font-bold text-lg text-gray-800 dark:text-gray-200">
              Join Our Newsletter Now
            </h1>
            <h1 className="text-gray-700 dark:text-gray-400">
              Get E-mail updates about our latest shop and special offers.
            </h1>
            <FooterInput />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
