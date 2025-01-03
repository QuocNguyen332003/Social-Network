import React, { useState, useEffect } from 'react';
import { IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios để gọi API
import { toast } from 'react-toastify'; // Optional: Sử dụng toast để hiển thị thông báo
import Setting from '../../setting/Setting';


const UserAvatarMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [avatarUrl, setAvatarUrl] = useState<string>(''); // State to store avatar URL
  const [displayName, setDisplayName] = useState(''); // State to store user name
  const userId = sessionStorage.getItem('userId'); // Retrieve userId from session
  const token = sessionStorage.getItem('token'); // Retrieve token from session
  const navigate = useNavigate();
  const currentUserId = sessionStorage.getItem('userId') || '';

  const [openSetting, setOpenSetting] = useState<boolean>(false);

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
        const lastAvatar = userData.avt && userData.avt.length > 0
        ? userData.avt[userData.avt.length - 1].link
        : "default-avatar-url"; // Đặt URL mặc định nếu không có avatar
        setAvatarUrl(lastAvatar); // Lấy avatar cuối cùng trong mảng
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
    navigate(0);
  };

  const handleLogout = async () => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        toast.error('Token không tồn tại. Vui lòng đăng nhập lại.');
        return navigate('/login');
      }

      await axios.post(`http://localhost:3000/v1/auth/logout/${currentUserId}`, {}, {
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
            objectFit: 'contain', // Giữ tỷ lệ ảnh mà không làm méo
            borderRadius: '50%' // Đảm bảo ảnh nằm trong khung tròn
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
        <MenuItem onClick={() => handleMenuClick(`/profile?id=${userId}`)}>Trang Cá Nhân</MenuItem>
        <MenuItem onClick={() => setOpenSetting(true)}>Cài đặt</MenuItem>
        <MenuItem onClick={handleLogout}>Log out</MenuItem>
      </Menu>
      <Setting open={openSetting} setOpen={setOpenSetting}/>
    </>
  );
};

export default UserAvatarMenu;
