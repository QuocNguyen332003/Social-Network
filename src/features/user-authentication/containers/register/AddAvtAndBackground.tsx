/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
 
import React, { useRef, useState } from "react";
import { Avatar, Box, Button, CircularProgress, Grid, IconButton, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddAvtAndBackground: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const avtFileInputRef = useRef<HTMLInputElement | null>(null);
  const bgFileInputRef = useRef<HTMLInputElement | null>(null);
  const [avt, setAvt] = useState<string>("");
  const [background, setBackground] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // State để kiểm tra trạng thái loading

  // Lấy dữ liệu từ URL
  const searchParams = new URLSearchParams(location.search);
  const firstName = searchParams.get("firstName");
  const lastName = searchParams.get("lastName");
  const email = searchParams.get("email");
  const password = searchParams.get("password");
  const phoneNumber = searchParams.get("phoneNumber");
  const address = searchParams.get("address");
  const gender = searchParams.get("gender");
  const birthday = searchParams.get("birthday");
  const hobbies = searchParams.get("hobbies");

  const handleAvtChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setAvt(URL.createObjectURL(file));
    }
  };

  const handleBgChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setBackground(URL.createObjectURL(file));
    }
  };

  const registerUser = async () => {
    setLoading(true); // Bật trạng thái loading
    try {
      const formData = new FormData();
      formData.append("firstName", firstName as string);
      formData.append("lastName", lastName as string);
      formData.append("email", email as string);
      formData.append("password", password as string);
      formData.append("phoneNumber", phoneNumber as string);
      formData.append("address", address as string);
      formData.append("gender", gender as string);
      formData.append("birthday", birthday as string);
      formData.append("hobbies", hobbies as string);

      // Thêm avatar và background vào form data
      if (avtFileInputRef.current?.files?.[0]) {
        formData.append("avt", avtFileInputRef.current.files[0]);
      }
      if (bgFileInputRef.current?.files?.[0]) {
        formData.append("backGround", bgFileInputRef.current.files[0]);
      }

      // Gửi yêu cầu API đăng ký
      const response = await axios.post("http://localhost:3000/v1/auth/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
      });

      if (response.data.success) {
        toast.success("Tạo tài khoản thành công!");
        setTimeout(() => navigate("/login"), 1000);
      } else {
        toast.error("Đăng ký thất bại: " + response.data.message);
      }
    } catch (error: any) {
      toast.error("Có lỗi xảy ra. Vui lòng thử lại sau.");
    } finally {
      setLoading(false); // Tắt trạng thái loading sau khi xử lý xong
    }
  };

  return (
    <Grid container sx={{ backgroundColor: "#e9e9e9", height: "98vh" }}>
      <ToastContainer />
      <Grid xs={2.5}></Grid>
      <Grid xs={7}>
        <Box sx={{ display: "flex", alignItems: "center", backgroundColor: "#fff", borderBottom: "1px solid #e9e9e9" }}>
          <img src="/src/assets/images/QQ Social.png" alt="Logo" style={{ marginBottom: 16, maxWidth: "10vw" }} />
          <Typography variant="h4" fontWeight={500}>
            Thêm ảnh nền và ảnh đại diện của bạn
          </Typography>
        </Box>
        <Box
          sx={{
            position: "relative",
            height: "420px",
            overflow: "hidden",
            borderBottom: "1px solid #e9e9e9",
            paddingBottom: "20px",
            backgroundColor: "#fff",
          }}
        >
          <IconButton
            sx={{
              height: "300px",
              width: "100%",
              overflow: "hidden",
              borderRadius: 0,
              position: "relative",
              display: "flex",
              flexDirection: "column",
              padding: 0,
              backgroundImage: `url(${background})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            onClick={() => bgFileInputRef.current?.click()}
          >
            <AddAPhotoIcon />
            <Typography variant="body1" color="black">
              Thêm ảnh bìa
            </Typography>
          </IconButton>
          <Box sx={{ position: "absolute", bottom: "20px", left: "16px", display: "flex", alignItems: "center" }}>
            <IconButton sx={{ padding: 0 }} onClick={() => avtFileInputRef.current?.click()}>
              <Avatar
                src={avt}
                sx={{ width: "150px", height: "150px", border: "4px solid white" }}
              >
                <AddAPhotoIcon />
              </Avatar>
            </IconButton>
            <Box sx={{ marginLeft: "16px", marginTop: "10px" }}>
              <Typography variant="h5" color="black" fontWeight="bold">
                {firstName} {lastName}
              </Typography>
              <Typography variant="body1" color="black">
                {email}
              </Typography>
            </Box>
          </Box>
          <input type="file" ref={avtFileInputRef} style={{ display: "none" }} accept="image/*" onChange={handleAvtChange} />
          <input type="file" ref={bgFileInputRef} style={{ display: "none" }} accept="image/*" onChange={handleBgChange} />
        </Box>
        <Box sx={{ display: "flex", padding: "20px 20vw", backgroundColor: "#fff" }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ margin: "0px 10px", mt: 3, mb: 2, bgcolor: "#1976d2", ":hover": { bgcolor: "#1565c0" } }}
            onClick={registerUser}
            disabled={loading} // Disable nút khi đang loading
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Xác nhận"} {/* Hiển thị loading spinner */}
          </Button>
        </Box>
      </Grid>
      <Grid xs={2.5}></Grid>
    </Grid>
  );
};

export default AddAvtAndBackground;