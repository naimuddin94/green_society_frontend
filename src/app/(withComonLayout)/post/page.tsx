import axiosInstance from "@/src/lib/axiosInstance";
import { IPost } from "@/src/types";
import AddPost from "./_components/AddPost";
import PostCard from "./_components/PostCard";

const PostPage = async () => {
  const { data } = await axiosInstance.get("/posts");

  return (
    <div className="container px-5">
      <AddPost />
      <div>
        {data.data.result.map((post: IPost) => (
          <PostCard post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostPage;
