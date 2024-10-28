/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useRef, useCallback  } from 'react';
import { Box, Typography } from '@mui/material';
import Post from '../../../../../shared/components/post/Post.tsx';
import { Article, Comment } from '../../../../../interface/interface.ts';
import axios from 'axios';

const NewFeedGroup: React.FC = () => {
  const token = sessionStorage.getItem('token');
  const currentUserId = sessionStorage.getItem('userId') || ''; // Lấy userId từ sessionStorages


  const [posts, setPosts] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastPostRef = useCallback((node: HTMLDivElement | null) => {
    if (isLoading || !hasMore) return;
    if (observer.current) observer.current.disconnect();
  
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prevPage) => prevPage + 1);
      }
    });
  
    if (node) observer.current.observe(node);
  }, [isLoading, hasMore]);
  

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const fetchPosts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `http://localhost:3000/v1/group/articles/${currentUserId}?page=${page}&limit=10`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      const { articles: newPosts = [] } = response.data;
  
      // Kiểm tra và xác định `hasMore`
      setHasMore(newPosts.length === 10); // Nếu trả về ít hơn 10, không còn bài để tải thêm
      
      // Lọc bài viết trùng trước khi thêm
      setPosts((prevPosts: Article[]) => {
        const uniqueNewPosts = newPosts.filter((newPost: Article) => 
          !prevPosts.some((post: Article) => post._id === newPost._id)
        );
        return [...prevPosts, ...uniqueNewPosts];
      });
  
    } catch (error) {
      console.error('Lỗi khi lấy bài viết:', error);
      setError('Lỗi khi tải bài viết. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };
  
  
  

  const handleLikePost = async (postId: string) => {
    try {
      const response = await axios.post(`http://localhost:3000/v1/article/${postId}/like`, { userId: currentUserId },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        }
      );
      if (response.status === 200) {
        setPosts((prevPosts) =>
          prevPosts.map((post) => {
            if (post._id === postId) {
              const isLiked = post.interact.emoticons.some((emoticon) => emoticon._iduser === currentUserId && emoticon.typeEmoticons === 'like');
              const updatedEmoticons = isLiked
                ? post.interact.emoticons.filter((emoticon) => emoticon._iduser !== currentUserId)
                : [...post.interact.emoticons, { typeEmoticons: 'like', _iduser: currentUserId }];
              return { ...post, interact: { ...post.interact, emoticons: updatedEmoticons } };
            }
            return post;
          })
        );
      }
    } catch (error) {
      console.error('Lỗi khi like bài viết:', error);
    }
  };

  const handleAddComment = async (postId: string, newComment: Comment) => {
    try {
      const response = await axios.post(`http://localhost:3000/v1/article/${postId}/comments`, newComment,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        }
      );
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? { ...post, interact: { ...post.interact, comment: [...post.interact.comment, response.data] }, totalComments: post.totalComments + 1 }
            : post
        )
      );
    } catch (error) {
      console.error('Lỗi khi thêm comment:', error);
    }
  };

  const handleAddReply = async (postId: string, commentId: string, newReply: Comment) => {
    try {
      const response = await axios.post(`http://localhost:3000/v1/article/${postId}/comments/${commentId}/reply`, newReply,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        }
      );
      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post._id === postId) {
            const updatedComments = post.interact.comment.map((comment) => {
              if (comment._id === commentId) {
                return { ...comment, replyComment: [...comment.replyComment, response.data] };
              }
              return comment;
            });
            return { ...post, interact: { ...post.interact, comment: updatedComments }, totalComments: post.totalComments + 1 };
          }
          return post;
        })
      );
    } catch (error) {
      console.error('Error adding reply:', error);
    }
  };

  const handleReportPost = async (postId: string, reason: string) => {
    try {
      const response = await axios.post(`http://localhost:3000/v1/article/${postId}/report`, { userId: currentUserId, reason },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        }
      );
      console.log('Báo cáo thành công:', response.data);
    } catch (error) {
      console.error('Lỗi khi báo cáo bài viết:', error);
    }
  };

  const handleSavePost = async (postId: string) => {
    try {
      const response = await axios.post(`http://localhost:3000/v1/article/${postId}/save`, {
        userId: currentUserId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
      });
    } catch (error) {
      console.error('Lỗi khi lưu bài viết:', error);
    }
  };

  const handleDeletePost = async (postId: string) => {
    try {
      const response = await axios.delete(`http://localhost:3000/v1/article/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        }
      );
      if (response.status === 200) {
        setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId)); // Loại bỏ bài viết đã xóa ra khỏi danh sách bài viết hiện tại
      }
    } catch (error) {
      console.error('Lỗi khi xóa bài viết:', error);
    }
  };
  
  const handleEditPost = async (postId: string, updatedContent: string, updatedScope: string) => {
    try {
      const response = await axios.put(`http://localhost:3000/v1/article/${postId}/edit`, {
        content: updatedContent,
        scope: updatedScope
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
      });
      if (response.status === 200) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId ? { ...post, content: updatedContent, scope: updatedScope } : post
          )
        );
      }
    } catch (error) {
      console.error('Lỗi khi chỉnh sửa bài viết:', error);
    }
  };
  
  const handleLikeComment = async (postId: string, commentId: string) => {
    try {
      
      const response = await axios.post(`http://localhost:3000/v1/article/${postId}/comments/${commentId}/like`, { userId: currentUserId },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        }
      );
      if (response.status === 200) {
        setPosts((prevPosts) =>
          prevPosts.map((post) => {
            if (post._id === postId) {
              const updatedComments = post.interact.comment.map((comment) => {
                if (comment._id === commentId) {
                  const isLiked = comment.emoticons.some((emoticon) => emoticon._iduser === currentUserId);
                  const updatedEmoticons = isLiked
                    ? comment.emoticons.filter((emoticon) => emoticon._iduser !== currentUserId)
                    : [...comment.emoticons, { typeEmoticons: 'like', _iduser: currentUserId }];
                  return { ...comment, emoticons: updatedEmoticons };
                }
                return comment;
              });
              return { ...post, interact: { ...post.interact, comment: updatedComments } };
            }
            return post;
          })
        );
      }
    } catch (error) {
      console.error('Lỗi khi like bình luận:', error);
    }
  };

  const handleLikeReplyComment = async (postId: string, commentId: string, replyId: string) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/v1/article/${postId}/comments/${commentId}/reply/${replyId}/like`,
        { userId: currentUserId },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        }
      );
  
      if (response.status === 200) {
        setPosts((prevPosts) =>
          prevPosts.map((post) => {
            if (post._id === postId) {
              return {
                ...post,
                interact: {
                  ...post.interact,
                  comment: post.interact.comment.map((comment) => {
                    if (comment._id === commentId) {
                      return {
                        ...comment,
                        replyComment: comment.replyComment.map((reply) =>
                          reply._id === replyId ? response.data.reply : reply
                        )
                      };
                    }
                    return comment;
                  })
                }
              };
            }
            return post;
          })
        );

      }
    } catch (error) {
      console.error('Lỗi khi like reply comment:', error);
    }
  };

  const handleSharePost = async (postId: string, shareContent: string, shareScope: string) => {
    try {
      const response = await axios.post(`http://localhost:3000/v1/article/${postId}/share`, {
        content: shareContent,
        scope: shareScope,
        userId: currentUserId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
      });
      console.log('Bài viết đã được chia sẻ thành công:', response.data);
      // Cập nhật danh sách bài viết sau khi chia sẻ
      setPosts((prevPosts) => [response.data.post, ...prevPosts]);
    } catch (error) {
      console.error('Lỗi khi chia sẻ bài viết:', error);
    }
  };

  return (
    <Box
      sx={{
        padding: 2,
        backgroundColor: '#e9e9e9',
        height: '100%', // Đảm bảo phần tử này sẽ mở rộng đủ để có thể cuộn
        overflowY: 'auto',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          maxWidth: '800px',
          width: '100%',
          margin: '0 16px',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
          Hoạt động gần đây
        </Typography>

        {posts.map((post, index) => {
        // Đặt ref vào phần tử cuối cùng để kích hoạt tải thêm
        if (posts.length === index + 1) {
          return (
            <div ref={lastPostRef} key={post._id}>
              <Post
                post={post}
                onLikeComment={handleLikeComment}
                onAddComment={handleAddComment}
                onLikeReplyComment={handleLikeReplyComment}
                onAddReply={handleAddReply}
                onLikePost={handleLikePost}
                onDeletePost={handleDeletePost}
                onReportPost={handleReportPost}
                onSavePost={handleSavePost}
                onEditPost={handleEditPost}
                currentUserId={currentUserId}
                onSharePost={handleSharePost}
              />
            </div>
          );
        } else {
          return (
            <Post
              key={post._id}
              post={post}
              onLikeComment={handleLikeComment}
              onAddComment={handleAddComment}
              onLikeReplyComment={handleLikeReplyComment}
              onAddReply={handleAddReply}
              onLikePost={handleLikePost}
              onDeletePost={handleDeletePost}
              onReportPost={handleReportPost}
              onSavePost={handleSavePost}
              onEditPost={handleEditPost}
              currentUserId={currentUserId}
              onSharePost={handleSharePost}
            />
          );
        }
      })}
        {isLoading && <p>Đang tải...</p>}
        {error && <p>{error}</p>}
        {!hasMore && <p>Hết bài viết.</p>}
      </Box>
    </Box>
  );
};

export default NewFeedGroup;