 
import React, { useState, useEffect } from 'react';
import { IconButton, Menu, MenuItem, Badge, List, ListItem, ListItemAvatar, ListItemText, Avatar, Divider, Typography, Box, Button } from '@mui/material';
import { Notifications, MoreVert } from '@mui/icons-material'; 
import { Notification } from '../../../../interface/interface'; 
import io from 'socket.io-client'; // Import socket.io-client

const socket = io('http://localhost:3000');

const NotificationMenu = () => {
  const [anchorNotification, setAnchorNotification] = useState<null | HTMLElement>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]); 
  const [unreadCount, setUnreadCount] = useState(0); 
  const [showAll, setShowAll] = useState(false); 
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); 
  const [selectedNotification, setSelectedNotification] = useState<string | null>(null); 
  const currentUserId = sessionStorage.getItem('userId') || ''; 
  const token = sessionStorage.getItem('token'); // Lấy token từ sessionStorage

  useEffect(() => {
    socket.on('like_article_notification', (notification) => {
      if (notification.receiverId === currentUserId) {
        setNotifications((prevNotifications) => [notification, ...prevNotifications]);
        setUnreadCount((prevUnreadCount) => prevUnreadCount + 1);
      }
    });
    socket.on('like_comment_notification', (notification) => {
      if (notification.receiverId === currentUserId) {
        setNotifications((prevNotifications) => [notification, ...prevNotifications]);
        setUnreadCount((prevUnreadCount) => prevUnreadCount + 1);
      }
    });
    socket.on('like_reply_notification', (notification) => {
      if (notification.receiverId === currentUserId) {
        setNotifications((prevNotifications) => [notification, ...prevNotifications]);
        setUnreadCount((prevUnreadCount) => prevUnreadCount + 1);
      }
    });
    socket.on('new_comment_notification', (notification) => {
      if (notification.receiverId === currentUserId) {
        setNotifications((prevNotifications) => [notification, ...prevNotifications]);
        setUnreadCount((prevUnreadCount) => prevUnreadCount + 1);
      }
    });
    socket.on('new_reply_notification', (notification) => {
      if (notification.receiverId === currentUserId) {
        setNotifications((prevNotifications) => [notification, ...prevNotifications]);
        setUnreadCount((prevUnreadCount) => prevUnreadCount + 1);
      }
    });
    socket.on('share_notification', (notification) => {
      if (notification.receiverId === currentUserId) {
        setNotifications((prevNotifications) => [notification, ...prevNotifications]);
        setUnreadCount((prevUnreadCount) => prevUnreadCount + 1);
      }
    });
    socket.on('article_reported', (notification) => {
      if (notification.receiverId === currentUserId) {
        setNotifications((prevNotifications) => [notification, ...prevNotifications]);
        setUnreadCount((prevUnreadCount) => prevUnreadCount + 1);
      }
    });


    return () => {
      socket.off('like_notification');
      socket.off('share_notification');
      socket.off('like_comment_notification');
      socket.off('like_reply_notification');
      socket.off('new_comment_notification');
      socket.off('new_reply_notification');
      socket.off('article_reported');
    };
  }, [currentUserId]);
  // Fetch notifications from backend API
  useEffect(() => {
    const fetchNotifications = async () => {
      if (currentUserId) {
        try {
          const response = await fetch(`http://localhost:3000/v1/notifications?userId=${currentUserId}`,          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
          );
          const data = await response.json();

          if (data && Array.isArray(data.data)) {
            setNotifications(data.data);
            const unread = data.data.filter((notification: Notification) => notification.status === 'unread').length;
            setUnreadCount(unread);
          } else {
            setNotifications([]); 
          }
        } catch (error) {
          console.error('Error fetching notifications:', error);
        }
      }
    };
    fetchNotifications();
  }, [currentUserId]);

  // Mark notification as read
  const markAsRead = async (notificationId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/v1/notifications/${notificationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
           Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          status: 'read',
          readAt: new Date(), 
        }),
      });

      if (response.ok) {
        setNotifications((prevNotifications) =>
          prevNotifications.map((notification) =>
            notification._id === notificationId
              ? { ...notification, status: 'read', readAt: new Date() } 
              : notification
          )
        );
        setUnreadCount((prevCount) => prevCount - 1);
      }
    } catch (error) {
      console.error('Error updating notification:', error);
    }
  };

  // Mark notification as unread
  const markAsUnread = async () => {
    if (selectedNotification) {
      try {
        const response = await fetch(`http://localhost:3000/v1/notifications/${selectedNotification}/unread`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
               Authorization: `Bearer ${token}`
          },
        });

        if (response.ok) {
          setNotifications((prevNotifications) =>
            prevNotifications.map((notification) =>
              notification._id === selectedNotification
                ? { ...notification, status: 'unread', readAt: null }
                : notification
            )
          );
          setUnreadCount((prevCount) => prevCount + 1);
        }
      } catch (error) {
        console.error('Error marking as unread:', error);
      }
    }
    handleMoreClose(); 
  };

  // Soft delete notification
  const deleteNotification = async (notificationId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/v1/notifications/${notificationId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setNotifications((prevNotifications) =>
          prevNotifications.filter((notification) => notification._id !== notificationId)
        );
      } else {
        console.error('Error deleting notification');
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const handleNotificationClick = (notificationId: string, isUnread: boolean) => {
    if (isUnread) {
      markAsRead(notificationId);
    }
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorNotification(event.currentTarget);
  };

  const handleCloseNotificationMenu = () => {
    setAnchorNotification(null);
  };

  const handleMoreClick = (event: React.MouseEvent<HTMLElement>, notificationId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedNotification(notificationId); 
  };

  const handleMoreClose = () => {
    setAnchorEl(null);
    setSelectedNotification(null);
  };

  const handleShowMore = () => {
    setShowAll(true); 
  };

  const handleShowLess = () => {
    setShowAll(false); 
  };

  const displayedNotifications = showAll ? notifications : notifications.slice(0, 5);

  return (
    <>
      <IconButton
        sx={{
          color: '#333333',
          '&:hover': { color: '#d32f2f' },
          marginLeft: '16px',
        }}
        onClick={handleMenuClick}
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
          },
        }}
      >
        <List
          sx={{
            maxHeight: showAll ? 600 : 'auto',
            overflowY: showAll ? 'auto' : 'visible',
            paddingBottom: 0,
          }}
        >
          {displayedNotifications.length > 0 ? (
            displayedNotifications.map((notification) => (
              <div key={notification._id}>
                <ListItem 
                  button 
                  onClick={() => handleNotificationClick(notification._id, notification.status === 'unread')}
                  secondaryAction={
                    <IconButton
                      onClick={(event) => handleMoreClick(event, notification._id)} 
                      edge="end"
                    >
                      <MoreVert />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar alt={notification.senderId?.displayName} src={notification.senderId?.avt?.[0] || ''} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={notification.message}
                    secondary={new Date(notification.createdAt).toLocaleString()}
                  />
                  {notification.status === 'unread' && (
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        bgcolor: '#1976d2',
                        borderRadius: '50%',
                        ml: 2,
                      }}
                    />
                  )}
                </ListItem>
                <Divider variant="inset" />
              </div>
            ))
          ) : (
            <Typography variant="body2" sx={{ p: 2, textAlign: 'center' }}>
              Không có thông báo nào
            </Typography>
          )}
        </List>

        {notifications.length > 5 && (
          !showAll ? (
            <Button
              onClick={handleShowMore}
              fullWidth
              sx={{
                p: 1,
                justifyContent: 'center',
                bgcolor: '#1976d2',
                color: '#fff',
                '&:hover': { bgcolor: '#1565c0' },
                borderRadius: 0,
              }}
            >
              Xem các thông báo trước đó
            </Button>
          ) : (
            <Button
              onClick={handleShowLess}
              fullWidth
              sx={{
                p: 1,
                justifyContent: 'center',
                bgcolor: '#1976d2',
                color: '#fff',
                '&:hover': { bgcolor: '#1565c0' },
                borderRadius: 0,
              }}
            >
              Ẩn bớt
            </Button>
          )
        )}
      </Menu>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMoreClose}>
        <MenuItem onClick={markAsUnread}>Đánh dấu là chưa đọc</MenuItem>
        <MenuItem onClick={() => deleteNotification(selectedNotification as string)}>Xóa thông báo</MenuItem>
      </Menu>
    </>
  );
};

export default NotificationMenu;
