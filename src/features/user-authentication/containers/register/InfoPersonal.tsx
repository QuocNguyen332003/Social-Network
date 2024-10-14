import React, { useState } from 'react';
import {
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  MenuItem,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const InfoPersonal: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Lấy dữ liệu từ query string (URL)
  const searchParams = new URLSearchParams(location.search);
  const firstName = searchParams.get('firstName');
  const lastName = searchParams.get('lastName');
  const email = searchParams.get('email');
  const password = searchParams.get('password');
  
  // State cho các trường mới
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Điều hướng và truyền dữ liệu qua URL (query string)
    navigate(`/register/choose-interest?firstName=${firstName}&lastName=${lastName}&email=${email}&password=${password}&phoneNumber=${phoneNumber}&address=${address}&gender=${gender}&birthday=${birthday}`);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <img
        src="./src/assets/images/QQ Social.png"
        alt="Logo"
        style={{ marginBottom: 16, maxWidth: '50%' }}
      />
      <Typography
        component="h1"
        variant="h5"
        sx={{ fontWeight: 800, fontSize: 40 }}
      >
        Đăng ký
      </Typography>
      <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="phone"
              label="Số điện thoại"
              name="phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              autoComplete="phone"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="address"
              label="Địa chỉ"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              autoComplete="address"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              required
              fullWidth
              name="gender"
              label="Giới tính"
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <MenuItem value="male">Nam</MenuItem>
              <MenuItem value="female">Nữ</MenuItem>
              <MenuItem value="other">Khác</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              Ngày sinh: 
            </Typography>
            <TextField
              required
              fullWidth
              name="birthday"
              type="date"
              id="birthday"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              autoComplete="birthday"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, bgcolor: '#1976d2', ':hover': { bgcolor: '#1565c0' } }}
        >
          Xác nhận
        </Button>
      </Box>
    </Box>
  );
};

export default InfoPersonal;
