import AllProduct from "@/src/components/modules/home/AllProduct";
import HomeSlider from "@/src/components/modules/home/HomeSlider";
import Category from "./category/page";

export default function Home() {
  return (
    <div>
      <div className="flex justify-center items-center mb-28">
        <HomeSlider />
      </div>

      <Category></Category>
    </div>
  );
}
