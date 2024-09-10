import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface GroupCardProps {
  group: GroupProps;
  userGroups: string[];
}

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

const GroupCard: React.FC<GroupCardProps> = ({ group, userGroups }) => {
  const navigate = useNavigate();

  // Kiểm tra xem nhóm đã tham gia hay chưa
  const isJoined = userGroups.includes(group._id);

  // Hàm xử lý khi nhấn vào thẻ nhóm
  const handleClick = () => {
    // Sử dụng navigate để truyền toàn bộ dữ liệu nhóm
    navigate(`/groups/${group._id}`, { state: { group } });
  };

  return (
    <Box display="flex" justifyContent="center" sx={{ width: '100%' }}>
      <Card onClick={handleClick} sx={{ display: 'flex', width: '96%', marginBottom: 2, cursor: 'pointer', borderRadius: '8px' }}>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={group.avt}
          alt={group.groupName}
        />
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {group.groupName}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {group.introduction}
          </Typography>

          {isJoined ? (
            <Button variant="contained" color="secondary" sx={{ marginTop: 2 }}>
              Đã tham gia
            </Button>
          ) : (
            <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
              Tham gia
            </Button>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default GroupCard;
