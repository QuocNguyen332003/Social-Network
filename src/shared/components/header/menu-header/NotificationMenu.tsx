import React, { useState, useEffect } from 'react';
import { IconButton, Menu, Badge, List, ListItem, ListItemAvatar, ListItemText, Avatar, Divider, MenuItem, Typography } from '@mui/material';
import { Notifications } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Khai báo interface cho notification
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

const NotificationMenu = () => {
  const [anchorNotification, setAnchorNotification] = useState<null | HTMLElement>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]); // Khai báo kiểu Notification[]
  const [unreadCount, setUnreadCount] = useState(0); // Số thông báo chưa đọc
  const navigate = useNavigate();

  // Sử dụng useEffect để giả lập việc gọi API và lấy dữ liệu thông báo
  useEffect(() => {
    // Dữ liệu giả định (mock data) cho thông báo
    const mockNotifications: Notification[] = [
      {
        _id: "1",
        senderId: "123",
        receiverId: "456",
        message: "Order Giày, Quần Áo Puma Chính Hãng đã nhắc đến bạn",
        status: "Chưa đọc",
        readAt: null,
        createdAt: new Date().toISOString(),
        _destroy: null,
      },
      {
        _id: "2",
        senderId: "789",
        receiverId: "456",
        message: "Running Man Vietnam đã đăng video mới",
        status: "Đã đọc",
        readAt: new Date().toISOString(),
        createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 ngày trước
        _destroy: null,
      },
      {
        _id: "3",
        senderId: "321",
        receiverId: "456",
        message: "Cổng Thông tin Đồng Tháp đã phát trực tiếp",
        status: "Đã đọc",
        readAt: new Date().toISOString(),
        createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 ngày trước
        _destroy: null,
      },
    ];

    // Cập nhật state với mock data
    setNotifications(mockNotifications);

    // Đếm số thông báo chưa đọc
    const unread = mockNotifications.filter(notification => notification.status === "Chưa đọc").length;
    setUnreadCount(unread);
  }, []);

  const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorNotification(event.currentTarget);
  };

  const handleCloseNotificationMenu = () => {
    setAnchorNotification(null);
  };

  const handleViewAllNotifications = () => {
    navigate('/notifications'); // Điều hướng tới trang tất cả thông báo
    handleCloseNotificationMenu();
  };

  return (
    <>
      <IconButton
        sx={{
          color: '#333333',
          '&:hover': {
            color: '#d32f2f',
          },
          marginLeft: '16px',
        }}
        onClick={handleNotificationClick}
      >
        <Badge badgeContent={unreadCount} color="error">
          <Notifications />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorNotification}
        open={Boolean(anchorNotification)}
        onClose={handleCloseNotificationMenu}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1.5,
            borderRadius: '8px',
            overflow: 'visible',
            boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.1)',
            minWidth: '300px',
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
      >
        <List>
          {notifications.map((notification, index) => (
            <div key={index}>
              <ListItem button>
                <ListItemAvatar>
                  <Avatar alt="Sender" src="path_to_sender_avatar.jpg" /> {/* Có thể thay đổi để lấy avatar người gửi */}
                </ListItemAvatar>
                <ListItemText
                  primary={notification.message}
                  secondary={new Date(notification.createdAt).toLocaleString()}
                />
              </ListItem>
              {index < notifications.length - 1 && <Divider variant="inset" />}
            </div>
          ))}
        </List>

        <MenuItem onClick={handleViewAllNotifications} sx={{ justifyContent: 'center', paddingTop: '10px', paddingBottom: '10px' }}>
          <Typography variant="body2" color="primary" sx={{ fontWeight: 'bold' }}>
            Xem tất cả thông báo
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default NotificationMenu;
