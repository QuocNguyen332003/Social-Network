import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import GroupCard from './GroupCard';
import CreateGroupForm from './CreateGroupForm';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GroupList = () => {
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [joinedGroups, setJoinedGroups] = useState([
    { groupName: 'Cat Lover Universe', groupDescription: 'A group for cat lovers', groupImage: '../../../assets/images/background-group-test.jpg', isJoined: true },
    { groupName: 'Cooking Group', groupDescription: 'Share your cooking recipes', groupImage: '../../../assets/images/background-group-test.jpg', isJoined: true }
  ]);

  const [notJoinedGroups, setNotJoinedGroups] = useState([
    { groupName: 'Tech Enthusiasts', groupDescription: 'Technology and Gadgets', groupImage: '../../../assets/images/background-group-test.jpg', isJoined: false },
    { groupName: 'Traveling Lovers', groupDescription: 'Explore the world', groupImage: '../../../assets/images/background-group-test.jpg', isJoined: false }
  ]);

  const [isCreateGroupFormOpen, setCreateGroupFormOpen] = useState(false);

  const handleCreateGroup = (groupName: string, groupDescription: string, groupImage: string) => {
    setNotJoinedGroups([
      ...notJoinedGroups,
      { groupName, groupDescription, groupImage, isJoined: false }
    ]);
  };

  const handleGroupClick = (groupName: string) => {
    navigate(`/groups/${groupName}`);
  };

  return (
    <Box 
      sx={{ 
        padding: '16px', 
        height: '85vh'
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
          onClick={() => handleGroupClick(group.groupName)}
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
          onClick={() => handleGroupClick(group.groupName)}
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
