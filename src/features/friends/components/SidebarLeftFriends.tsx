import { List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupIcon from '@mui/icons-material/Group';
import { useNavigate } from 'react-router-dom'; // Thêm hook useNavigate

const SidebarLeftFriends = () => {
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

  return (
    <div style={{ padding: '16px', borderRight: '1px solid #e0e0e0', height: '85vh' }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
        Truy cập nhanh
      </Typography>
      <List>
        <ListItem button onClick={() => navigate('/friends')}>
          <ListItemIcon>
            <Diversity3Icon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Tất cả bạn bè" />
        </ListItem>
        <ListItem button onClick={() => navigate('/friends/friends-suggest')}>
          <ListItemIcon>
            <GroupIcon sx={{ color: '#8b9dc3' }} />
          </ListItemIcon>
          <ListItemText primary="Gợi ý" />
        </ListItem>
        <ListItem button onClick={() => navigate('/friends/friends-request')}>
          <ListItemIcon>
            <GroupAddIcon sx={{ color: '#8b9dc3' }} />
          </ListItemIcon>
          <ListItemText primary="Lời mời kết bạn" />
        </ListItem>
      </List>
    </div>
  );
};

export default SidebarLeftFriends;
