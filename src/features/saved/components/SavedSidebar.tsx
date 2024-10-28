import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import { Add, MoreHoriz } from '@mui/icons-material';
import { User } from '../../../interface/interface';
import axios from 'axios';
import { toast } from 'react-toastify';

interface SavedSidebarProps {
  user: User | null;
  onSelectCollection: (collectionId: string | null) => void;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  defaultCollectionId: string | null; // Nhận thêm prop defaultCollectionId
}

const SavedSidebar: React.FC<SavedSidebarProps> = ({ user, onSelectCollection, setUser, defaultCollectionId }) => {
  const token = sessionStorage.getItem('token'); // Lấy token từ sessionStorage
  const [openDialog, setOpenDialog] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [editingCollection, setEditingCollection] = useState<string | null>(null);

  // Tự động chọn bộ sưu tập mặc định khi component mount
  useEffect(() => {
    if (defaultCollectionId) {
      onSelectCollection(defaultCollectionId);
    }
  }, [defaultCollectionId, onSelectCollection]);

  const handleOpenDialog = (collectionId: string | null = null) => {
    if (collectionId) {
      const collection = user?.collections.find(col => col._id === collectionId);
      if (collection) {
        setNewCollectionName(collection.name); // Set tên bộ sưu tập đang được chỉnh sửa
        setEditingCollection(collectionId); // Cập nhật bộ sưu tập đang chỉnh sửa
      }
    } else {
      setNewCollectionName(''); // Reset tên cho bộ sưu tập mới
      setEditingCollection(null); // Reset trạng thái chỉnh sửa
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewCollectionName('');
  };

  const handleCreateCollection = async () => {
    if (newCollectionName.trim() && user) {
      try {
        const response = await axios.post('http://localhost:3000/v1/saved',  {
          userId: user._id,
          name: newCollectionName
        }, {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        });

        const { collection } = response.data;
        setUser((prevUser) =>
          prevUser ? { ...prevUser, collections: [...prevUser.collections, collection] } : prevUser
        );
        handleCloseDialog();
        toast.success('Bộ sưu tập đã được tạo thành công!');
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          toast.error(`Error while calling API: ${error.message}`);
        } else {
          toast.error('Unknown error occurred!');
        }
      }
    }
  };

  const handleEditCollection = async () => {
    if (editingCollection && newCollectionName.trim() && user) {
      try {
        await axios.put(`http://localhost:3000/v1/saved/${editingCollection}`, {
          userId: user._id,
          newName: newCollectionName
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        });

        const updatedCollections = user.collections.map(col => {
          if (col._id === editingCollection) {
            return { ...col, name: newCollectionName };
          }
          return col;
        });
        setUser({ ...user, collections: updatedCollections });
        handleCloseDialog();
        toast.success('Bộ sưu tập đã được chỉnh sửa thành công!');
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          toast.error(`Error while editing collection: ${error.message}`);
        } else {
          toast.error('Unknown error occurred!');
        }
      }
    }
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, collectionId: string) => {
    setAnchorEl(event.currentTarget);
    setEditingCollection(collectionId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setEditingCollection(null);
  };

  const handleDeleteCollection = async () => {
    if (editingCollection && user) {
      try {
        await axios.patch(`http://localhost:3000/v1/saved/${editingCollection}/delete`, {
          userId: user._id
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        });

        const updatedCollections = user.collections.map(col => {
          if (col._id === editingCollection) {
            return { ...col, _destroy: new Date() }; // Đánh dấu bộ sưu tập là đã xóa
          }
          return col;
        });

        setUser({ ...user, collections: updatedCollections });
        onSelectCollection(null);
        handleMenuClose();
        toast.success('Bộ sưu tập đã được xóa thành công!');
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          toast.error(`${error.message}`);
        } else {
          toast.error('Lỗi không xác định');
        }
      }
    }
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', padding: { xs: 2, sm: 3 }, gap: 2, fontFamily: 'Arial, sans-serif' }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1e88e5', fontSize: { xs: '1.2rem', sm: '1.4rem' }, marginBottom: 1 }}>
        Bộ Sưu Tập Của Tôi
      </Typography>

      <List sx={{ gap: 1, display: 'flex', flexDirection: 'column' }}>
        {user?.collections.filter(col => !col._destroy).map((collection, index) => (
          <ListItem
            button
            key={index}
            sx={{
              borderRadius: 2,
              backgroundColor: collection._id === editingCollection ? '#BBDEFB' : '#f5f5f5',
              padding: { xs: 1, sm: 1.5 },
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              '&:hover': { backgroundColor: '#e3f2fd' }
            }}
            onClick={() => {
              onSelectCollection(collection._id);
              setEditingCollection(collection._id);
            }}
          >
            <Avatar alt={collection.name} sx={{ width: { xs: 24, sm: 32 }, height: { xs: 24, sm: 32 } }} />
            <ListItemText 
              primary={collection.name} 
              sx={{ 
                color: '#424242', 
                fontSize: { xs: '0.9rem', sm: '1rem' }, 
                fontWeight: '500' 
              }} 
            />
            {collection.name !== 'Tất cả mục đã lưu' && (
              <IconButton onClick={(e) => { e.stopPropagation(); handleMenuClick(e, collection._id); }}>
                <MoreHoriz />
              </IconButton>
            )}
          </ListItem>
        ))}
      </List>

      <Button variant="contained" sx={{ width: '100%', padding: { xs: 1, sm: 1.5 }, borderRadius: 3, backgroundColor: '#1e88e5', fontSize: { xs: '0.9rem', sm: '1rem' }, ':hover': { backgroundColor: '#1565c0' } }} startIcon={<Add />} onClick={() => handleOpenDialog()}>
        Tạo Bộ Sưu Tập Mới
      </Button>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editingCollection ? 'Chỉnh Sửa Bộ Sưu Tập' : 'Tạo Bộ Sưu Tập Mới'}</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" label="Tên Bộ Sưu Tập" fullWidth value={newCollectionName} onChange={(e) => setNewCollectionName(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button onClick={editingCollection ? handleEditCollection : handleCreateCollection} variant="contained">
            {editingCollection ? 'Chỉnh Sửa' : 'Tạo'}
          </Button>
        </DialogActions>
      </Dialog>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={() => { handleOpenDialog(editingCollection); }}>Chỉnh Sửa</MenuItem>
        <MenuItem onClick={handleDeleteCollection} style={{ color: 'red' }}>Xóa</MenuItem>
      </Menu>
    </Box>
  );
};

export default SavedSidebar;
