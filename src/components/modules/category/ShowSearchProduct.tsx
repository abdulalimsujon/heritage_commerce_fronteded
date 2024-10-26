"use client";

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
  const limit = useSelector((state: RootState) => state.filters.limit);
  const sort = useSelector((state: RootState) => state.filters.sort);
  const page = useSelector((state: RootState) => state.filters.page);

  const [list, setList] = useState(3);

  const { data, isLoading, refetch } = useAllProductQuery({
    category,
    brand,
    price,
    rating,
    sort,
    page,
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
    dispatch(setLimit(parseInt(event.target.value))); // Update the limit with the selected value
  };

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
    refetch(); // Refetch data with the new page number
  };

  return (
    <div className="w-full">
      <div className="w-full">
        <div className="ml-4 flex justify-between">
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
              onClick={() => setList(3)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setList(3)}
            >
              <h1>lll</h1>
            </div>
            <div
              className="p-2 cursor-pointer"
              onClick={() => setList(4)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setList(4)}
            >
              <h1>llll</h1>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`container mx-auto grid gap-2 ${
          list === 3
            ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
            : list === 4
              ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-4"
              : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
        }`}
      >
        {data?.data?.result?.map((product: Tproduct) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <div className="flex justify-center items-center mt-4 space-x-2">
        <button
          className={`${
            page === 1
              ? "bg-gray-200 cursor-not-allowed"
              : "bg-amber-400 hover:bg-amber-500"
          } px-4 py-2 rounded`}
          disabled={page === 1} // Disable "Previous" button on first page
          onClick={() => handlePageChange(page - 1)}
        >
          Previous
        </button>

        <p className="bg-red-300 px-4 py-2 rounded">{page}</p>

        <button
          className={`${
            page === totalPages || totalProducts === 0
              ? "bg-gray-200 cursor-not-allowed"
              : "bg-amber-400 hover:bg-amber-500"
          } px-4 py-2 rounded`}
          disabled={page === totalPages} // Disable "Next" button on last page
          onClick={() => handlePageChange(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ShowSearchProduct;
