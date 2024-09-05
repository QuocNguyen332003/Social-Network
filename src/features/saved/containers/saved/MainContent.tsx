import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import SavedItemCard from '../../components/SavedItemCard';

const items = [
  {
    type: 'Video',
    content: 'Có nhiều cô gái liều mang kiếm tiền là để chứng minh rằng không có ai bên cạnh, mình vẫn có thể sống tốt.',
    collection: 'SG',
    media: '/static/video-thumbnail.jpg',
    savedBy: 'Chúng Ta Của Hiện Tại',
  },
  {
    type: 'Link',
    content: 'Saritasa',
    collection: 'SG',
    media: '/static/link-thumbnail.jpg',
    savedBy: 'Khoa Công nghệ Thông tin - Trường ĐH SPKT Tp.HCM',
  },
  {
    type: 'Post',
    content: 'MỘT SỐ LỆNH GIT CƠ BẢN',
    collection: 'SG',
    media: '/static/git-post-thumbnail.jpg',
    savedBy: 'Cuộc Đời Anh IT',
  },
];

const collections = ['SG', 'TV & Phim ảnh', 'Công việc']; // Các bộ sưu tập có sẵn

const MainContent = () => {
  return (
    <Box sx={{ padding: 2, color: 'black', height: '100vh', overflowY: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        Tất cả
      </Typography>

      <Grid container spacing={2}>
        {items.map((item, index) => (
          <Grid item xs={12} key={index}>
            <SavedItemCard item={item} collections={collections} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MainContent;
  