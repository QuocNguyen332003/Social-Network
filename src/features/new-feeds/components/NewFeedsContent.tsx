/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { Box } from '@mui/material';
import PostForm from '../../../shared/components/postForm/PostForm';
import Post from '../../../shared/components/post/Post';
import { Interact, Article, Comment } from '../../../interface/interface';

const NewFeedsContent = () => {
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
        _id: '1',
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

  // Xử lý khi gửi bài viết mới
  const handlePostSubmit = (newPost: string, images: File[], visibility: string) => {
    const newPostEntry: Article = {
      _id: (posts.length + 1).toString(),
      idHandler: 'Panda Media',
      handleDate: null,
      groupID: null,
      content: newPost,
      listPhoto: images.length > 0 ? images.map(image => URL.createObjectURL(image)) : [],
      scope: visibility,
      interact: {
        _id: `interact-${Date.now()}`,
        emoticons: [],
        comment: [],
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      _destroy: new Date(),
    };
    setPosts([newPostEntry, ...posts]);
  };

  // Xử lý thêm comment mới
  const handleAddComment = (postId: string, newComment: Comment) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId
          ? { ...post, interact: { ...post.interact, comment: [...post.interact.comment, newComment] } }
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
                replyComment: [...comment.replyComment, newReply],
              };
            }
            return comment;
          });
          return { ...post, interact: { ...post.interact, comment: updatedComments } };
        }
        return post;
      })
    );
  };

  return (
    <Box sx={{ padding: 2, height: '85vh' }}>
      <PostForm onSubmit={handlePostSubmit} />
      {posts.map((post, index) => (
        <Post key={index} post={post} onAddComment={handleAddComment} onAddReply={handleAddReply} />
      ))}
    </Box>
  );
};

export default NewFeedsContent;
