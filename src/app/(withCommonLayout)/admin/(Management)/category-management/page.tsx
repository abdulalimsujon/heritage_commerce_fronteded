/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/no-static-element-interactions */
"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { FaEdit, FaTrashAlt, FaPlusCircle } from "react-icons/fa";
import React, { useState } from "react";
import { toast } from "react-toastify";

import {
  useAllCategoryQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useEditNameCategoryMutation,
} from "@/src/redux/api/categoryApi";
import { Tproduct } from "@/src/types";

const CategoryPage = () => {
  const { data, refetch } = useAllCategoryQuery(undefined);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createCategory] = useCreateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [editNameCategory] = useEditNameCategoryMutation();
  const [newCategory, setNewCategory] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null); // Changed to handle string | null
  const [editCategory, setEditCategory] = useState<string | null>(null); // Changed to handle string | null
  const [updatedCategoryName, setUpdatedCategoryName] = useState(""); // New name for the edited category

  const productData = data?.data?.map((d: { name: any; products: any }) => ({
    name: d.name,
    products: d.products || [],
  }));

  const handleDelete = async () => {
    if (categoryToDelete) {
      await deleteCategory({ name: categoryToDelete });
      toast.success("Category Successfully Deleted");
      setShowDeleteModal(false);
      refetch();
    }
  };

  const openDeleteModal = (categoryName: string) => {
    setCategoryToDelete(categoryName); // Set category name to delete
    setShowDeleteModal(true);
  };

  const handleCreate = async () => {
    await createCategory({ name: newCategory });
    toast.success("Category Successfully Created");
    setNewCategory("");
    setShowCreateForm(false);
    refetch();
  };

  const openEditForm = (categoryName: string) => {
    setEditCategory(categoryName); // Set category name to edit
    setUpdatedCategoryName(categoryName); // Set name in the input for update
  };

  const handleUpdate = async () => {
    if (editCategory && updatedCategoryName) {
      await editNameCategory({
        oldName: editCategory,
        newName: updatedCategoryName,
      });
      toast.success("Category Successfully Updated");
      setEditCategory(null);
      setUpdatedCategoryName(""); // Reset the input after updating
      refetch();
    } else {
      toast.error("Please provide a new category name");
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold mb-4">Category Page</h1>
        <div
          className="flex items-center mb-6 text-green-500 cursor-pointer text-lg"
          onClick={() => setShowCreateForm(!showCreateForm)}
        >
          <FaPlusCircle className="text-2xl mr-2" />
          <span>Create New Category</span>
        </div>
      </div>

      {showCreateForm && (
        <div className="mb-4 p-4 bg-gray-100 rounded-md shadow-md">
          <input
            className="p-2 border border-gray-300 rounded-md mr-2 focus:outline-none focus:border-green-500"
            placeholder="Enter category name"
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            onClick={handleCreate}
          >
            Add Category
          </button>
        </div>
      )}

      <Table
        aria-label="Category and Products Table"
        className="border border-gray-300 min-w-full"
      >
        <TableHeader>
          <TableColumn className="bg-green-500 text-white font-bold text-center">
            CATEGORY
          </TableColumn>
          <TableColumn className="bg-green-500 text-white font-bold text-center">
            PRODUCTS
          </TableColumn>
          <TableColumn className="bg-green-500 text-white font-bold text-center">
            ACTION
          </TableColumn>
        </TableHeader>
        <TableBody>
          {productData?.map((category: Tproduct) => (
            <TableRow key={category.name} className="border-t border-gray-300">
              <TableCell className="text-center font-semibold text-gray-700 py-4">
                {category.name}
              </TableCell>
              <TableCell className="text-center text-gray-600 flex flex-wrap justify-center">
                {category.products.length > 0 ? (
                  category.products.map(
                    (
                      product:
                        | string
                        | number
                        | bigint
                        | boolean
                        | React.ReactElement<
                            any,
                            string | React.JSXElementConstructor<any>
                          >
                        | Iterable<React.ReactNode>
                        | React.ReactPortal
                        | Promise<React.AwaitedReactNode>
                        | null
                        | undefined,
                      index: React.Key | null | undefined
                    ) => (
                      <span
                        key={index}
                        className="p-2 m-1 border border-gray-300 rounded"
                      >
                        {product}
                      </span>
                    )
                  )
                ) : (
                  <span className="text-gray-500">No products available</span>
                )}
              </TableCell>
              <TableCell className="text-center py-4">
                <div className="flex justify-center">
                  <FaEdit
                    className="cursor-pointer text-green-500 text-lg mr-4"
                    title="Edit Category"
                    onClick={() => openEditForm(category.name)}
                  />
                  <FaTrashAlt
                    className="cursor-pointer text-red-600 text-lg"
                    title="Delete Category"
                    onClick={() => openDeleteModal(category.name)}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Edit Category Modal */}
      {editCategory && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-4">Edit Category</h2>
            <input
              className="p-2 border border-gray-300 rounded-md w-full mb-4 focus:outline-none focus:border-green-500"
              type="text"
              value={updatedCategoryName}
              onChange={(e) => setUpdatedCategoryName(e.target.value)}
            />
            <div className="mt-4 flex justify-between">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                onClick={handleUpdate}
              >
                Update
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                onClick={() => setEditCategory(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Category Modal */}
      {showDeleteModal && categoryToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to delete "{categoryToDelete}"?
            </h2>
            <div className="flex justify-between">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                onClick={handleDelete}
              >
                Yes, Delete
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
