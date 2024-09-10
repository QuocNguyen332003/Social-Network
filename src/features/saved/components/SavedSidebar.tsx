import React from 'react';
import { Box, Typography, Button, List, ListItem, ListItemText, Avatar, Divider } from '@mui/material';
import { Add } from '@mui/icons-material';

const collections = ['SG', 'TV & Phim ảnh'];

const SavedSidebar = () => {
  const handleSavedClick = () => {
    console.log('Mục đã lưu clicked');
  };

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: { xs: 2, sm: 3 },
        gap: 2, // Điều chỉnh khoảng cách giữa các thành phần chính
        backgroundColor: '#fafafa',
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
      <List>
        <ListItem
          button
          sx={{
            borderRadius: 2,
            backgroundColor: '#e3f2fd',
            padding: { xs: 1, sm: 1.5 },
            display: 'flex',
            alignItems: 'center',
            gap: 2, // Giảm khoảng cách giữa Avatar và Text
          }}
          onClick={handleSavedClick}
        >
          <Avatar
            sx={{
              backgroundColor: '#1e88e5',
              width: { xs: 24, sm: 32 },
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

      <Divider sx={{ my: 2 }} /> {/* Divider để phân cách các phần */}

      {/* Collection list */}
      <Typography
        variant="subtitle1"
        color="gray"
        sx={{
          fontWeight: 'bold',
          fontSize: { xs: '0.9rem', sm: '1rem' },
        }}
      >
        Bộ sưu tập của tôi
      </Typography>
      <List sx={{ gap: 1, display: 'flex', flexDirection: 'column' }}> {/* Flex direction để xếp các item dọc */}
        {collections.map((collection, index) => (
          <ListItem
            button
            key={index}
            sx={{
              borderRadius: 2,
              backgroundColor: '#f5f5f5',
              padding: { xs: 1, sm: 1.5 },
              display: 'flex',
              alignItems: 'center',
              gap: 2, // Giảm khoảng cách giữa Avatar và Text
            }}
          >
            <Avatar
              alt={collection}
              src={`/static/images/${collection.toLowerCase()}.jpg`}
              sx={{
                width: { xs: 24, sm: 32 },
                height: { xs: 24, sm: 32 },
              }}
            />
            <ListItemText
              primary={collection}
              sx={{
                color: '#424242',
                fontSize: { xs: '0.9rem', sm: '1rem' },
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
          fontSize: { xs: '0.9rem', sm: '1rem' },
          ':hover': { backgroundColor: '#1565c0' },
          marginTop: 'auto', // Đẩy nút xuống dưới cùng
        }}
        startIcon={<Add />}
      >
        Tạo bộ sưu tập mới
      </Button>
    </Box>
  );
};

export default SavedSidebar;
