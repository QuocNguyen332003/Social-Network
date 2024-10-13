import React, { useState } from 'react';
import {
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';


const InfoPersonal: React.FC = () => {
  const navigate = useNavigate();
  const [gender, setGender] = useState('');

  const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setGender(event.target.value);
  };
  
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
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="phone"
                label="Số điện thoại"
                name="phone"
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
              onChange={handleChange}
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
                autoComplete="birthday"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: '#1976d2', ':hover': { bgcolor: '#1565c0' } }}
            onClick={() => navigate('/register/choose-interest')}>
            Xác nhận
          </Button>
        </Box>
    </Box>
  );
};

export default InfoPersonal;
