/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Box, Avatar, Button, List, ListItem, ListItemAvatar, ListItemText, Typography, Divider } from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import { Group } from '../../../../../../interface/interface.ts';
import axios from 'axios';
import { format } from 'date-fns'; // Nhập hàm format từ date-fns
import { toast } from 'react-toastify'; // Nhập toast

const MemberGroupContent: React.FC = () => {
  const { group } = useOutletContext<{ group: Group }>();
  const [members, setMembers] = useState<{ idUser: { _id: string; displayName: string }; joinDate: Date; _id: string }[]>([]); // State để lưu danh sách thành viên

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

  const handleRemoveMember = async (userId: string) => { // Đảm bảo sử dụng userId
    try {
      await axios.delete(`http://localhost:3000/v1/group/${group._id}/member/${userId}`); // Gọi API với userId
      setMembers((prevMembers) => prevMembers.filter(member => member.idUser._id !== userId)); // Cập nhật lại danh sách thành viên
      toast.success('Thành viên đã được xóa khỏi nhóm!'); // Hiển thị thông báo thành công
    } catch (error: any) {
      console.error('Error removing member:', error);
      toast.error(error.response?.data.message || 'Có lỗi xảy ra khi xóa thành viên.'); // Hiển thị thông báo lỗi
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
                  onClick={() => handleRemoveMember(member.idUser._id)} // Gọi hàm xóa thành viên với userId
                >
                  Xóa
                </Button>
              </ListItem>
              {index < members.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default MemberGroupContent;
