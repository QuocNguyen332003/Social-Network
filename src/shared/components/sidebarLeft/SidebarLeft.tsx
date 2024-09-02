import { List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import GroupIcon from '@mui/icons-material/Group';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CollectionsIcon from '@mui/icons-material/Collections';
import ChatIcon from '@mui/icons-material/Chat';
import { useNavigate } from 'react-router-dom'; // Thêm hook useNavigate

const SidebarLeft = () => {
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

  return (
    <div style={{ padding: '16px', borderRight: '1px solid #e0e0e0', height: '85vh' }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
        Truy cập nhanh
      </Typography>
      <List>
        <ListItem button onClick={() => navigate('/friends')}>
          <ListItemIcon>
            <PeopleIcon sx={{ color: '#8b9dc3' }} />
          </ListItemIcon>
          <ListItemText primary="Bạn bè" />
        </ListItem>
        <ListItem button onClick={() => navigate('/groups')}>
          <ListItemIcon>
            <GroupIcon sx={{ color: '#8b9dc3' }} />
          </ListItemIcon>
          <ListItemText primary="Nhóm" />
        </ListItem>
        <ListItem button onClick={() => navigate('/saved')}>
          <ListItemIcon>
            <BookmarkIcon sx={{ color: '#d88d3c' }} />
          </ListItemIcon>
          <ListItemText primary="Đã Lưu" />
        </ListItem>
        <ListItem button onClick={() => navigate('/collections')}>
          <ListItemIcon>
            <CollectionsIcon sx={{ color: '#37b24d' }} />
          </ListItemIcon>
          <ListItemText primary="Bộ sưu tập" />
        </ListItem>
        <ListItem button onClick={() => navigate('/messages')}>
          <ListItemIcon>
            <ChatIcon sx={{ color: '#8b9dc3' }} />
          </ListItemIcon>
          <ListItemText primary="Message" />
        </ListItem>
      </List>
    </div>
  );
};

export default SidebarLeft;
