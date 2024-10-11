import { redirect } from "next/navigation";

import PostCard from "../_components/PostCard";

import { envConfig } from "@/src/config/envConfig";
import { getCurrentUser } from "@/src/services/AuthService";
import { IPost } from "@/src/types";

const MyPostPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/signin?redirect=dashboard/my-post");
  }

  const res = await fetch(`${envConfig.api_host}/posts?author=${user?._id}`, {
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
      <div>
        {data.data.result.map((post: IPost) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default MyPostPage;
