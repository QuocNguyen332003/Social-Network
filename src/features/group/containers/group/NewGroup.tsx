import { Box, Grid } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from '../../../../shared/components/header/Header';
import SidebarLeftGroup from '../../components/SidebarLeftGroup';

const NewGroup = () => {
  return (
    <>
      {/* Header cố định phía trên cùng */}
      <Box sx={{ position: 'sticky', top: 0, zIndex: 1000 }}>
        <Header />
      </Box>
      <Grid container sx={{ boxSizing: 'border-box', overflowX: 'hidden' }}>
        {/* SidebarLeftGroup cố định bên trái và full height */}
        <Grid
          item
          xs={12}
          sm={3}
          sx={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            overflowY: 'hidden', // Ẩn thanh cuộn ở SidebarLeftGroup
          }}
        >
          <SidebarLeftGroup />
        </Grid>
        
        {/* Chỉ phần Outlet có thể cuộn dọc */}
        <Grid
          item
          xs={12}
          sm={9}
          sx={{
            overflowY: 'auto', // Chỉ Outlet được phép cuộn
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            height: '100vh', // Chiếm toàn bộ chiều cao màn hình
            backgroundColor: '#e9e9e9',
          }}
        >
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
};

export default NewGroup;
