import React, { useState } from 'react';
import { IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const userID = "Phan Minh Quan";

const UserAvatarMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

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
        <MenuItem onClick={() => handleMenuClick(`/profile/${userID}`)}>Trang Cá Nhân</MenuItem>
        <MenuItem onClick={() => handleMenuClick('/settings')}>Cài đặt</MenuItem>
        <MenuItem onClick={() => handleMenuClick('/logout')}>Log out</MenuItem>
      </Menu>
    </>
  );
};

export default UserAvatarMenu;
