import React, { useState } from 'react';
import {
  Button,
  Grid,
  Box,
  Typography,
  Container,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const Hobby: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Lấy dữ liệu từ query string (URL)
  const searchParams = new URLSearchParams(location.search);
  const firstName = searchParams.get('firstName');
  const lastName = searchParams.get('lastName');
  const email = searchParams.get('email');
  const password = searchParams.get('password');
  const phoneNumber = searchParams.get('phoneNumber');
  const address = searchParams.get('address');
  const gender = searchParams.get('gender');
  const birthday = searchParams.get('birthday');

  // State để lưu các sở thích của người dùng
  const [dataHobby, setDataHobby] = useState([
    { name: 'Ẩm thực', isChoose: false },
    { name: 'Du Lịch', isChoose: false },
    { name: 'Giải trí', isChoose: false },
    { name: 'Thời trang', isChoose: false },
    { name: 'Công nghệ', isChoose: false },
    { name: 'Giáo dục', isChoose: false },
    { name: 'Thể thao', isChoose: false },
    { name: 'Sức khỏe', isChoose: false },
    { name: 'Kinh doanh', isChoose: false },
    { name: 'Nghệ thuật', isChoose: false },
    { name: 'Âm nhạc', isChoose: false },
    { name: 'Phim ảnh', isChoose: false },
    { name: 'Sách', isChoose: false },
    { name: 'Khoa học', isChoose: false },
    { name: 'Tài chính', isChoose: false },
    { name: 'Môi trường', isChoose: false },
    { name: 'Lịch sử', isChoose: false },
  ]);

  // Hàm xử lý khi người dùng nhấn nút xác nhận
  const handleSubmit = () => {
    // Lấy các sở thích đã chọn
    const chosenHobbies = dataHobby
      .filter(hobby => hobby.isChoose) // Lọc các sở thích đã chọn
      .map(hobby => hobby.name); // Chỉ lấy tên sở thích

    // Điều hướng và truyền tất cả dữ liệu bao gồm cả sở thích qua URL (query string)
    navigate(`/new-user/avt-background?firstName=${firstName}&lastName=${lastName}&email=${email}&password=${password}&phoneNumber=${phoneNumber}&address=${address}&gender=${gender}&birthday=${birthday}&hobbies=${chosenHobbies.join(',')}`);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          sx={{ fontWeight: 600 }}
        >
          Chọn sở thích của bạn
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container>
            {dataHobby.map((item, index) => (
              <Grid key={index}>
                <Button 
                  sx={[
                    { 
                      padding: '10px 20px', 
                      margin: '5px', 
                      borderRadius: 50, 
                      border: '1px solid black', 
                      color: 'black', 
                      textTransform: 'none', 
                      ':hover': {  
                        backgroundColor: item.isChoose ? '#1976d2' : '#fff', 
                        boxShadow: 'none'
                      },
                    },
                    item.isChoose ? { bgcolor: '#1976d2' } : { bgcolor: '#fff' }
                  ]}
                  onClick={() => {
                    setDataHobby(prevData => prevData.map((hobby, idx) => 
                      idx === index ? { ...hobby, isChoose: !hobby.isChoose } : hobby
                    ));
                  }}
                >
                  {item.name}
                </Button>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: 'flex', margin: '20px 0px' }}>
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ margin: '0px 10px', mt: 3, mb: 2, bgcolor: '#1976d2', ':hover': { bgcolor: '#1565c0' } }}
              onClick={handleSubmit}
            >
              Xác nhận
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Hobby;
