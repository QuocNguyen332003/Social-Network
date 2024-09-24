import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

interface GroupTabsProps {
  groupId: string;
}

const GroupTabs: React.FC<GroupTabsProps> = ({ groupId }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabMap: { [key: string]: number } = {
    '': 0,
    'members': 1,
    'rules': 2,
    'admins': 3,
    'pending': 4,
  };

  const currentTab = tabMap[location.pathname.split('/').pop() || ''] || 0;

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    const pathMap = ['', 'members', 'rules', 'admins', 'pending'];
    navigate(`/group/${groupId}/${pathMap[newValue]}`);
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: 'white' }}>
      <Tabs value={currentTab} onChange={handleTabChange} aria-label="group tabs">
        <Tab label="Trang chủ" />
        <Tab label="Thành viên" />
        <Tab label="Quy định nhóm" />
        <Tab label="Quản trị viên" />
        <Tab label="Chờ phê duyệt" />
      </Tabs>
    </Box>
  );
};

export default GroupTabs;
