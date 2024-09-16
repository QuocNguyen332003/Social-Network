import { List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupIcon from '@mui/icons-material/Group';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { useNavigate } from 'react-router-dom'; // Thêm hook useNavigate
import { useEffect, useState } from 'react';

const SidebarLeftFriends = () => {
  const navigate = useNavigate();
  const [currTab, setCurrTab] = useState<number|null>(null);

  useEffect(()=> {
    const url = window.location.pathname;
    const parts = url.split("/");
    const page = parts[2];
    
    if (page == 'friends-suggest'){setCurrTab(1)}
    else if (page == 'friends-request'){setCurrTab(2)}
    else if (page == 'my-friends-request'){setCurrTab(3)}
    else {setCurrTab(0)}
  }, []);

  return (
    <div style={{ padding: '16px', borderRight: '1px solid #e0e0e0', height: '85vh' }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
        Truy cập nhanh
      </Typography>
      <List>
        <ListItem button onClick={() => {navigate('/friends'); setCurrTab(0)}} 
          sx={currTab == 0? {backgroundColor: '#e9e9e9'}: {}}>
          <ListItemIcon >
            <Diversity3Icon sx={{ color: '#8b9dc3' }}/>  
          </ListItemIcon>
          <ListItemText primary="Tất cả bạn bè" />
        </ListItem>
        <ListItem button onClick={() => {navigate('/friends/friends-suggest'); setCurrTab(1)}} 
          sx={currTab == 1? {backgroundColor: '#e9e9e9'}: {}}>
          <ListItemIcon>
            <GroupIcon sx={{ color: '#8b9dc3' }} />
          </ListItemIcon>
          <ListItemText primary="Gợi ý" />
        </ListItem>
        <ListItem button onClick={() => {navigate('/friends/friends-request'); setCurrTab(2)}} 
          sx={currTab == 2? {backgroundColor: '#e9e9e9'}: {}}>
          <ListItemIcon>
            <GroupAddIcon sx={{ color: '#8b9dc3' }} />
          </ListItemIcon>
          <ListItemText primary="Lời mời kết bạn" />
        </ListItem>
        <ListItem button onClick={() => {navigate('/friends/my-friends-request'); setCurrTab(3)}} 
          sx={currTab == 3? {backgroundColor: '#e9e9e9'}: {}}>
          <ListItemIcon>
            <PersonAddIcon sx={{ color: '#8b9dc3' }} />
          </ListItemIcon>
          <ListItemText primary="Lời mời kết bạn của tôi" />
        </ListItem>
        <ListItem button onClick={() => navigate('/new-feeds')}>
          <ListItemIcon>
            <ArrowCircleLeftIcon sx={{ color: '#8b9dc3' }} />
          </ListItemIcon>
          <ListItemText primary="Quay lại" />
        </ListItem>
      </List>
    </div>
  );
};

export default SidebarLeftFriends;
