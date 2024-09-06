import React from 'react';
import { Box, Grid } from '@mui/material';
import Header from '../../../../shared/components/header/Header';
import SavedSidebar from '../../components/SavedSidebar';
import MainContent from './MainContent';

const SavedItems = () => {
  return (
    <>
      <Header />
      <Box sx={{ height: '100vh' }}>
        <Grid container sx={{ height: '100%' }}>
          {/* Sidebar chiếm 3 phần của lưới khi kích thước màn hình lớn hơn sm */}
          <Grid
            item
            xs={12}
            sm={3}
            sx={{
              height: { xs: 'auto', sm: '100%' }, // Chiều cao tự động với màn hình nhỏ, 100% với màn hình lớn
            }}
          >
            <Box
              sx={{
                height: { xs: 'auto', sm: '100%' }, // Chiều cao tự động khi màn hình nhỏ hơn sm
                marginRight: { xs: 0, sm: 2 }, // Thêm khoảng cách cho sidebar khi ở màn hình lớn
              }}
            >
              <SavedSidebar />
            </Box>
          </Grid>

          {/* Main content */}
          <Grid item xs={12} sm={9} sx={{
            overflowY: 'auto', 
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            backgroundColor: '#e9e9e9',
          }}>
            <MainContent />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SavedItems;
