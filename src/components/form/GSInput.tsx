"use client";

import { Input } from "@nextui-org/input";
import { useFormContext } from "react-hook-form";

import { IInput } from "@/src/types";

interface IProps extends IInput {}

export default function GSInput({
  variant = "bordered",
  size = "md",
  required = false,
  type = "text",
  label,
  name,
  placeholder,
  endContent,
}: IProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Input
      {...register(name)}
      errorMessage={errors[name] ? (errors[name].message as string) : ""}
      isInvalid={!!errors[name]}
      label={label}
      placeholder={placeholder}
      isRequired={required}
      size={size}
      type={type}
      variant={variant}
      endContent={endContent}
    />
  );
}
