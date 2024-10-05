import React, { useState } from 'react';
import { Box, Typography, Avatar, Button, List, ListItem, ListItemAvatar, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions, Divider } from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import { Group } from '../../../../../../interface/interface.ts';

const AdminGroupContent: React.FC = () => {
  // Lấy dữ liệu group từ Outlet context
  const { group } = useOutletContext<{ group: Group }>();

  const [openDialog, setOpenDialog] = useState(false); // State kiểm soát dialog
  const [pendingInvites, setPendingInvites] = useState(
    group.Administrators.filter((admin) => admin.state === 'pending') // Lọc danh sách admin đang ở trạng thái pending
  );

  // Hàm mở dialog
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  // Hàm đóng dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Xử lý Huỷ lời mời
  const handleCancelInvite = (userId: string) => {
    // Cập nhật danh sách lời mời pending
    setPendingInvites((prev) => prev.filter((invite) => invite.idUser !== userId));
    alert(`Đã huỷ lời mời cho quản trị viên ID: ${userId}`);
    // TODO: Gọi API thực tế để huỷ lời mời (nếu có backend)
  };

  return (
    <Box sx={{
      padding: 2,
      backgroundColor: '#e9e9e9',
      height: '60vh',
      overflowY: 'auto',
      scrollbarWidth: 'none',
      '&::-webkit-scrollbar': {
        display: 'none',
      }
    }}>
      {/* Admin List Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
        <Typography variant="h5" fontWeight="bold">Quản trị viên</Typography>
        {/* Nút Thêm quản trị viên */}
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenDialog} // Mở dialog khi bấm vào nút Xem lời mời
            sx={{ marginRight: 2 }}
          >
            Xem lời mời
          </Button>
          <Button variant="contained" color="primary">
            Thêm quản trị viên
          </Button>
        </Box>
      </Box>

      {/* Admin List */}
      <Box sx={{ padding: 2, backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
        <List>
          {group.Administrators.filter(admin => admin.state === 'accepted').map((admin, index) => (
            <ListItem key={index} sx={{ borderBottom: '1px solid #e0e0e0' }}>
              <ListItemAvatar>
                <Avatar src={`/static/images/avatar/${index + 1}.jpg`} alt={admin.idUser} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="h6" fontWeight="bold">
                    {admin.idUser}
                  </Typography>
                }
                secondary={`Joined on ${new Date(admin.joinDate).toDateString()}`}
              />
              <Button variant="outlined" color="error">
                Xóa quản trị viên
              </Button>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Dialog hiển thị danh sách lời mời */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>Danh sách lời mời quản trị viên</DialogTitle>
        <DialogContent>
          <List>
            {pendingInvites.length > 0 ? (
              pendingInvites.map((invite, index) => (
                <React.Fragment key={index}>
                  <ListItem sx={{ borderBottom: '1px solid #e0e0e0' }}>
                    <ListItemAvatar>
                      <Avatar src={`/static/images/avatar/${index + 1}.jpg`} alt={invite.idUser} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="h6" fontWeight="bold">
                          {invite.idUser}
                        </Typography>
                      }
                      secondary={`Được mời vào ngày: ${new Date(invite.joinDate).toDateString()}`}
                    />
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleCancelInvite(invite.idUser)}
                    >
                      Huỷ lời mời
                    </Button>
                  </ListItem>
                  {index < pendingInvites.length - 1 && <Divider />}
                </React.Fragment>
              ))
            ) : (
              <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 2 }}>
                Không có lời mời nào.
              </Typography>
            )}
          </List>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="secondary" onClick={handleCloseDialog}>
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminGroupContent;
