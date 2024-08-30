import React from 'react';
import { Box, Typography, Button, Avatar } from '@mui/material';

const GroupHeader = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        backgroundImage: 'url(/src/assets/images/background-login.png)',
        height: '200px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      {/* Group Info and Avatar */}
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

      {/* Edit Group Button at the Top Right */}
      <Box sx={{ position: 'absolute', top: '16px', right: '16px', display: 'flex', alignItems: 'center' }}>
        <Button variant="contained" sx={{ marginRight: '8px' }}>
          Chỉnh sửa nhóm
        </Button>
      </Box>

      {/* Invite and Share Buttons below the Edit Button with more spacing */}
      <Box sx={{ position: 'absolute', top: '150px', right: '16px', display: 'flex', alignItems: 'center' }}>
        <Button variant="contained" sx={{ marginRight: '8px' }}>
          Mời thành viên
        </Button>
        <Button variant="contained">
          Chia sẻ
        </Button>
      </Box>
    </Box>
  );
};

export default GroupHeader;
