import React from 'react';
import { List, ListItem, ListItemText, Avatar, Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

const StyledListItem = styled(ListItem)({
  position: 'relative',
  paddingLeft: '16px',
  '&::before': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '4px',
    backgroundColor: '#1976d2', // Sử dụng màu sắc cố định thay vì theme
  },
  '&:hover': {
    backgroundColor: '#f5f5f5', // Màu sắc khi hover
  },
});

const SidebarRight = () => {
  const contacts = ['Nguyễn Bảo Quốc', 'Nguyễn Bảo Quốc', 'Nguyễn Bảo Quốc'];

  return (
    <Box sx={{ padding: '16px' }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
        Người liên hệ
      </Typography>
      <List>
        {contacts.map((name, index) => (
          <StyledListItem key={index} sx={{ mb: 1 }}>
            <Avatar alt={name} src="/static/images/avatar/1.jpg" />
            <ListItemText primary={name} sx={{ marginLeft: '16px' }} />
          </StyledListItem>
        ))}
      </List>
    </Box>
  );
};

export default SidebarRight;
