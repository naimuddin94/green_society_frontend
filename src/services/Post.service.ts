"use server";

import { FieldValues } from "react-hook-form";
import axiosInstance from "../lib/axiosInstance";

export const addPost = async (postData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/posts", postData);
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
