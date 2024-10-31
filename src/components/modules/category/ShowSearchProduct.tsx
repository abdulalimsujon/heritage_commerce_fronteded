import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ProductCard from "../../UI/ProductCard";
import { useAllProductQuery } from "@/src/redux/api/product/productApi";
import { RootState } from "@/src/redux/store";
import { Tproduct } from "@/src/types";
import { setLimit, setPage } from "@/src/redux/features/FilterSlice";

const ShowSearchProduct = () => {
  const dispatch = useDispatch();
  const category = useSelector((state: RootState) => state.filters.category);
  const brand = useSelector((state: RootState) => state.filters.brand);
  const price = useSelector((state: RootState) => state.filters.price);
  const rating = useSelector((state: RootState) => state.filters.rating);
  const searchTerm = useSelector(
    (state: RootState) => state.filters.searchTerm
  );
  const limit = useSelector((state: RootState) => state.filters.limit);
  const sort = useSelector((state: RootState) => state.filters.sort);
  const page = useSelector((state: RootState) => state.filters.page);

  const [list, setList] = useState(4);

  const { data, isLoading, refetch } = useAllProductQuery({
    category,
    brand,
    price,
    rating,
    sort,
    page,
    searchTerm,
    limit,
  });
  const totalPages = data?.data?.meta?.totalPage;
  const totalProducts = data?.data?.meta?.totalProducts;

  useEffect(() => {
    refetch();
  }, [refetch, page, limit]);

  if (isLoading) {
    return <h1>loading...</h1>;
  }

  const handleLimitChange = (event: { target: { value: string } }) => {
    dispatch(setLimit(parseInt(event.target.value)));
  };

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
    refetch();
  };

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className="w-full">
      <div className="w-full">
        <div className="ml-4 flex justify-between ">
          <div>
            <label className="mr-2 text-xl" htmlFor="limit">
              Items per page:
            </label>
            <select
              className="border border-amber-300 p-2 rounded"
              id="limit"
              value={limit}
              onChange={handleLimitChange}
            >
              <option value={4}>4</option>
              <option value={8}>8</option>
              <option value={16}>16</option>
              <option value={32}>32</option>
            </select>
          </div>
          <div className="flex">
            <div
              className="p-2 ml-2 cursor-pointer"
              role="button"
              tabIndex={0}
              onClick={() => setList(3)}
              onKeyDown={(e) => e.key === "Enter" && setList(3)}
            >
              <h1>lll</h1>
            </div>
            <div
              className="p-2 cursor-pointer"
              role="button"
              tabIndex={0}
              onClick={() => setList(4)}
              onKeyDown={(e) => e.key === "Enter" && setList(4)}
            >
              <h1>llll</h1>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`container mx-auto grid gap-2  ${
          list === 3
            ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
            : list === 4
              ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-4"
              : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
        } ${list === 1 ? "flex justify-center" : ""}`}
      >
        {data?.data?.result?.map((product: Tproduct) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <div className="flex justify-center items-center mt-4 space-x-2 dark:text-black">
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`px-4 py-2 rounded ${
              page === pageNumber
                ? "bg-green-500 text-white"
                : "bg-green-300 hover:bg-green-300"
            }`}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ShowSearchProduct;
