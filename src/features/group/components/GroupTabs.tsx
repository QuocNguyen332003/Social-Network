import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';

const GroupTabs = () => {
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={0} aria-label="group tabs">
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
        