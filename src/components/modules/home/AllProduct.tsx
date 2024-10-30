import Card from "@/src/components/UI/ProductCard";
import { getAllProduct } from "@/src/services/allProducts";
import { Tproduct } from "@/src/types";

const AllProduct = async () => {
  const { data: products } = await getAllProduct();

  return (
    <div className="mt-28">
      <h1 className="font-bold text-2xl text-center pb-10">All Product</h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 items-center">
        {products.result.map((product: Tproduct) => (
          <Card key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AllProduct;
