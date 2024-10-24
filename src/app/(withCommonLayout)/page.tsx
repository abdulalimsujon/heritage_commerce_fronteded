import AllProduct from "@/src/components/modules/home/AllProduct";
import HomeSlider from "@/src/components/modules/home/HomeSlider";

export default function Home() {
  return (
    <div>
      <div className="flex justify-center items-center">
        <HomeSlider />
      </div>

      <AllProduct />
    </div>
  );
}
