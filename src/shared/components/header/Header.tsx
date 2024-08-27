import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar, Box, Button } from '@mui/material';
import { Search, Notifications } from '@mui/icons-material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import HomeIcon from '@mui/icons-material/Home';

const Header = () => {
  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid #e0e0e0' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo */}
        <Box display="flex" alignItems="center">
          <img src="./src/assets/images/logoSocialNetwork.png" alt="Lotus" style={{ marginRight: '16px' }} />
        </Box>

        {/* Bảng tin và Đặt chỗ nằm ở giữa */}
        <Box display="flex" alignItems="center">
          <Button color="inherit" sx={{ display: 'flex', alignItems: 'center' }}>
            <HomeIcon />
            <Typography variant="body1" sx={{ marginLeft: 1 }}>
              Bảng tin
            </Typography>
          </Button>
          <Button color="inherit" sx={{ display: 'flex', alignItems: 'center', marginLeft: 3 }}>
            <CalendarTodayIcon />
            <Typography variant="body1" sx={{ marginLeft: 1 }}>
              Đặt chỗ
            </Typography>
          </Button>
        </Box>

        {/* Biểu tượng tìm kiếm, thông báo và avatar */}
        <Box display="flex" alignItems="center">
          <IconButton color="inherit">
            <Search />
          </IconButton>
          <IconButton color="inherit">
            <Notifications />
          </IconButton>
          <Avatar alt="User Avatar" src="/static/images/avatar/1.jpg" />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
