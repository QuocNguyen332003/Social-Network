import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Button, TextField, InputAdornment } from '@mui/material';
import { Search, Close } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/images/QQ Social.png';  // Adjust the path
import NotificationMenu from './menu-header/NotificationMenu'; // Import NotificationMenu
import UserAvatarMenu from './menu-header/UserAvatarMenu';    // Import UserAvatarMenu

const Header = () => {
  const navigate = useNavigate();
  const [searchMode, setSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const toggleSearchMode = () => {
    setSearchMode((prevMode) => !prevMode);
  };

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
        <Box display="flex" alignItems="center">
          <img
            src={logo}
            alt="Lotus"
            style={{ marginRight: '24px', height: '80px', width: '80px' }}
          />
        </Box>

        <Box display="flex" alignItems="center" sx={{ justifyContent: 'center', flexGrow: 1 }}>
          {searchMode ? (
            <TextField
              value={searchQuery}
              onChange={handleSearchChange}
              variant="outlined"
              size="small"
              placeholder="Tìm kiếm..."
              sx={{
                width: '100%',
                maxWidth: 600,
                marginRight: '16px',
                backgroundColor: '#f5f5f5',
                borderRadius: '25px',
                boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    border: 'none',
                  },
                  '&:hover fieldset': {
                    border: '1px solid #1976d2',
                  },
                  '&.Mui-focused fieldset': {
                    border: '1px solid #1976d2',
                    boxShadow: '0px 4px 8px rgba(0, 123, 255, 0.2)',
                  },
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleSearchMode}>
                      <Close />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          ) : (
            <>
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
            </>
          )}
        </Box>

        <Box display="flex" alignItems="center">
          <IconButton
            sx={{
              color: '#333333',
              '&:hover': {
                color: '#1976d2',
              },
            }}
            onClick={toggleSearchMode}
          >
            <Search />
          </IconButton>

          {/* Notification Menu */}
          <NotificationMenu />

          {/* User Avatar Menu */}
          <UserAvatarMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
