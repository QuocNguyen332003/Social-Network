import { Box } from "@mui/material";
import PostForm from "../../../../shared/components/postForm/PostForm";
import { useState } from "react";
import Post from "../../../../shared/components/post/Post";
import { Article, Interact } from "../../../../interface/interface";

const ProfilePost = () => {
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
      interact: [
        {
          _id: '1-1',
          emoticons: [],
          comment: {
            _iduser: 'JohnDoe',
            content: 'Wow, that’s interesting!',
            img: [],
            replyComment: [],
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          _id: '1-2',
          emoticons: [],
          comment: {
            _iduser: 'JaneDoe',
            content: 'I never knew that!',
            img: [],
            replyComment: [
              {
                _id: '1-2-1',
                emoticons: [],
                comment: {
                  _iduser: 'PandaLover',
                  content: 'Yes, it’s a fascinating history!',
                  img: [],
                  replyComment: [],
                },
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            ],
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
      _destroy: new Date(),
    },
  ]);
  const handlePostSubmit = (newPost: string, images: File[], visibility: string) => {
    const newPostEntry: Article = {
      _id: (posts.length + 1).toString(),
      idHandler: 'Panda Media',
      handleDate: null,
      groupID: null,
      content: newPost,
      listPhoto: images.length > 0 ? images.map(image => URL.createObjectURL(image)) : [],
      scope: visibility,
      interact: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      _destroy: new Date(),
    };
    setPosts([newPostEntry, ...posts]);
  };

  const handleAddComment = (postId: string, newComment: Interact) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId
          ? { ...post, interact: [...post.interact, { ...newComment, _id: `comment-${Date.now()}`, createdAt: new Date(), updatedAt: new Date() }] }
          : post
      )
    );
  };

  const handleAddReply = (postId: string, commentId: string, newReply: Interact) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post._id === postId) {
          const updatedComments = post.interact.map((comment) => {
            if (comment._id === commentId) {
              return {
                ...comment,
                comment: {
                  ...comment.comment,
                  replyComment: [...comment.comment.replyComment, { ...newReply, _id: `reply-${Date.now()}`, createdAt: new Date(), updatedAt: new Date() }],
                },
              };
            }
            return comment;
          });
          return { ...post, interact: updatedComments };
        }
        return post;
      })
    );
  };

  return (
    <Box sx={{
      backgroundColor: '#e9e9e9',
      padding: '20px 0'
    }}>
        <PostForm onSubmit={handlePostSubmit} />
        {posts.map((post, index) => (
        <Post key={index} post={post} onAddComment={handleAddComment} onAddReply={handleAddReply} />
      ))}
    </Box>
  );
};

export default ProfilePost;
