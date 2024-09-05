import { Box, Typography, Button, Avatar, IconButton } from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ShareIcon from '@mui/icons-material/Share';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
const ProfileHeaderEdit = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        height: '420px',
        overflow: 'hidden',
        borderBottom: '1px solid #e9e9e9',
        paddingBottom: '20px'
      }}
    >
      <IconButton
      sx={{
        height: '300px', width: '100%',
        overflow: 'hidden', borderRadius: 0, position: 'relative',
        display: 'flex', flexDirection: 'column',
        padding: 0,
        '&::before': {
          content: '""', position: 'absolute',
          top: 0, left: 0, width: '100%', height: '100%',
          backgroundImage: 'url(/src/assets/images/background-group-test.jpg)',
          backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat',
          filter: 'blur(2px)',
          zIndex: -1, 
        },
      }}
      >
        <AddAPhotoIcon/>
        <Typography variant="body1" color="black">
            Thêm ảnh bìa
          </Typography>
      </IconButton>
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
          >
          Lưu
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

export default ProfileHeaderEdit;
