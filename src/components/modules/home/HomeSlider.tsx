import React from "react";
import { Image } from "@nextui-org/react";

import Carousel from "@/src/components/UI/Carousel";

const slides = [
  "https://i.ibb.co/ncrXc2V/1.png",
  "https://i.ibb.co/B3s7v4h/2.png",
  "https://i.ibb.co/XXR8kzF/3.png",
  "https://i.ibb.co/yg7BSdM/4.png",
];

const HomeSlider = () => {
  return (
    <div className="h-80 w-80 mb-10">
      <Carousel autoSlide={true} autoSlideInterval={2000}>
        {slides.map((s, index) => (
          <Image key={index} alt={`Slide ${index + 1}`} src={s} />
        ))}
      </Carousel>
    </div>
  );
};

export default HomeSlider;
