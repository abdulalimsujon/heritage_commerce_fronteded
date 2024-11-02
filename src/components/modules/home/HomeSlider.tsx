import React from "react";
import { Image } from "@nextui-org/react";

import Carousel from "@/src/components/UI/Carousel";

const slides = [
  "https://i.ibb.co.com/xfvg0gn/mangos-growing-ripe-mango-tree.jpg",
  "https://i.ibb.co.com/t23yG9y/GB6mZ.jpg",
  "https://i.ibb.co.com/P1RV8gk/agriculture-lychee-fruit-thailand.jpg",
  "https://i.ibb.co.com/8c0bQgD/bench-palm-tress-public-park-covered-with-sand-storm-calima-tenerife-spain.jpg",
  "https://i.ibb.co.com/xfvg0gn/mangos-growing-ripe-mango-tree.jpg",
  "https://ibb.co.com/RQC97Y4",
];

const HomeSlider = () => {
  return (
    <div className="h-80 w-80 ">
      <Carousel autoSlide={true} autoSlideInterval={1500}>
        {slides.map((s, index) => (
          <Image
            width={300}
            height={350}
            key={index}
            alt={`Slide ${index + 1}`}
            src={s}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default HomeSlider;
