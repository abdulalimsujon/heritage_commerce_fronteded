"use client";

import React, { useCallback, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
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
import ECSelect from "@/src/components/form/ECselect";
import { useAllCategoryQuery } from "@/src/redux/api/categoryApi";

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
  const items: Tproduct[] = data || []; // Set items to data if available, or an empty array if not

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [createProduct, { isLoading: addLoading }] = useCreateProductMutation();
  const [deleteProduct, { isLoading: deleteLoading }] =
    useDeleteProductMutation();
  const [updateProduct, { isLoading: updateLoading }] =
    useUpdateProductMutation();
  const { data: categoryData } = useAllCategoryQuery(undefined);

  const categorySelect = categoryData?.data?.map(
    (e: { [x: string]: any; key: string; label: string }) => ({
      key: e._id,
      label: e.name,
    })
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImageFile(file);
  };

  const createProductSubmit = async (data: Tproduct) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) =>
      formData.append(key, value as string)
    );
    if (imageFile) formData.append("image", imageFile);

    try {
      await createProduct(formData).unwrap();
      setImageFile(null);
      toast.success("Product created successfully!");
      refetch();
    } catch (err) {
      toast.error("Failed to create product.");
    }
  };

  const handleEditProductSubmit = async (data: Tproduct, productId: string) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) =>
      formData.append(key, value as string)
    );
    if (imageFile) formData.append("image", imageFile);

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
      <ECInput label="Product Name" name="name" size="sm" />
      <ECInput label="Price" name="price" size="sm" type="number" />
      <ECInput label="Brand" name="brand" size="sm" />
      <ECInput label="Stock Quantity" name="stock_quantity" size="sm" />
      <ECInput label="Rating" name="rating" size="sm" />
      <ECTextArea name="description" placeholder="Enter your description" />
      <ECSelect label="Category" name="category" options={categorySelect} />
      <input
        className="py-2 w-full border border-gray-200 rounded-md my-2"
        name="image"
        type="file"
        onChange={handleImageChange}
      />
      <Button className="w-full mb-2" isLoading={addLoading} type="submit">
        {addLoading ? <Spinner /> : "Create"}
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
        stock_quantity: product.stock_quantity,
        rating: product.rating,
      }}
      onSubmit={(data) => handleEditProductSubmit(data, product._id)}
    >
      <ECInput label="Product Name" name="name" size="sm" />
      <ECInput label="Price" name="price" size="sm" type="number" />
      <ECInput label="Brand" name="brand" size="sm" />
      <ECInput label="Stock Quantity" name="stock_quantity" size="sm" />
      <ECInput label="Rating" name="rating" size="sm" />
      <ECTextArea name="description" placeholder="Enter your description" />
      <input
        className="py-2 w-full rounded-sm border border-gray-300"
        name="image"
        type="file"
        onChange={handleImageChange}
      />
      <Button className="w-full mb-2" isLoading={updateLoading} type="submit">
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
      switch (columnKey) {
        case "image":
          return (
            <div className="flex justify-center">
              <img
                alt={product.name}
                className="w-12 h-12 object-cover rounded"
                src={product.image}
              />
            </div>
          );
        case "category":
          return product.category && typeof product.category === "object"
            ? product.category[0].name
            : "N/A";
        case "brand":
          return <p>{product.name || "N/A"}</p>;
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
                  content={editModalContent(product)}
                  placement="top"
                  title="Edit Product"
                  triggerText={<EditIcon />}
                />
              </Tooltip>
              <Tooltip color="danger" content="Delete product">
                <span
                  className="text-lg text-danger cursor-pointer"
                  role="button"
                  tabIndex={0}
                  onClick={() => handleDeleteProduct(product._id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleDeleteProduct(product._id);
                    }
                  }}
                >
                  {deleteLoading ? <Spinner /> : <DeleteIcon />}
                </span>
              </Tooltip>
            </div>
          );
        default:
          return <p>{product[columnKey as keyof Tproduct] as string}</p>;
      }
    },
    [deleteLoading, editModalContent]
  );

  return (
    <>
      <div className="w-full flex justify-end">
        <ReusableModal
          buttonClass="flex items-center gap-2"
          content={createModalContent()}
          title="Create Product"
          triggerText={
            <Button isIconOnly radius="full" variant="flat">
              <FaPlusCircle size="1.5em" />
            </Button>
          }
        />
      </div>

      <div className="my-4">
        <Table
          aria-label="Product Management Table"
          selectionMode="multiple"
          isStriped
          className="overflow-x-auto"
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.uid}>{column.name}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={items}>
            {(item) => (
              <TableRow key={item._id}>
                {(columnKey) => (
                  <TableCell>
                    {renderCell(item, columnKey as keyof Tproduct | "actions")}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default ProductManagementPage;
