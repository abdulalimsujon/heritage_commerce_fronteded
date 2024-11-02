"use client";

import { Button } from "@nextui-org/button";
import React, { useState } from "react";

import ECform from "@/src/components/form/ECform";
import ECInput from "@/src/components/form/ECInput";
import { useUserRegistrationMutation } from "@/src/redux/api/user/userApi";

const Registration = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [userRegistration] = useUserRegistrationMutation();
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async (data) => {
    console.log(data);

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (imageFile) {
      formData.append("image", imageFile);
    }

    await userRegistration(formData);
  };

  return (
    <div className="">
      <div className=" flex flex-col justify-center items-center mx-auto w-[1400px] h-[600px]">
        <h1 className="text-center text-xl ">Register</h1>
        <ECform
          className="p-10 w-full max-w-lg  rounded-lg"
          onSubmit={handleSubmit}
        >
          <ECInput required label="User Name" name="name" size="lg" />
          <ECInput label="Email" name="email" size="lg" type="email" />
          <ECInput label="User Mobile" name="mobile" size="lg" />
          <ECInput
            required
            label="Password"
            name="password"
            size="lg"
            type="password"
          />

          <div className="border rounded-lg">
            <input
              className="py-2"
              name="image"
              placeholder="Image"
              type="file"
              onChange={handleImageChange}
            />
          </div>

          <Button className="w-full mt-6" type="submit">
            Register
          </Button>
        </ECform>
      </div>
    </div>
  );
};

export default Registration;
