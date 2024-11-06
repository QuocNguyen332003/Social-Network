import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Avatar, Divider } from '@mui/material';
import axios from 'axios';
import { Article } from '../../../../interface/interface';

interface ShareItemCardProps {
  sharedPostId: string;
}

const ShareItemCard: React.FC<ShareItemCardProps> = ({ sharedPostId }) => {
  const token = sessionStorage.getItem('token');
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    const fetchSharedArticle = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/v1/article/${sharedPostId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setArticle(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy bài viết chia sẻ:', error);
      }
    };

    fetchSharedArticle();
  }, [sharedPostId]);

  if (!article) {
    return null;
  }

  return (
    <Paper
      sx={{
        padding: 2,
        marginTop: 2,
        borderRadius: 2,
        boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)',
        backgroundColor: '#ffffff',
        border: '1px solid #bdbdbd',
      }}
    >
      {/* Header thông tin bài viết */}
      <Box display="flex" alignItems="center" sx={{ marginBottom: 2 }}>
        <Avatar
          alt={article.createdBy?.displayName || 'Anonymous'}
          src={
            Array.isArray(article.createdBy?.avt)
              ? (article.createdBy.avt[0].link as unknown as string)
              : './src/assets/images/avt.png'
          }
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
      {Array.isArray(article.listPhoto) && article.listPhoto.length > 0 && article.listPhoto[0]?.link && (
        <Box>
          <img
            src={article.listPhoto[0].link as unknown as string}
            alt="Shared item image"
            style={{
              width: '100%',
              borderRadius: '8px',
              objectFit: 'contain', // Thay đổi từ 'cover' sang 'contain'
              maxHeight: '300px',
            }}
          />
        </Box>
      )}
    </Paper>
  );
};

export default ShareItemCard;
