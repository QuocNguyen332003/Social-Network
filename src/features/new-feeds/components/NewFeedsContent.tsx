 
import { useState, useEffect, useRef, useCallback } from 'react';
import { Box } from '@mui/material';
import axios from 'axios';
import PostForm from '../../../shared/components/postForm/PostForm';
import Post from '../../../shared/components/post/Post';
import { Article, Comment } from '../../../interface/interface';
import { toast } from 'react-toastify';

const NewFeedsContent = () => {
  const [posts, setPosts] = useState<Article[]>([]); // State lưu trữ danh sách bài viết
  const [isLoading, setIsLoading] = useState(false); // State cho trạng thái loading
  const [error, setError] = useState<string | null>(null); // State cho lỗi
  const currentUserId = sessionStorage.getItem('userId') || ''; // Lấy userId từ sessionStorage
  const token = sessionStorage.getItem('token'); // Lấy token từ sessionStorage
  const [page, setPage] = useState(1); // Quản lý trang hiện tại để phân trang
  const [hasMore, setHasMore] = useState(true); // Kiểm tra còn bài viết để tải không

  const observer = useRef<IntersectionObserver | null>(null);

  // Hàm dùng Intersection Observer để xác định khi nào cuộn tới bài viết cuối
  const lastPostRef = useCallback((node: HTMLDivElement | null) => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prevPage) => prevPage + 1); // Tăng trang mỗi khi cuộn đến cuối
      }
    });

    if (node) observer.current.observe(node);
  }, [isLoading, hasMore]);

  // Gọi API lấy danh sách bài viết mỗi khi `page` thay đổi
  useEffect(() => {
    fetchPosts();
  }, [page]);

  const fetchPosts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:3000/v1/article?userId=${currentUserId}&limit=10&page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { articles: newPosts = [], hasMore: moreAvailable = false } = response.data;
      
      // Kiểm tra nếu `newPosts` không trùng với các bài viết hiện tại
      setPosts((prevPosts: Article[]) => {
        const uniqueNewPosts = newPosts.filter((newPost: Article) => 
          !prevPosts.some((post: Article) => post._id === newPost._id)
        );
        return [...prevPosts, ...uniqueNewPosts];
      });
      setHasMore(moreAvailable);
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
    formData.append('content', newPost);
    formData.append('scope', visibility);
    formData.append('userId', currentUserId);
    hashTags.forEach((tag) => {
      formData.append('hashTag[]', tag);
    });
    images.forEach((image) => {
      formData.append('images', image);
    });
  
    try {
      const response = await axios.post('http://localhost:3000/v1/article', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
      });
  
      console.log('Bài viết đã được tạo thành công:', response.data);
      setPosts((prevPosts) => [response.data.post, ...prevPosts]);
  
      // Hiển thị thông báo thành công
      toast.success('Bài viết đã được tạo thành công!', { position: 'top-right' });
    } catch (error: any) {
      console.error('Lỗi khi gửi bài viết:', error);
  
      // Lấy thông báo lỗi từ backend hoặc hiển thị lỗi mặc định
      const errorMessage = error.response?.data?.message || 'Có lỗi xảy ra. Vui lòng thử lại sau.';
      toast.error(`Lỗi: ${errorMessage}`, { position: 'top-right' });
    }
  };
  
  

  const handleLikePost = async (postId: string) => {
    try {
      const response = await axios.post(`http://localhost:3000/v1/article/${postId}/like`, { userId: currentUserId }, {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
      });
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
      const response = await axios.post(`http://localhost:3000/v1/article/${postId}/comments/${commentId}/reply`, newReply,{
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
      const response = await axios.post(
        `http://localhost:3000/v1/article/${postId}/report`,
        { userId: currentUserId, reason },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        }
      );
  
      console.log('Báo cáo thành công:', response.data);
      toast.success('Báo cáo bài viết thành công!', {
        position: 'top-right',
        autoClose: 3000,
      });
    } catch (error: any) {
      // Lấy thông tin lỗi từ response
      const errorMessage =
        error.response?.data?.error || 'Đã xảy ra lỗi khi báo cáo bài viết.';
  
      console.error('Lỗi khi báo cáo bài viết:', errorMessage);
  
      // Hiển thị thông báo lỗi cho người dùng
      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };
  

  const handleSavePost = async (postId: string) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/v1/article/${postId}/save`,
        { userId: currentUserId },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        }
      );
  
      if (response.status === 200) {
        toast.success('Lưu bài viết thành công!', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    } catch (error: any) {
      console.error('Lỗi khi lưu bài viết:', error);
  
      // Lấy thông báo lỗi từ server
      const errorMessage =
        error.response?.data?.error || 'Đã xảy ra lỗi khi lưu bài viết.';
  
      // Kiểm tra trường hợp bài viết đã có trong bộ sưu tập
      if (errorMessage.includes('Bài viết đã có trong bộ sưu tập')) {
        toast.error('Bài viết này đã tồn tại trong bộ sưu tập!', {
          position: 'top-right',
          autoClose: 3000,
        });
      } else {
        // Thông báo lỗi chung
        toast.error('Đã xảy ra lỗi khi lưu bài viết!', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
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
    if (!updatedContent.trim()) {
          // Nếu không có nội dung và không có ảnh, hiển thị thông báo lỗi
          toast.error('Vui lòng nhập nội dung bài viết', {
            autoClose: 3000,
          });
          return;
    }
    try {
      const response = await axios.put(
        `http://localhost:3000/v1/article/${postId}/edit`,
        {
          content: updatedContent,
          scope: updatedScope,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        }
      );
  
      if (response.status === 200) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId ? { ...post, content: updatedContent, scope: updatedScope } : post
          )
        );
        toast.success('Chỉnh sửa bài viết thành công!', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    } catch (error: any) {
      console.error('Lỗi khi chỉnh sửa bài viết:', error);
  
      // Kiểm tra message từ server
      const errorMessage =
        error.response?.data?.message || 'Đã xảy ra lỗi khi chỉnh sửa bài viết!';
  
      // Thêm thông báo toast khi nội dung không phù hợp
      if (errorMessage.includes('Nội dung bài viết chứa từ ngữ không phù hợp')) {
        toast.error(errorMessage, {
          position: 'top-right',
          autoClose: 3000,
        });
      } else {
        toast.error('Đã xảy ra lỗi khi chỉnh sửa bài viết!', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
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
    if (!shareContent.trim()) {
      // Nếu không có nội dung và không có ảnh, hiển thị thông báo lỗi
      toast.error('Vui lòng nhập nội dung bài viết', {
        autoClose: 3000,
      });
      return;
}
    try {
      const response = await axios.post(
        `http://localhost:3000/v1/article/${postId}/share`, 
        {
          content: shareContent,
          scope: shareScope,
          userId: currentUserId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      const sharedPost = response.data.post;
      if (sharedPost) {
        setPosts((prevPosts) => [sharedPost, ...prevPosts]);
      } else {
      }
    } catch (error: any) {
      console.error('Lỗi khi chỉnh sửa bài viết:', error);
  
      // Kiểm tra message từ server
      const errorMessage =
        error.response?.data?.message || 'Đã xảy ra lỗi khi chỉnh sửa bài viết!';
  
      // Thêm thông báo toast khi nội dung không phù hợp
      if (errorMessage.includes('Nội dung bài viết chứa từ ngữ không phù hợp')) {
        toast.error(errorMessage, {
          position: 'top-right',
          autoClose: 3000,
        });
      } else {
        toast.error('Đã xảy ra lỗi khi chỉnh sửa bài viết!', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    }
  };
  
  
  
  
  return (
    <Box sx={{ padding: 2,
     }}>
      <PostForm onSubmit={handlePostSubmit} />
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
      {!hasMore && <p></p>}
    </Box>
  );
};

export default NewFeedsContent;
