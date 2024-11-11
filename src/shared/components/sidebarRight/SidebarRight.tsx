import { List, ListItem, ListItemText, Avatar, Box, Typography, ListItemButton } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Contacts } from '../../../interface/contactsInterface';

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
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const token = sessionStorage.getItem('token');
  const currentUserId = sessionStorage.getItem('userId') || '';

  const [contacts, setContacts] = useState<Contacts[]>([]);

  useEffect(()=> {
    getDataFriend();
  }, [])

  const getDataFriend = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/v1/user/friends/${currentUserId}`, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setContacts(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy bài viết:', error);
      setError('Lỗi khi tải bài viết. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false); 
    }
  }
  if (contacts.length <= 0) return <></>
  return (
    <Box sx={{ padding: '16px', borderLeft: '1px solid #e0e0e0', height: '85vh' }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
        Người liên hệ
      </Typography>
      <List>
        {contacts.map((contact, index) => (
          <ListItemButton key={index} sx={{ mb: 1 }}
            onClick={() => navigate(`/messages?userIDStart=${contact._id}`)}>
            <Avatar alt={contact.name} src={contact.avt.link} />
            <ListItemText primary={contact.name} sx={{ marginLeft: '16px' }} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default SidebarRight;
