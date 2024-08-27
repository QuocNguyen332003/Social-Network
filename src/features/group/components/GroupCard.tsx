import React from 'react';
import { Card, CardContent, Typography, Button, Avatar, Box } from '@mui/material';

interface GroupCardProps {
  groupName: string;
  groupDescription: string;
  groupImage: string;
  isJoined: boolean;
}

const GroupCard: React.FC<GroupCardProps> = ({ groupName, groupDescription, groupImage, isJoined }) => {
  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Box display="flex" alignItems="center">
          <Avatar alt={groupName} src={groupImage} sx={{ width: 56, height: 56, marginRight: 2 }} />
          <Box>
            <Typography variant="h6">{groupName}</Typography>
            <Typography variant="body2" color="textSecondary">{groupDescription}</Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          color={isJoined ? 'secondary' : 'primary'}
          sx={{ marginTop: 2 }}
        >
          {isJoined ? 'Đã tham gia' : 'Tham gia'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default GroupCard;
