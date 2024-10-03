import { ReactNode, SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface IInput {
  variant?: "flat" | "bordered" | "faded" | "underlined";
  size?: "sm" | "md" | "lg";
  required?: boolean;
  type?: string;
  label: string;
  name: string;
  disabled?: boolean;
  placeholder?: string;
  endContent?: ReactNode;
}

export interface IResponse<T> {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;
}

export interface ISigninData extends IUser {
  accessToken: string;
  refreshToken: string;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  address?: string;
  phone?: string;
  image?: string;
  followers?: any[];
  following?: any[];
  block?: string[];
  blockedBy?: any[];
  verified?: boolean;
  premium?: boolean;
}
