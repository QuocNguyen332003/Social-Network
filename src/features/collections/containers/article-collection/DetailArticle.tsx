/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button } from "@mui/material";
import { useState } from "react";
import Post from "../../../../shared/components/post/Post";
import { useNavigate } from "react-router-dom";
import { Interact, Article, Comment } from '../../../../interface/interface';

const DetailArticle = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Article[]>([
    {
      _id: '1',
      idHandler: 'Panda Media',
      handleDate: null,
      groupID: null,
      content:
        "[Historical Fact] The West first learned of the giant panda on 11 March 1869, when the French missionary Armand David received a skin from a hunter. In 1936, Ruth Harkness became the first Westerner to bring back a live giant panda.",
      scope: 'Public',
      listPhoto: [],
      interact: {
        _id: '1-interact',
        emoticons: [],
        comment: [
          {
            _iduser: 'JohnDoe',
            content: 'Wow, that’s interesting!',
            img: [],
            replyComment: [],
            emoticons: [],
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            _iduser: 'JaneDoe',
            content: 'I never knew that!',
            img: [],
            replyComment: [
              {
                _iduser: 'PandaLover',
                content: 'Yes, it’s a fascinating history!',
                img: [],
                replyComment: [],
                emoticons: [],
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            ],
            emoticons: [],
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      _destroy: new Date(),
    },
  ]);

  // Xử lý thêm comment mới
  const handleAddComment = (postId: string, newComment: Comment) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId
          ? {
              ...post,
              interact: {
                ...post.interact,
                comment: [...post.interact.comment, newComment], // Thêm comment mới
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
                replyComment: [...comment.replyComment, newReply], // Thêm reply vào replyComment
              };
            }
            return comment;
          });
          return {
            ...post,
            interact: { ...post.interact, comment: updatedComments }, // Cập nhật comments
          };
        }
        return post;
      })
    );
  };

  return (
    <Box
      sx={{
        backgroundColor: '#e9e9e9',
        padding: '20px',
      }}
    >
      <Button
        sx={{
          backgroundColor: '#fff',
          width: '100%',
          borderRadius: 3,
          marginBottom: '20px',
        }}
        onClick={() => {
          navigate(-1);
        }}
      >
        Quay lại
      </Button>
      {posts.map((post, index) => (
        <Post key={index} post={post} onAddComment={handleAddComment} onAddReply={handleAddReply} />
      ))}
    </Box>
  );
};

export default DetailArticle;
