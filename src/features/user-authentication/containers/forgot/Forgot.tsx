import React from 'react';
import {
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  CssBaseline,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

const Forgot: React.FC = () => {
  const navigate = useNavigate();

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
            backgroundImage: 'url(./src/assets/images/background-login.png)', // Sử dụng đường dẫn đến ảnh của bạn
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
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <img src="./src/assets/images/logoSocialNetwork.png" alt="Logo" style={{ marginBottom: 16, maxWidth: '90%' }} /> {/* Thêm logo */}
              <Typography
                component="h1"
                variant="h5"
                sx={{ fontWeight: 800, fontSize: 40 }}
              >
                Quên mật khẩu
              </Typography>
              <Typography variant="body2" sx={{ mt: 2, textAlign: 'justify', textJustify: 'inter-word' }}>
                Vui lòng nhập địa chỉ email hoặc số điện thoại bạn đã sử dụng để đăng ký và chúng tôi sẽ gửi cho bạn mã xác minh để đặt lại mật khẩu.
              </Typography>
              <Box component="form" noValidate sx={{ mt: 3 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  sx={{ mb: 2 }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2, mb: 2, bgcolor: '#1976d2', ':hover': { bgcolor: '#1565c0' } }}
                >
                  Gửi mã
                </Button>

                <Grid container justifyContent="center">
                  <Grid item>
                    <Link 
                      href="#" 
                      variant="body2"
                      onClick={() => navigate('/login')}
                    >
                      Trở về trang Đăng nhập
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Forgot;
