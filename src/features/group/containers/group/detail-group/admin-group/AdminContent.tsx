import { Box, Typography, Avatar, Button, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';

const admins = [
  { name: 'Jada Jackson', username: '@Jadajackson', role: 'You', joined: '335 days ago', avatar: '/static/images/avatar/1.jpg' },
  { name: 'Craig Saris', username: '@Jadajackson', role: '', joined: '335 days ago', avatar: '/static/images/avatar/2.jpg' },
  { name: 'Jada Jackson', username: '@Jadajackson', role: 'You', joined: '335 days ago', avatar: '/static/images/avatar/1.jpg' },
  { name: 'Craig Saris', username: '@Jadajackson', role: '', joined: '335 days ago', avatar: '/static/images/avatar/2.jpg' },
  { name: 'Jada Jackson', username: '@Jadajackson', role: 'You', joined: '335 days ago', avatar: '/static/images/avatar/1.jpg' },
  { name: 'Craig Saris', username: '@Jadajackson', role: '', joined: '335 days ago', avatar: '/static/images/avatar/2.jpg' },
  { name: 'Jada Jackson', username: '@Jadajackson', role: 'You', joined: '335 days ago', avatar: '/static/images/avatar/1.jpg' },
  { name: 'Craig Saris', username: '@Jadajackson', role: '', joined: '335 days ago', avatar: '/static/images/avatar/2.jpg' },
];

const AdminContent = () => {
  return (
    <Box sx={{ padding: 2, backgroundColor: '#e9e9e9', height: '60vh',
      overflowY: 'auto', 
      scrollbarWidth: 'none',
      '&::-webkit-scrollbar': {
        display: 'none',
      } }}>
      {/* Admin List Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
        <Typography variant="h5" fontWeight="bold">Quản trị viên</Typography>
        <Button variant="contained" color="primary">
          Thêm quản trị viên
        </Button>
      </Box>

      {/* Admin List */}
      <Box sx={{ padding: 2, backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
        <List>
          {admins.map((admin, index) => (
            <ListItem key={index} sx={{ borderBottom: '1px solid #e0e0e0' }}>
              <ListItemAvatar>
                <Avatar src={admin.avatar} alt={admin.name} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="h6" fontWeight="bold">
                    {admin.name} <span style={{ color: '#1976d2' }}>{admin.role}</span>
                  </Typography>
                }
                secondary={`Joined ${admin.joined}`}
              />
              <Button variant="outlined" color="error">
                Xóa quản trị viên
              </Button>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default AdminContent;
