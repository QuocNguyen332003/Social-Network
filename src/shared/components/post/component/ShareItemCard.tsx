import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Avatar, Divider } from '@mui/material';
import axios from 'axios';
import { Article } from '../../../../interface/interface'; // Đảm bảo rằng đường dẫn này là chính xác

interface ShareItemCardProps {
  sharedPostId: string; // Nhận sharedPostId từ props
}

const ShareItemCard: React.FC<ShareItemCardProps> = ({ sharedPostId }) => {
  const [article, setArticle] = useState<Article | null>(null); // State để lưu thông tin bài viết

  useEffect(() => {
    const fetchSharedArticle = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/v1/article/${sharedPostId}`);
        setArticle(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy bài viết chia sẻ:', error);
      }
    };

    fetchSharedArticle();
  }, [sharedPostId]);

  if (!article) {
    return null; // Nếu không có thông tin bài viết, không hiển thị gì
  }

  return (
    <Paper
      sx={{
        padding: 2,
        marginTop: 2,
        borderRadius: 2,
        boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)', // Tăng độ sâu bóng
        backgroundColor: '#ffffff', // Đổi màu nền để nổi bật hơn
        border: '1px solid #bdbdbd', // Thêm viền màu xám
      }}
    >
      {/* Header thông tin bài viết */}
      <Box display="flex" alignItems="center" sx={{ marginBottom: 2 }}>
      <Avatar
          alt={article.createdBy?.displayName || 'Anonymous'}
          src={Array.isArray(article.createdBy?.avt) ? article.createdBy.avt[0] : article.createdBy?.avt || './src/assets/images/avt.png'}
          sx={{ width: 48, height: 48 }}
        />
        <Box sx={{ marginLeft: 2, flex: 1 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            {article.createdBy?.displayName || 'Người dùng chưa xác định'}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {article.createdAt ? new Date(article.createdAt).toLocaleDateString() : 'Ngày không xác định'}
          </Typography>
        </Box>
      </Box>

      {/* Ngăn cách giữa header và nội dung */}
      <Divider sx={{ marginY: 2 }} />

      {/* Phần nội dung bài viết */}
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="body1" sx={{ color: '#424242' }}>
          {article.content.length > 100 ? `${article.content.slice(0, 100)}...` : article.content}
        </Typography>
      </Box>

      {/* Hiển thị hình ảnh nếu có */}
      {article.listPhoto.length > 0 && (
        <Box>
          <img
            src={article.listPhoto[0]} // Hiển thị ảnh đầu tiên trong danh sách
            alt={`Shared item image`}
            style={{
              width: '100%',
              borderRadius: '8px',
              objectFit: 'cover',
              maxHeight: '300px', // Giới hạn chiều cao của ảnh
            }}
          />
        </Box>
      )}
    </Paper>
  );
};

export default ShareItemCard;
