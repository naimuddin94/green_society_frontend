"use client";

import { Button } from "@nextui-org/button";
import { FieldValues } from "react-hook-form";

import GSForm from "@/src/components/form/GSForm";
import GSInput from "@/src/components/form/GSInput";
import nexiosInstance from "@/src/config/NaxioInstance";

const SignupForm = () => {
  const handleLogin = async (data: FieldValues) => {
    const res = await nexiosInstance.post("/auth/signup", data);

    console.log({ res, data });
  };

  return (
    <GSForm className="flex flex-col gap-4" onSubmit={handleLogin}>
      <GSInput required label="Name" name="name" />
      <GSInput required label="Email" name="email" />
      <GSInput required label="Password" name="password" />
      <GSInput required label="Phone" name="phone" />
      <GSInput required label="Address" name="address" />
      <Button color="success" type="submit">
        Sign Up
      </Button>
    </GSForm>
  );
};

export default SignupForm;
