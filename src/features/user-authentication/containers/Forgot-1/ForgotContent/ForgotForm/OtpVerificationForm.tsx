import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Container } from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';

interface OtpVerificationFormProps {
  email: string;
  onOtpVerified: (otpCode: string) => void;
}

const OtpVerificationForm: React.FC<OtpVerificationFormProps> = ({ email, onOtpVerified }) => {
  const [otpCode, setOtpCode] = useState<string>('');
  const [otpError, setOtpError] = useState<boolean>(false);

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.trim() === '') {
      setOtpError(true);
      toast.error('Vui lòng nhập mã OTP hợp lệ.');
      return;
    }
    setOtpError(false);

    try {
      await axios.post('http://localhost:3000/v1/auth/password-reset/verify', { email, otpCode });
      onOtpVerified(otpCode);
      toast.success('Mã OTP đã được xác minh thành công!');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Mã OTP không hợp lệ hoặc đã hết hạn.');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2', mb: 2 }}>
        Xác minh OTP
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
        Nhập mã OTP đã được gửi đến email của bạn <strong>{email}</strong>. Vui lòng kiểm tra hộp thư đến hoặc thư mục spam.
      </Typography>
      <form onSubmit={handleOtpSubmit}>
        <TextField
          fullWidth
          label="Mã OTP"
          variant="outlined"
          placeholder="Nhập mã OTP"
          value={otpCode}
          onChange={(e) => setOtpCode(e.target.value)}
          error={otpError}
          helperText={otpError ? 'Vui lòng nhập mã OTP hợp lệ' : ''}
          sx={{ mb: 3 }}
        />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            py: 1.5,
            fontWeight: 'bold',
            bgcolor: '#1976d2',
            ':hover': { bgcolor: '#1565c0' }
          }}
        >
          Xác minh
        </Button>
      </form>
    </Container>
  );
};

export default OtpVerificationForm;
