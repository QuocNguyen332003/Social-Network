import { Box, Typography, Button, Avatar, IconButton } from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ShareIcon from '@mui/icons-material/Share';
import { useNavigate } from 'react-router-dom';

const userID = 'Phan Minh Quan'
const ProfileHeader = () => {
  const navigate = useNavigate();
  return (
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
      <Box
      sx={{
        backgroundImage: 'url(/src/assets/images/background-group-test.jpg)',
        height: '300px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden',
        position: 'relative',
      }}
      />
      {/* Group Info and Avatar */}
      <Box sx={{ position: 'absolute', bottom: '20px', left: '16px', display: 'flex', alignItems: 'center' }}>
        <IconButton sx={{padding: 0}}>
          <Avatar src="/src/assets/images/avt.png" sx={{ width: '150px', height: '150px', border: '4px solid white' }} />
        </IconButton>
        <Box sx={{ marginLeft: '16px', marginTop: '10px'}}>
          <Typography variant="h5" color="black" fontWeight="bold">
            Phan Minh Quan
          </Typography>
          <Typography variant="body1" color="black">
            @MquanArt
          </Typography>
        </Box>
      </Box>

      {/* Invite and Share Buttons below the Edit Button with more spacing */}
      <Box sx={{ position: 'absolute', bottom: '40px', right: '16px', display: 'flex', alignItems: 'center' }}>
        <Button variant="contained" startIcon={<BorderColorIcon />}
          sx={{ marginRight: '8px', width: '150px',
            backgroundColor: '#e9e9e9',
            color: '#150aa1',  textTransform: 'none',
           }} 
           onClick={()=> {navigate(`/edit-profile/${userID}`)}}
          >
          Chỉnh sửa
        </Button>
        <Button variant="contained" startIcon={<ShareIcon/>}
        sx={{ width: '150px',
          backgroundColor: '#e9e9e9',
          color: '#150aa1',  textTransform: 'none',
         }} >
          Chia sẻ
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileHeader;
