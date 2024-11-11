import { Box, CircularProgress, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import GroupIcon from '@mui/icons-material/Group';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CollectionsIcon from '@mui/icons-material/Collections';
import ChatIcon from '@mui/icons-material/Chat';
import { useNavigate } from 'react-router-dom'; // Thêm hook useNavigate
import axios from 'axios';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Content } from '../../../features/conversations/containers/interfaceMessage';

const socket = io('http://localhost:3000');

const SidebarLeft = () => {
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng
  const [unread, setUnRead] = useState<Content[] | null>(null);
  const currentUserId = sessionStorage.getItem('userId') || '';
  const token = sessionStorage.getItem('token');

  useEffect(()=> {
    getNumberUnread();
  }, []);
  
  useEffect(()=> {
    console.log(unread);
    if (unread !== null){
      socket.on(`unread-massages-${currentUserId}`, (data) => {
        setUnRead((prevUnRead) => {
          if (!data.newContent) return prevUnRead;
      
          // Tìm chỉ mục của phần tử có userId tương ứng trong prevUnRead
          const existingIndex = prevUnRead?.findIndex((item) => item.userId === data.newContent!.userId);
      
          if (existingIndex !== -1 && existingIndex !== undefined) {
            // Nếu phần tử đã tồn tại, tạo một mảng mới với nội dung cập nhật
            const updatedUnRead = prevUnRead ? [...prevUnRead] : [];
            updatedUnRead[existingIndex] = data.newContent;
            return updatedUnRead;
          } else {
            // Nếu không tồn tại, thêm newContent vào danh sách
            return prevUnRead ? [...prevUnRead, data.newContent] : [data.newContent];
          }
        });
      });
      socket.on(`read-massages-${currentUserId}`, (data) => {
        const updatedUnRead = unread.filter((item) => item.userId !== data.newContent.userId);
        setUnRead(updatedUnRead);
      });
    }
  }), [unread];

  const getNumberUnread = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/v1/messages/friends/unread/${currentUserId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        }
      );
      setUnRead(response.data.data);
    } catch (error) {
      console.error('Lỗi khi lấy bài viết:', error);
    } finally {
    }
  }

  if (unread === null) return <CircularProgress/>
  
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
        <ListItem button onClick={() => navigate('/group')}>
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
        <ListItem button onClick={() => navigate(`/messages`)}>
          <ListItemIcon>
            <ChatIcon sx={{ color: '#8b9dc3' }} />
          </ListItemIcon>
          <ListItemText primary="Message" />
          {unread.length > 0 && 
          <Box sx={{
            width: 20, height:20, 
            backgroundColor: '#f84019', borderRadius: 50,
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            }}>
            <Typography color={'white'}>{unread.length}</Typography>
          </Box>}
        </ListItem>
      </List>
    </div>
  );
};

export default SidebarLeft;
