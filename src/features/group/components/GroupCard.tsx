import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

interface GroupCardProps {
  groupName: string;
  groupDescription: string;
  groupImage: string;
  isJoined: boolean;
  onClick: () => void;
}

const GroupCard: React.FC<GroupCardProps> = ({ groupName, groupDescription, groupImage, isJoined, onClick }) => {
  return (
    <Card onClick={onClick} sx={{ display: 'flex', marginBottom: 2, cursor: 'pointer' }}>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={groupImage}
        alt={groupName}
      />
      <CardContent sx={{ flex: '1 0 auto' }}>
        <Typography component="div" variant="h5">
          {groupName}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" component="div">
          {groupDescription}
        </Typography>
        {isJoined && (
          <Button variant="contained" color="secondary" sx={{ marginTop: 2 }}>
            Đã tham gia
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default GroupCard;
