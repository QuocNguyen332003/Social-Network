 
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Select,
  Checkbox,
  MenuItem,
  InputAdornment,
  InputLabel,
  FormControl,
  OutlinedInput,
  Chip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Group } from '../../../interface/interface';
import axios from 'axios';

const friends = [
  { id: '1', name: 'Alice', avatar: '/static/images/avatar/1.jpg' },
  { id: '2', name: 'Bob', avatar: '/static/images/avatar/2.jpg' },
  { id: '3', name: 'Charlie', avatar: '/static/images/avatar/3.jpg' },
];

interface GroupHeaderProps {
  group: Group;
  role: 'owner' | 'admin' | 'member' | 'none';
  onUpdateGroup: (updatedGroup: Group) => void;
}

const hobbiesOptions = ['Sports', 'Music', 'Travel', 'Technology', 'Reading', 'Art', 'Cooking', '223'];

const GroupHeader: React.FC<GroupHeaderProps> = ({ group, role, onUpdateGroup }) => {
  const token = localStorage.getItem('token'); // Lấy token từ localStorage
  const currentUserId = localStorage.getItem('userId') || '';
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openInviteDialog, setOpenInviteDialog] = useState(false);
  const [editedGroup, setEditedGroup] = useState<Group>(group);
  const [hobbies, setHobbies] = useState<string[]>(group.hobbies || []);
  const [newHobby, setNewHobby] = useState<string>('');
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [avtPreview, setAvtPreview] = useState<string | undefined>(group.avt);
  const [backGroundPreview, setBackGroundPreview] = useState<string | undefined>(group.backGround);

  useEffect(() => {
    if (group) {
      setEditedGroup(group);
      setHobbies(group.hobbies || []);
      setAvtPreview(group.avt);
      setBackGroundPreview(group.backGround);
    }
  }, [group]);

  const handleOpenEditDialog = () => setOpenEditDialog(true);
  const handleCloseEditDialog = () => setOpenEditDialog(false);

  const handleOpenInviteDialog = () => setOpenInviteDialog(true);
  const handleCloseInviteDialog = () => setOpenInviteDialog(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setEditedGroup((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddHobby = () => {
    if (newHobby && !hobbies.includes(newHobby)) {
      setHobbies([...hobbies, newHobby]);
      setNewHobby('');
    }
  };

  const handleDeleteHobby = (hobbyToDelete: string) => {
    setHobbies((prev) => prev.filter((hobby) => hobby !== hobbyToDelete));
  };

  const handleSelectFriend = (friendId: string) => {
    setSelectedFriends((prev) =>
      prev.includes(friendId) ? prev.filter((id) => id !== friendId) : [...prev, friendId]
    );
  };

  const handleUpdateGroup = async () => {
    try {
      const formData = new FormData();
      formData.append('userId', currentUserId);
      formData.append('groupName', editedGroup.groupName);
      formData.append('introduction', editedGroup.introduction);
      formData.append('hobbies', hobbies.join(','));
  
      if (editedGroup.avtFile) formData.append('avt', editedGroup.avtFile);
      if (editedGroup.backGroundFile) formData.append('backGround', editedGroup.backGroundFile);
  
      // Gửi yêu cầu cập nhật nhóm
      const response = await axios.put(`http://localhost:3000/v1/group/${editedGroup._id}/edit`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
      });
  
      if (response.status === 200) {
        onUpdateGroup(response.data.group);
        alert('Nhóm đã được cập nhật thành công!');
        handleCloseEditDialog();
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật nhóm:', error);
      alert('Có lỗi xảy ra khi cập nhật nhóm!');
    }
  };
  

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, imageType: 'avt' | 'backGround') => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const fileURL = URL.createObjectURL(file);
      if (imageType === 'avt') {
        setEditedGroup((prev) => ({ ...prev, avtFile: file }));
        setAvtPreview(fileURL);
      } else if (imageType === 'backGround') {
        setEditedGroup((prev) => ({ ...prev, backGroundFile: file }));
        setBackGroundPreview(fileURL);
      }
    }
  };
  

  const handleSendInvitations = () => {
    console.log('Inviting friends:', selectedFriends);
    handleCloseInviteDialog();
  };

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box
      sx={{
        position: 'relative',
        backgroundImage: `url(${group.backGround})`,
        height: '280px', // Increased height for better view
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'hidden',
        borderRadius: '12px', // To make it slightly rounder
      }}
    >
      {/* Text Background Box */}
      <Box
        sx={{
          position: 'absolute',
          top: '20px', // Add some space
          left: '20px', // Add some space
          padding: '20px',
          backgroundColor: 'rgba(0, 0, 0, 0.6)', // Adjust opacity for softer look
          borderRadius: '10px', // Rounder background
          maxWidth: '85%', // More space to the text container
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar src={group.avt} sx={{ width: '90px', height: '90px', border: '4px solid white', marginRight: '20px' }} />
          <Box>
            <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
              {group.groupName}
            </Typography>
            <Typography variant="body1" sx={{ color: 'white', fontWeight: 'bold', fontSize: '16px' }}>
              {group.article.count} Bài đăng · {group.members.count} Thành viên
            </Typography>
            <Typography variant="body2" sx={{ color: 'white', fontWeight: 'bold', marginTop: '8px', maxWidth: '400px' }}>
              {group.introduction}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Buttons */}
      {role === 'owner' && (
        <Box sx={{ position: 'absolute', top: '16px', right: '20px', display: 'flex', alignItems: 'center' }}>
          <Button variant="contained" sx={{ marginRight: '12px', padding: '10px 20px' }} onClick={handleOpenEditDialog}>
            Chỉnh sửa nhóm
          </Button>
        </Box>
      )}

      <Box sx={{ position: 'absolute', top: '220px', right: '20px', display: 'flex', alignItems: 'center' }}>
        <Button variant="contained" sx={{ marginRight: '12px', padding: '10px 20px' }} onClick={handleOpenInviteDialog}>
          Mời thành viên
        </Button>
      </Box>

       {/* Edit Group Dialog */}
        <Dialog
          open={openEditDialog}
          onClose={handleCloseEditDialog}
          PaperProps={{
            sx: { borderRadius: '12px', padding: '16px', maxWidth: '500px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' },
          }}
        >
          <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center', pb: 0 }}>Chỉnh sửa nhóm</DialogTitle>
          <DialogContent>
            {/* Tên nhóm */}
            <TextField
              fullWidth
              label="Tên nhóm"
              variant="outlined"
              name="groupName"
              value={editedGroup.groupName}
              onChange={handleInputChange}
              sx={{ mb: 2, mt: 2 }}
              InputProps={{
                sx: {
                  borderRadius: '8px',
                  backgroundColor: '#f9f9f9',
                },
              }}
            />

            {/* Giới thiệu nhóm */}
            <TextField
              fullWidth
              label="Giới thiệu"
              variant="outlined"
              name="introduction"
              multiline
              rows={3}
              value={editedGroup.introduction}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
              InputProps={{
                sx: {
                  borderRadius: '8px',
                  backgroundColor: '#f9f9f9',
                },
              }}
            />

            {/* Tải ảnh đại diện và ảnh nền */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Button variant="contained" component="label">
                Chọn ảnh đại diện
                <input type="file" accept="image/*" hidden onChange={(e) => handleImageUpload(e, 'avt')} />
              </Button>
              <Button variant="contained" component="label">
                Chọn ảnh nền
                <input type="file" accept="image/*" hidden onChange={(e) => handleImageUpload(e, 'backGround')} />
              </Button>
            </Box>

            {/* Hiển thị ảnh đại diện và ảnh nền */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              {avtPreview && (
                <Box sx={{ border: '1px solid #ddd', borderRadius: '8px', p: 1 }}>
                  <Typography textAlign="center" fontSize="14px" fontWeight="bold">
                    Ảnh đại diện
                  </Typography>
                  <img src={avtPreview} alt="Avatar" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
                </Box>
              )}

              {backGroundPreview && (
                <Box sx={{ border: '1px solid #ddd', borderRadius: '8px', p: 1, ml: 2 }}>
                  <Typography textAlign="center" fontSize="14px" fontWeight="bold">
                    Ảnh nền
                  </Typography>
                  <img src={backGroundPreview} alt="Background" style={{ width: '200px', height: '100px', borderRadius: '8px' }} />
                </Box>
              )}
            </Box>
              
            {/* Lựa chọn sở thích với danh sách hiện tại */}
            <Box sx={{ mb: 2 }}>
            {hobbies.map((hobby) => (
              <Chip
                key={hobby}
                label={hobby}
                onDelete={() => handleDeleteHobby(hobby)}
                sx={{ margin: '5px' }}
              />
            ))}
          </Box>
            {/* Lựa chọn sở thích */}
            {/* Chọn sở thích mới */}
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="hobbies-label">Thêm sở thích</InputLabel>
              <Select
                labelId="hobbies-label"
                value={newHobby}
                onChange={(e) => setNewHobby(e.target.value)}
                input={<OutlinedInput label="Thêm sở thích" />}
              >
                {hobbiesOptions.map((hobby) => (
                  <MenuItem key={hobby} value={hobby}>
                    {hobby}
                  </MenuItem>
                ))}
              </Select>
              <Button variant="outlined" sx={{ mt: 1 }} onClick={handleAddHobby}>
                Thêm sở thích
              </Button>
            </FormControl>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center', mt: 1 }}>
            <Button onClick={handleCloseEditDialog} variant="outlined" sx={{ borderRadius: '8px', px: 3 }}>
              Hủy
            </Button>
            <Button variant="contained" onClick={handleUpdateGroup} sx={{ backgroundColor: '#1976d2', borderRadius: '8px', px: 3 }}>
              Cập nhật nhóm
            </Button>
          </DialogActions>
        </Dialog>



      {/* Invite Friends Dialog */}
      <Dialog
        open={openInviteDialog}
        onClose={handleCloseInviteDialog}
        PaperProps={{
          sx: {
            borderRadius: '15px',
            padding: '20px',
            maxWidth: '650px',
            boxShadow: '0px 5px 25px rgba(0, 0, 0, 0.2)',
            backgroundColor: '#f5f5f5', // Lighter background for contrast
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 'bold',
            textAlign: 'center',
            backgroundColor: '#1976d2',
            color: '#ffffff',
            padding: '16px',
            borderRadius: '15px 15px 0 0',
            fontSize: '20px',
          }}
        >
          Mời bạn bè
        </DialogTitle>
        <DialogContent sx={{ padding: '20px', backgroundColor: '#ffffff', mt: 2 }}>
          <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
            <TextField
              placeholder="Tìm kiếm bạn bè"
              variant="outlined"
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: '30px', // More rounded
                  backgroundColor: '#f0f0f0', // Softer input background
                },
              }}
            />
          </Box>

          <List sx={{ maxHeight: '300px', overflowY: 'auto' }}>
            {filteredFriends.length > 0 ? (
              filteredFriends.map((friend) => (
                <ListItem
                  key={friend.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 0',
                    borderBottom: '1px solid #e0e0e0',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ListItemAvatar>
                      <Avatar src={friend.avatar} />
                    </ListItemAvatar>
                    <ListItemText primary={friend.name} />
                  </Box>
                  <Checkbox
                    checked={selectedFriends.includes(friend.id)}
                    onChange={() => handleSelectFriend(friend.id)}
                    sx={{
                      color: selectedFriends.includes(friend.id) ? '#1976d2' : 'gray',
                      '&.Mui-checked': {
                        color: '#1976d2',
                      },
                    }}
                  />
                </ListItem>
              ))
            ) : (
              <Typography variant="body2" sx={{ textAlign: 'center', mt: 2 }}>
                Không tìm thấy bạn bè nào.
              </Typography>
            )}
          </List>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', padding: '20px', backgroundColor: '#f5f5f5' }}>
          <Button
            onClick={handleCloseInviteDialog}
            variant="outlined"
            sx={{
              borderRadius: '10px',
              px: 4,
              color: '#1976d2',
              borderColor: '#1976d2',
              '&:hover': {
                borderColor: '#1565c0',
                color: '#1565c0',
              },
              marginRight: '12px',
            }}
          >
            Hủy
          </Button>
          <Button
            variant="contained"
            onClick={handleSendInvitations}
            sx={{
              borderRadius: '10px',
              px: 4,
              backgroundColor: '#1976d2',
              color: '#ffffff',
              '&:hover': {
                backgroundColor: '#1565c0',
              },
            }}
          >
            Mời {selectedFriends.length > 0 ? `(${selectedFriends.length})` : ''}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GroupHeader;
