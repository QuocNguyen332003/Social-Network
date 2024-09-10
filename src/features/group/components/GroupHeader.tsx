import React from 'react';
import { Box, Typography, Button, Avatar } from '@mui/material';


interface GroupProps {
  _id: string;
  groupName: string;
  type: 'public' | 'private';
  idAdmin: string;
  introduction: string;
  avt: string; // Avatar image of the group
  backGround: string; // Background image of the group
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
interface GroupHeaderProps {
  group: GroupProps;
}

const GroupHeader: React.FC<GroupHeaderProps> = ({group}) => {

  return (
    <Box
      sx={{
        position: 'relative',
        backgroundImage: `url(${group.avt})`,
        height: '200px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', alignItems: 'center' }}>
        <Avatar src={group.avt} sx={{ width: '80px', height: '80px', border: '4px solid white' }} />
        <Box sx={{ marginLeft: '16px' }}>
          <Typography variant="h5" color="black" fontWeight="bold">
            {group.groupName}
          </Typography>
          <Typography variant="body1" color="black">
            {group.articles.count} Bài đăng · {group.members.count} Thành viên
          </Typography>
          <Typography variant="body1" color="black">
            {group.introduction}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ position: 'absolute', top: '16px', right: '16px', display: 'flex', alignItems: 'center' }}>
        <Button variant="contained" sx={{ marginRight: '8px' }}>
          Chỉnh sửa nhóm
        </Button>
      </Box>

      <Box sx={{ position: 'absolute', top: '150px', right: '16px', display: 'flex', alignItems: 'center' }}>
        <Button variant="contained" sx={{ marginRight: '8px' }}>
          Mời thành viên
        </Button>
        <Button variant="contained">
          Chia sẻ
        </Button>
      </Box>
    </Box>
  );
};

export default GroupHeader;
