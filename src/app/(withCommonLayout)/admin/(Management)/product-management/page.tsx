/* eslint-disable react/jsx-sort-props */
"use client";

import React, { useCallback, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { Button, Tooltip } from "@nextui-org/react";

import { DeleteIcon, EditIcon, EyeIcon } from "@/src/components/icons";
import {
  useAllProductFromDbQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
} from "@/src/redux/api/product/productApi";
import { Tproduct } from "@/src/types";
import ReusableModal from "@/src/components/ReusableModal";
import ECform from "@/src/components/form/ECform";
import ECInput from "@/src/components/form/ECInput";
import ECTextArea from "@/src/components/form/ECTextArea";

// Column Definitions
const columns = [
  { name: "Image", uid: "image" },
  { name: "Name", uid: "name" },
  { name: "Description", uid: "description" },
  { name: "Price", uid: "price" },
  { name: "Brand", uid: "brand" },
  { name: "Category", uid: "category" },
  { name: "Actions", uid: "actions" },
];

const ProductManagementPage: React.FC = () => {
  const { data, isLoading, error } = useAllProductFromDbQuery(undefined);
  const [
    updateProduct,
    { isLoading: updateLoading, isError, isSuccess, reset },
  ] = useUpdateProductMutation();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [createProduct, { isLoading: addLoading, isSuccess: isCreateSuccess }] =
    useCreateProductMutation();

  // State to manage image file

  // Handle image file input change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImageFile(file);
    }
  };

  // Handle form submission for create product
  const edithandleSubmit = async (formDataValues: { [key: string]: any }) => {
    const formData = new FormData();

    Object.entries(formDataValues).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (imageFile) {
      formData.append("image", imageFile);
    }
  };

  // Modal content with form
  const editModalContent = (product?: Tproduct) => (
    <ECform
      defaultValues={{
        name: product?.name || "",
        description: product?.description || "",
        price: product?.price || "",
        brand: product?.brand || "",
        category: product?.category || "",
      }}
      onSubmit={edithandleSubmit}
    >
      <ECInput name="name" label="Product Name" size="sm" />
      <ECInput name="price" label="Price" size="sm" type="number" />
      <ECInput name="brand" label="Brand" size="sm" />
      <ECInput name="stock_quantity" label="stock_quantity" size="sm" />
      <ECInput name="rating" label="rating" size="sm" />
      <ECTextArea
        name="description"
        label="Description"
        placeholder="Enter your description"
      />
      <ECInput name="category" label="Category" size="sm" />
      <input
        className="py-2"
        placeholder="Image"
        name="image"
        type="file"
        onChange={handleImageChange}
      />
      <Button type="submit">Save Changes</Button>
    </ECform>
  );

  const createProductSubmit = async (data: Tproduct) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    if (imageFile) {
      formData.append("image", imageFile);
    }
    await createProduct(formData);
  };

  const CreateModalContent = (product?: Tproduct) => (
    <ECform
      defaultValues={{
        name: product?.name || "",
        description: product?.description || "",
        price: product?.price || "",
        brand: product?.brand || "",
        category: product?.category || "",
      }}
      onSubmit={createProductSubmit}
    >
      <ECInput name="name" label="Product Name" size="sm" />
      <ECInput name="price" label="Price" size="sm" type="number" />
      <ECInput name="brand" label="Brand" size="sm" />
      <ECInput name="stock_quantity" label="stock_quantity" size="sm" />
      <ECInput name="rating" label="rating" size="sm" />
      <ECTextArea name="description" placeholder="Enter your description" />
      <ECInput name="category" label="Category" size="sm" />
      <input
        className="py-2"
        placeholder="Image"
        name="image"
        type="file"
        onChange={handleImageChange}
      />
      <Button type="submit">Save Changes</Button>
    </ECform>
  );

  // Map the product data from the query
  const products: Tproduct[] =
    data?.data?.result?.map((product: Tproduct) => ({
      _id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      brand: product.brand,
      category: product.category,
      image: product.image,
    })) || [];

  // Render cells based on column type
  const renderCell = useCallback(
    (
      product: Tproduct,
      columnKey: keyof Tproduct | "actions"
    ): React.ReactNode => {
      const cellValue = product[columnKey as keyof Tproduct];

      switch (columnKey) {
        case "image":
          return (
            <div className="flex justify-center">
              <img
                alt=""
                src={product.image}
                alt={`${product.name}`}
                className="w-12 h-12 object-cover rounded"
              />
            </div>
          );
        case "name":
          return <p className="text-sm font-semibold">{product.name}</p>;
        case "description":
          return <p className="text-sm">{product.description}</p>;
        case "price":
          return <p className="text-sm">${product.price.toFixed(2)}</p>;
        case "brand":
          return <p className="text-sm">{product.brand}</p>;
        case "category":
          return <p className="text-sm">{product.category}</p>;
        case "actions":
          return (
            <div className="flex items-center gap-2">
              <Tooltip content="Details">
                <span className="text-lg cursor-pointer">
                  <EyeIcon />
                </span>
              </Tooltip>
              <Tooltip content="Edit product">
                <ReusableModal
                  title="Edit Product"
                  content={editModalContent(product)}
                  placement="top"
                  triggerText={<EditIcon />}
                />
              </Tooltip>
              <Tooltip color="danger" content="Delete product">
                <span className="text-lg text-danger cursor-pointer">
                  <DeleteIcon />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return <p>{cellValue}</p>;
      }
    },
    []
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold mb-4">Product Management</h1>
        <ReusableModal
          title="Create Product"
          content={CreateModalContent()}
          placement="top"
          triggerText={<span className="p-3">Create</span>}
        />
      </div>

      <Table aria-label="Product Management Table">
        <TableHeader>
          {columns.map((column) => (
            <TableColumn key={column.uid} align="center">
              {column.name}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody items={products} itemKey="_id">
          {(item) => (
            <TableRow key={item._id}>
              {columns.map((column) => (
                <TableCell key={column.uid} className="px-4 py-2 text-center">
                  {renderCell(item, column.uid as keyof Tproduct | "actions")}
                </TableCell>
              ))}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductManagementPage;
