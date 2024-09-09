import React from 'react';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography, Divider, Box, IconButton, Paper } from '@mui/material';
import { MoreVert } from '@mui/icons-material';

const notifications = [
  {
    id: 1,
    avatar: 'path_to_icon.jpg',
    title: 'Order Giày, Quần Áo Puma Chính Hãng',
    description: 'đã nhắc đến bạn và những người theo dõi khác trong một bình luận',
    time: '21 giờ trước',
  },
  {
    id: 2,
    avatar: 'path_to_icon2.jpg',
    title: 'Running Man Vietnam',
    description: 'đã đăng video mới: "Dương Lâm xô đẩy Thúy Ngân, quyết thắng đại chiến"',
    time: '1 ngày trước',
  },
  {
    id: 3,
    avatar: 'path_to_icon3.jpg',
    title: 'Cổng Thông tin Đồng Tháp',
    description: 'đã phát trực tiếp: "Điểm tin online ngày 06/9/2024"',
    time: '2 ngày trước',
  },
  {
    id: 4,
    avatar: 'path_to_icon4.jpg',
    title: 'Vo Kim Ngan',
    description: 'đã thêm 4 ảnh mới: E nhận vịt size to giống Triệu Lộ Tư...',
    time: '3 ngày trước',
  },
  {
    id: 5,
    avatar: 'path_to_icon.jpg',
    title: 'Order Giày, Quần Áo Puma Chính Hãng',
    description: 'đã nhắc đến bạn và những người theo dõi khác trong một bình luận',
    time: '21 giờ trước',
  },
  {
    id: 6,
    avatar: 'path_to_icon2.jpg',
    title: 'Running Man Vietnam',
    description: 'đã đăng video mới: "Dương Lâm xô đẩy Thúy Ngân, quyết thắng đại chiến"',
    time: '1 ngày trước',
  },
  {
    id: 7,
    avatar: 'path_to_icon3.jpg',
    title: 'Cổng Thông tin Đồng Tháp',
    description: 'đã phát trực tiếp: "Điểm tin online ngày 06/9/2024"',
    time: '2 ngày trước',
  },
  {
    id: 8,
    avatar: 'path_to_icon4.jpg',
    title: 'Vo Kim Ngan',
    description: 'đã thêm 4 ảnh mới: E nhận vịt size to giống Triệu Lộ Tư...',
    time: '3 ngày trước',
  },
  // Thêm các thông báo khác tương tự
];

const MainContent = () => {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 800,
        margin: 'auto',
        mt: 4,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Phần tiêu đề "Thông báo" sẽ giữ nguyên ở trên */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          backgroundColor: '#fff',
          zIndex: 1,
          padding: '16px 0',
          borderBottom: '1px solid #e0e0e0',
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 'bold', textAlign: 'center', fontSize: 30 }}
        >
          Thông báo
        </Typography>
      </Box>

      {/* Phần danh sách thông báo có thể cuộn */}
      <Paper
        elevation={3}
        sx={{
          borderRadius: '10px',
          border: '1px solid #e0e0e0',
          backgroundColor: '#f5f5f5',
          flex: 1,
          overflowY: 'auto', // Cho phép cuộn dọc
          maxHeight: '80vh', // Đặt chiều cao tối đa để giới hạn không gian cuộn
        }}
      >
        <List>
          {notifications.map((notification) => (
            <React.Fragment key={notification.id}>
              <ListItem
                alignItems="flex-start"
                sx={{
                  padding: '16px',
                  '&:hover': {
                    backgroundColor: '#e8f4fc',
                    cursor: 'pointer',
                    borderRadius: '8px',
                  },
                }}
                secondaryAction={
                  <IconButton edge="end" aria-label="options">
                    <MoreVert />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar
                    alt={notification.title}
                    src={notification.avatar}
                    sx={{ border: '1px solid #1976d2' }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 'bold', color: '#333333' }}
                    >
                      {notification.title}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.secondary"
                      >
                        {notification.description}
                      </Typography>
                      {" — " + notification.time}
                    </>
                  }
                />
              </ListItem>
              <Divider component="li" sx={{ marginTop: 1, marginBottom: 1 }} />
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default MainContent;