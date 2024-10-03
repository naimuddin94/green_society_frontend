"use client";

import { Button } from "@nextui-org/button";
import { FieldValues } from "react-hook-form";

import GSForm from "@/src/components/form/GSForm";
import GSInput from "@/src/components/form/GSInput";
import Loading from "@/src/components/ui/Loading";
import { useUserSignup } from "@/src/hooks/auth.hook";

const SigninForm = () => {
  
  const { mutate: signinFn, isPending } = useUserSignup();
  const handleLogin = async (data: FieldValues) => {
    signinFn(data);
  };

  return (
    <>
      {isPending && <Loading />}
      <GSForm
        className="flex flex-col gap-4"
        defaultValues={{ email: "admin@gmail.com", password: "password123" }}
        onSubmit={handleLogin}
      >
        <GSInput required label="Email" name="email" />
        <GSInput required label="Password" name="password" />
        <Button color="success" type="submit">
          Sign In
        </Button>
      </GSForm>
    </>
  );
};

export default SigninForm;
