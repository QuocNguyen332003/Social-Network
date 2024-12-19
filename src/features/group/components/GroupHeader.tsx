/* eslint-disable @typescript-eslint/no-explicit-any */
 
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
  CircularProgress,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { Group } from '../../../interface/interface';
import axios from 'axios';
import { toast } from 'react-toastify';


interface GroupHeaderProps {
  group: Group;
  role: 'owner' | 'admin' | 'member' | 'none';
  onUpdateGroup: (updatedGroup: Group) => void;
}


const GroupHeader: React.FC<GroupHeaderProps> = ({ group, role, onUpdateGroup }) => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token'); // Lấy token từ sessionStorage
  const currentUserId = sessionStorage.getItem('userId') || '';
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openInviteDialog, setOpenInviteDialog] = useState(false);
  const [editedGroup, setEditedGroup] = useState<Group>(group);
  const [hobbies, setHobbies] = useState<string[]>(group.hobbies || []);
  const [hobbiesOptions, setHobbiesOptions] = useState<any[]>([]); 
  const [newHobby, setNewHobby] = useState<string>('');
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [friendsNotInGroup, setFriendsNotInGroup] = useState<any[]>([]); // Danh sách bạn bè chưa tham gia nhóm
  const [avtPreview, setAvtPreview] = useState<string | undefined>((group.avt?.link) as unknown as string || '' );
  const [backGroundPreview, setBackGroundPreview] = useState<string | undefined>((group.backGround?.link) as unknown as string || '');

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (group) {
      setEditedGroup(group);
      setHobbies(group.hobbies || []);
      setAvtPreview((group.avt?.link) as unknown as string || '');
      setBackGroundPreview((group.backGround?.link) as unknown as string || '');
    }
  }, [group]);

  const handleOpenInviteDialog = async () => {
    try {
      // Gọi API để lấy danh sách bạn bè chưa tham gia nhóm
      const response = await axios.get(`http://localhost:3000/v1/group/friends-not-in-group/${currentUserId}/${group._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFriendsNotInGroup(response.data); // Lưu danh sách bạn bè chưa tham gia nhóm vào state
      setOpenInviteDialog(true); // Mở dialog mời bạn bè
    } catch (error) {
      console.error('Lỗi khi lấy danh sách bạn bè chưa tham gia nhóm:', error);
    }
  };
  useEffect(() => {
    const fetchHobbies = async () => {
      try {
        const response = await axios.get('http://localhost:3000/v1/hobbies', {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        // Update the hobbies options from API response
        if (response.data) {
          setHobbiesOptions(response.data); 
        }
      } catch (error) {
        console.error('Error fetching hobbies:', error);
      }
    };
    fetchHobbies();
  }, [token]);



  const handleOpenEditDialog = () => setOpenEditDialog(true);
  const handleCloseEditDialog = () => setOpenEditDialog(false);
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
    setIsLoading(true); 
    if (!editedGroup.groupName.trim()) {
          // Nếu không có nội dung và không có ảnh, hiển thị thông báo lỗi
          toast.error('Vui lòng không bỏ trống tên nhóm', {
            autoClose: 3000,
          });
          return;
    }
    try {
      const formData = new FormData();
      formData.append('userId', currentUserId);
      formData.append('groupName', editedGroup.groupName);
      formData.append('introduction', editedGroup.introduction);
      formData.append('hobbies', hobbies.join(','));

      if (editedGroup.avtFile) formData.append('avt', editedGroup.avtFile);
      if (editedGroup.backGroundFile) formData.append('backGround', editedGroup.backGroundFile);

      const response = await axios.patch(`http://localhost:3000/v1/group/${editedGroup._id}/edit`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const updatedGroup = response.data.group;
        onUpdateGroup(updatedGroup); // Cập nhật nhóm trong cha
        setEditedGroup(updatedGroup); // Cập nhật nhóm tại chỗ
        setHobbies(updatedGroup.hobbies || []); // Cập nhật sở thích
        handleCloseEditDialog();
      }
    } catch (err: any) {
      console.error('Error creating group:', err.message);
  
      // Kiểm tra lỗi trả về từ server và hiển thị toast phù hợp
      const errorMessage =
        err.response?.data?.error || 'Có lỗi xảy ra khi tạo nhóm. Vui lòng thử lại!';
      toast.error(errorMessage);
      
    } finally {
      setIsLoading(false); // Dừng loading
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
  
  const handleSendInvitations = async () => {
    if (selectedFriends.length === 0) {
      alert('Vui lòng chọn ít nhất một người bạn để mời.');
      return;
    }
    console.log(selectedFriends)
    try {
      // Gọi API gửi lời mời tham gia nhóm
      await axios.post(
        `http://localhost:3000/v1/group/invite-member`,
        {
          groupId: group._id,
          invitedFriends: selectedFriends, // Gửi selectedFriends
          userId: currentUserId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      handleCloseInviteDialog();
    } catch (error) {
      console.error('Lỗi khi gửi lời mời:', error);
    }
  };
  
  // Xử lý tìm kiếm bạn bè
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Lọc danh sách bạn bè dựa trên tìm kiếm
  const filteredFriends = friendsNotInGroup.filter(friend =>
    friend.displayName && friend.displayName.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <Box
      sx={{
        position: 'relative',
        backgroundImage: `url(${group.backGround?.link || ''})`,
        height: '300px', // Đặt chiều cao mong muốn
        width: '100%', // Đảm bảo ảnh nền bao phủ toàn bộ chiều rộng
        backgroundSize: 'contain', // Ảnh sẽ bao phủ toàn bộ khung
        backgroundRepeat: 'no-repeat', 
        backgroundColor: '#fff',
        backgroundPosition: 'center',
        overflow: 'hidden',
        borderRadius: '12px', // Bo góc cho ảnh nền
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
          <Avatar src={(group.avt?.link) as unknown as string} sx={{ width: '90px', height: '90px', border: '4px solid white', marginRight: '20px' }} />
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

      {isLoading && <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%' }} />}

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
                  <img src={backGroundPreview} alt="Background" style={{ width: '200px', height: '150px', borderRadius: '8px',  }} />
                </Box>
              )}
            </Box>
              
            {/* Lựa chọn sở thích với danh sách hiện tại */}
            <Box sx={{ mb: 2 }}>
              {hobbies.map((hobbyId) => {
                const hobby = hobbiesOptions.find((hobby) => hobby._id === hobbyId);
                return (
                  hobby && (
                    <Chip
                      key={hobbyId}
                      label={hobby.name}
                      onDelete={() => handleDeleteHobby(hobbyId)}
                      sx={{ margin: '5px' }}
                    />
                  )
                );
              })}
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
                {hobbiesOptions.length > 0 ? (
                  hobbiesOptions.map((hobby) => (
                    <MenuItem key={hobby._id} value={hobby._id}>
                      {hobby.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>Đang tải...</MenuItem>
                )}
              </Select>
              <Button
                variant="outlined"
                sx={{ mt: 1 }}
                onClick={handleAddHobby}
                disabled={!newHobby}
              >
                Thêm sở thích
              </Button>
            </FormControl>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center', mt: 1 }}>
            <Button onClick={handleCloseEditDialog} variant="outlined" sx={{ borderRadius: '8px', px: 3 }}>
              Hủy
            </Button>
            <Button
              variant="contained"
              onClick={handleUpdateGroup}
              disabled={isLoading}
              sx={{
                backgroundColor: '#1976d2',
                borderRadius: '8px',
                px: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {isLoading ? (
                <CircularProgress size={24} sx={{ color: 'white' }} />
              ) : (
                'Cập nhật nhóm'
              )}
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
                  key={friend._id}
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
                       <Avatar src={friend.avt || '/path/to/default/avatar.jpg'} />
                    </ListItemAvatar>
                    <ListItemText primary={friend.displayName} />
                  </Box>
                  <Checkbox
                    checked={selectedFriends.includes(friend._id)}
                    onChange={() => handleSelectFriend(friend._id)}
                    sx={{
                      color: selectedFriends.includes(friend._id) ? '#1976d2' : 'gray',
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
            Mời
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GroupHeader;
