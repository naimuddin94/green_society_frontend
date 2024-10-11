"use client";

import { Button } from "@nextui-org/button";
import { Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";

import GSFileInput from "@/src/components/form/GSFileInput";
import GSForm from "@/src/components/form/GSForm";
import GSInput from "@/src/components/form/GSInput";
import Loading from "@/src/components/ui/Loading";
import { useUser } from "@/src/context/user.provider";
import { useUserSignup } from "@/src/hooks/auth.hook";

const SignupForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setIsLoading: userLoading } = useUser();

  const redirect = searchParams.get("redirect");

  const { mutate: signupFn, isPending, isSuccess } = useUserSignup();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    setImage(file);
  };

  const handleLogin = async (data: FieldValues) => {
    const formData = new FormData();
    const userData = {
      ...data,
    };

    if (image) {
      userData.image = image;
    }
    for (let item in userData) {
      formData.append(item, userData[item]);
    }

    signupFn(formData);
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
      <GSForm className="flex flex-col gap-4" onSubmit={handleLogin}>
        <GSFileInput value={image && image.name} onChange={handleImageChange} />
        <GSInput required label="Name" name="name" />
        <GSInput required label="Email" name="email" />
        <GSInput
          required
          endContent={
            <button
              aria-label="toggle password visibility"
              className="focus:outline-none"
              type="button"
              onClick={() => setIsVisible(!isVisible)}
            >
              {isVisible ? (
                <EyeOff className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <Eye className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          label="Password"
          name="password"
          type={isVisible ? "text" : "password"}
        />
        <GSInput label="Phone" name="phone" />
        <GSInput label="Address" name="address" />
        <Button color="success" type="submit">
          Sign Up
        </Button>
      </GSForm>
    </>
  );
};

export default SignupForm;
