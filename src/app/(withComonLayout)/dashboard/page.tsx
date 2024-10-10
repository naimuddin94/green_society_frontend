import { envConfig } from "@/src/config/envConfig";
import { IPost } from "@/src/types";
import AddPost from "./_components/AddPost";
import PostCard from "./_components/PostCard";

const PostPage = async () => {

  const res = await fetch(`${envConfig.api_host}/posts`, {
    next: {
      tags: ["posts"],
    },
  });

  if (!res.ok) {
    return <div>Failed to load posts</div>;
  }

  const data = await res.json();

  return (
    <div className="container px-5">
      <AddPost />
      <div>
        {data.data.result.map((post: IPost) => (
          <PostCard post={post} key={post._id} />
        ))}
      </div>
    </div>
  );
};

export default PostPage;
