import { Card } from "@nextui-org/card";
import { MdOutlineAttachMoney } from "react-icons/md";
import { Image } from "@nextui-org/react";

import { Tproduct } from "../../types";
import ProductRatingGenerator from "../ProductRatingGenerator";

const ProductCard = ({ product }: { product: Tproduct }) => {
  const { name, image, price, rating } = product;

  return (
    <Card className="py-4 max-w-xs bg-slate-50">
      {/* Card Header */}

      {/* Card Body */}
      <div className="overflow-visible py-2 flex items-center justify-center p-10 bg-slate-50">
        <Image
          alt="Product Image"
          className="object-cover rounded-sm"
          height={200}
          src={image}
          width={300}
        />
      </div>
      <div className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="font-bold text-large">{name}</h4>
        <p className="text-tiny uppercase font-bold">
          <ProductRatingGenerator stars={rating} />
        </p>
        <h4 className="text-default-500 flex p-1">
          <MdOutlineAttachMoney size={20} /> {price}
        </h4>
        <h1 className="text-center">Show Details</h1>
      </div>
    </Card>
  );
};

export default ProductCard;
