import React from 'react';
import { Box, Typography, Button, List, ListItem, ListItemText, Avatar } from '@mui/material';
import { Add } from '@mui/icons-material';

const collections = ['SG', 'TV & Phim ảnh'];

const SavedSidebar = () => {
  const handleSavedClick = () => {
    console.log('Mục đã lưu clicked');
  };

  return (
    <Box
      sx={{
        padding: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start', // Đảm bảo các phần tử xếp từ trên xuống dưới
        backgroundColor: '#f9f9f9',
        borderRight: '1px solid #e0e0e0',
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: 'bold',
            color: '#1e88e5',
            fontSize: { xs: '1.2rem', sm: '1.5rem' }, // Responsive font size
          }}
        >
          Đã lưu
        </Typography>
      </Box>

      {/* "Mục đã lưu" */}
      <List sx={{ mb: 0 }}> {/* Đảm bảo không có khoảng cách giữa danh sách và phần dưới */}
        <ListItem button sx={{ borderRadius: 2, mb: 1, backgroundColor: '#e3f2fd' }} onClick={handleSavedClick}>
          <Avatar
            sx={{
              backgroundColor: '#1e88e5',
              marginRight: 2,
              width: { xs: 24, sm: 32 }, // Responsive avatar size
              height: { xs: 24, sm: 32 },
            }}
          />
          <ListItemText
            primary="Mục đã lưu"
            sx={{
              color: '#424242',
              fontWeight: 'bold',
              fontSize: { xs: '0.9rem', sm: '1rem' }, // Responsive text size
            }}
          />
        </ListItem>
      </List>

      {/* Collection list */}
      <Typography
        variant="subtitle1"
        color="gray"
        sx={{ mb: 1, fontWeight: 'bold', fontSize: { xs: '0.9rem', sm: '1rem' }, mt: 2 }} // Điều chỉnh margin-top cho tiêu đề
      >
        Bộ sưu tập của tôi
      </Typography>
      <List sx={{ mb: 0 }}> {/* Giảm khoảng cách bên dưới */}
        {collections.map((collection, index) => (
          <ListItem button key={index} sx={{ borderRadius: 2, mb: 1, backgroundColor: '#f5f5f5' }}>
            <Avatar
              alt={collection}
              src={`/static/images/${collection.toLowerCase()}.jpg`}
              sx={{
                width: { xs: 24, sm: 32 }, // Responsive avatar size
                height: { xs: 24, sm: 32 },
              }}
            />
            <ListItemText
              primary={collection}
              sx={{
                ml: 2,
                color: '#424242',
                fontSize: { xs: '0.9rem', sm: '1rem' }, // Responsive text size
              }}
            />
          </ListItem>
        ))}
      </List>

      {/* Create new collection button */}
      <Button
        variant="contained"
        sx={{
          width: '100%',
          padding: { xs: 1, sm: 1.5 },
          borderRadius: 3,
          backgroundColor: '#1e88e5',
          fontSize: { xs: '0.9rem', sm: '1rem' }, // Responsive font size
          ':hover': { backgroundColor: '#1565c0' },
          mt: 1, // Giảm khoảng cách giữa danh sách và nút
        }}
        startIcon={<Add />}
      >
        Tạo bộ sưu tập mới
      </Button>
    </Box>
  );
};

export default SavedSidebar;
