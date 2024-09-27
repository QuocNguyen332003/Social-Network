/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import axios from 'axios';
import PostForm from '../../../shared/components/postForm/PostForm';
import Post from '../../../shared/components/post/Post';
import { Article, Comment } from '../../../interface/interface'; // Chỉ giữ lại các interface cần thiết

const NewFeedsContent = () => {
  // State lưu trữ danh sách bài viết
  const [posts, setPosts] = useState<Article[]>([]); 
  const currentUserId = localStorage.getItem('userId') || ''; 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Lấy danh sách bài viết từ API khi component render lần đầu
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);  // Reset lỗi trước khi gọi API
    
      try {
        const response = await axios.get('http://localhost:3000/v1/article');
        setPosts(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy bài viết:', error);
        setError('Lỗi khi tải bài viết. Vui lòng thử lại sau.');
      } finally {
        setIsLoading(false);  // Hoàn tất loading bất kể thành công hay thất bại
      }
    };
    

    fetchPosts(); // Thực hiện gọi API ngay khi component được render
  }, []);

  // Xử lý khi gửi bài viết mới
  const handlePostSubmit = async (newPost: string, images: File[], visibility: string, hashTags: string[]) => {
    const formData = new FormData();
    formData.append('content', newPost);
    formData.append('visibility', visibility);

    hashTags.forEach(tag => formData.append('hashTag[]', tag));

    images.forEach((image) => {
      formData.append('images', image);
    });
    formData.append('userId', currentUserId)
    try {
      const response = await axios.post('http://localhost:3000/v1/article', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Bài viết đã được tạo thành công:', response.data);
      setPosts((prevPosts) => [response.data.post, ...prevPosts]);
    } catch (error) {
      console.error('Lỗi khi gửi bài viết:', error);
    }
  };

  const handleLikePost = async (postId: string) => {
    try {
      const response = await axios.post(`http://localhost:3000/v1/article/${postId}/like`, {
        userId: currentUserId,
      });
  
      if (response.status === 200) {
        setPosts((prevPosts) =>
          prevPosts.map((post) => {
            if (post._id === postId) {
              // Kiểm tra người dùng đã like chưa
              const isLiked = post.interact.emoticons.some(
                (emoticon) => emoticon._iduser === currentUserId && emoticon.typeEmoticons === 'like'
              );
  
              // Cập nhật trạng thái like/unlike cho bài viết
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
    
    // Cập nhật state với comment mới
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId
          ? { ...post, interact: { ...post.interact, comment: [...post.interact.comment, response.data] } }
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
              return {
                ...comment,
                replyComment: [...comment.replyComment, response.data], 
              };
            }
            return comment;
          });
          return { ...post, interact: { ...post.interact, comment: updatedComments } };
        }
        return post;
      })
    );
  } catch (error) {
    console.error('Error adding reply:', error);
  }
};



  

  const handleDeletePost = (postId: string) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId)); 
  };

  return (
    <Box sx={{ padding: 2, height: '85vh' }}>
      <PostForm onSubmit={handlePostSubmit} />
      {posts.length > 0 ? ( // Kiểm tra nếu có bài viết
        posts.map((post, index) => (
          <Post
            key={index}
            post={post}
            onAddComment={handleAddComment}
            onAddReply={handleAddReply}
            onLikePost={handleLikePost} 
            onDeletePost={handleDeletePost}
            currentUserId={currentUserId}   // ID của người dùng hiện tại
          />
        ))
      ) : (
        <p>Không có bài viết nào.</p> // Hiển thị thông báo nếu không có bài viết
      )}
    </Box>
  );
};
export default NewFeedsContent;