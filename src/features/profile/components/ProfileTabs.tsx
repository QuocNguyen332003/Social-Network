import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

interface ProfileTabsProps {
  userID: string;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ userID }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabMap: { [key: string]: number } = {
    '': 0,
    'personal-collection': 1,
  };

  const currentTab = tabMap[location.pathname.split('/').pop() || ''] || 0; 

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {

    const pathMap = ['', 'personal-collection'];
    navigate(`/profile/${userID}/${pathMap[newValue]}`);
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: '#fff' }}>
      <Tabs value={currentTab} onChange={handleTabChange} aria-label="group tabs">
        <Tab label="Bài đăng" />
        <Tab label="Bộ sưu tập" />
      </Tabs>
    </Box>
  );
};

export default ProfileTabs;
