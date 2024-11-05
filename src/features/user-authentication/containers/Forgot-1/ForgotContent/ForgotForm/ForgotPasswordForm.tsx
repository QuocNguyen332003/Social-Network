import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Link, Container } from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';

interface ForgotPasswordFormProps {
  onEmailSubmit: (email: string) => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onEmailSubmit }) => {
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<boolean>(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError(true);
      toast.error('Vui lòng nhập địa chỉ email hợp lệ.');
      return;
    }
    setEmailError(false);
    
    try {

      await axios.post('http://localhost:3000/v1/auth/password-reset/initiate', { email });
      onEmailSubmit(email);
      toast.success('OTP đã được gửi đến email của bạn!');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại.');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ textAlign: 'center', mt: 4 }}>
      <img src="./path-to-your-logo/bamboo-logo.png" alt="Bamboo Logo" style={{ marginBottom: 24, maxWidth: '50%' }} />
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
        Quên mật khẩu
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
        Vui lòng nhập địa chỉ email bạn đã sử dụng để đăng ký và chúng tôi sẽ gửi cho bạn mã xác minh để đặt lại mật khẩu.
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email *"
          variant="outlined"
          placeholder="Nhập email của bạn"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={emailError}
          helperText={emailError ? 'Vui lòng nhập địa chỉ email hợp lệ' : ''}
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
          GỬI MÃ
        </Button>
      </form>
      <Link href="/login" variant="body2" color="primary" sx={{ display: 'block', mt: 2 }}>
        Trở về trang Đăng nhập
      </Link>
    </Container>
  );
};

export default ForgotPasswordForm;
