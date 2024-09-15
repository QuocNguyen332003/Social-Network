import React from 'react';
import { Grid } from '@mui/material';
import { Outlet } from 'react-router-dom';  // Import Outlet để render nội dung của route
import Header from '../../../../shared/components/header/Header';
import SidebarLeft from '../../../../shared/components/sidebarLeft/SidebarLeft';
import SidebarRight from '../../../../shared/components/sidebarRight/SidebarRight';

const NewFeeds = () => {
  return (
    <>
      <Header />
      <Grid container>
        <Grid item xs={2.5}>
          <SidebarLeft />
        </Grid>
        <Grid item xs={7} sx={{
            overflowY: 'auto', 
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            backgroundColor: '#e9e9e9',
          }}>
          {/* Outlet sẽ render component tương ứng với từng route */}
          <Outlet />
        </Grid>
        <Grid item xs={2.5}>
          <SidebarRight />
        </Grid>
      </Grid>
    </>
  );
};

export default NewFeeds;
