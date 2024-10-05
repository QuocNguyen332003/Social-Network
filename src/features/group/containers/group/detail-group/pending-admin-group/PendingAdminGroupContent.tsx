import React, { useState } from 'react';
import { Box, Typography, Avatar, Button, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';

// Định nghĩa cấu trúc Group và Administrator
interface Group {
  Administrators: Array<{
    idUser: string;
    state: 'pending' | 'accepted' | 'rejected';
    joinDate: string;
  }>;
}

// Fake data cho nhóm với danh sách các quản trị viên đang chờ xác nhận
const fakeGroupData: Group = {
  Administrators: [
    {
      idUser: 'nguyenminhthao',
      state: 'pending',
      joinDate: '2023-10-01',
    },
    {
      idUser: 'tranthithu',
      state: 'pending',
      joinDate: '2023-10-02',
    },
    {
      idUser: 'hoangquocbao',
      state: 'pending',
      joinDate: '2023-10-04',
    },
  ],
};

const PendingAdminGroupContent: React.FC = () => {
  // Sử dụng state để lưu trữ và cập nhật danh sách quản trị viên đang chờ xác nhận
  const [group, setGroup] = useState<Group>(fakeGroupData);

  // Hàm xử lý chấp nhận quản trị viên
  const handleAcceptAdmin = (id: string) => {
    setGroup((prevGroup) => ({
      ...prevGroup,
      Administrators: prevGroup.Administrators.map((admin) =>
        admin.idUser === id ? { ...admin, state: 'accepted' } : admin
      ),
    }));
    alert(`Đã chấp nhận người dùng ID: ${id} làm quản trị viên!`);
  };

  // Hàm xử lý từ chối quản trị viên và loại bỏ khỏi danh sách
  const handleRejectAdmin = (id: string) => {
    setGroup((prevGroup) => ({
      ...prevGroup,
      Administrators: prevGroup.Administrators.filter((admin) => admin.idUser !== id),
    }));
    alert(`Đã từ chối và xoá người dùng ID: ${id} khỏi danh sách.`);
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
      {/* Header của danh sách quản trị viên đang chờ xác nhận */}
      <Typography variant="h5" fontWeight="bold" sx={{ marginBottom: 2 }}>Lời mời quản trị viên</Typography>

      {/* Danh sách các quản trị viên đang chờ phê duyệt */}
      <Box sx={{ padding: 2, backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
        <List>
          {group.Administrators.length > 0 ? (
            group.Administrators.map((admin, index) => (
              <ListItem key={index} sx={{ borderBottom: '1px solid #e0e0e0' }}>
                <ListItemAvatar>
                  <Avatar src={`https://randomuser.me/api/portraits/lego/${index + 1}.jpg`} alt={admin.idUser} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="h6" fontWeight="bold">
                      {admin.idUser}
                    </Typography>
                  }
                  secondary={`Requested on ${new Date(admin.joinDate).toDateString()}`}
                />
                {/* Hiển thị các nút hành động tùy thuộc vào trạng thái */}
                {admin.state === 'pending' ? (
                  <>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{ marginRight: 1 }}
                      onClick={() => handleAcceptAdmin(admin.idUser)}
                    >
                      Chấp Nhận
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleRejectAdmin(admin.idUser)}
                    >
                      Từ Chối
                    </Button>
                  </>
                ) : (
                  <Typography variant="body2" sx={{ color: 'green', fontWeight: 'bold' }}>
                    Đã chấp nhận
                  </Typography>
                )}
              </ListItem>
            ))
          ) : (
            <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 2 }}>
              Không có lời mời nào đang chờ xác nhận.
            </Typography>
          )}
        </List>
      </Box>
    </Box>
  );
};

export default PendingAdminGroupContent;
