import React, { useState } from 'react';
import { IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios để gọi API
import { toast } from 'react-toastify'; // Optional: Sử dụng toast để hiển thị thông báo


const UserAvatarMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const currentUserId = sessionStorage.getItem('userId') || '';

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAvatarMenu = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (path: string) => {
    handleCloseAvatarMenu();
    navigate(path);
    navigate(0);
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

      // Xóa token khỏi sessionStorage (nếu bạn sử dụng sessionStorage để lưu token)
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('userId');
      sessionStorage.removeItem('avt');
      sessionStorage.removeItem('displayName');
      
      // Hiển thị thông báo thành công
      toast.success('Đăng xuất thành công!');

      // Điều hướng về trang đăng nhập sau khi đăng xuất
      navigate('/login');
    } catch (error) {
      // Xử lý lỗi nếu đăng xuất thất bại
      console.error('Lỗi khi đăng xuất:', error);
      toast.error('Đăng xuất thất bại. Vui lòng thử lại.');
    }
  };

  return (
    <>
      <IconButton aria-label="user-menu" onClick={handleAvatarClick}>
        <Avatar
          alt="User Avatar"
          src="/static/images/avatar/1.jpg"
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
        <MenuItem onClick={() => handleMenuClick(`/profile?id=${currentUserId}`)}>Trang Cá Nhân</MenuItem>
        <MenuItem onClick={() => handleMenuClick('/settings')}>Cài đặt</MenuItem>
        {/* Thêm hàm handleLogout cho chức năng đăng xuất */}
        <MenuItem onClick={handleLogout}>Log out</MenuItem>
      </Menu>
    </>
  );
};

export default UserAvatarMenu;
