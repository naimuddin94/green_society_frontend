"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FieldValues } from "react-hook-form";

import GSForm from "@/src/components/form/GSForm";
import GSInput from "@/src/components/form/GSInput";
import Loading from "@/src/components/ui/Loading";
import { useUser } from "@/src/context/user.provider";
import { useUserSignin } from "@/src/hooks/auth.hook";
import signinValidationSchema from "@/src/schemas/signin.schema";

const SigninForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setIsLoading: userLoading } = useUser();

  const redirect = searchParams.get("redirect");

  const { mutate: signinFn, isPending, isSuccess } = useUserSignin();
  const handleLogin = async (data: FieldValues) => {
    signinFn(data);
    userLoading(true);
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    }
  }, [isPending, isSuccess]);

  return (
    <>
      {isPending && <Loading />}
      <GSForm
        className="flex flex-col gap-4"
        resolver={zodResolver(signinValidationSchema)}
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
