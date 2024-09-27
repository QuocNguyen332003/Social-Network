import { List, ListItem, ListItemText, Avatar, Box, Typography, ListItemButton } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

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
  const contacts = [
    {
      userID: "u123",
      avt: "/src/assets/data-test/avt1.png",
      name: "John Doe",
    },
    {
      userID: "u456",
      avt: "/src/assets/data-test/avt2.jpg",
      name: "Jane Smith",
    },
    {
      userID: "u789",
      avt: "/src/assets/data-test/avt3.jpg",
      name: "Emily Johnson",
    },
    {
      userID: "u321",
      avt: "/src/assets/data-test/avt4.jpeg",
      name: "Michael Brown",
    },
    {
      userID: "u654",
      avt: "/src/assets/data-test/avt1.png",
      name: "Sophia Davis",
    }
  ];
  return (
    <Box sx={{ padding: '16px', borderLeft: '1px solid #e0e0e0', height: '85vh' }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
        Người liên hệ
      </Typography>
      <List>
        {contacts.map((contact, index) => (
          <ListItemButton key={index} sx={{ mb: 1 }}
            onClick={() => navigate(`/messages?userIDStart=${contact.userID}`)}>
            <Avatar alt={contact.name} src={contact.avt} />
            <ListItemText primary={contact.name} sx={{ marginLeft: '16px' }} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default SidebarRight;
