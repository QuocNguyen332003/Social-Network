import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Container } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface ResetPasswordFormProps {
  email: string;
  verifiedOtp: string;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ email, verifiedOtp }) => {
  const [newPassword, setNewPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(false);

    if (newPassword.trim() === '') {
      setPasswordError(true);
      toast.error('Vui lòng nhập mật khẩu mới.');
      return;
    }

    try {
      await axios.post('http://localhost:3000/v1/auth/password-reset/reset', { email, otpCode: verifiedOtp, newPassword });
      toast.success('Đặt lại mật khẩu thành công! Vui lòng đăng nhập.');
      navigate('/login');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Không thể đặt lại mật khẩu, vui lòng thử lại.');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2', mb: 2 }}>
        Đặt lại mật khẩu
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
        Nhập mật khẩu mới cho tài khoản của bạn để hoàn tất quá trình đặt lại mật khẩu.
      </Typography>
      <form onSubmit={handleResetSubmit}>
        <TextField
          fullWidth
          label="Mật khẩu mới"
          variant="outlined"
          type="password"
          placeholder="Nhập mật khẩu mới"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          error={passwordError}
          helperText={passwordError ? 'Vui lòng nhập mật khẩu mới' : ''}
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
          Đặt lại mật khẩu
        </Button>
      </form>
    </Container>
  );
};

export default ResetPasswordForm;
