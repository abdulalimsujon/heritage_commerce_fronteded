import Image from "next/image";
import AddToCartButton from "../AddToCartButton";
import { SingleProductById } from "@/src/services/singleProduct";

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
    <div className="flex justify-center">
      <div className="ml-20 max-w-xl border border-gray-300 rounded-lg shadow-md p-6 bg-white ">
        <div className="flex flex-col md:flex-row">
          <div className="relative md:w-1/2 mb-4 md:mb-0">
            <Image
              alt={name}
              className="w-full h-48 object-cover rounded-md"
              height={300} // Adjust height as needed
              src={image}
              width={400} // Adjust width as needed
            />
          </div>
          <div className="md:w-1/2 md:pl-6">
            <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
            <p className="text-gray-600 mt-2">{description}</p>
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
            <div className="mt-4">
              <AddToCartButton data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
