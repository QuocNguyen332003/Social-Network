import React, { useState, useEffect } from 'react';
import { IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios để gọi API
import { toast } from 'react-toastify'; // Optional: Sử dụng toast để hiển thị thông báo

const UserAvatarMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [avatarUrl, setAvatarUrl] = useState<string>(''); // State to store avatar URL
  const [displayName, setDisplayName] = useState(''); // State to store user name
  const userId = sessionStorage.getItem('userId'); // Retrieve userId from session
  const token = sessionStorage.getItem('token'); // Retrieve token from session
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/v1/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        const userData = response.data;
        setDisplayName(userData.displayName || `${userData.firstName} ${userData.lastName}`);
        setAvatarUrl(userData.avt[userData.avt.length - 1]); // Lấy avatar cuối cùng trong mảng
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Lỗi khi lấy dữ liệu người dùng.');
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId, token]);

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAvatarMenu = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (path: string) => {
    handleCloseAvatarMenu();
    navigate(path);
  };

  const handleLogout = async () => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        toast.error('Token không tồn tại. Vui lòng đăng nhập lại.');
        return navigate('/login');
      }

      await axios.post('http://localhost:3000/v1/auth/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });

      // Xóa token khỏi sessionStorage
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('userId');
      sessionStorage.removeItem('avt');
      sessionStorage.removeItem('displayName');

      toast.success('Đăng xuất thành công!');
      navigate('/login');
    } catch (error) {
      console.error('Lỗi khi đăng xuất:', error);
      toast.error('Đăng xuất thất bại. Vui lòng thử lại.');
    }
  };

  return (
    <>
      <IconButton aria-label="user-menu" onClick={handleAvatarClick}>
        <Avatar
          alt={displayName || 'User Avatar'}
          src={avatarUrl || '/static/images/avatar/default.jpg'} // Hiển thị avatar cuối cùng trong mảng
          sx={{
            width: 40,
            height: 40,
            border: '2px solid #e0e0e0',
          }}
        />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseAvatarMenu}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1.5,
            borderRadius: '8px',
            overflow: 'visible',
            boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.1)',
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
        <MenuItem onClick={() => handleMenuClick(`/profile/u123`)}>Trang Cá Nhân</MenuItem>
        <MenuItem onClick={() => handleMenuClick('/settings')}>Cài đặt</MenuItem>
        <MenuItem onClick={handleLogout}>Log out</MenuItem>
      </Menu>
    </>
  );
};

export default UserAvatarMenu;
