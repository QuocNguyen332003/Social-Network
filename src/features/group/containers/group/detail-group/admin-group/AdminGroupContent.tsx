/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import { Group } from '../../../../../../interface/interface.ts';
import axios from 'axios';
import { toast } from 'react-toastify';

interface User {
  idUser: string;
  state: 'accepted' | 'pending' | 'rejected';
  joinDate: Date;
}

const AdminGroupContent: React.FC = () => {
  const { group } = useOutletContext<{ group: Group }>();
  const [openInviteDialog, setOpenInviteDialog] = useState(false);
  const [openPendingDialog, setOpenPendingDialog] = useState(false);
  const [pendingInvites, setPendingInvites] = useState<User[]>([]); // Khởi tạo là mảng rỗng

  // Lấy danh sách các thành viên có thể mời
  const availableMembers = group.members.listUsers.filter(
    (member) =>
      member.state === 'accepted' &&
      !group.Administrators.some((admin) => admin.idUser.toString() === member.idUser.toString())
  );

  const handleOpenInviteDialog = () => {
    setOpenInviteDialog(true);
  };

  const handleCloseInviteDialog = () => {
    setOpenInviteDialog(false);
  };

  const handleOpenPendingDialog = () => {
    setOpenPendingDialog(true);
  };

  const handleClosePendingDialog = () => {
    setOpenPendingDialog(false);
  };

  const handleCancelInvite = (userId: string) => {
    setPendingInvites((prev) => prev.filter((invite) => invite.idUser !== userId));
    alert(`Đã huỷ lời mời cho quản trị viên ID: ${userId}`);
  };

  const handleAddAdmin = async (userId: string) => {
    try {
      const response = await axios.post(`http://localhost:3000/v1/group/${group._id}/add-admin`, {
        adminId: userId,
      });

      const newAdmin: User = {
        idUser: userId,
        state: 'pending',
        joinDate: new Date(),
      };

      setPendingInvites((prev) => [...prev, newAdmin]); // Cập nhật pendingInvites sau khi mời thành công
      toast.success(`Đã gửi lời mời cho quản trị viên ID: ${userId}`);
      handleCloseInviteDialog();
    } catch (error: any) {
      console.error('Error adding admin:', error);
      toast.error(error.response?.data.message || 'Có lỗi xảy ra khi gửi lời mời.');
    }
  };

  return (
    <Box
      sx={{
        padding: 2,
        backgroundColor: '#e9e9e9',
        height: '60vh',
        overflowY: 'auto',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
        <Typography variant="h5" fontWeight="bold">Quản trị viên</Typography>
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenPendingDialog}
            sx={{ marginRight: 2 }}
          >
            Xem lời mời
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenInviteDialog}
          >
            Thêm quản trị viên
          </Button>
        </Box>
      </Box>

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

      <Dialog open={openPendingDialog} onClose={handleClosePendingDialog} fullWidth maxWidth="sm">
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
          <Button variant="contained" color="secondary" onClick={handleClosePendingDialog}>
            Đóng
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openInviteDialog} onClose={handleCloseInviteDialog} fullWidth maxWidth="sm">
        <DialogTitle>Thêm quản trị viên</DialogTitle>
        <DialogContent>
          <List>
            {availableMembers.length > 0 ? (
              availableMembers.map((member, index) => (
                <ListItem key={index} sx={{ borderBottom: '1px solid #e0e0e0' }}>
                  <ListItemAvatar>
                    <Avatar src={`/static/images/avatar/${index + 1}.jpg`} alt={member.idUser} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="h6" fontWeight="bold">
                        {member.idUser}
                      </Typography>
                    }
                  />
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleAddAdmin(member.idUser)}
                  >
                    Mời
                  </Button>
                </ListItem>
              ))
            ) : (
              <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 2 }}>
                Không có thành viên nào để mời.
              </Typography>
            )}
          </List>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="secondary" onClick={handleCloseInviteDialog}>
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminGroupContent;
