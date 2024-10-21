/* eslint-disable react-hooks/exhaustive-deps */
 
import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import PostForm from '../../../../../../shared/components/postForm/PostForm';
import Post from '../../../../../../shared/components/post/Post';
import { Article, Group, Comment } from '../../../../../../interface/interface';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';

const HomeGroupContent = () => {
  const token = sessionStorage.getItem('token');
  const { group } = useOutletContext<{ group: Group, setGroup: (group: Group) => void }>();
  const [posts, setPosts] = useState<Article[]>([]); 
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState<string | null>(null); 
  const currentUserId = sessionStorage.getItem('userId') || ''; 
  useEffect(() => {
    fetchPosts();
  }, []);
  // Gọi API lấy danh sách bài viết khi component render lần đầu
  const fetchPosts = async () => {
    setIsLoading(true);
    setError(null); 
    try {
      // Sử dụng `group._id` để lấy bài viết thuộc nhóm cụ thể và trạng thái 'approved'
      const response = await axios.get(`http://localhost:3000/v1/group/${group._id}/articles/processed`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        }
      );
      setPosts(response.data.articles);
    } catch (error) {
      console.error('Lỗi khi lấy bài viết:', error);
      setError('Lỗi khi tải bài viết. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };
  
  
  const handlePostSubmit = async (
    newPost: string,
    images: File[],
    visibility: string,
    hashTags: string[]
  ) => {
    if (!newPost || !visibility || !currentUserId || !group._id) {
      console.error('Dữ liệu đầu vào không hợp lệ, không thể tạo bài viết.');
      return;
    }
  
    const formData = new FormData();
    formData.append('content', newPost); 
    formData.append('scope', visibility);
    formData.append('userId', currentUserId); 
    formData.append('groupId', group._id); 
  
    if (hashTags && hashTags.length > 0) {
      hashTags.forEach(tag => {
        formData.append('hashTag[]', tag);
      });
    } else {
      console.warn('Danh sách hashtag rỗng hoặc không hợp lệ.');
    }
  
    if (images && images.length > 0) {
      images.forEach((image) => {
        formData.append('images', image); 
      });
    } else {
      console.warn('Danh sách hình ảnh rỗng hoặc không hợp lệ.');
    }
  
    // Kiểm tra `FormData` trước khi gửi
    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]); // Xem từng key-value trong `FormData`
    }
  
    try {
      const response = await axios.post(
        `http://localhost:3000/v1/group/${group._id}/article`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}` // Thêm token vào headers
          },
        }
      );
  
      if (response.status === 201) {
        console.log('Bài viết đã được tạo thành công:', response.data);
        alert('Bài viết của bạn đã được đăng thành công!'); 
      } else {
        console.warn(`Có lỗi xảy ra: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Lỗi Axios:', error.response?.data || error.message);
      } else if (error instanceof Error) {
        console.error('Lỗi hệ thống:', error.message);
      } else {
        console.error('Lỗi không xác định:', error);
      }
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
    <Box sx={{ padding: 2, height: '85vh' }}>
      <PostForm onSubmit={handlePostSubmit} />
      {isLoading ? (
        <p>Đang tải...</p>
      ) : error ? (
        <p>{error}</p>
      ) : posts.length > 0 ? (
        posts.map((post, index) => (
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
        ))
      ) : (
        <p>Không có bài viết nào.</p>
      )}
    </Box>
  );
};

export default HomeGroupContent;
