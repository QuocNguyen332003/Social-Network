import React, { useState } from 'react';
import { IconButton, Menu, Badge, List, ListItem, ListItemAvatar, ListItemText, Avatar, Divider, MenuItem, Typography } from '@mui/material';
import { Notifications } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const NotificationMenu = () => {
  const [anchorNotification, setAnchorNotification] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

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
        <Badge badgeContent={4} color="error">
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
          <ListItem button>
            <ListItemAvatar>
              <Avatar alt="Order Giày" src="path_to_icon.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Order Giày, Quần Áo Puma Chính Hãng đã nhắc đến bạn"
              secondary="20 giờ trước"
            />
          </ListItem>
          <Divider variant="inset" />
          <ListItem button>
            <ListItemAvatar>
              <Avatar alt="Running Man Vietnam" src="path_to_icon.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Running Man Vietnam đã đăng video mới"
              secondary="1 ngày trước"
            />
          </ListItem>
          <Divider variant="inset" />
          <ListItem button>
            <ListItemAvatar>
              <Avatar alt="Cổng Thông tin Đồng Tháp" src="path_to_icon.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Cổng Thông tin Đồng Tháp đã phát trực tiếp"
              secondary="2 ngày trước"
            />
          </ListItem>
          <Divider variant="inset" />
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
