import React from 'react';
import { Container, Box, Grid, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ForgotContent from './ForgotContent/ForgotContent';

const theme = createTheme();

const ForgotTest: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh', overflow: 'hidden' }}>
        <CssBaseline />

        {/* Phần bên trái (2/3 màn hình) */}
        <Grid
          item
          xs={false}
          sm={7}
          md={8}
          sx={{
            backgroundImage: 'url(./src/assets/images/background-login.png)', // Đường dẫn đến ảnh
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100%',
          }}
        />

        {/* Phần bên phải (1/3 màn hình) */}
        <Grid
          item
          xs={12}
          sm={5}
          md={4}
          component={Box}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ p: 4, boxShadow: 2, borderRadius: 2, height: '100%', overflowY: 'auto' }}
        >
          <Container component="main" maxWidth="xs">
            <ForgotContent />
          </Container>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default ForgotTest;
