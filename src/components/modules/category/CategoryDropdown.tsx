import React from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { Slider } from "@nextui-org/slider";
import { useDispatch } from "react-redux";
import {
  clearAllFilters,
  setBrand,
  setCategory,
  setPrice,
  setRating,
} from "@/src/redux/features/FilterSlice";
import { useGetAllProduct } from "@/src/app/hooks/allProduct.hook";
import { Tproduct } from "@/src/types";

const CategoryDropdown = () => {
  const dispatch = useDispatch();
  const { data } = useGetAllProduct();

  // Extract categories and brands
  const categories = Array.from(
    new Set(
      data?.data?.result?.map((p: Tproduct) => p.category).filter(Boolean)
    )
  ).map((category) => ({
    key: category,
    label: category,
  }));

  const brands = Array.from(
    new Set(data?.data?.result?.map((p: Tproduct) => p.brand).filter(Boolean))
  ).map((brand) => ({
    key: brand,
    label: brand,
  }));

  // Handlers for selection change
  const handleCategoryChange = (value: string) => {
    dispatch(setCategory(value));
  };

  const handleBrandChange = (value: string) => {
    dispatch(setBrand(value));
  };

  return (
    <div className="pr-5">
      <div className="">
        <h1 className="p-3 text-center bg-slate-100">Filters</h1>

        {/* Category Select */}
        <div className="flex flex-row w-full pt-3">
          <Select
            className="w-full"
            label="Select category"
            variant="bordered"
            placeholder="Select a category"
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            {categories.map((category) => (
              <SelectItem
                key={category.key as string}
                value={category.key as string}
              >
                {category.label as string}
              </SelectItem>
            ))}
          </Select>
        </div>

        {/* Brand Select */}
        <div className="flex flex-row w-full pt-3">
          <Select
            className="w-full"
            label="Select brand"
            variant="bordered"
            placeholder="Select a brand"
            onChange={(e) => handleBrandChange(e.target.value)}
          >
            {brands.map((brand) => (
              <SelectItem key={brand.key as string} value={brand.key as string}>
                {brand.label as string}
              </SelectItem>
            ))}
          </Select>
        </div>

        {/* Price Slider */}
        <div className="pt-2 w-full">
          <Slider
            className="max-w-md"
            defaultValue={0}
            label="Price"
            maxValue={1000}
            showTooltip={true}
            onChange={(value) => {
              dispatch(setPrice(value));
            }}
          />
        </div>

        {/* Rating Slider */}
        <div className="pt-2 w-full">
          <Slider
            className="max-w-md"
            defaultValue={0}
            label="Rating"
            maxValue={5}
            showTooltip={true}
            onChange={(value) => {
              dispatch(setRating(value));
            }}
          />
        </div>

        {/* Reset Button */}
        <div className="pt-2 w-full">
          <Button
            className="w-full"
            size="md"
            onPress={() => {
              dispatch(clearAllFilters());
            }}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CategoryDropdown;
