"use client";

import React, { useState, useCallback } from "react";
import { Button, Chip, ChipProps, Tooltip } from "@nextui-org/react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";

import { DeleteIcon, EditIcon, EyeIcon } from "@/src/components/icons";
import ReusableModal from "@/src/components/ReusableModal";
import ECform from "@/src/components/form/ECform";
import ECInput from "@/src/components/form/ECInput";
import { useCreateUser } from "@/src/app/hooks/create.user.hook";
import { useGetAllUser } from "@/src/app/hooks/allUser.hook";
import { useUpdateProductMutation } from "@/src/redux/api/product/productApi";
import { useUpdateUserMutation } from "@/src/redux/api/user/userApi";

const columns = [
  { name: "Name", uid: "name", align: "center" },
  { name: "Mobile", uid: "mobile", align: "center" },
  { name: "Role", uid: "role", align: "center" },
  { name: "Status", uid: "status", align: "center" },
  { name: "Actions", uid: "actions", align: "center" },
];

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

type User = {
  _id: string;
  name: string;
  mobile: string;
  role: string;
  image: string;
  email: string;
  status?: string;
};

const UserManagementPage = () => {
  const { mutateAsync: createUser } = useCreateUser();
  const [updateUser] = useUpdateUserMutation();
  const { data } = useGetAllUser();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [defaultValues, setDefaultValues] = useState<User | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async (formDataValues: { [key: string]: any }) => {
    console.log(formDataValues);
    if (!selectedUserId) return;

    const formData = new FormData();
    Object.entries(formDataValues).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      await updateUser({ formData, id: formDataValues._id });
      console.log("User successfully updated");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleEditClick = (user: User) => {
    setSelectedUserId(user._id);
    setDefaultValues(user); // Set default values for the modal
  };

  const renderCell = useCallback(
    (user: User, columnKey: keyof User | "actions") => {
      const cellValue = user[columnKey as keyof User];

      switch (columnKey) {
        case "name":
          return (
            <div className="flex items-center space-x-2">
              <img
                alt={user.name}
                className="w-8 h-8 rounded-full"
                src={user.image}
              />
              <div className="text-center">
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
          );
        case "mobile":
          return <p className="text-sm text-center">{user.mobile}</p>;
        case "role":
          return (
            <p className="text-sm capitalize text-center font-semibold">
              {cellValue}
            </p>
          );
        case "status":
          return (
            <div className="flex justify-center">
              <Chip
                color={statusColorMap[user.status || "active"]}
                variant="flat"
              >
                {user.status}
              </Chip>
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
              <Tooltip content="Edit user">
                <span
                  className="text-lg cursor-pointer"
                  onClick={() => handleEditClick(user)} // Update here
                >
                  <ReusableModal
                    content={
                      <ECform
                        defaultValues={defaultValues || undefined}
                        onSubmit={handleSubmit}
                      >
                        <ECInput label="User Name" name="name" size="sm" />
                        <ECInput label="User Email" name="email" size="sm" />
                        <ECInput label="User Mobile" name="mobile" size="sm" />

                        <input
                          className="py-2"
                          placeholder="Image"
                          name="image"
                          type="file"
                          onChange={handleImageChange}
                        />
                        <Button type="submit ">Edit</Button>
                      </ECform>
                    }
                    placement="top"
                    title="Edit Profile"
                    triggerText={<EditIcon />}
                  />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete user">
                <span className="text-lg text-danger cursor-pointer">
                  <DeleteIcon />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return <p className="text-center">{cellValue}</p>;
      }
    },
    [handleSubmit, defaultValues]
  );

  const users =
    data?.data?.map((user: User) => ({
      _id: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      image: user.image,
      role: user.role,
      status: user.status || "Active",
    })) || [];

  return (
    <Table aria-label="User Management Table">
      <TableHeader>
        {columns.map((column) => (
          <TableColumn key={column.uid} align={column.align}>
            {column.name}
          </TableColumn>
        ))}
      </TableHeader>
      <TableBody itemKey="id" items={users}>
        {(item: User) => (
          <TableRow key={item._id}>
            {(columnKey) => (
              <TableCell className="px-4 py-2 text-center">
                {renderCell(item, columnKey as keyof User | "actions")}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default UserManagementPage;
