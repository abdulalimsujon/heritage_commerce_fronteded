import React from "react";
import FooterInput from "./utilities/FooterInput";

const Footer = () => {
  return (
    <div className="mt-10  bg-blue-100">
      <div className=" flex justify-center items-center  h-80 w-full ">
        <div className=" flex gap-[40px]  mx-20">
          <div className="w-[400px] gap-3">
            <h1 className="w-full text-3xl font-bold mb-3">
              Heritage Ecommerce
            </h1>
            <p>Address: 60-49 Road 11378 New York</p>
            <p>Phone: +65 11.188.888</p>
            <p>Email: hello@colorlib.com</p>
          </div>
          <div className="w-[350px]">
            <h1 className="text-lg font-bold">useful link</h1>
            <div className="flex gap-3">
              <div className="flex flex-col gap-1">
                <h1>About use</h1>
                <h1>Secure Shopping</h1>
                <h1>Delivery infomation</h1>
                <h1>Privacy Policy</h1>
                <h1>Our Sitemap</h1>
              </div>
              <div className="flex flex-col gap-1">
                <h1>Who We Are</h1>
                <h1>Our Services</h1>
                <h1>Projects</h1>
                <h1>Contact</h1>
                <h1>Innovation</h1>
              </div>
            </div>
          </div>
          <div className="w-[350px] ">
            <h1 className="font-bold text-lg">Join Our Newsletter Now</h1>
            <h1 className="w-full">
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
