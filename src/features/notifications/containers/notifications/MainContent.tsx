import React from 'react';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography, Divider, Box, IconButton, Paper } from '@mui/material';
import { MoreVert } from '@mui/icons-material';

// Khai báo kiểu Notification
interface Notification {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
  status: string;
  readAt: string | null;
  createdAt: string;
  _destroy: string | null;
}

// Dữ liệu mock
const notifications: Notification[] = [
  {
    _id: '1',
    senderId: '1234',
    receiverId: '123',
    message: 'đã nhắc đến bạn và những người theo dõi khác trong một bình luận',
    status: 'Chưa đọc',
    readAt: null,
    createdAt: new Date().toISOString(),
    _destroy: null,
  },
  {
    _id: '2',
    senderId: '1235',
    receiverId: '123',
    message: 'đã đăng video mới: "Dương Lâm xô đẩy Thúy Ngân, quyết thắng đại chiến"',
    status: 'Đã đọc',
    readAt: new Date().toISOString(),
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 ngày trước
    _destroy: null,
  },
  {
    _id: '3',
    senderId: '1211232',
    receiverId: '123',
    message: 'đã phát trực tiếp: "Điểm tin online ngày 06/9/2024"',
    status: 'Đã đọc',
    readAt: new Date().toISOString(),
    createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 ngày trước
    _destroy: null,
  },
  {
    _id: '4',
    senderId: '123123',
    receiverId: '123',
    message: 'đã thêm 4 ảnh mới: E nhận vịt size to giống Triệu Lộ Tư...',
    status: 'Đã đọc',
    readAt: null,
    createdAt: new Date(Date.now() - 259200000).toISOString(), // 3 ngày trước
    _destroy: null,
  },
  {
    _id: '3',
    senderId: '1211232',
    receiverId: '123',
    message: 'đã phát trực tiếp: "Điểm tin online ngày 06/9/2024"',
    status: 'Đã đọc',
    readAt: new Date().toISOString(),
    createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 ngày trước
    _destroy: null,
  },
  {
    _id: '4',
    senderId: '123123',
    receiverId: '123',
    message: 'đã thêm 4 ảnh mới: E nhận vịt size to giống Triệu Lộ Tư...',
    status: 'Đã đọc',
    readAt: null,
    createdAt: new Date(Date.now() - 259200000).toISOString(), // 3 ngày trước
    _destroy: null,
  },
  {
    _id: '3',
    senderId: '1211232',
    receiverId: '123',
    message: 'đã phát trực tiếp: "Điểm tin online ngày 06/9/2024"',
    status: 'Đã đọc',
    readAt: new Date().toISOString(),
    createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 ngày trước
    _destroy: null,
  },
  {
    _id: '4',
    senderId: '123123',
    receiverId: '123',
    message: 'đã thêm 4 ảnh mới: E nhận vịt size to giống Triệu Lộ Tư...',
    status: 'Đã đọc',
    readAt: null,
    createdAt: new Date(Date.now() - 259200000).toISOString(), // 3 ngày trước
    _destroy: null,
  },
  {
    _id: '3',
    senderId: '1211232',
    receiverId: '123',
    message: 'đã phát trực tiếp: "Điểm tin online ngày 06/9/2024"',
    status: 'Đã đọc',
    readAt: new Date().toISOString(),
    createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 ngày trước
    _destroy: null,
  },
  {
    _id: '4',
    senderId: '123123',
    receiverId: '123',
    message: 'đã thêm 4 ảnh mới: E nhận vịt size to giống Triệu Lộ Tư...',
    status: 'Đã đọc',
    readAt: null,
    createdAt: new Date(Date.now() - 259200000).toISOString(), // 3 ngày trước
    _destroy: null,
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
            <React.Fragment key={notification._id}>
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
                    alt={notification.senderId}
                    src="path_to_icon.jpg" // Có thể thay đổi đường dẫn này khi lấy avatar từ backend
                    sx={{ border: '1px solid #1976d2' }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 'bold', color: '#333333' }}
                    >
                      {notification.senderId}
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
                        {notification.message}
                      </Typography>
                      {" — " + new Date(notification.createdAt).toLocaleString()}
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
