"use client";

import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { motion } from "framer-motion";
import html2pdf from "html2pdf.js";
import {
  FileText,
  ListCollapse,
  MessageSquareText,
  Share2,
  ThumbsDown,
  ThumbsUp,
  Trash2,
} from "lucide-react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";

import { IPost } from "@/src/types";
import {
  useAddComment,
  useDeleteComment,
  usePostReaction,
} from "@/src/hooks/post.hook";
import { useUser } from "@/src/context/user.provider";
import ImageGallery from "@/src/components/ui/ImageGallery";
import DeleteModal from "@/src/components/ui/DeleteModal";

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
  const contentRef = useRef(null);

  // Generate PDF file
  const handleGeneratePDF = async () => {
    const contentEl = contentRef.current;

    if (contentEl) {
      const options = {
        margin: 0.2,
        filename: `${post.author.name + "'s_post"}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };

      html2pdf().from(contentEl).set(options).save();
    }
  };

  // Copy post link to clipboard
  const handleShare = () => {
    const postUrl = `${window.location.origin}/post/${post._id}`;

    navigator.clipboard.writeText(postUrl);
    toast.success("Post link copied successfully!");
  };

  // Handle post reaction
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

  // Handle add comment
  const handleAddComment = () => {
    if (!user) {
      return router.push("/signin?redirect=post");
    }
    if (newComment.trim()) {
      addComment({ postId: post._id, content: newComment });
      setNewComment("");
    }
  };

  // Handle delete comment
  const handleCommentDelete = (id: string) => {
    deleteComment({ commentId: id, postId: post._id });
  };

  return (
    <Card ref={contentRef} className="min-w-lg my-5 mx-auto p-5">
      <CardHeader className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <Avatar
            alt={post.author.name}
            className="mr-3"
            src={post.author?.image}
          />
          <div>
            <strong>{post.author.name}</strong>
            <p className="opacity-60">
              {moment(post.createdAt).format("L LT")}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button isIconOnly onClick={handleGeneratePDF}>
            <FileText className="hover:text-lime-500" />
          </Button>
          {post.author._id === user?._id && <DeleteModal postId={post._id} />}
        </div>
      </CardHeader>

      <CardBody>
        {/* <h2 className="text-lg font-semibold mb-4">{post.title}</h2> */}
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
        <div>
          <ImageGallery images={post.images} />
        </div>
      </CardBody>
      <div className="flex flex-col justify-start text-start px-3">
        <div className="sm:flex justify-between space-y-2">
          <div className="flex gap-2">
            <Button
              className={
                likes.find((item) => item._id === user?._id) && "bg-lime-100/10"
              }
              endContent={
                <p className="dark:text-lime-500 text-base">{likes.length}</p>
              }
              startContent={<ThumbsUp size={18} />}
              onClick={() => handleReaction("like")}
            >
              Like
            </Button>
            <Button
              className={
                dislikes.find((item) => item._id === user?._id) &&
                "bg-lime-100/5"
              }
              endContent={
                <p className="dark:text-lime-500 text-base">
                  {dislikes.length}
                </p>
              }
              startContent={<ThumbsDown size={18} />}
              onClick={() => handleReaction("dislike")}
            >
              Dislike
            </Button>
            <Button
              endContent={
                <p className="dark:text-lime-500 text-base">
                  {post.comments.length}
                </p>
              }
              startContent={<MessageSquareText size={18} />}
              onClick={() => setShowComments(!showComments)}
            >
              Comment
            </Button>
          </div>
          <div className="flex gap-2">
            <Button startContent={<Share2 size={18} />} onClick={handleShare}>
              Share
            </Button>
            <Button
              startContent={<ListCollapse size={18} />}
              onClick={() => router.push(`/post/${post._id}`)}
            >
              Details
            </Button>
          </div>
        </div>

        {/* Comment Section with Smooth Transition */}
        <motion.div
          animate={{
            height: showComments ? "auto" : 0,
            opacity: showComments ? 1 : 0,
          }}
          className="overflow-hidden"
          initial={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Input
            fullWidth
            isClearable
            className="mt-3 w-full"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddComment()}
          />
          {showComments && (
            <div className="mt-3">
              {post.comments.map((comment) => (
                <div
                  key={comment._id}
                  className="flex items-start gap-3 mb-3 p-3 bg-zinc-800/10 rounded-lg w-full"
                >
                  <Avatar
                    alt={comment.author.name}
                    className="min-w-8 min-h-8 rounded-full"
                    size="sm"
                    src={comment.author?.image}
                  />
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <strong>{comment.author.name}</strong>
                      {user && comment.author._id === user._id && (
                        <Trash2
                          className="cursor-pointer hover:text-red-500"
                          size={16}
                          onClick={() => handleCommentDelete(comment._id)}
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
