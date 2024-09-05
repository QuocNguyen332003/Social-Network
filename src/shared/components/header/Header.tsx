import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar, Box, Button, TextField, InputAdornment } from '@mui/material';
import { Search, Notifications, Close } from '@mui/icons-material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/images/logoSocialNetwork.png';  // Adjust the path

const userID = "Phan Minh Quan"

const Header = () => {
  const navigate = useNavigate();
  const [searchMode, setSearchMode] = useState(false); // Trạng thái để quản lý chế độ tìm kiếm
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const toggleSearchMode = () => {
    setSearchMode((prevMode) => !prevMode); // Chuyển đổi giữa chế độ tìm kiếm và hiển thị nút
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
        {/* Logo */}
        <Box display="flex" alignItems="center">
          <img
            src={logo}  // Use the imported image
            alt="Lotus"
            style={{ marginRight: '24px', height: '40px', width: '95px' }}
          />
        </Box>

        {/* Điều chỉnh để hiển thị thanh tìm kiếm hoặc các nút "Bảng Tin" và "Đặt Chỗ" */}
        <Box display="flex" alignItems="center" sx={{ justifyContent: 'center', flexGrow: 1 }}>
          {searchMode ? (
            // Thanh tìm kiếm
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
                backgroundColor: '#f5f5f5', // Màu nền nhẹ
                borderRadius: '25px', // Bo tròn cạnh
                boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)', // Hiệu ứng đổ bóng
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    border: 'none', // Bỏ viền mặc định
                  },
                  '&:hover fieldset': {
                    border: '1px solid #1976d2', // Viền khi hover
                  },
                  '&.Mui-focused fieldset': {
                    border: '1px solid #1976d2', // Viền khi focus
                    boxShadow: '0px 4px 8px rgba(0, 123, 255, 0.2)', // Đổ bóng khi focus
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
            // Nút Bảng Tin và Đặt Chỗ khi không ở chế độ tìm kiếm
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

        {/* Biểu tượng tìm kiếm, thông báo, và avatar */}
        <Box display="flex" alignItems="center">
          <IconButton
            sx={{
              color: '#333333',
              '&:hover': {
                color: '#1976d2',
              },
            }}
            onClick={toggleSearchMode} // Nút tìm kiếm để chuyển đổi chế độ
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
          <IconButton aria-label="delete" onClick={() => navigate(`/profile/${userID}`)}>
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
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
