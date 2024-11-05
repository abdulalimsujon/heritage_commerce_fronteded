import React from "react";

import FooterInput from "./utilities/FooterInput";

const Footer = () => {
  return (
    <div className="mt-10 bg-blue-100 dark:bg-gray-900 py-10">
      <div className="flex flex-col md:flex-row justify-center items-center h-auto md:h-80 w-full px-6 md:px-20">
        <div className="flex flex-col md:flex-row gap-10 md:gap-20">
          {/* Company Information */}
          <div className="w-full md:w-[300px] lg:w-[400px] gap-3 text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold mb-3 text-gray-800 dark:text-gray-200">
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

          {/* Useful Links */}
          <div className="w-full md:w-[300px] lg:w-[350px] text-center md:text-left">
            <h1 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-3">
              Useful Links
            </h1>
            <div className="flex justify-center md:justify-start gap-6">
              <div className="flex flex-col gap-1">
                <p className="text-gray-700 dark:text-gray-400">About Us</p>
                <p className="text-gray-700 dark:text-gray-400">
                  Secure Shopping
                </p>
                <p className="text-gray-700 dark:text-gray-400">
                  Delivery Information
                </p>
                <p className="text-gray-700 dark:text-gray-400">
                  Privacy Policy
                </p>
                <p className="text-gray-700 dark:text-gray-400">Our Sitemap</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-gray-700 dark:text-gray-400">Who We Are</p>
                <p className="text-gray-700 dark:text-gray-400">Our Services</p>
                <p className="text-gray-700 dark:text-gray-400">Projects</p>
                <p className="text-gray-700 dark:text-gray-400">Contact</p>
                <p className="text-gray-700 dark:text-gray-400">Innovation</p>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="w-full md:w-[300px] lg:w-[350px] text-center md:text-left">
            <h1 className="font-bold text-lg text-gray-800 dark:text-gray-200 mb-3">
              Join Our Newsletter Now
            </h1>
            <p className="text-gray-700 dark:text-gray-400 mb-3">
              Get E-mail updates about our latest shop and special offers.
            </p>
            <FooterInput />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
