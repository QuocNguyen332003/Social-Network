import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import GroupCard from './GroupCard';
import CreateGroupForm from './CreateGroupForm';
import { useState } from 'react';

const GroupList = () => {
  const [joinedGroups, setJoinedGroups] = useState([
    { groupName: 'Cat Lover Universe', groupDescription: 'A group for cat lovers', groupImage: 'path_to_image1', isJoined: true },
    { groupName: 'Cooking Group', groupDescription: 'Share your cooking recipes', groupImage: 'path_to_image2', isJoined: true }
  ]);

  const [notJoinedGroups, setNotJoinedGroups] = useState([
    { groupName: 'Tech Enthusiasts', groupDescription: 'Technology and Gadgets', groupImage: 'path_to_image3', isJoined: false },
    { groupName: 'Traveling Lovers', groupDescription: 'Explore the world', groupImage: 'path_to_image4', isJoined: false }
  ]);

  const [isCreateGroupFormOpen, setCreateGroupFormOpen] = useState(false);

  const handleCreateGroup = (groupName: string, groupDescription: string, groupImage: string) => {
    setNotJoinedGroups([
      ...notJoinedGroups,
      { groupName, groupDescription, groupImage, isJoined: false }
    ]);
  };

  return (
    <Box 
      sx={{ 
        padding: '16px', 
        height: '85vh', 
        overflowY: 'scroll' 
      }}
    >
      {/* Nút Tạo nhóm */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Nhóm</Typography>
        <Button variant="contained" color="primary" onClick={() => setCreateGroupFormOpen(true)}>
          Tạo nhóm
        </Button>
      </Box>

      {/* Nhóm đã tham gia */}
      <Typography variant="h6" gutterBottom>
        Nhóm đã tham gia
      </Typography>
      {joinedGroups.map((group, index) => (
        <GroupCard 
          key={index} 
          groupName={group.groupName} 
          groupDescription={group.groupDescription}
          groupImage={group.groupImage}
          isJoined={group.isJoined}
        />
      ))}

      {/* Nhóm chưa tham gia */}
      <Typography variant="h6" gutterBottom sx={{ marginTop: 4 }}>
        Nhóm chưa tham gia
      </Typography>
      {notJoinedGroups.map((group, index) => (
        <GroupCard 
          key={index} 
          groupName={group.groupName} 
          groupDescription={group.groupDescription}
          groupImage={group.groupImage}
          isJoined={group.isJoined}
        />
      ))}

      {/* Form tạo nhóm */}
      <CreateGroupForm
        open={isCreateGroupFormOpen}
        onClose={() => setCreateGroupFormOpen(false)}
        onCreate={handleCreateGroup}
      />
    </Box>
  );
};

export default GroupList;
