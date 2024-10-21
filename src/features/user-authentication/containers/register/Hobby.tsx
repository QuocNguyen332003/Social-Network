import React, { useState } from 'react';
import { Button, Grid, Box, Typography, Container } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const Hobby: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract the data passed via state from the previous form
  const { firstName, lastName, email, password, phoneNumber, address, gender, birthday, cccdFile } = location.state || {};

  // State to store selected hobbies
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

  // Handle the submission of hobbies
  const handleSubmit = () => {
    const chosenHobbies = dataHobby.filter(hobby => hobby.isChoose).map(hobby => hobby.name);

    // Navigate to the next form with the complete data, including hobbies
    navigate('/new-user/avt-background', {
      state: {
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        address,
        gender,
        birthday,
        hobbies: chosenHobbies,
        cccdFile
      }
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5" sx={{ fontWeight: 600 }}>
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
                      ':hover': { backgroundColor: item.isChoose ? '#1976d2' : '#fff' }
                    },
                    item.isChoose ? { bgcolor: '#1976d2' } : { bgcolor: '#fff' }
                  ]}
                  onClick={() => {
                    setDataHobby(prevData =>
                      prevData.map((hobby, idx) => (idx === index ? { ...hobby, isChoose: !hobby.isChoose } : hobby))
                    );
                  }}
                >
                  {item.name}
                </Button>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: 'flex', margin: '20px 0px' }}>
            <Button type="button" fullWidth variant="contained" sx={{ margin: '0px 10px', mt: 3, mb: 2 }} onClick={handleSubmit}>
              Xác nhận
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Hobby;
