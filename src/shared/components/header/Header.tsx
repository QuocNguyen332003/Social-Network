import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/images/logo.png'; // Adjust the path
import NotificationMenu from './menu-header/NotificationMenu'; // Import NotificationMenu
import UserAvatarMenu from './menu-header/UserAvatarMenu'; // Import UserAvatarMenu

const Header = () => {
  const navigate = useNavigate();

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e0e0e0',
        padding: '0px 24px',
        maxHeight: '15vh'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box display="flex" alignItems="center">
          <img
            src={logo}
            alt="Lotus"
            style={{ marginRight: '24px', height: '60px', width: 'auto' }}
          />
        </Box>

        <Box display="flex" alignItems="center" sx={{ justifyContent: 'center', flexGrow: 1 }}>
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
          {/* <Button
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
          </Button> */}
        </Box>

        <Box display="flex" alignItems="center">
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
