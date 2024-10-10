import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

interface GroupTabsProps {
  groupId: string;
  role: 'owner' | 'admin' | 'member' | 'none';
}

const GroupTabs: React.FC<GroupTabsProps> = ({ groupId, role }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabMap: { [key: string]: number } = {
    '': 0,
    'members': 1,
    'rules': 2,
    'admins': 3,
    'pending': 4,
    'invite-members': 5,
    'personal-management': 6,
  };
  const currentTab = tabMap[location.pathname.split('/').pop() || ''] || 0;

  // Mảng các tab có quyền hiển thị dựa trên vai trò
  const tabList = [
    { name: '', label: 'Trang chủ', roles: ['owner', 'admin', 'member'] },
    { name: 'members', label: 'Thành viên', roles: ['owner', 'admin', 'member'] },
    { name: 'rules', label: 'Quy định nhóm', roles: ['owner', 'admin', 'member'] },
    { name: 'admins', label: 'Quản trị viên', roles: ['owner', 'admin', 'member'] },
    { name: 'pending', label: 'Chờ phê duyệt bài', roles: ['owner', 'admin'] },
    { name: 'invite-members', label: 'Yêu cầu tham gia', roles: ['owner', 'admin'] },
    { name: 'personal-management', label: 'Quản lý cá nhân', roles: ['owner', 'admin', 'member'] },
  ];

  // Xác định các tab được phép hiển thị dựa trên vai trò
  const allowedTabs = tabList.filter((tab) => tab.roles.includes(role));

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    navigate(`/group/${groupId}/${allowedTabs[newValue].name}`);
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: 'white' }}>
      <Tabs value={currentTab} onChange={handleTabChange} aria-label="group tabs">
        {allowedTabs.map((tab, index) => (
          <Tab key={index} label={tab.label} />
        ))}
      </Tabs>
    </Box>
  );
};

export default GroupTabs;
