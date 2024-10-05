"use client";

import { IPost } from "@/src/types";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { motion } from "framer-motion";
import moment from "moment";
import { useState } from "react";

interface IPostCardProps {
  post: IPost;
}

const PostCard = ({ post }: IPostCardProps) => {
  const [likes, setLikes] = useState(post.like.length);
  const [dislikes, setDislikes] = useState(post.dislike.length);
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleDislike = () => {
    setDislikes(dislikes + 1);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments]);
      setNewComment("");
    }
  };

  return (
    <Card className="min-w-lg my-5 mx-auto p-5">
      <CardHeader>
        <Avatar
          src={post.author?.image}
          alt={post.author.name}
          style={{ marginRight: "10px" }}
        />
        <div>
          <strong>{post.author.name}</strong>
          <p>23:50 am</p>
        </div>
      </CardHeader>

      <CardBody>
        <p>{post.content}</p>
      </CardBody>

      <div className="flex flex-col justify-start text-start">
        <div className="flex gap-2">
          <Button onClick={handleLike}>👍 Like ({likes})</Button>
          <Button onClick={handleDislike}>👎 Dislike ({dislikes})</Button>
          <Button onClick={() => setShowComments(!showComments)}>
            💬 Comment ({comments.length})
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
            className="mt-3"
          />
          {showComments && (
            <div className="mt-3">
              {comments.map((comment) => (
                <div
                  key={comment._id}
                  className="flex items-start gap-3 mb-3 p-3 bg-zinc-800/10 rounded-lg"
                >
                  <Avatar
                    src={comment.author?.image}
                    alt={comment.author.name}
                    size="sm"
                  />
                  <div className="flex flex-col">
                    <strong>{comment.author.name}</strong>
                    <p className="text-sm text-gray-600">
                      {moment(comment.updatedAt).startOf("hour").fromNow()}
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
