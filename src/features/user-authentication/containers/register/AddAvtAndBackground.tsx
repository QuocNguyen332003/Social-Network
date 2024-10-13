import { Avatar, Box, Button, Grid, IconButton, Typography } from "@mui/material";
import { useRef, useState } from "react";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { User } from "../../../../interface/interface";
import { useNavigate } from "react-router-dom";

const AddAvtAndBackground = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [isAvt, setIsAvt] = useState<boolean>(true);
    const [avt, setAvt] = useState<string>("");
    const [background, setBackground] = useState<string>("");

    const [myUser, _] = useState<User>({
        _id: "1234567890",
        account: {
          warningLevel: 0,
          email: "example@example.com",
          password: "hashedpassword123",
        },
        firstName: "Nguyễn",
        lastName: "Văn A",
        displayName: "Nguyễn Văn A",
        userName: "nguyenvana",
        details: {
          phoneNumber: "0123456789",
          address: "123 Đường ABC, Quận 1, TP. HCM",
          gender: true, // true = male, false = female
          birthDate: new Date("1990-01-01"),
        },
        friends: [], // Mảng trống
        status: "active",
        avt: [], // Mảng trống
        collections: [], // Mảng trống
        groups: [], // Mảng trống
        backGround: [], // Mảng trống
        aboutMe: "Lập trình viên thích khám phá công nghệ.",
        hobbies: [], // Mảng trống
        listArticle: [], // Mảng trống
        createdAt: new Date("2023-01-01"),
        updatedAt: null, // Chưa được cập nhật
        _destroy: null, // Chưa bị xóa
        
        // Các trường thêm vào để không bị lỗi
        idUser: null,
        state: null,
        joinDate: new Date("2023-01-01"),
      });
    
    const openFile = () => {
      // Kích hoạt input file ẩn khi gọi hàm
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files && event.target.files[0];
      if (file) {
        const fileUrl = URL.createObjectURL(file);
        if (isAvt){
            setAvt(fileUrl);
        } else {
            setBackground(fileUrl);
        }
      }
    };
    const handlePressChangeBackground = () => {
      openFile();
      setIsAvt(false);
    }
    const handlePressChangeAvt = () => {
      openFile();
      setIsAvt(true);
    }
    return (
      <Grid container sx={{backgroundColor: '#e9e9e9', height: '98vh'}}>
        <Grid xs={2.5}></Grid>
        <Grid xs={7} >
            <Box sx={{display: 'flex', alignItems: 'center',
                backgroundColor: '#fff', borderBottom:'1px solid #e9e9e9'
            }}>
                <img src="/src/assets/images/QQ Social.png" alt="Logo" style={{ marginBottom: 16, maxWidth: '10vw' }} /> {/* Thêm logo */}
                <Typography variant="h4" fontWeight={500}>Thêm ảnh nền và ảnh đại diện của bạn</Typography>
            </Box>
            <Box
              sx={{
                position: 'relative',
                height: '420px',
                overflow: 'hidden',
                borderBottom: '1px solid #e9e9e9',
                paddingBottom: '20px',
                backgroundColor: '#fff',
              }}
            >
              <IconButton
              sx={{
                height: '300px', width: '100%',
                overflow: 'hidden', borderRadius: 0, position: 'relative',
                display: 'flex', flexDirection: 'column',
                padding: 0,
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat',
              }}
              onClick={handlePressChangeBackground}
              >
                <AddAPhotoIcon/>
                <Typography variant="body1" color="black">
                    Thêm ảnh bìa
                  </Typography>
              </IconButton>
              {/* Group Info and Avatar */}
              <Box sx={{ position: 'absolute', bottom: '20px', left: '16px', display: 'flex', alignItems: 'center' }}>
                <IconButton sx={{padding: 0}} onClick={handlePressChangeAvt}>
                  <Avatar src={avt} sx={{ width: '150px', height: '150px', border: '4px solid white',
                    display: 'flex', flexDirection: 'column'
                   }}>
                    <AddAPhotoIcon/>
                    <Typography variant="body1" color="black">
                        Thêm ảnh
                    </Typography>
                  </Avatar>
                </IconButton>
                <Box sx={{ marginLeft: '16px', marginTop: '10px'}}>
                  <Typography variant="h5" color="black" fontWeight="bold">
                    {myUser.firstName + " " + myUser.lastName}
                  </Typography>
                  <Typography variant="body1" color="black">
                    {myUser.userName}
                  </Typography>
                </Box>
              </Box>
          
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }} // Ẩn input
                accept="image/*" // Giới hạn chỉ nhận file ảnh
                onChange={handleFileChange} // Xử lý khi file được chọn
              />
            </Box>
            <Box sx={{display: 'flex', padding: '20px 20vw',
                backgroundColor: '#fff'
            }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ margin: '0px 10px',mt: 3, mb: 2, bgcolor: '#fff', ':hover': { bgcolor: '#ccc' }, color: 'black' }}
                  onClick={() => navigate('/new-feeds')}>
                  Bỏ qua
                </Button>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ margin: '0px 10px', mt: 3, mb: 2, bgcolor: '#1976d2', ':hover': { bgcolor: '#1565c0' } }}
                  onClick={() => navigate('/new-feeds')}>
                  Xác nhận
                </Button>
            </Box>
        </Grid>
        <Grid xs={2.5}></Grid>
      </Grid>
    );
}

export default AddAvtAndBackground;