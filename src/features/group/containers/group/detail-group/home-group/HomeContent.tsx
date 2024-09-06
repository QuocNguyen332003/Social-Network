import React, { useState } from 'react';
import { Box } from '@mui/material';
import PostForm from '../../../../../../shared/components/postForm/PostForm';
import Post from '../../../../../../shared/components/post/Post';

interface CommentProps {
  _iduser: string;
  content: string;
  img?: string[];
  replyComment?: CommentProps[];
  emoticons?: { typeEmoticons: string, _iduser: string }[];
  timestamp: Date;
}

interface PostData {
  _id: string;
  idAuthor: string;
  startDate: Date;
  groupID?: string;
  changeDate?: Date;
  content: string;
  img?: string[];
  scope: string;
  emoticons?: { typeEmoticons: string, _iduser: string }[];
  comments?: CommentProps[];
}

const DetailContent = () => {
  const [posts, setPosts] = useState<PostData[]>([
    {
      _id: '1',
      idAuthor: 'Panda Media',
      startDate: new Date(),
      content:
        "[Historical Fact] The West first learned of the giant panda on 11 March 1869, when the French missionary Armand David received a skin from a hunter. In 1936, Ruth Harkness became the first Westerner to bring back a live giant panda.",
      scope: 'Public',
      comments: [
        {
          _iduser: 'JohnDoe',
          content: 'Wow, that’s interesting!',
          timestamp: new Date(),
          replyComment: [],
        },
        {
          _iduser: 'JaneDoe',
          content: 'I never knew that!',
          timestamp: new Date(),
          replyComment: [
            {
              _iduser: 'PandaLover',
              content: 'Yes, it’s a fascinating history!',
              timestamp: new Date(),
              replyComment: [],
            },
          ],
        },
      ],
    },
  ]);

  const handlePostSubmit = (newPost: string, images: File[]) => {
    const newPostEntry: PostData = {
      _id: (posts.length + 1).toString(),
      idAuthor: 'Panda Media', // Replace with actual author ID
      startDate: new Date(),
      content: newPost,
      img: images.length > 0 ? images.map(image => URL.createObjectURL(image)) : undefined,
      scope: 'Public',
      emoticons: [],
      comments: [],
    };
    setPosts([newPostEntry, ...posts]); // Thêm bài đăng mới vào danh sách
  };

  const handleAddComment = (postId: string, newComment: CommentProps) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId
          ? { ...post, comments: [...post.comments!, newComment] }
          : post
      )
    );
  };

  const handleAddReply = (postId: string, commentId: string, newReply: CommentProps) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post._id === postId) {
          const updatedComments = post.comments!.map((comment) => {
            if (comment._iduser === commentId) {
              return { ...comment, replyComment: [...comment.replyComment!, newReply] };
            }
            return comment;
          });
          return { ...post, comments: updatedComments };
        }
        return post;
      })
    );
  };

  return (
    <Box sx={{ padding: 2, backgroundColor: '#e9e9e9', height: '60vh',
      overflowY: 'auto', 
      scrollbarWidth: 'none',
      '&::-webkit-scrollbar': {
        display: 'none',
      } }}>
      <PostForm onSubmit={handlePostSubmit} />
      {posts.map((post, index) => (
        <Post key={index} post={post} onAddComment={handleAddComment} onAddReply={handleAddReply} />
      ))}
    </Box>
  );
};

export default DetailContent;
