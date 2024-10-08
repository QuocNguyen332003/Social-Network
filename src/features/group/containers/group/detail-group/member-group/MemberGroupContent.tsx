 
/* eslint-disable @typescript-eslint/no-unused-vars */
 
 
import React, { useEffect, useState } from 'react';
import {
  Box,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import { Group } from '../../../../../../interface/interface.ts';
import axios from 'axios';
import { format } from 'date-fns';
import { toast } from 'react-toastify';

const MemberGroupContent: React.FC = () => {
  const { group } = useOutletContext<{ group: Group }>();
  const [members, setMembers] = useState<{ idUser: { _id: string; displayName: string }; joinDate: Date; _id: string }[]>([]); // State để lưu danh sách thành viên
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false); // State để hiển thị hộp thoại xác nhận
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null); // Lưu ID thành viên được chọn để xóa
  const currentUserId = localStorage.getItem('userId') || ''; // Lấy userId từ localStorage
  
  // Gọi API để lấy danh sách thành viên của nhóm
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/v1/group/${group._id}/members`); // Gọi API để lấy thành viên
        setMembers(response.data.members); // Lưu danh sách thành viên vào state
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

    fetchMembers();
  }, [group._id]);

  // Xác nhận trước khi xóa thành viên
  const handleOpenConfirmDialog = (userId: string) => {
    setSelectedMemberId(userId); // Lưu ID thành viên được chọn
    setOpenConfirmDialog(true); // Mở hộp thoại xác nhận
  };

  const handleCloseConfirmDialog = () => {
    setSelectedMemberId(null); // Đặt lại ID thành viên
    setOpenConfirmDialog(false); // Đóng hộp thoại xác nhận
  };

  // Xóa thành viên ra khỏi nhóm
  const handleRemoveMember = async () => {
    try {
      const response = await axios.delete(`http://localhost:3000/v1/group/${group._id}/member/${selectedMemberId}`, {
        data: { requesterId: currentUserId }
      });
      setMembers((prev) => prev.filter((member) => member.idUser._id !== selectedMemberId));
      setOpenConfirmDialog(false);
      toast.success(response.data.message);
    } catch (error) {
      toast.error('Có lỗi xảy ra khi xóa thành viên.');
    }
  };
  

  return (
    <Box
      sx={{
        padding: 2,
        backgroundColor: '#e9e9e9',
        height: '80vh',
        overflowY: 'auto',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
        <Typography variant="h5" fontWeight="bold">Danh Sách Thành Viên</Typography>
      </Box>

      <Box sx={{ padding: 2, backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
        <List>
          {members.map((member, index) => (
            <React.Fragment key={index}>
              <ListItem sx={{ paddingLeft: 0, borderBottom: '1px solid #e0e0e0' }}>
                <ListItemAvatar>
                  <Avatar src={`/static/images/avatar/${index + 1}.jpg`} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="h6" fontWeight="bold">
                      {member.idUser.displayName} {/* Hiển thị displayName */}
                    </Typography>
                  }
                  secondary={`Tham gia: ${format(new Date(member.joinDate), 'dd/MM/yyyy')}`} // Định dạng ngày tham gia
                />
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  sx={{ marginRight: 1 }}
                  onClick={() => handleOpenConfirmDialog(member.idUser._id)} // Mở hộp thoại xác nhận xóa
                >
                  Xóa
                </Button>
              </ListItem>
              {index < members.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Box>

      {/* Dialog xác nhận xóa thành viên */}
      <Dialog open={openConfirmDialog} onClose={handleCloseConfirmDialog} maxWidth="xs" fullWidth>
        <DialogTitle>Xác nhận xóa thành viên</DialogTitle>
        <DialogContent>
          <Typography>Bạn có chắc chắn muốn xóa thành viên này khỏi nhóm và xóa các bài viết của họ không?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog} color="primary">
            Hủy
          </Button>
          <Button onClick={handleRemoveMember} color="error">
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MemberGroupContent;
