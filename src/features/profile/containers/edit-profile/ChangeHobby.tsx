import React, { useEffect, useState } from 'react';
import { Button, Grid, Box, Typography, Container, CircularProgress, CssBaseline } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Hobby } from '../../../../interface/mainInterface';
import { createTheme, ThemeProvider } from '@mui/material/styles';
interface chooseHobby{
    id: string;
    name: string;
    isChoose: boolean;
}

const theme = createTheme();

const ChangeHobby: React.FC = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');

  const currentUserId = sessionStorage.getItem('userId') || '';
  // State to store selected hobbies
  const [dataHobby, setDataHobby] = useState<chooseHobby[]>([]);

  useEffect(() => {
    getHobbies();
  }, []);
  
  const getHobbies = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/v1/hobbies/`);
      const allHobbies = response.data.map((data: Hobby) => ({
        id: data._id,
        name: data.name,
        isChoose: false
      }));

      // Gọi API lấy sở thích của người dùng và cập nhật trạng thái `isChoose`
      await getUserHobbies(allHobbies);
    } catch (error) {
      console.error("Failed to fetch all hobbies:", error);
      throw error;
    }
  };
  
  const getUserHobbies = async (allHobbies: chooseHobby[]) => {
    try {
      const response = await axios.get(`http://localhost:3000/v1/user/hobbies/${currentUserId}`, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      const userHobbies = response.data; // Giả sử response trả về danh sách tên các sở thích của người dùng
      const userHobbiesName = await userHobbies.map((hobby: Hobby)=> hobby.name);

      // Cập nhật `isChoose` cho sở thích của người dùng
      const updatedHobbies = allHobbies.map((hobby) => ({
        id: hobby.id,
        name: hobby.name,
        isChoose: userHobbiesName.includes(hobby.name)
      }));
      console.log(updatedHobbies);

      setDataHobby(updatedHobbies);
    } catch (error) {
      console.error("Failed to fetch user hobbies:", error);
      throw error;
    }
  };
  const updateHobbies = async () => {
    try {
      const hobbies = dataHobby.filter((hobby)=> hobby.isChoose);
      const response = await axios.patch(`http://localhost:3000/v1/user/${currentUserId}`, { 
        hobbies: hobbies.map((hobby) => (hobby.id)),
      },
    {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
      console.log("Account updated successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to update Account:", error);
      throw error;
    }
};
    // Handle the submission of hobbies
  const handleSubmit = () => {
    updateHobbies();
    navigate(`/profile?id=${currentUserId}`);
  };

  if (dataHobby.length <= 0) return (<CircularProgress/>)

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh', overflow: 'hidden' }}>
        <CssBaseline />

        {/* Phần bên trái (2/3 màn hình) */}
        <Grid
          item
          xs={false}
          sm={7}
          md={8}
          sx={{
            backgroundImage: 'url(./src/assets/images/background-login.png)', // Sử dụng đường dẫn đến ảnh của bạn
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100%',
          }}
        />

        {/* Phần bên phải (1/3 màn hình) */}
        <Grid
          item
          xs={12}
          sm={5}
          md={4}
          component={Box}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ p: 4, boxShadow: 2, borderRadius: 2, height: '100%', overflowY: 'auto' }}
        >
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
        </Grid>
      </Grid>
    </ThemeProvider>
    
  );
};

export default ChangeHobby;
