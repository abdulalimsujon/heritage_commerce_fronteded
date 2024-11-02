import Image from "next/image";

import AddToCartButton from "../AddToCartButton";

import { SingleProductById } from "@/src/services/singleProduct";
import ProductRatingGenerator from "@/src/components/ProductRatingGenerator";

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
    rating,
    _id,
  } = data;

  return (
    <div className="bg-blue-50 dark:bg-gray-800 mx-80">
      <div className="flex justify-center items-center">
        <div className="flex justify-center items-center p-10 object-cover">
          <Image
            alt={name}
            height={200} // Adjust height as needed
            src={image}
            width={200} // Adjust width as needed
          />
        </div>
        <div className="w-96 py-3">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {name}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2 ">
            {description}
          </p>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            <strong>Category:</strong> {category}
          </p>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            <strong>Brand:</strong> {brand}
          </p>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            <strong>Stock Quantity:</strong> {stock_quantity}
          </p>
          <p className="text-gray-800 dark:text-white font-bold mt-2 text-lg">
            Price: ${price.toFixed(2)}
          </p>
          <p>
            <ProductRatingGenerator stars={rating as number} />
          </p>
          <div className="mt-4">
            <AddToCartButton data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
