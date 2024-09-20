import { useState } from 'react'; // Sử dụng useState
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
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import FeedIcon from '@mui/icons-material/Feed';
import ExploreIcon from '@mui/icons-material/Explore';
import GroupIcon from '@mui/icons-material/Group';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom'; // Sử dụng hook useNavigate

const SidebarLeftGroup = () => {
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng
  const [selectedTab, setSelectedTab] = useState(''); // State để lưu mục đang được chọn

  // Hàm xử lý chọn tab
  const handleSelectTab = (tabName: string, route: string) => {
    setSelectedTab(tabName); // Cập nhật tab được chọn
    navigate(route); // Điều hướng đến trang tương ứng
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
          <SettingsIcon sx={{ color: '#1e88e5' }} /> {/* Icon mặc định màu xanh biển */}
        </IconButton>
      </div>

      {/* Thanh tìm kiếm */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Tìm kiếm nhóm"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: '#1e88e5' }} /> {/* Icon màu xanh biển */}
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
            backgroundColor: selectedTab === 'feed' ? '#d0e7ff' : '#ffffff', // Nền trắng mặc định, xanh khi chọn
            borderRadius: '8px',
            mb: 1,
            '&:hover': {
              backgroundColor: '#f5f5f5', // Màu hover xám nhạt
            },
          }}
        >
          <ListItemIcon>
            <FeedIcon sx={{ color: selectedTab === 'feed' ? '#0d47a1' : '#1e88e5' }} /> {/* Đổi màu icon */}
          </ListItemIcon>
          <ListItemText primary="Bảng feed của bạn" sx={{ color: '#333333' }} />
        </ListItem>

        <ListItem
          button
          onClick={() => handleSelectTab('explore', 'explore-groups')}
          sx={{
            backgroundColor: selectedTab === 'explore' ? '#d0e7ff' : '#ffffff', // Nền trắng mặc định
            borderRadius: '8px',
            mb: 1,
            '&:hover': {
              backgroundColor: '#f5f5f5', // Màu hover xám nhạt
            },
          }}
        >
          <ListItemIcon>
            <ExploreIcon sx={{ color: selectedTab === 'explore' ? '#0d47a1' : '#1e88e5' }} /> {/* Đổi màu icon */}
          </ListItemIcon>
          <ListItemText primary="Khám phá" sx={{ color: '#333333' }} />
        </ListItem>

        <ListItem
          button
          onClick={() => handleSelectTab('yourGroups', 'your-groups')}
          sx={{
            backgroundColor: selectedTab === 'yourGroups' ? '#d0e7ff' : '#ffffff', // Nền trắng mặc định
            borderRadius: '8px',
            mb: 1,
            '&:hover': {
              backgroundColor: '#f5f5f5', // Màu hover xám nhạt
            },
          }}
        >
          <ListItemIcon>
            <GroupIcon sx={{ color: selectedTab === 'yourGroups' ? '#0d47a1' : '#1e88e5' }} /> {/* Đổi màu icon */}
          </ListItemIcon>
          <ListItemText primary="Nhóm của bạn" sx={{ color: '#333333' }} />
        </ListItem>

        <ListItem
          button
          onClick={() => handleSelectTab('createGroup', 'create-group')}
          sx={{
            backgroundColor: selectedTab === 'createGroup' ? '#d0e7ff' : '#ffffff', // Nền trắng mặc định
            borderRadius: '8px',
            mb: 2,
            '&:hover': {
              backgroundColor: '#f5f5f5', // Màu hover xám nhạt
            },
          }}
        >
          <ListItemIcon>
            <AddIcon sx={{ color: selectedTab === 'createGroup' ? '#0d47a1' : '#1e88e5' }} /> {/* Đổi màu icon */}
          </ListItemIcon>
          <ListItemText primary="Tạo nhóm mới" sx={{ color: selectedTab === 'createGroup' ? '#0d47a1' : '#1e88e5' }} />
        </ListItem>
      </List>

      <Divider sx={{ mb: 2 }} />
    </div>
  );
};

export default SidebarLeftGroup;