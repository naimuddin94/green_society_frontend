"use client";

import GSFileInput from "@/src/components/form/GSFileInput";
import GSForm from "@/src/components/form/GSForm";
import GSInput from "@/src/components/form/GSInput";
import GSSelect from "@/src/components/form/GSSelect";
import GSTextarea from "@/src/components/form/GSTextArea";
import GSModal from "@/src/components/ui/GSModal";
import Loading from "@/src/components/ui/Loading";
import { postCategory } from "@/src/constant/intex";
import { useAddPost } from "@/src/hooks/post.hook";
import { Button } from "@nextui-org/button";
import { DiamondPlus } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { FieldValues } from "react-hook-form";

const AddPost = () => {
  const [images, setImages] = useState<File[] | null>(null);
  const { mutate: addPostFn, isPending, isSuccess } = useAddPost();

  const handleAddPost = (data: FieldValues) => {
    const formData = new FormData();

    // Append images individually if there are any
    if (images && images.length > 0) {
      Array.from(images).forEach((file) => {
        formData.append("images", file); // Ensure correct field name 'images'
      });
    }

    // Append other form fields
    for (const key in data) {
      formData.append(key, data[key]);
    }

    // Call the add post function with formData
    addPostFn(formData);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setImages(Array.from(files));
    }
  };

  return (
    <>
      {isPending && <Loading />}
      <div className="flex justify-end sticky top-16 z-10">
        <GSModal
          buttonText="Add Post"
          title="Add new post"
          buttonVariant="solid"
          buttonIcon={<DiamondPlus />}
        >
          <GSForm onSubmit={handleAddPost} className="space-y-4">
            <GSFileInput
              onChange={handleImageChange}
              value={images && `${images.length} images selected`}
              multiple
            />
            <GSInput label="Title" name="title" />
            <GSTextarea label="Content" name="content" />
            <GSSelect
              label="Category"
              name="category"
              options={postCategory.map((item) => ({ key: item, label: item }))}
            />
            <div className="flex justify-end">
              <Button type="submit">Save</Button>
            </div>
          </GSForm>
        </GSModal>
      </div>
    </>
  );
};

export default AddPost;
