"use client";

import GSFileInput from "@/src/components/form/GSFileInput";
import GSForm from "@/src/components/form/GSForm";
import GSInput from "@/src/components/form/GSInput";
import GSSelect from "@/src/components/form/GSSelect";
import GSTextarea from "@/src/components/form/GSTextArea";
import GSModal from "@/src/components/ui/GSModal";
import { postCategory } from "@/src/constant/intex";
import { Button } from "@nextui-org/button";
import { DiamondPlus } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { FieldValues } from "react-hook-form";

const AddPost = () => {
  const [image, setImage] = useState<File | null>(null);

  const handleAddPost = (data: FieldValues) => {
      console.log(data);
      console.log(image);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    setImage(file);
  };
  return (
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
            value={image && image.name}
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
  );
};

export default AddPost;
