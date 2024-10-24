import { FaStarHalfAlt } from "react-icons/fa";
import { MdOutlineStarBorder } from "react-icons/md";
import { FaStar } from "react-icons/fa6";

const ProductRatingGenerator = ({ stars }: { stars: number }) => {
  const ratingStars = Array.from({ length: 5 }, (elem, index) => {
    let number = index + 0.5;

    return (
      <span key={index}>
        {stars >= index + 1 ? (
          <FaStar size={15} />
        ) : stars >= number ? (
          <FaStarHalfAlt size={15} />
        ) : (
          <MdOutlineStarBorder size={15} />
        )}
      </span>
    );
  });

  return (
    <wrapper>
      <div className="flex gap-1 text-amber-500">{ratingStars}</div>
    </wrapper>
  );
};

export default ProductRatingGenerator;
