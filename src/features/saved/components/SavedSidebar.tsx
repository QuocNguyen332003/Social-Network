import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Avatar, Divider, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, IconButton, Menu, MenuItem } from '@mui/material';
import { Add, MoreHoriz } from '@mui/icons-material';
import { User } from '../../../interface/interface';

interface SavedSidebarProps {
  user: User;
  onSelectCollection: (collectionId: string | null) => void;
  setUser: React.Dispatch<React.SetStateAction<User>>; // Add setUser prop to update user
}

const SavedSidebar: React.FC<SavedSidebarProps> = ({ user, onSelectCollection, setUser }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // State for menu anchor
  const [editingCollection, setEditingCollection] = useState<string | null>(null); // State to track editing collection

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewCollectionName('');
  };

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

      user.collections.push(newCollection);
      setUser({ ...user }); // Cập nhật user với bộ sưu tập mới
      handleCloseDialog();
    }
  };

  const handleSavedClick = () => {
    onSelectCollection(null);
  };

  // Mở menu
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, collectionId: string) => {
    setAnchorEl(event.currentTarget);
    setEditingCollection(collectionId); // Set bộ sưu tập đang được chọn
  };

  // Đóng menu
  const handleMenuClose = () => {
    setAnchorEl(null);
    setEditingCollection(null);
  };

  // Xử lý việc xóa bộ sưu tập
  const handleDeleteCollection = () => {
    if (editingCollection) {
      const updatedCollections = user.collections.filter(col => col._id !== editingCollection);
      setUser({ ...user, collections: updatedCollections });
      onSelectCollection(null); // Xoá xong thì trở về hiển thị tất cả các bài viết
      handleMenuClose();
    }
  };

  // Chỉnh sửa tên bộ sưu tập
  const handleEditCollection = () => {
    const updatedCollections = user.collections.map(col => {
      if (col._id === editingCollection && newCollectionName.trim()) {
        return { ...col, name: newCollectionName };
      }
      return col;
    });
    setUser({ ...user, collections: updatedCollections });
    handleCloseDialog();
    handleMenuClose();
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', padding: { xs: 2, sm: 3 }, gap: 2, backgroundColor: '#fafafa' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold', color: '#1e88e5', fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
          Đã lưu
        </Typography>
      </Box>

      <List>
        <ListItem button sx={{ borderRadius: 2, backgroundColor: '#e3f2fd', padding: { xs: 1, sm: 1.5 }, display: 'flex', alignItems: 'center', gap: 2 }} onClick={handleSavedClick}>
          <Avatar sx={{ backgroundColor: '#1e88e5', width: { xs: 24, sm: 32 }, height: { xs: 24, sm: 32 } }} />
          <ListItemText primary="Mục đã lưu" sx={{ color: '#424242', fontWeight: 'bold', fontSize: { xs: '0.9rem', sm: '1rem' } }} />
        </ListItem>
      </List>

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle1" color="gray" sx={{ fontWeight: 'bold', fontSize: { xs: '0.9rem', sm: '1rem' } }}>
        Bộ sưu tập của tôi
      </Typography>
      <List sx={{ gap: 1, display: 'flex', flexDirection: 'column' }}>
        {user.collections.map((collection, index) => (
          <ListItem
            button
            key={index}
            sx={{ borderRadius: 2, backgroundColor: '#f5f5f5', padding: { xs: 1, sm: 1.5 }, display: 'flex', alignItems: 'center', gap: 2 }}
            onClick={() => onSelectCollection(collection._id)}
          >
            <Avatar alt={collection.name} src={`/static/images/${collection.name.toLowerCase()}.jpg`} sx={{ width: { xs: 24, sm: 32 }, height: { xs: 24, sm: 32 } }} />
            <ListItemText primary={collection.name} sx={{ color: '#424242', fontSize: { xs: '0.9rem', sm: '1rem' } }} />
            <IconButton onClick={(e) => { e.stopPropagation(); handleMenuClick(e, collection._id); }}>
              <MoreHoriz />
            </IconButton>
          </ListItem>
        ))}
      </List>

      <Button variant="contained" sx={{ width: '100%', padding: { xs: 1, sm: 1.5 }, borderRadius: 3, backgroundColor: '#1e88e5', fontSize: { xs: '0.9rem', sm: '1rem' }, ':hover': { backgroundColor: '#1565c0' } }} startIcon={<Add />} onClick={handleOpenDialog}>
        Tạo bộ sưu tập mới
      </Button>

      {/* Dialog tạo bộ sưu tập mới */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editingCollection ? 'Chỉnh sửa bộ sưu tập' : 'Tạo bộ sưu tập mới'}</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" label="Tên bộ sưu tập" fullWidth value={newCollectionName} onChange={(e) => setNewCollectionName(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button onClick={editingCollection ? handleEditCollection : handleCreateCollection} variant="contained">
            {editingCollection ? 'Chỉnh sửa' : 'Tạo'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Menu hiển thị khi bấm dấu ba chấm */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleOpenDialog}>Chỉnh sửa</MenuItem>
        <MenuItem onClick={handleDeleteCollection} style={{ color: 'red' }}>Xóa</MenuItem>
      </Menu>
    </Box>
  );
};

export default SavedSidebar;
