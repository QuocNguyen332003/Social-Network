/* eslint-disable react-hooks/exhaustive-deps */
 
import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import PostForm from '../../../../../../shared/components/postForm/PostForm';
import Post from '../../../../../../shared/components/post/Post';
import { Article, Group, Comment } from '../../../../../../interface/interface';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';

const HomeGroupContent = () => {
  // Get the group and setGroup function from OutletContext (passed from parent)
  const { group } = useOutletContext<{ group: Group, setGroup: (group: Group) => void }>();
  const [posts, setPosts] = useState<Article[]>([]); // State lưu trữ danh sách bài viết
  const [isLoading, setIsLoading] = useState(false); // State cho trạng thái loading
  const [error, setError] = useState<string | null>(null); // State cho lỗi
  const currentUserId = localStorage.getItem('userId') || ''; // Lấy userId từ localStorages
  useEffect(() => {
    fetchPosts();
  }, []);
  // Gọi API lấy danh sách bài viết khi component render lần đầu
  const fetchPosts = async () => {
    setIsLoading(true);
    setError(null); // Reset lỗi trước khi gọi API
    try {
      // Sử dụng `group._id` để lấy bài viết thuộc nhóm cụ thể và trạng thái 'approved'
      const response = await axios.get(`http://localhost:3000/v1/group/${group._id}/articles/processed`);
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
    const formData = new FormData();
    formData.append('content', newPost); // Thêm nội dung bài viết
    formData.append('scope', visibility); // Phạm vi của bài viết
    formData.append('userId', currentUserId); // ID người dùng hiện tại
    formData.append('groupId', group._id); // ID của nhóm hiện tại
  
    // Thêm các hashtag vào formData
    hashTags.forEach(tag => {
      formData.append('hashTag[]', tag);
    });
  
    // Kiểm tra nếu `images` là một mảng và có ít nhất một tệp
    if (images && images.length > 0) {
      images.forEach((image) => {
        formData.append('images', image); // Thêm từng tệp hình ảnh vào formData
      });
    } else {
      console.warn('Danh sách hình ảnh rỗng hoặc không hợp lệ.');
    }
  
    try {
      // Đảm bảo sử dụng đúng `headers` cho `multipart/form-data`
      const response = await axios.post(
        `http://localhost:3000/v1/group/${group._id}/article`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log('Bài viết đã được tạo thành công:', response.data);
    } catch (error: unknown) { // Khai báo kiểu error là unknown
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
      const response = await axios.post(`http://localhost:3000/v1/article/${postId}/like`, { userId: currentUserId });
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
      const response = await axios.post(`http://localhost:3000/v1/article/${postId}/comments`, newComment);
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
      const response = await axios.post(`http://localhost:3000/v1/article/${postId}/comments/${commentId}/reply`, newReply);
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
      const response = await axios.post(`http://localhost:3000/v1/article/${postId}/report`, { userId: currentUserId, reason });
      console.log('Báo cáo thành công:', response.data);
    } catch (error) {
      console.error('Lỗi khi báo cáo bài viết:', error);
    }
  };

  const handleSavePost = async (postId: string) => {
    try {
      const response = await axios.post(`http://localhost:3000/v1/article/${postId}/save`, {
        userId: currentUserId,
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
      const response = await axios.delete(`http://localhost:3000/v1/article/${postId}`);
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
      
      const response = await axios.post(`http://localhost:3000/v1/article/${postId}/comments/${commentId}/like`, { userId: currentUserId });
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
        { userId: currentUserId }
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
