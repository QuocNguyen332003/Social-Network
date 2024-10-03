/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Button, IconButton, Menu, MenuItem, CircularProgress } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Thêm axios để gọi API
import { Group } from '../../../../../interface/interface';


const YourGroups: React.FC = () => {
  const navigate = useNavigate();
  const [joinedGroups, setJoinedGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const currentUserId = localStorage.getItem('userId') || ''; // Lấy userId từ localStorage

  // Trạng thái cho menu sắp xếp
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // Gọi API để lấy danh sách các nhóm mà người dùng đã tham gia
  useEffect(() => {
    const fetchJoinedGroups = async () => {
      setLoading(true);
      setError('');

      try {
        // Gọi API từ backend với userId hiện tại
        const response = await axios.get(`http://localhost:3000/v1/group/${currentUserId}/joined-groups`);
        setJoinedGroups(response.data.groups || []); // Lưu danh sách nhóm vào state
      } catch (error: any) {
        setError('Có lỗi xảy ra khi lấy danh sách nhóm.');
        console.error('Error fetching groups:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJoinedGroups();
  }, [currentUserId]);

  // Mở menu khi nhấn vào nút ba dấu chấm
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Đóng menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Hàm xử lý điều hướng khi nhấn "Xem nhóm"
  const handleViewGroup = (group: Group) => {
    navigate(`/group/${group._id}`, { state: { group } });
  };

  // Hàm xử lý sắp xếp theo tên nhóm
  const handleSortGroups = () => {
    const sortedGroups = [...joinedGroups].sort((a, b) => a.groupName.localeCompare(b.groupName));
    setJoinedGroups(sortedGroups);
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
        boxSizing: 'border-box'
      }}
    >
      {/* Tiêu đề và nút sắp xếp */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.2rem', flexGrow: 1 }}>
          Tất cả các nhóm bạn đã tham gia ({joinedGroups.length})
        </Typography>
        <Box>
          <Typography
            variant="body2"
            sx={{
              color: '#1976d2',
              cursor: 'pointer',
              fontSize: '0.875rem',
              whiteSpace: 'nowrap',
              ml: 2,
            }}
            onClick={handleSortGroups}
          >
            Sắp xếp
          </Typography>
        </Box>
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
                    src={group.avt}
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
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', lineHeight: 1.3, fontSize: '1rem', color: '#333', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {group.groupName}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#555' }}>
                      Lần truy cập gần đây: 1 giờ trước {/* Thay bằng dữ liệu động */}
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
                    onClick={() => handleViewGroup(group)}
                  >
                    Xem nhóm
                  </Button>

                  {/* Nút ba dấu chấm */}
                  <IconButton onClick={handleClick} sx={{ marginLeft: '8px', flexShrink: 0 }}>
                    <MoreVertIcon />
                  </IconButton>

                  {/* Menu của nút ba dấu chấm */}
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                      style: {
                        maxHeight: 48 * 4.5,
                        width: '20ch',
                      },
                    }}
                  >
                    <MenuItem onClick={() => console.log('Rời nhóm')}>Rời nhóm</MenuItem>
                    <MenuItem onClick={() => console.log('Chỉnh sửa nhóm')}>Chỉnh sửa nhóm</MenuItem>
                  </Menu>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default YourGroups;
