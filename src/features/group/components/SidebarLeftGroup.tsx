/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
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
  FormControlLabel,
  Select,
  MenuItem,
  Box,
  ListItemSecondaryAction,
  CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import FeedIcon from '@mui/icons-material/Feed';
import ExploreIcon from '@mui/icons-material/Explore';
import GroupIcon from '@mui/icons-material/Group';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { Group } from '../../../interface/interface';
import axios from 'axios'; // Thêm axios để gọi API
import { toast } from 'react-toastify';


const SidebarLeftGroup = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token'); // Lấy token từ sessionStorage
  const [selectedTab, setSelectedTab] = useState('');
  const [openCreateGroupDialog, setOpenCreateGroupDialog] = useState(false);
  const [hobbiesOptions, setHobbiesOptions] = useState<any[]>([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [newRule, setNewRule] = useState(''); // Dùng để nhập quy định mới
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const currentUserId = sessionStorage.getItem('userId') || ''; // Lấy userId từ sessionStorages

  const initialGroupData: Omit<Group, '_id'> = {
    warningLevel: 0,
    groupName: '',
    type: 'public',
    idAdmin: currentUserId,
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
    friendCount: undefined
  };

const [groupData, setGroupData] = useState<Omit<Group, '_id'>>(initialGroupData);

  const handleOpenCreateGroupDialog = () => setOpenCreateGroupDialog(true);
  const resetForm = () => setGroupData(initialGroupData);
  const handleCloseCreateGroupDialog = () => {
    resetForm(); // Gọi hàm reset dữ liệu
    setOpenCreateGroupDialog(false);
  };
  
  useEffect(() => {
    const fetchHobbies = async () => {
      try {
        const response = await axios.get('http://localhost:3000/v1/hobbies', {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header nếu cần
          },
        });
        // Lưu cả name và _id của sở thích vào hobbiesOptions
        setHobbiesOptions(response.data);
      } catch (error) {
        console.error('Error fetching hobbies:', error);
        setError('Có lỗi xảy ra khi tải sở thích. Vui lòng thử lại!');
      }
    };

    fetchHobbies();
  }, [token]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setGroupData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSelectHobbies = (event: any) => {
    const value = event.target.value;
    setGroupData((prev) => ({
      ...prev,
      hobbies: typeof value === 'string' ? value.split(',') : value,
    }));
  };

  // Xử lý tải ảnh đại diện và ảnh nền
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, imageType: 'avt' | 'backGround') => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setGroupData((prev) => ({
        ...prev,
        [`${imageType}File`]: file, // Lưu tệp ảnh vào groupData để gửi qua FormData
        [imageType]: URL.createObjectURL(file), // Lưu URL để hiển thị xem trước ảnh
      }));
    }
  };
  
  const handleCreateGroup = async () => {
    if (!groupData.groupName.trim()) {
      toast.error("Tên nhóm không được để trống!");
      return;
    }
    setLoading(true);
    setError('');
  
    try {
      const formData = new FormData();
      formData.append('groupName', groupData.groupName);
      formData.append('type', groupData.type);
      formData.append('idAdmin', groupData.idAdmin);
      formData.append('introduction', groupData.introduction);

      // Thêm từng giá trị của mảng hobbies vào FormData mà không dùng JSON.stringify()
      groupData.hobbies.forEach((hobby) => formData.append('hobbies', hobby));
      // Thêm từng quy định vào FormData mà không dùng JSON.stringify()
      // Loại bỏ các giá trị null hoặc trống trong rule
      const validRules = groupData.rule.filter((rule) => rule && rule.trim() !== "");

      // Thêm quy định vào FormData nếu có
      validRules.forEach((rule) => formData.append('rule', rule));
  
      // Thêm ảnh đại diện và ảnh nền nếu có
      if (groupData.avtFile) {
        formData.append('avt', groupData.avtFile);
      }
      if (groupData.backGroundFile) {
        formData.append('backGround', groupData.backGroundFile);
      }
  
      // Log tất cả các giá trị của FormData để kiểm tra
      for (const pair of formData.entries()) {
        console.log(`${pair[0]}, ${pair[1]}`);
      }
  
      const response = await axios.post('http://localhost:3000/v1/group/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
      });
  
      console.log('Group created successfully:', response.data.group);
      toast.success('Nhóm đã được tạo thành công!');
      handleCloseCreateGroupDialog();
    } catch (err: any) {
      console.error('Error creating group:', err.message);
  
      // Kiểm tra lỗi trả về từ server và hiển thị toast phù hợp
      const errorMessage =
        err.response?.data?.error || 'Có lỗi xảy ra khi tạo nhóm. Vui lòng thử lại!';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  
  
  const handleAddRule = () => {
    if (newRule.trim() === "") {
      // Nếu quy định trống, không làm gì
      setNewRule(''); // Đảm bảo rằng input được reset
      return;
    }
  
    if (editIndex !== null) {
      // Cập nhật quy định đã có
      const updatedRules = [...groupData.rule];
      updatedRules[editIndex] = newRule;
      setGroupData((prev) => ({ ...prev, rule: updatedRules }));
      setEditIndex(null);
    } else {
      // Thêm quy định mới vào
      setGroupData((prev) => ({ ...prev, rule: [...prev.rule, newRule] }));
    }
  
    // Reset input sau khi thêm
    setNewRule('');
  };
  

  const handleEditRule = (index: number) => {
    setNewRule(groupData.rule[index]);
    setEditIndex(index);
  };

  const handleDeleteRule = (index: number) => {
    setGroupData((prev) => ({
      ...prev,
      rule: prev.rule.filter((_, idx) => idx !== index),
    }));
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
        height: '100%',
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
          {/* Thêm trường tải ảnh đại diện */}
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

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            {groupData.avt && (
              <Box sx={{ border: '1px solid #ddd', borderRadius: '8px', p: 1 }}>
                <Typography textAlign="center" fontSize="14px" fontWeight="bold">
                  Ảnh đại diện
                </Typography>
                <img src={groupData.avt} alt="Avatar" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
              </Box>
            )}

            {groupData.backGround && (
              <Box sx={{ border: '1px solid #ddd', borderRadius: '8px', p: 1, ml: 2 }}>
                <Typography textAlign="center" fontSize="14px" fontWeight="bold">
                  Ảnh nền
                </Typography>
                <img src={groupData.backGround} alt="Background" style={{ width: '200px', height: '100px', borderRadius: '8px' }} />
              </Box>
            )}
          </Box>

          {/* Thêm lựa chọn sở thích */}
          <Box sx={{ mb: 2 }}>
            <Select
              multiple
              value={groupData.hobbies}
              onChange={handleSelectHobbies}
              renderValue={(selected) => {
                if (hobbiesOptions.length === 0) return ''; 
                return selected
                  .map((id) => hobbiesOptions.find((hobby) => hobby._id === id)?.name || '')
                  .join(', ');
              }}
              fullWidth
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
          </Box>
          <Box sx={{ display: 'flex', mb: 2 }}>
            <TextField fullWidth label="Quy định nhóm" variant="outlined" value={newRule} onChange={(e) => setNewRule(e.target.value)} />
            <Button variant="contained" onClick={handleAddRule} sx={{ ml: 1 }}>{editIndex !== null ? 'Cập nhật' : 'Thêm'}</Button>
          </Box>

          <List>
            {groupData.rule.map((rule, index) => (
              <ListItem key={index}>
                <ListItemText primary={rule} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="edit" onClick={() => handleEditRule(index)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteRule(index)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', mt: 1 }}>
          <Button onClick={handleCloseCreateGroupDialog} variant="outlined" sx={{ borderRadius: '8px', px: 3 }}>
            Hủy
          </Button>
          <Button
            variant="contained"
            onClick={handleCreateGroup}
            sx={{ backgroundColor: '#1976d2', borderRadius: '8px', px: 3 }}
            disabled={loading} // Vô hiệu hóa nút khi loading
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Tạo nhóm'} {/* Hiển thị loading spinner */}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SidebarLeftGroup;


