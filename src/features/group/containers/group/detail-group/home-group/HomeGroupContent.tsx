/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import PostForm from '../../../../../../shared/components/postForm/PostForm';
import Post from '../../../../../../shared/components/post/Post';
import { Interact, Article, Group, Comment } from '../../../../../../interface/interface';
import { useOutletContext } from 'react-router-dom';
import { groups, users, articles } from '../../../../components/GroupListData.tsx';// Import the shared mock data

const HomeGroupContent = () => {
  // Get the group and setGroup function from OutletContext (passed from parent)
  const { group, setGroup } = useOutletContext<{ group: Group, setGroup: (group: Group) => void }>();

  const [posts, setPosts] = useState<Article[]>([]);

  // Initialize posts with approved articles from the mock data
  const approvedPosts = group.article.listArticle
    .filter(article => article.state === 'approved')
    .map(article => articles.find(a => a._id === article.idArticle))
    .filter(Boolean) as Article[];

  // Update posts on component mount or whenever approvedPosts change
  useEffect(() => {
    setPosts(approvedPosts);
  }, [approvedPosts]);

  // Handle new post submission
  const handlePostSubmit = (newPost: string, images: File[], visibility: string) => {
    const newPostId = `article${posts.length + 1}`; // Generate a new ID for the post
    const newPostEntry: Article = {
      _id: newPostId,
      sharedPostId: null,
      idHandler: 'Panda Media',
      handleDate: null,
      reports: [],
      groupID: group._id,
      content: newPost,
      listPhoto: images.length > 0 ? images.map(image => URL.createObjectURL(image)) : [],
      hashTag: [],
      scope: visibility,
      interact: {
        _id: `interact-${newPostId}`,
        emoticons: [],
        comment: []
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      _destroy: new Date(),
    };

    // Add the new post to the list of posts
    setPosts([newPostEntry, ...posts]);

    // Update the group’s articles list with the new post (state: 'pending')
    const updatedGroup = {
      ...group,
      article: {
        ...group.article,
        listArticle: [
          ...group.article.listArticle,
          { idArticle: newPostId, state: 'pending' }
        ]
      }
    };

    setGroup(updatedGroup);
  };

  // Handle adding a new comment
  const handleAddComment = (postId: string, newComment: Comment) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId
          ? {
              ...post,
              interact: {
                ...post.interact,
                comment: [...post.interact.comment, newComment]
              }
            }
          : post
      )
    );
  };

  // Handle adding a reply to a comment
  const handleAddReply = (postId: string, commentId: string, newReply: Comment) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post._id === postId) {
          const updatedComments = post.interact.comment.map((comment) => {
            if (comment._iduser === commentId) {
              return {
                ...comment,
                replyComment: [...comment.replyComment, newReply]
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

  // Handle deleting a post
  const handleDeletePost = (postId: string) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));

    const updatedGroup = {
      ...group,
      article: {
        ...group.article,
        listArticle: group.article.listArticle.filter(article => article.idArticle !== postId)
      }
    };

    setGroup(updatedGroup);
  };

  const currentUserId = 'current-user-id'; // Replace with actual user ID logic

  return (
    <Box
      sx={{
        padding: 2,
        backgroundColor: '#e9e9e9',
        height: '60vh',
        overflowY: 'auto',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      <PostForm onSubmit={handlePostSubmit} />
      {posts.map((post) => (
        <Post
          key={post._id}
          post={post}
          onAddComment={handleAddComment}
          onAddReply={handleAddReply}
          onDeletePost={handleDeletePost}
          currentUserId={currentUserId}
        />
      ))}
    </Box>
  );
};

export default HomeGroupContent;
