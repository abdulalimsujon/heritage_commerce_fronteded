import Category from "./category/page";

import HomeSlider from "@/src/components/modules/home/HomeSlider";

export default function Home() {
  return (
    <div>
      <div className="flex justify-center items-center mb-28">
        <HomeSlider />
      </div>

      <Category />
    </div>
  );
}
