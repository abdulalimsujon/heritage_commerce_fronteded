"use client";

import ECform from "@/src/components/form/ECform";
import ECInput from "@/src/components/form/ECInput";
import { useUserRegistrationMutation } from "@/src/redux/api/user/userApi";
import { Button } from "@nextui-org/button";
import React, { useState } from "react";

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
          onSubmit={handleSubmit}
          className="p-10 w-full max-w-lg  rounded-lg"
        >
          <ECInput name="name" label="User Name" size="lg" required />
          <ECInput name="email" label="Email" type="email" size="lg" />
          <ECInput label="User Mobile" name="mobile" size="lg" />
          <ECInput
            name="password"
            label="Password"
            type="password"
            size="lg"
            required
          />

          <div className="border rounded-lg">
            <input
              className="py-2"
              placeholder="Image"
              name="image"
              type="file"
              onChange={handleImageChange}
            />
          </div>

          <Button type="submit" className="w-full mt-6">
            Register
          </Button>
        </ECform>
      </div>
    </div>
  );
};

export default Registration;
