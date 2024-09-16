import { Box } from "@mui/material";
import PostForm from "../../../../shared/components/postForm/PostForm";
import { useState } from "react";
import Post from "../../../../shared/components/post/Post";
import { Article, Comment } from '../../../../interface/interface';

const ProfilePost = () => {
  const [posts, setPosts] = useState<Article[]>([
    {
      _id: '1',
      idHandler: 'Panda Media',
      handleDate: new Date(),
      groupID: null,
      content: 'This is a sample post content about pandas.',
      listPhoto: ['/static/images/panda1.jpg', '/static/images/panda2.jpg'],
      scope: 'Public',
      interact: {
        _id: 'interact-1',
        emoticons: [{ typeEmoticons: 'like', _iduser: 'user1' }],
        comment: [
          {
            _iduser: 'JohnDoe',
            content: 'Wow, that’s interesting!',
            img: [],
            replyComment: [
              {
                _iduser: 'JaneDoe',
                content: 'Yes, it’s amazing!',
                img: [],
                replyComment: [],
                emoticons: [],
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            ],
            emoticons: [{ typeEmoticons: 'like', _iduser: 'user2' }],
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


  const handlePostSubmit = (newPost: string, images: File[]) => {
    const newPostEntry: Article = {
      _id: (posts.length + 1).toString(),
      idHandler: 'Panda Media',
      handleDate: new Date(),
      groupID: null,
      content: newPost,
      listPhoto: images.length > 0 ? images.map(image => URL.createObjectURL(image)) : [],
      scope: 'Public',
      interact: {
        _id: `interact-${posts.length + 1}`,
        emoticons: [],
        comment: [],
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      _destroy: new Date(),
    };
    setPosts([newPostEntry, ...posts]);
  };

  const handleAddComment = (postId: string, newComment: Comment) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId
          ? { ...post, interact: { ...post.interact, comment: [...post.interact.comment, newComment] } }
          : post
      )
    );
  };


  const handleAddReply = (postId: string, commentId: string, newReply: Comment) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post._id === postId) {
          const updatedComments = post.interact.comment.map((comment) => {
            if (comment._iduser === commentId) {
              return { ...comment, replyComment: [...comment.replyComment, newReply] };
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
    <Box sx={{ backgroundColor: '#e9e9e9', padding: '20px 0' }}>
      <PostForm onSubmit={handlePostSubmit} />
      {posts.map((post, index) => (
        <Post key={index} post={post} onAddComment={handleAddComment} onAddReply={handleAddReply} />
      ))}
    </Box>
  );
};

export default ProfilePost;
