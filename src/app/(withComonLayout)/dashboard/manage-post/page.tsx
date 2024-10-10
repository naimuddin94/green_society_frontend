import PostManagementTable from "@/src/components/table/PostManagementTable";
import { envConfig } from "@/src/config/envConfig";
import { IPost } from "@/src/types";

const ManagePost = async () => {
  const res = await fetch(`${envConfig.api_host}/posts`, {
    next: {
      tags: ["posts"],
    },
  });

  if (!res.ok) {
    return <div>Failed to load posts</div>;
  }

  const data = await res.json();

  const posts: IPost[] = data.data.result;

  return (
    <div className="p-5">
      <h1 className="my-5 text-lg font-semibold">Post Management</h1>
      <PostManagementTable posts={posts} />
    </div>
  );
};

export default ManagePost;
