import React from 'react';
import { Box, Typography, Button, Avatar } from '@mui/material';

const GroupHeader = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        backgroundImage: 'url(/src/assets/images/background-login.png)',
        height: '200px',
        backgroundSize: 'cover', // Ensures the image covers the container
        backgroundPosition: 'center', // Centers the image
        backgroundRepeat: 'no-repeat', // Prevents the image from repeating
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', alignItems: 'center' }}>
        <Avatar src="/src/assets/images/background-login.png" sx={{ width: '80px', height: '80px', border: '4px solid white' }} />
        <Box sx={{ marginLeft: '16px' }}>
          <Typography variant="h5" color="black" fontWeight="bold">
            Cat Lover Universe
          </Typography>
          <Typography variant="body1" color="black">
            33 Bài đăng · 4556 Thành viên
          </Typography>
        </Box>
      </Box>
      <Box sx={{ position: 'absolute', top: '16px', right: '16px', display: 'flex', alignItems: 'center' }}>
        <Button variant="contained" color="primary" sx={{ marginRight: '8px' }}>
          Chỉnh sửa nhóm
        </Button>
        <Button variant="contained">Chia sẻ</Button>
      </Box>
    </Box>
  );
};

export default GroupHeader;
