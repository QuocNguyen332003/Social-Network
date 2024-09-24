import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import Post from '../../../../../shared/components/post/Post.tsx';
import { Group, Article, Comment } from '../../../../../interface/interface.ts';
import { groups, users, articles } from '../../../components/GroupListData.tsx'; // Import mock data

const NewFeedGroup: React.FC = () => {
  const [posts, setPosts] = useState<Article[]>([]);

  // Giả sử bạn sử dụng người dùng đầu tiên trong danh sách
  const currentUser = users[0]; // Có thể thay bằng logic lấy người dùng hiện tại

  // Hàm để load tất cả các bài post đã được duyệt của những nhóm đã tham gia
  const loadApprovedPosts = () => {
    const approvedPosts: Article[] = [];

    // Nếu currentUser.groups tồn tại và không rỗng
    if (currentUser.groups && currentUser.groups.length > 0) {
      // Duyệt qua tất cả các nhóm mà người dùng hiện tại đã tham gia
      currentUser.groups.forEach((groupId) => {
        const group = groups.find((group: Group) => group._id === groupId);

        if (group) {
          // Tìm các bài viết có trạng thái "approved"
          const groupApprovedPosts = group.article.listArticle
            .filter(article => article.state === 'approved') // Chỉ chọn các bài đã được duyệt
            .map(article => {
              // Tìm bài viết đầy đủ từ mock data dựa vào id
              const fullArticle = findFullArticleById(article.idArticle);
              return fullArticle; // Trả về bài viết đầy đủ
            })
            .filter(Boolean) as Article[]; // Loại bỏ các giá trị null hoặc undefined

          approvedPosts.push(...groupApprovedPosts);
        }
      });
    }

    setPosts(approvedPosts);
  };

  // Hàm tìm bài viết đầy đủ dựa vào id
  const findFullArticleById = (id: string): Article | null => {
    return articles.find(article => article._id === id) || null;
  };

  // Dùng useEffect để load bài viết khi component mount
  useEffect(() => {
    loadApprovedPosts();
  }, []);

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
  const handleDeletePost = (postId: string) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    currentUser.listArticle = currentUser.listArticle.filter((id) => id !== postId); // Cập nhật danh sách bài viết
  };

  return (
    <Box
      sx={{
        padding: 2,
        backgroundColor: '#e9e9e9',
        height: '100vh',
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
          maxWidth: '800px', // Đặt kích thước tối đa cho bài viết
          width: '100%',  // Đảm bảo chiếm hết chiều rộng có thể
          margin: '0 16px', // Tạo khoảng cách hai bên
        }}
      >
        {/* Thêm tiêu đề "Hoạt động gần đây" */}
        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2, textAlign: 'flex' }}>
          Hoạt động gần đây
        </Typography>

        {/* Kiểm tra và hiển thị các bài viết */}
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <Post
            key={index}
            post={post}
            onAddComment={handleAddComment}
            onAddReply={handleAddReply}
            onDeletePost={handleDeletePost}
            currentUserId={currentUser._id}
          />
          ))
        ) : (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <p>Chưa có bài viết nào được duyệt.</p>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default NewFeedGroup;
