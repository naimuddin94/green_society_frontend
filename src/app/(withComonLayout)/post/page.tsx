import axiosInstance from "@/src/lib/axiosInstance";
import { IPost } from "@/src/types";
import PostCard from "./_components/PostCard";

const PostPage = async () => {
  const { data } = await axiosInstance.get("/posts");
  console.log(data);
  return (
    <div className="container px-5">
      {data.data.result.map((post: IPost) => (
        <PostCard post={post} />
      ))}
    </div>
  );
};

export default PostPage;
