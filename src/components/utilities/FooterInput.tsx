"use client";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { CiTwitter } from "react-icons/ci";

const FooterInput = () => {
  return (
    <div className="dark:text-gray-700">
      <input
        className="p-2 my-2 rounded-md"
        placeholder="Enter your email"
        type="text "
      />
      <button className="ml-2 p-2 my-2 rounded-md bg-green-500 text-white">
        SUBSCRIBE
      </button>
      <div className="flex gap-4 mx-auto  justify-center items-center ">
        <div className="flex pr-5 ">
          <div className="w-8 h-8 bg-white rounded-full flex justify-center items-center hover:bg-green-500">
            <FaFacebookF />
          </div>
          <div className="w-8 h-8 bg-white rounded-full flex justify-center items-center hover:bg-green-500">
            <FaInstagram />
          </div>
          <div className="w-8 h-8 bg-white rounded-full flex justify-center items-center hover:bg-green-500">
            <FaFacebookF />
          </div>
          <div className="w-8 h-8 bg-white rounded-full flex justify-center items-center hover:bg-green-500">
            <CiTwitter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterInput;
