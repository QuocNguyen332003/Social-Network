import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert'; // Icon ba dấu chấm
import CloseIcon from '@mui/icons-material/Close'; // Icon đóng
import { Group } from '../../../interface/interface';

interface GroupCardProps {
  group: Group;
  userGroups: string[];
}

const GroupCard: React.FC<GroupCardProps> = ({ group, userGroups }) => {
  const navigate = useNavigate();

  // Kiểm tra xem nhóm đã tham gia hay chưa
  const isJoined = userGroups.includes(group._id);

  // Hàm xử lý khi nhấn vào thẻ nhóm
  const handleClick = () => {
    navigate(`/groups/${group._id}`, { state: { group } });
  };

  return (
    <Box display="flex" justifyContent="center" sx={{ width: '100%' }}>
      {/* Card chung cho cả hai giao diện */}
      <Card sx={{ display: 'flex', width: '96%', marginBottom: 2, cursor: 'pointer', borderRadius: '8px', boxShadow: 3 }}>
        {/* Hiển thị hình ảnh nhóm */}
        <CardMedia
          component="img"
          sx={{ width: isJoined ? 120 : '100%', borderRadius: isJoined ? '8px 0 0 8px' : '8px' }}
          image={group.avt}
          alt={group.groupName}
        />

        {isJoined ? (
          // Giao diện nhóm đã tham gia
          <CardContent sx={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography component="div" variant="h6">
              {group.groupName}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              Lần truy cập gần đây: 36 phút trước {/* Bạn có thể cập nhật thời gian động */}
            </Typography>

            <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
              <Button variant="outlined" color="primary" onClick={handleClick}>
                Xem nhóm
              </Button>
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </Box>
          </CardContent>
        ) : (
          // Giao diện nhóm chưa tham gia
          <CardContent sx={{ position: 'relative', paddingBottom: '16px' }}>
            <Typography component="div" variant="h6">
              {group.groupName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {group.members.count} thành viên • {group.article.count}+ bài viết mỗi ngày 
            </Typography>

            <Button variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }} onClick={handleClick}>
              Tham gia nhóm
            </Button>

            {/* Icon đóng */}
            <IconButton
              sx={{ position: 'absolute', top: '8px', right: '8px' }}
              onClick={() => console.log('Close action triggered')}
            >
              <CloseIcon />
            </IconButton>
          </CardContent>
        )}
      </Card>
    </Box>
  );
};

export default GroupCard;
