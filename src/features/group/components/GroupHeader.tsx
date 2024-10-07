/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
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
  Radio,
  RadioGroup,
  FormControlLabel,
  Select,
  Checkbox,
  MenuItem,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Group } from '../../../interface/interface';

// Sample friends list
const friends = [
  { id: '1', name: 'Alice', avatar: '/static/images/avatar/1.jpg' },
  { id: '2', name: 'Bob', avatar: '/static/images/avatar/2.jpg' },
  { id: '3', name: 'Charlie', avatar: '/static/images/avatar/3.jpg' },
];

interface GroupHeaderProps {
  group: Group;
  onUpdateGroup: (updatedGroup: Group) => void;
}

const hobbiesOptions = ['Sports', 'Music', 'Travel', 'Technology', 'Reading', 'Art', 'Cooking'];

const GroupHeader: React.FC<GroupHeaderProps> = ({ group, onUpdateGroup }) => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openInviteDialog, setOpenInviteDialog] = useState(false);
  const [groupData, setGroupData] = useState<Group>(group);
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleOpenEditDialog = () => setOpenEditDialog(true);
  const handleCloseEditDialog = () => setOpenEditDialog(false);
  const handleOpenInviteDialog = () => setOpenInviteDialog(true);
  const handleCloseInviteDialog = () => setOpenInviteDialog(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setGroupData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGroupTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGroupData((prev) => ({ ...prev, type: event.target.value as 'public' | 'private' }));
  };

  const handleHobbiesChange = (event: any) => {
    const { value } = event.target;
    setGroupData((prev) => ({
      ...prev,
      hobbies: typeof value === 'string' ? value.split(',') : value,
    }));
  };

  const handleSelectFriend = (friendId: string) => {
    if (selectedFriends.includes(friendId)) {
      setSelectedFriends((prev) => prev.filter((id) => id !== friendId));
    } else {
      setSelectedFriends((prev) => [...prev, friendId]);
    }
  };

  const handleUpdateGroup = () => {
    onUpdateGroup(groupData);
    handleCloseEditDialog();
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
        backgroundImage: `url(${group.avt})`,
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
      <Box sx={{ position: 'absolute', top: '16px', right: '20px', display: 'flex', alignItems: 'center' }}>
        <Button variant="contained" sx={{ marginRight: '12px', padding: '10px 20px' }} onClick={handleOpenEditDialog}>
          Chỉnh sửa nhóm
        </Button>
      </Box>

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
          sx: { borderRadius: '15px', padding: '20px', maxWidth: '550px', boxShadow: '0px 5px 25px rgba(0, 0, 0, 0.2)' },
        }}
      >
        <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center', fontSize: '24px' }}>Chỉnh sửa nhóm</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Tên nhóm"
            variant="outlined"
            name="groupName"
            value={groupData.groupName}
            onChange={handleInputChange}
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            label="Giới thiệu"
            variant="outlined"
            name="introduction"
            multiline
            rows={3}
            value={groupData.introduction}
            onChange={handleInputChange}
            sx={{ mb: 3 }}
          />

          <RadioGroup value={groupData.type} onChange={handleGroupTypeChange} row>
            <FormControlLabel value="public" control={<Radio />} label="Công khai" />
            <FormControlLabel value="private" control={<Radio />} label="Riêng tư" />
          </RadioGroup>

          <Select
            fullWidth
            multiple
            value={groupData.hobbies}
            onChange={handleHobbiesChange}
            renderValue={(selected) => selected.join(', ')}
            sx={{ mb: 3 }}
          >
            {hobbiesOptions.map((hobby) => (
              <MenuItem key={hobby} value={hobby}>
                <Checkbox checked={groupData.hobbies.indexOf(hobby) > -1} />
                <ListItemText primary={hobby} />
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button onClick={handleCloseEditDialog} variant="outlined" sx={{ borderRadius: '10px', px: 4 }}>
            Hủy
          </Button>
          <Button variant="contained" onClick={handleUpdateGroup} sx={{ px: 4 }}>
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
