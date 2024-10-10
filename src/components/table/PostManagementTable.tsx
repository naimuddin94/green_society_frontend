"use client";

import { usePostPremium } from "@/src/hooks/post.hook";
import { IPost } from "@/src/types";
import { extractH1Content } from "@/src/utils";
import { Checkbox } from "@nextui-org/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import DeleteModal from "../ui/DeleteModal";
import Loading from "../ui/Loading";

interface PostManagementTableProps {
  posts: IPost[];
}

const PostManagementTable = ({ posts }: PostManagementTableProps) => {
  const { mutate: makePremiumFn, isPending } = usePostPremium();
  const handleDelete = (id: string) => {
    console.log("delete", id);
  };

  const handleMakePremium = (id: string) => {
    makePremiumFn(id);
  };

  return (
    <>
      {isPending && <Loading />}
      <Table aria-label="Admin Post Management Table" className="w-full">
        <TableHeader>
          <TableColumn>Author</TableColumn>
          <TableColumn>Content</TableColumn>
          <TableColumn>Category</TableColumn>
          <TableColumn>Premium</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post._id}>
              <TableCell>{post.author.name}</TableCell>
              <TableCell>
                {extractH1Content(post.content) || "No title found"}
              </TableCell>
              <TableCell>{post.category}</TableCell>
              <TableCell>
                <Checkbox
                  isSelected={post.premium}
                  onChange={() => handleMakePremium(post._id)}
                ></Checkbox>
              </TableCell>
              <TableCell className="space-x-2">
                <DeleteModal postId={post._id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default PostManagementTable;
