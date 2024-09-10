import React from 'react';
import { Box, Typography, Avatar, Button, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { useOutletContext } from 'react-router-dom';

interface GroupProps {
  _id: string;
  groupName: string;
  type: 'public' | 'private';
  idAdmin: string;
  introduction: string;
  avt: string;
  backGround: string;
  members: {
    count: number;
    listUsers: { idUser: string; joinDate: Date }[];
  };
  articles: {
    count: number;
    listArticle: { idArticle: string; state: string }[];
  };
  rule: string[];
  Administrators: { idUser: string; joinDate: Date }[];
  createdAt: Date;
  updatedAt: Date;
  _destroy?: Date;
}

const AdminContent: React.FC = () => {
  // Lấy dữ liệu group từ Outlet context
  const { group } = useOutletContext<{ group: GroupProps }>();

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
        <Button variant="contained" color="primary">
          Thêm quản trị viên
        </Button>
      </Box>

      {/* Admin List */}
      <Box sx={{ padding: 2, backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
        <List>
          {group.Administrators.map((admin, index) => (
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
    </Box>
  );
};

export default AdminContent;
