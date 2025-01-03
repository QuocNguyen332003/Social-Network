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
  const token = sessionStorage.getItem('token');
  const { group, role } = useOutletContext<{ group: Group; role: string }>(); // Nhận role từ context
  const [members, setMembers] = useState<{ idUser: {
    [x: string]: any; _id: string; displayName: string 
}; joinDate: Date; _id: string }[]>([]); // State để lưu danh sách thành viên
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false); // State để hiển thị hộp thoại xác nhận
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null); // Lưu ID thành viên được chọn để xóa
  const currentUserId = sessionStorage.getItem('userId') || ''; // Lấy userId từ sessionStorage

  // Gọi API để lấy danh sách thành viên của nhóm
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/v1/group/${group._id}/members`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ); 
        setMembers(response.data.members); 
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

    fetchMembers();
    
  }, [group._id, token]);

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
      // Gửi yêu cầu xóa thành viên
      const response = await axios.delete(
        `http://localhost:3000/v1/group/${group._id}/member/${selectedMemberId}`,
        {
          headers: {
            Authorization: `Bearer ${token}` // Thêm token vào headers
          },
          data: { requesterId: currentUserId },
        }
      );
      
      // Cập nhật lại danh sách thành viên sau khi xóa thành công
      setMembers((prev) => prev.filter((member) => member.idUser._id !== selectedMemberId)); 
      setOpenConfirmDialog(false);  // Đóng hộp thoại xác nhận
      toast.success(response.data.message);  // Hiển thị thông báo thành công
  
    } catch (error: any) {
      // Kiểm tra nếu có lỗi từ server (ví dụ: thông báo lỗi chi tiết)
      if (error.response) {
        // Lỗi trả về từ server (có thể là thông báo lỗi như "Không thể xóa người tạo nhóm")
        toast.error(error.response.data.message || 'Có lỗi xảy ra khi xóa thành viên.');
      } else {
        // Lỗi khác (ví dụ: lỗi kết nối)
        toast.error('Có lỗi xảy ra khi xóa thành viên.');
      }
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
                  <Avatar 
                    src={ (member?.idUser?.avt?.length  ? member.idUser.avt[member.idUser.avt.length - 1].link : '/static/images/avatar/default.jpg') as string}                    
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="h6" fontWeight="bold">
                      {member.idUser.displayName} {/* Hiển thị displayName */}
                    </Typography>
                  }
                  secondary={`Tham gia: ${format(new Date(member.joinDate), 'dd/MM/yyyy')}`} // Định dạng ngày tham gia
                />

                {/* Chỉ hiển thị nút Xóa cho vai trò owner hoặc admin */}
                {(role === 'owner' || role === 'admin') && (
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    sx={{ marginRight: 1 }}
                    onClick={() => handleOpenConfirmDialog(member.idUser._id)} // Mở hộp thoại xác nhận xóa
                  >
                    Xóa
                  </Button>
                )}
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
