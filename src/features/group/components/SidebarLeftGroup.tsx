import { useState } from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import FeedIcon from '@mui/icons-material/Feed';
import ExploreIcon from '@mui/icons-material/Explore';
import GroupIcon from '@mui/icons-material/Group';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { Group } from '../../../interface/interface'; // Assuming this is the path to your Group interface

const SidebarLeftGroup = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(''); 
  const [openCreateGroupDialog, setOpenCreateGroupDialog] = useState(false);
  const [groupData, setGroupData] = useState<Group>({
    _id: '',
    warningLevel: 0,
    groupName: '',
    type: 'public',
    idAdmin: '',
    introduction: '',
    avt: '',
    backGround: '',
    members: { count: 0, listUsers: [] },
    article: { count: 0, listArticle: [] },
    rule: [],
    Administrators: [],
    hobbies: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    _destroy: new Date(),
  });

  const handleOpenCreateGroupDialog = () => setOpenCreateGroupDialog(true);
  const handleCloseCreateGroupDialog = () => setOpenCreateGroupDialog(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setGroupData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGroupTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGroupData((prev) => ({ ...prev, type: event.target.value as 'public' | 'private' }));
  };

  const handleCreateGroup = () => {
    console.log('Group created:', groupData);
    handleCloseCreateGroupDialog(); 
  };

  const handleSelectTab = (tabName: string, route: string) => {
    setSelectedTab(tabName);
    if (tabName === 'createGroup') {
      handleOpenCreateGroupDialog();
    } else {
      navigate(route);
    }
  };

  return (
    <div
      style={{
        borderRight: '1px solid #e0e0e0',
        height: '100vh',
        backgroundColor: '#ffffff',
        padding: '16px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#333333' }}>
          Nhóm
        </Typography>
        <IconButton>
          <SettingsIcon sx={{ color: '#1e88e5' }} />
        </IconButton>
      </div>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Tìm kiếm nhóm"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: '#1e88e5' }} />
            </InputAdornment>
          ),
        }}
        sx={{
          mb: 2,
          borderRadius: '50px',
          backgroundColor: '#f0f2f5',
          '& fieldset': { border: 'none' },
        }}
      />

      <List>
        <ListItem
          button
          onClick={() => handleSelectTab('feed', 'your-feed')}
          sx={{
            backgroundColor: selectedTab === 'feed' ? '#d0e7ff' : '#ffffff',
            borderRadius: '8px',
            mb: 1,
            '&:hover': {
              backgroundColor: '#f5f5f5',
            },
          }}
        >
          <ListItemIcon>
            <FeedIcon sx={{ color: selectedTab === 'feed' ? '#0d47a1' : '#1e88e5' }} />
          </ListItemIcon>
          <ListItemText primary="Bảng feed của bạn" sx={{ color: '#333333' }} />
        </ListItem>

        <ListItem
          button
          onClick={() => handleSelectTab('explore', 'explore-groups')}
          sx={{
            backgroundColor: selectedTab === 'explore' ? '#d0e7ff' : '#ffffff',
            borderRadius: '8px',
            mb: 1,
            '&:hover': {
              backgroundColor: '#f5f5f5',
            },
          }}
        >
          <ListItemIcon>
            <ExploreIcon sx={{ color: selectedTab === 'explore' ? '#0d47a1' : '#1e88e5' }} />
          </ListItemIcon>
          <ListItemText primary="Khám phá" sx={{ color: '#333333' }} />
        </ListItem>

        <ListItem
          button
          onClick={() => handleSelectTab('yourGroups', 'your-groups')}
          sx={{
            backgroundColor: selectedTab === 'yourGroups' ? '#d0e7ff' : '#ffffff',
            borderRadius: '8px',
            mb: 1,
            '&:hover': {
              backgroundColor: '#f5f5f5',
            },
          }}
        >
          <ListItemIcon>
            <GroupIcon sx={{ color: selectedTab === 'yourGroups' ? '#0d47a1' : '#1e88e5' }} />
          </ListItemIcon>
          <ListItemText primary="Nhóm của bạn" sx={{ color: '#333333' }} />
        </ListItem>

        <ListItem
          button
          onClick={() => handleSelectTab('createGroup', 'create-group')}
          sx={{
            backgroundColor: selectedTab === 'createGroup' ? '#d0e7ff' : '#ffffff',
            borderRadius: '8px',
            mb: 2,
            '&:hover': {
              backgroundColor: '#f5f5f5',
            },
          }}
        >
          <ListItemIcon>
            <AddIcon sx={{ color: selectedTab === 'createGroup' ? '#0d47a1' : '#1e88e5' }} />
          </ListItemIcon>
          <ListItemText primary="Tạo nhóm mới" sx={{ color: selectedTab === 'createGroup' ? '#0d47a1' : '#1e88e5' }} />
        </ListItem>
      </List>

      <Divider sx={{ mb: 2 }} />

      {/* Create Group Dialog */}
      <Dialog
        open={openCreateGroupDialog}
        onClose={handleCloseCreateGroupDialog}
        PaperProps={{
          sx: { borderRadius: '12px', padding: '16px', maxWidth: '500px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' },
        }}
      >
        <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center', pb: 0 }}>Tạo nhóm mới</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Tên nhóm"
            variant="outlined"
            name="groupName"
            value={groupData.groupName}
            onChange={handleInputChange}
            sx={{ mb: 2, mt: 2 }}
            InputProps={{
              sx: {
                borderRadius: '8px',
                backgroundColor: '#f9f9f9',
              },
            }}
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
            sx={{ mb: 2 }}
            InputProps={{
              sx: {
                borderRadius: '8px',
                backgroundColor: '#f9f9f9',
              },
            }}
          />
          <RadioGroup value={groupData.type} onChange={handleGroupTypeChange} row>
            <FormControlLabel value="public" control={<Radio />} label="Công khai" />
            <FormControlLabel value="private" control={<Radio />} label="Riêng tư" />
          </RadioGroup>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', mt: 1 }}>
          <Button onClick={handleCloseCreateGroupDialog} variant="outlined" sx={{ borderRadius: '8px', px: 3 }}>
            Hủy
          </Button>
          <Button variant="contained" onClick={handleCreateGroup} sx={{ backgroundColor: '#1976d2', borderRadius: '8px', px: 3 }}>
            Tạo nhóm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SidebarLeftGroup;
