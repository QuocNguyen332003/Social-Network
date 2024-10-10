 
import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Button, IconButton, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { Group } from '../../../../../interface/interface';

const ExploreGroups: React.FC = () => {
  const [notJoinedGroups, setNotJoinedGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

  // Lấy danh sách các nhóm chưa tham gia và nhóm đã có trạng thái pending
  useEffect(() => {
    const fetchNotJoinedGroups = async () => {
      try {
        setLoading(true);
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost:3000/v1/group/${userId}/not-joined-groups`);
  
        // Đảm bảo gán đúng giá trị từ dữ liệu trả về
        const { groups } = response.data;
  
        setNotJoinedGroups(groups || []);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách nhóm chưa tham gia:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchNotJoinedGroups();
  }, []);

  // Mở dialog xác nhận tham gia nhóm
  const handleOpenDialog = (group: Group) => {
    setSelectedGroup(group);
    setOpenDialog(true);
  };

  // Đóng dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedGroup(null);
  };

  // Xử lý khi nhấn "Tham gia nhóm"
  const handleConfirmJoinGroup = async () => {
    if (!selectedGroup) return;
    try {
      const userId = localStorage.getItem('userId');
      await axios.post(`http://localhost:3000/v1/group/${selectedGroup._id}/join`, { userId });
      alert(`Đã gửi yêu cầu tham gia nhóm thành công!`);

      // Cập nhật lại trạng thái nhóm thành `pending`
      setNotJoinedGroups((prevGroups) =>
        prevGroups.map((group) =>
          group._id === selectedGroup._id ? { ...group, userState: 'pending' } : group
        )
      );

      handleCloseDialog();
    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu tham gia nhóm:', error);
    }
  };

  // Xử lý khi nhấn "Thu hồi yêu cầu"
  const handleRevokeRequest = async (groupId: string) => {
    try {
      const userId = localStorage.getItem('userId');
      await axios.post(`http://localhost:3000/v1/group/${groupId}/revoke-request`, { userId });

      // Cập nhật lại trạng thái nhóm thành `not_joined`
      setNotJoinedGroups((prevGroups) =>
        prevGroups.map((group) =>
          group._id === groupId ? { ...group, userState: 'not_joined' } : group
        )
      );

      alert(`Yêu cầu tham gia nhóm đã được thu hồi.`);
    } catch (error) {
      console.error('Lỗi khi thu hồi yêu cầu tham gia nhóm:', error);
    }
  };

  return (
    <Box sx={{ width: '100%', padding: 2, overflowX: 'hidden', boxSizing: 'border-box' }}>
      <Box sx={{ marginBottom: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.2rem', flexGrow: 1 }}>
            Nhóm chưa tham gia
          </Typography>
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
            <CircularProgress />
          </Box>
        ) : notJoinedGroups.length > 0 ? (
          <Grid container spacing={2} sx={{ maxWidth: '100%', overflowX: 'hidden', boxSizing: 'border-box' }}>
            {notJoinedGroups.map((group) => (
              <Grid item xs={12} sm={6} md={4} key={group._id}>
                <Box
                  sx={{
                    position: 'relative',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    padding: 2,
                    backgroundColor: '#fff',
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                    maxWidth: '100%',
                    overflow: 'hidden',
                    boxSizing: 'border-box',
                  }}
                >
                  <img
                    src={group.avt || 'https://via.placeholder.com/180'}
                    alt={group.groupName}
                    style={{
                      width: '100%',
                      height: '180px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                  />
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="h6" fontWeight="bold">
                      {group.groupName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {group.members.count} Thành Viên • {group.article.count} Bài Viết
                    </Typography>

                    {/* Hiển thị trạng thái dựa vào `userState` */}
                    {group.userState === 'pending' ? (
                      <Button
                        variant="contained"
                        color="secondary"
                        fullWidth
                        sx={{ marginTop: 2 }}
                        onClick={() => handleRevokeRequest(group._id)}
                      >
                        Đã gửi yêu cầu - Thu hồi
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ marginTop: 2 }}
                        onClick={() => handleOpenDialog(group)}
                      >
                        Tham gia nhóm
                      </Button>
                    )}
                  </Box>
                  <IconButton
                    sx={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      backgroundColor: '#fff',
                      borderRadius: '50%',
                      padding: '4px',
                      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    }}
                    onClick={() => console.log(`Đóng nhóm ${group.groupName}`)}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body1" color="text.secondary">
            Không có nhóm nào để tham gia.
          </Typography>
        )}

        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="confirm-join-group-title"
          aria-describedby="confirm-join-group-description"
        >
          <DialogTitle id="confirm-join-group-title">Xác nhận tham gia nhóm</DialogTitle>
          <DialogContent>
            <DialogContentText id="confirm-join-group-description">
              Bạn có chắc chắn muốn tham gia nhóm <strong>{selectedGroup?.groupName}</strong> không?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="secondary">
              Không
            </Button>
            <Button onClick={handleConfirmJoinGroup} color="primary" variant="contained">
              Có
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default ExploreGroups;