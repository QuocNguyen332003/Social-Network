/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Box } from '@mui/material';
import PostForm from '../../../../../../shared/components/postForm/PostForm';
import Post from '../../../../../../shared/components/post/Post';
import { Interact, Article, Group, Comment } from '../../../../../../interface/interface.ts'
import { useOutletContext } from 'react-router-dom';

const DetailContent = () => {
  const { group, setGroup } = useOutletContext<{ group: Group, setGroup: (group: Group) => void }>();
  
  const mockArticles: Article[] = [
    {
      _id: 'article1',
      sharedPostId: null, // Mã bài viết gốc được chia sẻ (nếu có)
      idHandler: 'John Doe',
      handleDate: new Date(),
      reports: [{
        _idReporter: '2',
        reason: 'Violating community rules',
        reportDate: new Date('19/09/2024'),
        status: 'pending' // Trạng thái của báo 
      }],
      groupID: 'group1',
      content: 'This is the first article content',
      listPhoto: ['/src/assets/images/avt.png'],
      hashTag: [],
      scope: 'public',
      interact: {
        _id: 'interact1',
        emoticons: [],
        comment: [],
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      _destroy: new Date(),
    },
    {
      _id: 'article2',
      sharedPostId: null, // Mã bài viết gốc được chia sẻ (nếu có)
      idHandler: 'Jane Doe',
      handleDate: new Date(),
      reports: [{
        _idReporter: '2',
        reason: 'Violating community rules',
        reportDate: new Date('19/09/2024'),
        status: 'pending' // Trạng thái của báo 
      }],
      groupID: 'group2',
      content: 'This is the second article content',
      listPhoto: ['/src/assets/images/avt.png'],
      hashTag: [],
      scope: 'public',
      interact: {
        _id: 'interact2',
        emoticons: [],
        comment: [],
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      _destroy: new Date(),
    },
    {
      _id: 'article3',
      sharedPostId: null, // Mã bài viết gốc được chia sẻ (nếu có)
      idHandler: 'John Smith',
      handleDate: new Date(),
      reports: [{
        _idReporter: '2',
        reason: 'Violating community rules',
        reportDate: new Date('19/09/2024'),
        status: 'pending' // Trạng thái của báo 
      }],
      groupID: 'group3',
      content: 'This is the third article content',
      listPhoto: ['/src/assets/images/avt.png'],
      hashTag: [],
      scope: 'public',
      interact: {
        _id: 'interact3',
        emoticons: [],
        comment: [],
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      _destroy: new Date(),
    },
  ];

  // Lọc những bài viết có trạng thái "approved"
  const approvedPosts = group.article.listArticle
    .filter(article => article.state === 'approved')
    .map(article => mockArticles.find(a => a._id === article.idArticle))
    .filter(Boolean) as Article[];

  const [posts, setPosts] = useState<Article[]>([]);

  
  // Xử lý khi gửi bài viết mới
  const handlePostSubmit = (newPost: string, images: File[], visibility: string) => {
    const newPostId = (posts.length + 1).toString(); // Tạo ID cho bài viết mới
    const newPostEntry: Article = {
      _id: newPostId,
      sharedPostId: null, // Mã bài viết gốc được chia sẻ (nếu có)
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

    // Thêm bài viết mới vào danh sách bài viết
    setPosts([newPostEntry, ...posts]);

    // Cập nhật trạng thái bài viết mới trong group với trạng thái "pending"
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

    // Cập nhật group với bài viết mới
    setGroup(updatedGroup);
  };

  // Xử lý thêm comment mới
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
          return { ...post, interact: { ...post.interact, comment: updatedComments } };
        }
        return post;
      })
    );
  };

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
      {approvedPosts.map((post, index) => (
        <Post key={index} post={post} onAddComment={handleAddComment} onAddReply={handleAddReply} />
      ))}
    </Box>
  );
};

export default DetailContent;
