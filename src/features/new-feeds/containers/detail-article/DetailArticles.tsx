 
import { Box, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Post from "../../../../shared/components/post/Post";
import axios from 'axios';
import { Article, Comment } from '../../../../interface/interface';

const DetailArticles = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUserId = sessionStorage.getItem('userId') || ''; // Lấy userId từ sessionStorages
  const token = sessionStorage.getItem('token'); // Lấy token từ sessionStorage
  // Lấy dữ liệu bài viết từ state được truyền qua navigate
  const article = location.state?.article as Article;

  const [posts, setPosts] = useState<Article[]>([]);

  useEffect(() => {
    const fetchPostById = async (postId: string) => {
      try {
        const response = await axios.get(`http://localhost:3000/v1/article/${postId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setPosts([response.data]); // Thêm bài viết vào `posts`
        }
      } catch (error) {
        console.error('Lỗi khi lấy bài viết:', error);
      }
    };
  
    if (article) {
      setPosts([article]); // Nếu có dữ liệu từ `location.state`, sử dụng trực tiếp
    } else {
      const postId = location.pathname.split('/').pop(); // Lấy `postId` từ URL
      if (postId) {
        fetchPostById(postId); // Gọi API để lấy bài viết
      }
    }
  }, [article, location.pathname, token]);

  // Xử lý thêm comment mới
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
      const response = await axios.post(`http://localhost:3000/v1/article/${postId}/comments`, newComment,{
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
      });
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
      const response = await axios.post(`http://localhost:3000/v1/article/${postId}/comments/${commentId}/reply`, newReply, {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
      });
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
      if (response.status === 200) {
        alert('Lưu bài viết thành công!');
      }
    } catch (error) {
      console.error('Lỗi khi lưu bài viết:', error);
      alert('Đã xảy ra lỗi khi lưu bài viết!');
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
        alert('Xóa bài viết thành công!');
      }
    } catch (error) {
      console.error('Lỗi khi xóa bài viết:', error);
      alert('Đã xảy ra lỗi khi xóa bài viết!');
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
        alert('Chỉnh sửa bài viết thành công!');
      }
    } catch (error) {
      console.error('Lỗi khi chỉnh sửa bài viết:', error);
      alert('Đã xảy ra lỗi khi chỉnh sửa bài viết!');
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
        <Post
          key={index}
          post={post}
          onLikeComment={handleLikeComment}
          onAddComment={handleAddComment}
          onLikeReplyComment={handleLikeReplyComment}
          onAddReply={handleAddReply}
          onLikePost={handleLikePost}
          onDeletePost={handleDeletePost}
          onReportPost={handleReportPost}
          onSavePost={handleSavePost} // Truyền hàm `onReportPost` vào Post component
          onEditPost={handleEditPost}
          currentUserId={currentUserId}
          onSharePost={handleSharePost}
      />
      ))}
    </Box>
  );
};

export default DetailArticles;
