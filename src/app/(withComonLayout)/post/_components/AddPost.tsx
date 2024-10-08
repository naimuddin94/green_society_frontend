"use client";

import GSFileInput from "@/src/components/form/GSFileInput";
import GSForm from "@/src/components/form/GSForm";
import GSSelect from "@/src/components/form/GSSelect";
import QuillEditor from "@/src/components/QuillEditor";
import GSModal from "@/src/components/ui/GSModal";
import Loading from "@/src/components/ui/Loading";
import { postCategory } from "@/src/constant/intex";
import { useAddPost } from "@/src/hooks/post.hook";
import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/modal"; // Import useDisclosure
import { DiamondPlus } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { FieldValues } from "react-hook-form";

const AddPost = () => {
  const [images, setImages] = useState<File[] | null>(null);
  const [content, setContent] = useState<string>("");
  const { mutate: addPostFn, isPending } = useAddPost();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure(); // Manage modal state here

  const handleAddPost = (data: FieldValues) => {
    const formData = new FormData();

    if (images && images.length > 0) {
      Array.from(images).forEach((file) => {
        formData.append("images", file);
      });
    }

    for (const key in data) {
      formData.append(key, data[key]);
    }

    formData.append("content", content);

    addPostFn(formData, {
      onSuccess: () => {
        onOpenChange(); // Close the modal when post is successfully submitted
        setContent(""); // Reset content
        setImages(null); // Reset images
      },
    });
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
        <Button onPress={onOpen} variant="solid" startContent={<DiamondPlus />}>
          Add Post
        </Button>
        <GSModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          title="Add new post"
        >
          <GSForm onSubmit={handleAddPost} className="space-y-4">
            <GSFileInput
              onChange={handleImageChange}
              value={images && `${images.length} images selected`}
              multiple
            />
            <QuillEditor value={content} onChange={setContent} />
            <GSSelect
              label="Category"
              name="category"
              options={postCategory.map((item) => ({
                key: item,
                label: item,
              }))}
            />
            <div className="flex justify-end">
              <Button type="submit" onPress={onClose}>
                Save
              </Button>
            </div>
          </GSForm>
        </GSModal>
      </div>
    </>
  );
};

export default AddPost;
