import { useState } from 'react';
import { Box } from '@mui/material';
import PostForm from '../../../shared/components/postForm/PostForm';
import Post from '../../../shared/components/post/Post';
import { Article, Comment, User } from '../../../interface/interface';

const NewFeedsContent = () => {
  const currentUser: User = {
    _id: 'CurrentUser', // ID của người dùng hiện tại
    account: {
      warningLevel: 0,
      email: 'currentuser@example.com',
      password: 'password123',
    },
    firstName: 'John',
    lastName: 'Doe',
    displayName: 'John Doe',
    userName: 'john_doe',
    details: {
      phoneNumber: '123-456-7890',
      address: '123 Main St',
      gender: true,
      birthDate: new Date('1990-01-01'),
    },
    friends: [
      { userId: 'friend1', addDate: '2024-01-01' },
      { userId: 'friend2', addDate: '2024-02-01' },
    ],
    status: 'active',
    avt: ['avt1.png'],
    collections: [],
    groups: ['group1', 'group2'],
    backGround: ['background1.png'],
    aboutMe: 'This is about me',
    createDate: '2024-09-01',
    hobbies: ['reading', 'sports'],
    listArticle: ['article1', 'article2'], // Danh sách bài viết của người dùng
    createdAt: new Date(),
    updatedAt: new Date(),
    _destroy: new Date(),
  };

  const [posts, setPosts] = useState<Article[]>([
    {
      _id: 'article1',
      sharedPostId: null,
      idHandler: currentUser._id, // Người dùng hiện tại là người viết bài
      handleDate: null,
      reports: [],
      groupID: null,
      content: 'Bài viết đầu tiên của tôi',
      hashTag: [],
      listPhoto: [],
      scope: 'Public',
      interact: {
        _id: '1',
        emoticons: [],
        comment: [],
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      _destroy: new Date(),
    },
    {
      _id: 'article2',
      sharedPostId: null,
      idHandler: 'friend1', // Bài viết của người khác
      handleDate: null,
      reports: [],
      groupID: null,
      content: 'Bài viết của bạn',
      hashTag: [],
      listPhoto: [],
      scope: 'Public',
      interact: {
        _id: '2',
        emoticons: [],
        comment: [],
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      _destroy: new Date(),
    },
  ]);

  // Xử lý khi gửi bài viết mới
  const handlePostSubmit = (newPost: string, images: File[], visibility: string, hashTags: string[]) => {
    const newPostEntry: Article = {
      _id: (posts.length + 1).toString(),
      idHandler: currentUser._id, // Người dùng hiện tại đăng bài
      sharedPostId: null,
      handleDate: null,
      reports: [],
      groupID: null,
      content: newPost,
      hashTag: hashTags,
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
    currentUser.listArticle.push(newPostEntry._id); // Cập nhật danh sách bài viết của người dùng hiện tại
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

  // Xử lý xóa bài viết
  const handleDeletePost = (postId: string) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    currentUser.listArticle = currentUser.listArticle.filter((id) => id !== postId); // Cập nhật danh sách bài viết
  };

  return (
    <Box sx={{ padding: 2, height: '85vh' }}>
      <PostForm onSubmit={handlePostSubmit} />
      {posts.map((post, index) => (
        <Post
          key={index}
          post={post}
          onAddComment={handleAddComment}
          onAddReply={handleAddReply}
          onDeletePost={handleDeletePost}
          currentUserId={currentUser._id}
        />
      ))}
    </Box>
  );
};

export default NewFeedsContent;
