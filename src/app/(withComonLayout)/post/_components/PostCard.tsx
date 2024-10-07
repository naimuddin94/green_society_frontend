"use client";

import ImageGallery from "@/src/components/ui/ImageGallery";
import { useUser } from "@/src/context/user.provider";
import {
  useAddComment,
  useDeleteComment,
  usePostReaction,
} from "@/src/hooks/post.hook";
import { IPost } from "@/src/types";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface IPostCardProps {
  post: IPost;
}

const PostCard = ({ post }: IPostCardProps) => {
  const [likes, setLikes] = useState(post.like);
  const [dislikes, setDislikes] = useState(post.dislike);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);

  const { user } = useUser();
  const router = useRouter();

  const { mutate: addReaction } = usePostReaction();
  const { mutate: addComment } = useAddComment();
  const { mutate: deleteComment } = useDeleteComment();

  const handleReaction = async (reaction: "like" | "dislike") => {
    if (!user) {
      return router.push("/signin?redirect=post");
    }
    addReaction({ postId: post._id, reaction });

    if (reaction === "like") {
      if (likes.find((item) => item._id === user._id)) {
        setLikes((prev) => prev.filter((item) => item._id !== user._id));
      } else {
        setDislikes((prev) => prev.filter((item) => item._id !== user._id));
        setLikes([
          ...likes,
          { _id: user._id, name: user.name, image: user.image },
        ]);
      }
    }

    if (reaction === "dislike") {
      if (dislikes.find((item) => item._id === user._id)) {
        setDislikes((prev) => prev.filter((item) => item._id !== user._id));
      } else {
        setLikes((prev) => prev.filter((item) => item._id !== user._id));
        setDislikes([
          ...dislikes,
          { _id: user._id, name: user.name, image: user.image },
        ]);
      }
    }
  };

  const handleAddComment = () => {
    if (!user) {
      return router.push("/signin?redirect=post");
    }
    if (newComment.trim()) {
      addComment({ postId: post._id, content: newComment });
      setNewComment("");
    }
  };

  const handleCommentDelete = (id: string) => {
    deleteComment({ commentId: id, postId: post._id });
  };

  return (
    <Card className="min-w-lg my-5 mx-auto p-5">
      <CardHeader>
        <Avatar
          src={post.author?.image}
          alt={post.author.name}
          className="mr-3"
        />
        <div>
          <strong>{post.author.name}</strong>
          <p className="opacity-60">{moment(post.createdAt).format("L LT")}</p>
        </div>
      </CardHeader>

      <CardBody>
        <h2 className="text-lg font-semibold mb-4">{post.title}</h2>
        <p className="opacity-80">{post.content}</p>
        <div>
          <ImageGallery images={post.images} />
        </div>
      </CardBody>
      <div className="flex flex-col justify-start text-start">
        <div className="flex gap-2">
          <Button onClick={() => handleReaction("like")}>
            👍 Like ({likes.length})
          </Button>
          <Button onClick={() => handleReaction("dislike")}>
            👎 Dislike ({dislikes.length})
          </Button>
          <Button onClick={() => setShowComments(!showComments)}>
            💬 Comment ({post.comments.length})
          </Button>
        </div>

        {/* Comment Section with Smooth Transition */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: showComments ? "auto" : 0,
            opacity: showComments ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <Input
            isClearable
            fullWidth
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddComment()}
            className="mt-3 w-full"
          />
          {showComments && (
            <div className="mt-3">
              {post.comments.map((comment) => (
                <div
                  key={comment._id}
                  className="flex items-start gap-3 mb-3 p-3 bg-zinc-800/10 rounded-lg w-full"
                >
                  <Avatar
                    src={comment.author?.image}
                    alt={comment.author.name}
                    size="sm"
                    className="min-w-8 min-h-8 rounded-full"
                  />
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <strong>{comment.author.name}</strong>
                      {user && comment.author._id === user._id && (
                        <Trash2
                          onClick={() => handleCommentDelete(comment._id)}
                          size={16}
                          className="cursor-pointer hover:text-red-500"
                        />
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      {moment(comment.updatedAt).fromNow()}
                    </p>
                    <p>{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </Card>
  );
};

export default PostCard;
