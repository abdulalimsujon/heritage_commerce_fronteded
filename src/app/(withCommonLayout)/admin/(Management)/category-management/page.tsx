/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
"use client";

import {
  useAllCategoryQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useEditNameCategoryMutation,
} from "@/src/redux/api/categoryApi";
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

const CategoryPage = () => {
  const { data, refetch } = useAllCategoryQuery(undefined);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createCategory] = useCreateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [editNameCategory] = useEditNameCategoryMutation();
  const [newCategory, setNewCategory] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [editCategory, setEditCategory] = useState(null); // Track the category being edited
  const [updatedCategoryName, setUpdatedCategoryName] = useState(""); // New name for the edited category

  const productData = data?.data?.map((d) => ({
    name: d.name,
    products: d.products || [],
  }));

  const handleDelete = async () => {
    await deleteCategory({ name: categoryToDelete });
    toast.success("Category Successfully Deleted");
    setShowDeleteModal(false);
    refetch();
  };

  const openDeleteModal = (categoryName) => {
    setCategoryToDelete(categoryName);
    setShowDeleteModal(true);
  };

  const handleCreate = async () => {
    await createCategory({ name: newCategory });
    toast.success("Category Successfully Created");
    setNewCategory("");
    setShowCreateForm(false);
    refetch();
  };

  const openEditForm = (categoryName) => {
    setEditCategory(categoryName); // Set the category to be edited
    setUpdatedCategoryName(categoryName); // Set the initial input value
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
            type="text"
            placeholder="Enter category name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="p-2 border border-gray-300 rounded-md mr-2 focus:outline-none focus:border-green-500"
          />
          <button
            onClick={handleCreate}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
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
          {productData?.map((category) => (
            <TableRow key={category.name} className="border-t border-gray-300">
              <TableCell className="text-center font-semibold text-gray-700 py-4">
                {category.name}
              </TableCell>
              <TableCell className="text-center text-gray-600 flex flex-wrap justify-center">
                {category.products.length > 0 ? (
                  category.products.map((product, index) => (
                    <span
                      key={index}
                      className="p-2 m-1 border border-gray-300 rounded"
                    >
                      {product}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500">No products available</span>
                )}
              </TableCell>
              <TableCell className="text-center py-4">
                <div className="flex justify-center">
                  <FaEdit
                    onClick={() => openEditForm(category.name)}
                    className="cursor-pointer text-blue-600 text-lg mr-4"
                    title="Edit Category"
                  />
                  <FaTrashAlt
                    onClick={() => openDeleteModal(category.name)}
                    className="cursor-pointer text-red-600 text-lg"
                    title="Delete Category"
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
              type="text"
              value={updatedCategoryName}
              onChange={(e) => setUpdatedCategoryName(e.target.value)}
              className="p-2 border border-gray-300 rounded-md w-full mb-4 focus:outline-none focus:border-green-500"
            />
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setEditCategory(null)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p>
              Are you sure you want to delete the category: {categoryToDelete}?
            </p>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
