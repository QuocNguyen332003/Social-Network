import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Avatar, Divider, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import { User } from '../../../interface/interface'; 

interface SavedSidebarProps {
  user: User;
  onSelectCollection: (collectionId: string | null) => void; // Truyền callback khi chọn bộ sưu tập
}

const SavedSidebar: React.FC<SavedSidebarProps> = ({ user, onSelectCollection }) => {
  const handleSavedClick = () => {
    onSelectCollection(null); // Khi click vào "Mục đã lưu" thì đặt collectionId là null (hiển thị tất cả bài viết)
  };

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: { xs: 2, sm: 3 },
        gap: 2,
        backgroundColor: '#fafafa',
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: 'bold',
            color: '#1e88e5',
            fontSize: { xs: '1.2rem', sm: '1.5rem' },
          }}
        >
          Đã lưu
        </Typography>
      </Box>

      {/* "Mục đã lưu" */}
      <List>
        <ListItem
          button
          sx={{
            borderRadius: 2,
            backgroundColor: '#e3f2fd',
            padding: { xs: 1, sm: 1.5 },
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
          onClick={handleSavedClick}
        >
          <Avatar
            sx={{
              backgroundColor: '#1e88e5',
              width: { xs: 24, sm: 32 },
              height: { xs: 24, sm: 32 },
            }}
          />
          <ListItemText
            primary="Mục đã lưu"
            sx={{
              color: '#424242',
              fontWeight: 'bold',
              fontSize: { xs: '0.9rem', sm: '1rem' },
            }}
          />
        </ListItem>
      </List>

      <Divider sx={{ my: 2 }} />

      {/* Collection list */}
      <Typography
        variant="subtitle1"
        color="gray"
        sx={{
          fontWeight: 'bold',
          fontSize: { xs: '0.9rem', sm: '1rem' },
        }}
      >
        Bộ sưu tập của tôi
      </Typography>
      <List sx={{ gap: 1, display: 'flex', flexDirection: 'column' }}>
        {user.collections.map((collection, index) => (
          <ListItem
            button
            key={index}
            sx={{
              borderRadius: 2,
              backgroundColor: '#f5f5f5',
              padding: { xs: 1, sm: 1.5 },
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
            onClick={() => onSelectCollection(collection._id)} // Chọn bộ sưu tập
          >
            <Avatar
              alt={collection.name}
              src={`/static/images/${collection.name.toLowerCase()}.jpg`}
              sx={{
                width: { xs: 24, sm: 32 },
                height: { xs: 24, sm: 32 },
              }}
            />
            <ListItemText
              primary={collection.name}
              sx={{
                color: '#424242',
                fontSize: { xs: '0.9rem', sm: '1rem' },
              }}
            />
          </ListItem>
        ))}
      </List>

      <Button
        variant="contained"
        sx={{
          width: '100%',
          padding: { xs: 1, sm: 1.5 },
          borderRadius: 3,
          backgroundColor: '#1e88e5',
          fontSize: { xs: '0.9rem', sm: '1rem' },
          ':hover': { backgroundColor: '#1565c0' },
          marginTop: 'auto',
        }}
        startIcon={<Add />}
      >
        Tạo bộ sưu tập mới
      </Button>
    </Box>
  );
};

export default SavedSidebar;
