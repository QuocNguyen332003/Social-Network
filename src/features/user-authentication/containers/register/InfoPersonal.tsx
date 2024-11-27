import React, { useState } from 'react';
import { Button, TextField, Grid, Box, Typography, MenuItem } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const InfoPersonal: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get data from previous form
  const { firstName, lastName, email, password } = location.state || {};

  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [cccdFile, setCccdFile] = useState<File | null>(null); // State for CCCD file

  const handleCccdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setCccdFile(file); // Store CCCD file
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Navigate to the next form, passing the state object including CCCD
    navigate('/register/choose-interest', {
      state: { firstName, lastName, email, password, phoneNumber, address, gender, cccdFile }
    });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography component="h1" variant="h5" sx={{ fontWeight: 800, fontSize: 40 }}>
        Thông tin cá nhân
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
            <Typography>Tải lên CCCD:</Typography>
            <input type="file" accept="image/*" onChange={handleCccdChange} />
          </Grid>
        </Grid>
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Xác nhận
        </Button>
      </Box>
    </Box>
  );
};

export default InfoPersonal;
