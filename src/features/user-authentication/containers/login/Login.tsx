import React from 'react';
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  CssBaseline,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';

const theme = createTheme();

const Login: React.FC = () => {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />

        {/* Phần bên trái (2/3 màn hình) */}
        <Grid
          item
          xs={false}
          sm={7}
          md={8}
          sx={{
            backgroundImage: 'url(/src/assets/images/background-login.png)', // Sử dụng đường dẫn đến ảnh bạn tải lên
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
          sx={{ 
            p: 4, 
            boxShadow: 2, 
            borderRadius: 2, 
            minHeight: '100vh', // Giữ phần bên phải luôn cao 100% màn hình
            overflowY: 'auto' 
          }}
        >
          <Container component="main" maxWidth="xs" sx={{ width: '100%', p: 0 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <img 
                src="./src/assets/images/logoSocialNetwork.png" 
                alt="Logo" 
                style={{ marginBottom: 8, maxWidth: '100%' }} 
              /> {/* Đảm bảo logo có thể thu nhỏ */}
              <Typography
                component="h1"
                variant="h5"
                sx={{ fontWeight: 800, fontSize: 40 }}
              >
                Đăng nhập
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1, width: '100%' }}>
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
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Mật khẩu"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  sx={{ mb: 2 }}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Ghi nhớ đăng nhập"
                  sx={{ mb: 2 }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2, mb: 2, bgcolor: '#1976d2', ':hover': { bgcolor: '#1565c0' } }}
                  onClick={() => navigate('/new-feeds')}
                >
                  Đăng nhập
                </Button>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                  <Link 
                    href="#" 
                    variant="body2" 
                    onClick={() => navigate('/forgot')}
                  >
                    Quên mật khẩu?
                  </Link>
                </Box>

                {/* Đường gạch ngang với dòng chữ */}
                <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
                  <Box sx={{ flexGrow: 1, borderBottom: '1px solid #ccc' }} />
                  <Typography variant="body2" sx={{ mx: 2, color: '#666' }}>
                    Đăng nhập với
                  </Typography>
                  <Box sx={{ flexGrow: 1, borderBottom: '1px solid #ccc' }} />
                </Box>

                {/* Các nút đăng nhập mạng xã hội */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 2,
                    flexWrap: 'wrap', // Cho phép các nút xuống dòng khi không đủ chỗ
                  }}
                >
                  <Button
                    variant="outlined"
                    startIcon={<GoogleIcon />}
                    sx={{ mx: 1, flex: '1 1 30%', minWidth: '100px', mb: 1 }} // Đảm bảo mỗi button có tối thiểu 100px, và có khoảng cách dưới khi xuống dòng
                  >
                    Google
                  </Button>
                </Box>
                
                <Grid container justifyContent="center">
                  <Grid item>
                    <Link 
                      href="#" 
                      variant="body2"
                      onClick={() => navigate('/register')}
                    >
                      Bạn chưa có tài khoản? Đăng ký
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

export default Login;