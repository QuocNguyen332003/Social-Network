import React from 'react';
import { Box, Avatar, Button, List, ListItem, ListItemAvatar, ListItemText, Typography, Divider } from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import { Group } from '../../../../../../interface/interface.ts';

const MemberGroupContent: React.FC = () => {
  const { group } = useOutletContext<{ group: Group }>();

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
      {/* Header của danh sách thành viên */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
        <Typography variant="h5" fontWeight="bold">Danh Sách Thành Viên</Typography>
      </Box>

      {/* Danh sách thành viên */}
      <Box sx={{ padding: 2, backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
        <List>
          {group.members.listUsers.map((member, index) => (
            <React.Fragment key={index}>
              <ListItem sx={{ paddingLeft: 0, borderBottom: '1px solid #e0e0e0' }}>
                <ListItemAvatar>
                  <Avatar src={`/static/images/avatar/${index + 1}.jpg`} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="h6" fontWeight="bold">
                      {member.idUser}
                    </Typography>
                  }
                  secondary={`Joined: ${new Date(member.joinDate).toDateString()}`}
                />
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  sx={{ marginRight: 1 }}
                >
                  Xóa
                </Button>
              </ListItem>
              {index < group.members.listUsers.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default MemberGroupContent;
