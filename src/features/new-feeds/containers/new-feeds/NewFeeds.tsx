import { Grid,Box } from '@mui/material';
import { Outlet } from 'react-router-dom'; // Import Outlet để render nội dung của route
import Header from '../../../../shared/components/header/Header';
import SidebarLeft from '../../../../shared/components/sidebarLeft/SidebarLeft';
import SidebarRight from '../../../../shared/components/sidebarRight/SidebarRight';

const NewFeeds = () => {
  return (
    <>
      {/* Đặt Header cố định ở trên cùng */}
      <Box sx={{ position: 'sticky', top: 0, zIndex: 1000, backgroundColor: '#ffffff' }}>
        <Header />
      </Box>
      <Grid container sx={{ boxSizing: 'border-box', overflowX: 'hidden' }}>
        {/* SidebarLeft cố định bên trái */}
        <Grid
          item
          xs={2.5}
          sx={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            overflowY: 'auto',
            boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
          }}
        >
          <SidebarLeft />
        </Grid>
        
        {/* Phần chính giữa chứa Outlet */}
        <Grid
          item
          xs={7}
          sx={{
            overflowY: 'auto',
            height: '100vh',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
            backgroundColor: '#e9e9e9',
          }}
        >
          <Outlet />
        </Grid>
        
        {/* SidebarRight cố định bên phải */}
        <Grid
          item
          xs={2.5}
          sx={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            overflowY: 'auto',
            boxShadow: '-2px 0 5px rgba(0,0,0,0.1)',
          }}
        >
          <SidebarRight />
        </Grid>
      </Grid>
    </>
  );
};

export default NewFeeds;
