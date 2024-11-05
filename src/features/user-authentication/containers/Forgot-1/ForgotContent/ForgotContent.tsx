import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import ForgotPasswordForm from './ForgotForm/ForgotPasswordForm';
import OtpVerificationForm from './ForgotForm/OtpVerificationForm';
import ResetPasswordForm from './ForgotForm/ResetPasswordForm';

const ForgotContent: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string>(''); 
  const [verifiedOtp, setVerifiedOtp] = useState<string>(''); 

  // Xử lý khi người dùng gửi email thành công
  const handleEmailSubmit = (emailValue: string) => {
    setEmail(emailValue);
    setStep(2);
  };

  // Xử lý khi mã OTP được xác minh thành công
  const handleOtpVerified = (otpCode: string) => {
    setVerifiedOtp(otpCode);
    setStep(3);
  };

  return (
    <>
      {/* Hiển thị từng form dựa trên bước hiện tại */}
      {step === 1 && <ForgotPasswordForm onEmailSubmit={handleEmailSubmit} />}
      {step === 2 && <OtpVerificationForm email={email} onOtpVerified={handleOtpVerified} />}
      {step === 3 && <ResetPasswordForm email={email} verifiedOtp={verifiedOtp} />}
    </>
  );
};

export default ForgotContent;
