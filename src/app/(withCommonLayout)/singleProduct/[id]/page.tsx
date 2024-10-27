import { SingleProductById } from "@/src/services/singleProduct";
import Image from "next/image";
import AddToCartButton from "../AddToCartButton";

interface IProps {
  params: {
    id: string;
  };
}

const SingleProduct = async ({ params: { id } }: IProps) => {
  const { data } = await SingleProductById(id);

  const {
    name,
    description,
    category,
    brand,
    stock_quantity,
    price,
    image,
    _id,
  } = data;

  return (
    <div className="ml-20">
      <div className="flex ">
        <div className="relative">
          <Image
            src={image}
            alt={name}
            width={400} // Adjust width as needed
            height={300} // Adjust height as needed
            className="w-full h-48 object-cover"
          />
        </div>
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800">{name}</h2>
          <p className="text-gray-600 mt-1">{description}</p>
          <p className="text-gray-600 mt-2">
            <strong>Category:</strong> {category}
          </p>
          <p className="text-gray-600 mt-1">
            <strong>Brand:</strong> {brand}
          </p>
          <p className="text-gray-600 mt-1">
            <strong>Stock Quantity:</strong> {stock_quantity}
          </p>
          <p className="text-gray-800 font-bold mt-2 text-lg">
            Price: ${price.toFixed(2)}
          </p>

          <AddToCartButton data={data} />
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
