"use client";

import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/modal"; // Import useDisclosure
import { DiamondPlus } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { FieldValues } from "react-hook-form";

import GSFileInput from "@/src/components/form/GSFileInput";
import GSForm from "@/src/components/form/GSForm";
import GSSelect from "@/src/components/form/GSSelect";
import QuillEditor from "@/src/components/QuillEditor";
import GSModal from "@/src/components/ui/GSModal";
import Loading from "@/src/components/ui/Loading";
import { postCategory } from "@/src/constant/intex";
import { useAddPost } from "@/src/hooks/post.hook";

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
        <Button startContent={<DiamondPlus />} variant="solid" onPress={onOpen}>
          Add Post
        </Button>
        <GSModal
          isOpen={isOpen}
          title="Add new post"
          onOpenChange={onOpenChange}
        >
          <GSForm className="space-y-4" onSubmit={handleAddPost}>
            <div className="md:flex items-center justify-center gap-2 md:space-y-[2px] space-y-3">
              <div className="flex-1">
                <GSFileInput
                  multiple
                  value={images && `${images.length} images selected`}
                  onChange={handleImageChange}
                />
              </div>
              <div className="flex-1 -mt-4">
                <GSSelect
                  label="Category"
                  name="category"
                  options={postCategory.map((item) => ({
                    key: item,
                    label: item,
                  }))}
                />
              </div>
            </div>
            <QuillEditor value={content} onChange={setContent} />

            <div className="flex justify-end">
              <Button size="lg" type="submit" onPress={onClose}>
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
