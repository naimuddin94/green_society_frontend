import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { addPost } from "../services/Post.service";

export const useAddPost = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["AddPost"],
    mutationFn: async (userData) => await addPost(userData),
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
