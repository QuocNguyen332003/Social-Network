import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar, Box, Button } from '@mui/material';
import { Search, Notifications } from '@mui/icons-material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/images/logoSocialNetwork.png';  // Adjust the path

const Header = () => {
  const navigate = useNavigate();

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e0e0e0',
        padding: '8px 24px',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo */}
        <Box display="flex" alignItems="center">
          <img
            src={logo}  // Use the imported image
            alt="Lotus"
            style={{ marginRight: '24px', height: '40px', width: '95px' }}
          />
        </Box>

        {/* Bảng tin và Đặt chỗ nằm ở giữa */}
        <Box display="flex" alignItems="center">
          <Button
            onClick={() => navigate('/new-feeds')}
            color="inherit"
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px 16px',
              borderRadius: '8px',
              backgroundColor: '#1976d2',
              color: '#ffffff',
              '&:hover': {
                backgroundColor: '#1565c0',
              },
              transition: 'background-color 0.3s',
            }}
          >
            <HomeIcon sx={{ fontSize: 24, marginRight: '8px', color: '#ffffff' }} />
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Bảng tin
            </Typography>
          </Button>
          <Button
            color="inherit"
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: 3,
              padding: '8px 16px',
              borderRadius: '8px',
              backgroundColor: '#1976d2',
              color: '#ffffff',
              '&:hover': {
                backgroundColor: '#388e3c',
              },
              transition: 'background-color 0.3s',
            }}
          >
            <CalendarTodayIcon sx={{ fontSize: 24, marginRight: '8px', color: '#ffffff' }} />
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Đặt chỗ
            </Typography>
          </Button>
        </Box>

        {/* Biểu tượng tìm kiếm, thông báo và avatar */}
        <Box display="flex" alignItems="center">
          <IconButton
            sx={{
              color: '#333333',
              '&:hover': {
                color: '#1976d2',
              },
            }}
          >
            <Search />
          </IconButton>
          <IconButton
            sx={{
              color: '#333333',
              '&:hover': {
                color: '#d32f2f',
              },
              marginLeft: '16px',
            }}
          >
            <Notifications />
          </IconButton>
          <Avatar
            alt="User Avatar"
            src="/static/images/avatar/1.jpg"
            sx={{
              width: 40,
              height: 40,
              marginLeft: '16px',
              border: '2px solid #e0e0e0',
            }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
