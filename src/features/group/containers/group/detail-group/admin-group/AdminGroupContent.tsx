/* eslint-disable @typescript-eslint/no-explicit-any */
 
import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import { Group, User } from '../../../../../../interface/interface.ts';
import axios from 'axios';
import { toast } from 'react-toastify';
import { format } from 'date-fns';

const AdminGroupContent: React.FC = () => {
  const token = sessionStorage.getItem('token');
  const { group, role } = useOutletContext<{ group: Group; role: string }>(); // Nhận `role` từ context
  const [openInviteDialog, setOpenInviteDialog] = useState(false);
  const [openPendingDialog, setOpenPendingDialog] = useState(false);
  const [availableMembers, setAvailableMembers] = useState<User[]>([]);
  const [pendingInvites, setPendingInvites] = useState<User[]>([]);
  const [acceptedAdmins, setAcceptedAdmins] = useState<User[]>([]);
  const currentUserId = sessionStorage.getItem('userId') || ''; // Lấy userId từ sessionStorages

  useEffect(() => {
    fetchAvailableMembers();
    fetchPendingInvites();
    fetchAcceptedAdmins();
  }, [group._id]);

  const fetchAvailableMembers = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/v1/group/${group._id}/available-members`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        }
      );
      setAvailableMembers(response.data.availableMembers);
    } catch (error) {
      console.error('Error fetching available members:', error);
    }
  };

  const fetchAcceptedAdmins = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/v1/group/${group._id}/accepted-admins`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        }
      );
      setAcceptedAdmins(response.data.acceptedAdministrators);
    } catch (error) {
      console.error('Error fetching accepted administrators:', error);
    }
  };

  const fetchPendingInvites = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/v1/group/${group._id}/pending-invites`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        }
      );
      setPendingInvites(response.data.pendingInvites);
    } catch (error) {
      console.error('Error fetching pending invites:', error);
    }
  };

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

  const handleCancelInvite = async (userId: string) => {
    try {
      await axios.post(`http://localhost:3000/v1/group/${group._id}/cancel-invite`, { userId, currentUserId },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        }
      );
      setPendingInvites((prev) => prev.filter((invite) => invite.idUser._id !== userId));
      toast.success('Đã huỷ lời mời cho quản trị viên');
      fetchAvailableMembers(); // Cập nhật danh sách thành viên
    } catch (error: any) {
      toast.error(error.response?.data.message || 'Có lỗi xảy ra khi hủy lời mời.');
    }
  };

  const handleRemoveAdmin = async (userId: string) => {
    try {
      await axios.post(`http://localhost:3000/v1/group/${group._id}/remove-admin`, { userId },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        }
      );
      setAcceptedAdmins((prev) => prev.filter((admin) => admin.idUser._id !== userId));
      toast.success('Đã xóa quản trị viên.');
      fetchAvailableMembers(); // Cập nhật danh sách thành viên
    } catch (error: any) {
      toast.error(error.response?.data.message || 'Có lỗi xảy ra khi xóa quản trị viên.');
    }
  };

  const handleAddAdmin = async (userId: string) => {
    try {
      if (!userId || userId.length !== 24) {
        toast.error('ID không hợp lệ, vui lòng kiểm tra lại.');
        return;
      }
      await axios.post(`http://localhost:3000/v1/group/${group._id}/add-admin`, {
        adminId: userId,
        currentUserId: currentUserId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
      });
      toast.success(`Đã gửi lời mời quản trị viên.`);
      await fetchAvailableMembers();
      await fetchPendingInvites();
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
        
        {/* Chỉ hiển thị các nút này nếu `role` là `owner` */}
        {role === 'owner' && (
          <Box>
            <Button variant="contained" color="primary" onClick={handleOpenPendingDialog} sx={{ marginRight: 2 }}>
              Xem lời mời
            </Button>
            <Button variant="contained" color="primary" onClick={handleOpenInviteDialog}>
              Thêm quản trị viên
            </Button>
          </Box>
        )}
      </Box>

      {/* Danh sách quản trị viên */}
      <Box sx={{ padding: 2, backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
        <List>
          {acceptedAdmins.length > 0 ? (
            acceptedAdmins.map((admin, index) => (
              <ListItem key={index} sx={{ borderBottom: '1px solid #e0e0e0' }}>
                <ListItemAvatar>
                  <Avatar src={admin.idUser?.avt || '/path/to/default/avatar.jpg'} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="h6" fontWeight="bold">
                      {admin.idUser.displayName}
                    </Typography>
                  }
                  secondary={`Tham gia vào: ${format(new Date(admin.joinDate), 'dd/MM/yyyy')}`}
                />
                {role === 'owner' && (
                  <Button variant="outlined" color="error" onClick={() => handleRemoveAdmin(admin.idUser._id)}>
                    Xóa quản trị viên
                  </Button>
                )}
              </ListItem>
            ))
          ) : (
            <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 2 }}>
              Không có quản trị viên nào đã chấp nhận.
            </Typography>
          )}
        </List>
      </Box>

      {/* Dialog thêm quản trị viên */}
      <Dialog open={openInviteDialog} onClose={handleCloseInviteDialog} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center', fontSize: '24px' }}>Thêm quản trị viên</DialogTitle>
        <DialogContent>
          <List>
            {availableMembers.length > 0 ? (
              availableMembers.map((member, index) => (
                <ListItem key={index} sx={{ borderBottom: '1px solid #e0e0e0' }}>
                  <ListItemAvatar>
                    <Avatar
                       src={(member?.avt?.length ? member.avt[member.avt.length - 1].link : '/static/images/avatar/default.jpg') as string } >
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="h6" fontWeight="bold">
                        {member.displayName}
                      </Typography>
                    }
                  />
                  <Button variant="outlined" color="primary" onClick={() => handleAddAdmin(member.idUser)}>
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
          <Button variant="contained" sx={{ backgroundColor: '#1976d2' }} onClick={handleCloseInviteDialog}>
            Đóng
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog xem lời mời */}
      <Dialog open={openPendingDialog} onClose={handleClosePendingDialog} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center', fontSize: '24px' }}>Danh sách lời mời quản trị viên</DialogTitle>
        <DialogContent>
          <List>
            {pendingInvites.length > 0 ? (
              pendingInvites.map((invite, index) => (
                <ListItem key={index} sx={{ borderBottom: '1px solid #e0e0e0' }}>
                  <ListItemAvatar>
                    <Avatar 
                    src={invite.idUser?.avt || '/path/to/default/avatar.jpg'}
                     />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="h6" fontWeight="bold">
                        {invite.idUser.displayName}
                      </Typography>
                    }
                    secondary={`Được mời vào ngày: ${format(new Date(invite.joinDate), 'dd/MM/yyyy')}`}
                  />
                  <Button variant="outlined" color="error" onClick={() => handleCancelInvite(invite.idUser._id)}>
                    Huỷ lời mời
                  </Button>
                </ListItem>
              ))
            ) : (
              <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 2 }}>
                Không có lời mời nào đang chờ.
              </Typography>
            )}
          </List>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" sx={{ backgroundColor: '#1976d2' }} onClick={handleClosePendingDialog}>
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminGroupContent;
