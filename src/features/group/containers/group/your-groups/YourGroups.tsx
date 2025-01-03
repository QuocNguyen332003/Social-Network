/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Button, IconButton, Menu, MenuItem, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField, InputAdornment } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import { Group } from '../../../../../interface/interface';
import CustomPagination from '../../../../../shared/components/pagination/CustomPagination';

const YourGroups: React.FC = () => {
  const token = sessionStorage.getItem('token');
  const navigate = useNavigate();
  const [joinedGroups, setJoinedGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userRoles, setUserRoles] = useState<{ [groupId: string]: string }>({}); // Lưu trữ role của từng nhóm
  const [searchTerm, setSearchTerm] = useState(''); // Thêm state để lưu từ khóa tìm kiếm
  const currentUserId = sessionStorage.getItem('userId') || ''; // Lấy userId từ sessionStorage

  // Trạng thái cho menu sắp xếp
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null); // Lưu ID nhóm đã chọn để hiện menu
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const [totalGroups, setTotalGroups] = useState(0); // Total groups count
  // Gọi API để lấy danh sách các nhóm mà người dùng đã tham gia
  const fetchJoinedGroups = async () => {
    setLoading(true);
    setError('');

    try {
      // Gọi API từ backend với userId hiện tại
      const response = await axios.get(`http://localhost:3000/v1/group/${currentUserId}/joined-groups`,{
        params: {
          page: currentPage,
          limit: 6, // You can adjust the limit here
          search: searchTerm,
        },
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        }
      );
      const { groups, totalPages, totalGroups } = response.data || [];
      setJoinedGroups(groups); // Lưu danh sách nhóm vào state
      setTotalPages(totalPages);
      setTotalGroups(totalGroups);
      // Lấy vai trò của người dùng trong từng nhóm
      const roles: { [groupId: string]: string } = {};
      for (const group of groups) {
        const roleResponse = await axios.get(`http://localhost:3000/v1/group/${group._id}/role`, {
          headers: {
            Authorization: `Bearer ${token}` // Thêm token vào headers
          },
          params: { userId: currentUserId },
        },
      );
        roles[group._id] = roleResponse.data.role;
      }
      setUserRoles(roles); // Lưu role của từng nhóm vào state
    } catch (error: any) {
      setError('Có lỗi xảy ra khi lấy danh sách nhóm.');
      console.error('Error fetching groups:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
if (currentUserId) {
    fetchJoinedGroups();
    }
  }, [currentPage, currentUserId, searchTerm]);

  // Mở menu khi nhấn vào nút ba dấu chấm và đặt ID của nhóm đã chọn
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, groupId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedGroupId(groupId);
  };

  // Đóng menu
  const handleClose = () => {
    setAnchorEl(null);
    setSelectedGroupId(null);
  };

  // Hàm mở Dialog xác nhận xóa nhóm
  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  // Hàm đóng Dialog xác nhận xóa nhóm
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  // Hàm xử lý điều hướng khi nhấn "Xem nhóm"
  const handleViewGroup = (group: Group, role: string) => {
    console.log('Group Data When View:', group); // In ra dữ liệu `group` khi nhấn "Xem nhóm"
    navigate(`/group/${group._id}`, { state: { group, role } });
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); 
  };

  // Hàm xử lý xóa nhóm (Chỉ chủ nhóm mới có quyền này)
  const handleDeleteGroup = async () => {
    if (!selectedGroupId) return;
    try {
      const response = await axios.delete(`http://localhost:3000/v1/group/${selectedGroupId}/delete`, {
        headers: {
          Authorization: `Bearer ${token}` // Thêm token vào headers
        },
        params: { userId: currentUserId },
      });
      if (response.status === 200) {
        alert('Nhóm đã được xóa thành công!');
        setJoinedGroups(joinedGroups.filter((group) => group._id !== selectedGroupId));
      }
    } catch (error) {
      console.error('Lỗi khi xóa nhóm:', error);
      alert('Có lỗi xảy ra khi xóa nhóm!');
    }
    handleCloseDeleteDialog();
    handleClose();
  };  

  // Hàm xử lý rời nhóm (dành cho các thành viên và quản trị viên không phải chủ nhóm)
  const handleLeaveGroup = async () => {
    if (!selectedGroupId) return;
    try {
      const response = await axios.post(`http://localhost:3000/v1/group/${selectedGroupId}/leave`, {
        userId: currentUserId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
      });
      if (response.status === 200) {
        alert('Bạn đã rời nhóm thành công!');
        setJoinedGroups(joinedGroups.filter((group) => group._id !== selectedGroupId));
      }
    } catch (error) {
      console.error('Lỗi khi rời nhóm:', error);
      alert('Có lỗi xảy ra khi rời nhóm!');
    }
    handleClose();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Box
      sx={{
        width: '100%',
        padding: 2,
        maxWidth: '100%',
        overflowX: 'hidden',
        overflowY: 'auto',
        height: '100vh',
        boxSizing: 'border-box',
      }}
    >
      {/* Tiêu đề và nút sắp xếp */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
        sx={{ borderBottom: '1px solid #ddd', pb: 2 }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
          Tất cả các nhóm bạn đã tham gia 
        </Typography>

        <TextField
          placeholder="Tìm kiếm nhóm"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            width: '300px',
            borderRadius: '8px',
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#fff',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            },
          }}
        />
      </Box>

      {/* Kiểm tra trạng thái loading và hiển thị vòng tròn chờ */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="70%">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" textAlign="center">
          {error}
        </Typography>
      ) : (
        /* Grid chứa các thẻ nhóm */
        <Grid container spacing={3} sx={{ maxWidth: '100%' }}>
          {joinedGroups.map((group) => (
            <Grid item xs={12} sm={6} md={6} key={group._id}>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                alignItems="flex-start"
                sx={{
                  border: '1px solid #e0e0e0',
                  borderRadius: '12px',
                  padding: '16px',
                  backgroundColor: '#fff',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                  },
                  maxWidth: '100%',
                  overflow: 'hidden',
                }}
              >
                <Box display="flex" alignItems="center" mb={2} sx={{ width: '100%' }}>
                  {/* Hình ảnh đại diện của nhóm */}
                  <img
                    src={(group.avt?.link) as unknown as string}
                    alt={group.groupName}
                    style={{
                      width: '100%',
                      maxWidth: 120,
                      height: 120,
                      borderRadius: '8px',
                      marginRight: '12px',
                      flexShrink: 0,
                    }}
                  />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold', lineHeight: 1.3, fontSize: '1.5rem', color: '#333', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {group.groupName}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#555' }}>
                      {group.members.count} Thành Viên • {group.article.count} Bài Viết
                    </Typography>
                  </Box>
                </Box>

                <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: '#1976d2',
                      color: '#fff',
                      borderRadius: '8px',
                      textTransform: 'none',
                      padding: '8px 16px',
                      fontWeight: 'bold',
                      width: 'calc(100% - 48px)',
                      '&:hover': {
                        backgroundColor: '#1565c0',
                      },
                    }}
                    onClick={() => handleViewGroup(group, userRoles[group._id] || 'none')}
                  >
                    Xem nhóm
                  </Button>

                  {/* Nút ba dấu chấm */}
                  <IconButton onClick={(e) => handleClick(e, group._id)} sx={{ marginLeft: '8px', flexShrink: 0 }}>
                    <MoreVertIcon />
                  </IconButton>

                  {/* Menu của nút ba dấu chấm */}
                  <Menu
                    anchorEl={anchorEl}
                    open={open && selectedGroupId === group._id}
                    onClose={handleClose}
                    PaperProps={{
                      style: {
                        maxHeight: 48 * 4.5,
                        width: '20ch',
                      },
                    }}
                  >
                    {userRoles[group._id] === 'owner' ? (
                      <MenuItem onClick={handleOpenDeleteDialog}>Xoá nhóm</MenuItem>
                    ) : (
                      <MenuItem onClick={handleLeaveGroup}>Rời nhóm</MenuItem>
                    )}
                  </Menu>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
      
      <Box mt={3} sx={{ display: 'flex', justifyContent: 'center' }}>
        <CustomPagination totalPages={totalPages} handleActivityPageChange={handlePageChange} />
      </Box>


      {/* Dialog xác nhận xóa nhóm */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Xác nhận xóa nhóm</DialogTitle>
        <DialogContent>
          <Typography>Bạn có chắc chắn muốn xóa nhóm này không? Thao tác này sẽ xóa tất cả dữ liệu liên quan.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Hủy
          </Button>
          <Button onClick={handleDeleteGroup} color="error">
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default YourGroups;