/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Button, IconButton, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; // Icon đóng
import axios from 'axios'; // Thư viện axios để gọi API
import { Group } from '../../../../../interface/interface';

const ExploreGroups: React.FC = () => {
  const [notJoinedGroups, setNotJoinedGroups] = useState<Group[]>([]); // Lưu trữ các nhóm chưa tham gia
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [openDialog, setOpenDialog] = useState(false); // Trạng thái mở Dialog
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null); // Nhóm đã chọn để tham gia

  // Lấy danh sách các nhóm chưa tham gia khi component được render lần đầu
  useEffect(() => {
    const fetchNotJoinedGroups = async () => {
      try {
        setLoading(true);
        const userId = localStorage.getItem('userId'); // Giả định userId được lưu trữ trong localStorage
        const response = await axios.get(`http://localhost:3000/v1/group/${userId}/not-joined-groups`);
        setNotJoinedGroups(response.data.groups); // Lưu danh sách nhóm vào state
      } catch (error) {
        console.error('Lỗi khi lấy danh sách nhóm chưa tham gia:', error);
      } finally {
        setLoading(false); // Tắt trạng thái loading
      }
    };

    fetchNotJoinedGroups();
  }, []);

  // Mở dialog xác nhận tham gia nhóm
  const handleOpenDialog = (group: Group) => {
    setSelectedGroup(group); // Lưu trữ nhóm đã chọn vào state
    setOpenDialog(true); // Mở dialog
  };

  // Đóng dialog
  const handleCloseDialog = () => {
    setOpenDialog(false); // Đóng dialog
    setSelectedGroup(null); // Xóa nhóm đã chọn
  };

  // Hàm xử lý khi nhấn "Tham gia nhóm" trong dialog xác nhận
  const handleConfirmJoinGroup = async () => {
    if (!selectedGroup) return;
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.post(`http://localhost:3000/v1/group/${selectedGroup._id}/join`, { userId });
      alert(`Đã gửi yêu cầu tham gia nhóm thành công!`);
      // Sau khi tham gia thành công, cập nhật lại danh sách nhóm
      setNotJoinedGroups((prevGroups) => prevGroups.filter(group => group._id !== selectedGroup._id));
      handleCloseDialog(); // Đóng dialog sau khi xử lý xong
    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu tham gia nhóm:', error);
    }
  };

  return (
    <Box sx={{ width: '100%', padding: 2, overflowX: 'hidden', boxSizing: 'border-box' }}> {/* Ngăn tràn ngang */}
      <Box sx={{ marginBottom: 4 }}>
        {/* Sửa Typography để giống với YourGroups */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.2rem', flexGrow: 1 }}>
            Nhóm chưa tham gia
          </Typography>
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
            <CircularProgress /> {/* Hiển thị trạng thái loading */}
          </Box>
        ) : notJoinedGroups.length > 0 ? (
          <Grid container spacing={2} sx={{ maxWidth: '100%', overflowX: 'hidden', boxSizing: 'border-box' }}>
            {notJoinedGroups.map(group => (
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
                  {/* Hình ảnh nhóm */}
                  <img
                    src={group.avt || 'https://via.placeholder.com/180'} // Hiển thị ảnh placeholder nếu không có ảnh
                    alt={group.groupName}
                    style={{
                      width: '100%',
                      height: '180px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                  />

                  {/* Thông tin nhóm */}
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="h6" fontWeight="bold">
                      {group.groupName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {group.members.count} thành viên • {group.article.count}+ bài viết mỗi ngày
                    </Typography>

                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{ marginTop: 2 }}
                      onClick={() => handleOpenDialog(group)} // Mở dialog khi nhấn vào nút
                    >
                      Tham gia nhóm
                    </Button>
                  </Box>

                  {/* Icon đóng */}
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

        {/* Dialog xác nhận tham gia nhóm */}
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
