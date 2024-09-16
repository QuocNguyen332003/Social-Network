import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Avatar, Divider, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import { Add } from '@mui/icons-material';
import { User } from '../../../interface/interface';

interface SavedSidebarProps {
  user: User;
  onSelectCollection: (collectionId: string | null) => void; // Truyền callback khi chọn bộ sưu tập
}

const SavedSidebar: React.FC<SavedSidebarProps> = ({ user, onSelectCollection }) => {
  const [openDialog, setOpenDialog] = useState(false); // Quản lý hộp thoại
  const [newCollectionName, setNewCollectionName] = useState(''); // Quản lý tên bộ sưu tập mới

  // Xử lý mở/đóng hộp thoại
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewCollectionName(''); // Reset tên sau khi đóng
  };

  // Xử lý khi click vào nút "Tạo bộ sưu tập mới"
  const handleCreateCollection = () => {
    if (newCollectionName.trim()) {
      const newCollection = {
        _id: `collection${user.collections.length + 1}`,
        name: newCollectionName,
        items: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        _destroy: new Date(),
      };

      // Thêm bộ sưu tập mới vào danh sách bộ sưu tập của user
      user.collections.push(newCollection);

      handleCloseDialog(); // Đóng hộp thoại sau khi tạo xong
    }
  };

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
        }}
        startIcon={<Add />}
        onClick={handleOpenDialog} // Mở hộp thoại tạo bộ sưu tập mới
      >
        Tạo bộ sưu tập mới
      </Button>

      {/* Dialog tạo bộ sưu tập mới */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Tạo bộ sưu tập mới</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Tên bộ sưu tập"
            fullWidth
            value={newCollectionName}
            onChange={(e) => setNewCollectionName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button onClick={handleCreateCollection} variant="contained">
            Tạo
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SavedSidebar;
