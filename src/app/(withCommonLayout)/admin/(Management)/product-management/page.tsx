/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable padding-line-between-statements */
/* eslint-disable react/jsx-sort-props */
"use client";

import React, { useCallback, useState } from "react";
import Swal from "sweetalert2";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { Button, Tooltip, Spinner } from "@nextui-org/react";
import { toast } from "react-toastify";

import { DeleteIcon, EditIcon, EyeIcon } from "@/src/components/icons";
import {
  useAllProductFromDbQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} from "@/src/redux/api/product/productApi";
import { Tproduct } from "@/src/types";
import ReusableModal from "@/src/components/ReusableModal";
import ECform from "@/src/components/form/ECform";
import ECInput from "@/src/components/form/ECInput";
import ECTextArea from "@/src/components/form/ECTextArea";

const columns = [
  { name: "Image", uid: "image" },
  { name: "Name", uid: "name" },
  { name: "Description", uid: "description" },
  { name: "Price", uid: "price" },
  { name: "Brand", uid: "brand" },
  { name: "Category", uid: "category" },
  { name: "Stock Quantity", uid: "stock_quantity" },
  { name: "Actions", uid: "actions" },
];

const ProductManagementPage: React.FC = () => {
  const { data, isLoading, error, refetch } =
    useAllProductFromDbQuery(undefined);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [createProduct, { isLoading: addLoading }] = useCreateProductMutation();
  const [deleteProduct, { isLoading: deleteLoading }] =
    useDeleteProductMutation();
  const [updateProduct, { isLoading: updateLoading }] =
    useUpdateProductMutation();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const createProductSubmit = async (data: Tproduct) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    if (imageFile) {
      formData.append("image", imageFile);
    }
    try {
      await createProduct(formData).unwrap();
      toast.success("Product created successfully!");
      refetch();
    } catch (err) {
      toast.error("Failed to create product.");
    }
  };

  const handleEditProductSubmit = async (data: Tproduct, productId: string) => {
    console.log(data);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    if (imageFile) {
      formData.append("image", imageFile);
    }
    try {
      await updateProduct({ id: productId, formData }).unwrap();
      toast.success("Product updated successfully!");
      refetch();
    } catch (err) {
      toast.error("Failed to update product.");
    }
  };

  const createModalContent = () => (
    <ECform
      defaultValues={{
        name: "",
        description: "",
        price: "",
        brand: "",
        category: "",
        stock_quantity: "",
        rating: "",
      }}
      onSubmit={createProductSubmit}
    >
      <ECInput name="name" label="Product Name" size="sm" />
      <ECInput name="price" label="Price" size="sm" type="number" />
      <ECInput name="brand" label="Brand" size="sm" />
      <ECInput name="stock_quantity" label="Stock Quantity" size="sm" />
      <ECInput name="rating" label="Rating" size="sm" />
      <ECTextArea name="description" placeholder="Enter your description" />
      <ECInput name="category" label="Category" size="sm" />
      <input
        className="py-2"
        placeholder="Image"
        name="image"
        type="file"
        onChange={handleImageChange}
      />
      <Button type="submit" isLoading={addLoading}>
        {addLoading ? <Spinner /> : "Save Changes"}
      </Button>
    </ECform>
  );

  const editModalContent = (product: Tproduct) => (
    <ECform
      defaultValues={{
        name: product.name,
        description: product.description,
        price: product.price,
        brand: product.brand,
        category: product.category,
        stock_quantity: product.stock_quantity,
        image: product.image,
        rating: product.rating,
      }}
      onSubmit={(data) => handleEditProductSubmit(data, product._id)}
    >
      <ECInput name="name" label="Product Name" size="sm" />
      <ECInput name="price" label="Price" size="sm" type="number" />
      <ECInput name="brand" label="Brand" size="sm" />
      <ECInput name="stock_quantity" label="Stock Quantity" size="sm" />
      <ECInput name="rating" label="Rating" size="sm" />
      <ECTextArea name="description" placeholder="Enter your description" />
      <ECInput name="category" label="Category" size="sm" />
      <input
        className="py-2"
        placeholder="Image"
        name="image"
        type="file"
        onChange={handleImageChange}
      />
      <Button type="submit" isLoading={updateLoading}>
        {updateLoading ? <Spinner /> : "Update Product"}
      </Button>
    </ECform>
  );

  const handleDeleteProduct = (productId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action will delete the product permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteProduct(productId).unwrap();
          toast.success("Product deleted successfully!");
          refetch();
        } catch (err) {
          toast.error("Failed to delete product.");
        }
      }
    });
  };

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
                src={product.image}
                alt={`${product.name}`}
                className="w-12 h-12 object-cover rounded"
              />
            </div>
          );
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
                <span
                  className="text-lg text-danger cursor-pointer"
                  onClick={() => handleDeleteProduct(product._id)}
                >
                  {deleteLoading ? <Spinner /> : <DeleteIcon />}
                </span>
              </Tooltip>
            </div>
          );
        default:
          return <p>{cellValue}</p>;
      }
    },
    [deleteLoading]
  );

  if (isLoading) return <Spinner />;
  if (error) return <p>Error loading data</p>;

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold mb-4">Product Management</h1>
        <ReusableModal
          title="Create Product"
          content={createModalContent()}
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
        <TableBody items={data?.data?.result || []} itemKey="_id">
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
