/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Post from "../../../../shared/components/post/Post";
import { Interact, Article, Comment } from '../../../../interface/interface';

const DetailArticles = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Lấy dữ liệu bài viết từ state được truyền qua navigate
  const article = location.state?.article as Article;

  const [posts, setPosts] = useState<Article[]>([]);

  useEffect(() => {
    if (article) {
      setPosts([article]); // Thêm bài viết vào mảng posts
    }
  }, [article]);

  // Xử lý thêm comment mới
  const handleAddComment = (postId: string, newComment: Comment) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId
          ? {
              ...post,
              interact: {
                ...post.interact,
                comment: [...post.interact.comment, newComment], // Thêm comment vào mảng comment
              },
            }
          : post
      )
    );
  };

  // Xử lý thêm reply cho comment
  const handleAddReply = (postId: string, commentId: string, newReply: Comment) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post._id === postId) {
          const updatedComments = post.interact.comment.map((comment) => {
            if (comment._iduser === commentId) {
              return {
                ...comment,
                replyComment: [...comment.replyComment, newReply], // Thêm reply vào mảng replyComment
              };
            }
            return comment;
          });
          return {
            ...post,
            interact: {
              ...post.interact,
              comment: updatedComments, // Cập nhật lại mảng comment
            },
          };
        }
        return post;
      })
    );
  };

  return (
    <Box sx={{
      backgroundColor: '#e9e9e9',
      padding: '20px'
    }}>
      <Button sx={{
        backgroundColor: '#fff', width: '100%', borderRadius: 3,
        marginBottom: '20px'
      }} onClick={() => navigate(-1)}>
        Quay lại
      </Button>
      {posts.map((post, index) => (
        <Post key={index} post={post} onAddComment={handleAddComment} onAddReply={handleAddReply} />
      ))}
    </Box>
  );
};

export default DetailArticles;
