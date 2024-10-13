import React from 'react';
import {
  Button,
  TextField,
  Link,
  Grid,
  Box,
  FormControlLabel,
  Checkbox,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';


const InfoAccount: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
        <img src="./src/assets/images/QQ Social.png" alt="Logo" style={{ marginBottom: 16, maxWidth: '50%' }} /> {/* Thêm logo */}
        <Typography
          component="h1"
          variant="h5"
          sx={{ fontWeight: 800, fontSize: 40 }}
        >
          Đăng ký
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="Họ"
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="lastName"
              label="Tên"
              name="lastName"
              autoComplete="family-name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Mật khẩu"
              type="password"
              id="password"
              autoComplete="new-password"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="confirmPassword"
              label="Nhập lại mật khẩu"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="Đồng ý với những điều khoản, chính sách"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, bgcolor: '#1976d2', ':hover': { bgcolor: '#1565c0' } }}
          onClick={() => navigate('/register/fill-infomation')}>
          Đăng ký
        </Button>
        <Grid container justifyContent="center">
          <Grid item>
            <Link 
              href="#" 
              variant="body2"
              onClick={() => navigate('/login')}
            >
              Bạn đã có tài khoản? Đăng nhập
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
    
  );
};

export default InfoAccount;
