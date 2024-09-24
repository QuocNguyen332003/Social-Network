import React from 'react';
import { Grid } from '@mui/material';
import { Outlet } from 'react-router-dom';  // Import Outlet để render nội dung của route
import Header from '../../../../shared/components/header/Header';
import SidebarLeftGroup from '../../components/SidebarLeftGroup';

const NewGroup = () => {
  return (
    <>
      <Header />
      <Grid container sx={{ boxSizing: 'border-box', overflowX: 'hidden' }}> {/* Thêm boxSizing và overflowX */}
        <Grid item xs={12} sm={3}> {/* Đảm bảo tỷ lệ không vượt quá */}
          <SidebarLeftGroup />
        </Grid>
        <Grid item xs={12} sm={9} sx={{
            overflowY: 'auto', 
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            backgroundColor: '#e9e9e9',
            boxSizing: 'border-box', /* Đảm bảo không có tràn do padding */
          }}>
          {/* Outlet sẽ render component tương ứng với từng route */}
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
};

export default NewGroup;