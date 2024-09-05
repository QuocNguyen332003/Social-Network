import { Box, Button, Dialog, DialogContent, DialogTitle, Grid, IconButton } from "@mui/material";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';

const ProfileImage = () => {
  const dataTest = [
    {avt: "/src/assets/images/avt.png"},{avt: "/src/assets/images/avt.png"},{avt: "/src/assets/images/avt.png"},
    {avt: "/src/assets/images/background-login.png"},{avt: "/src/assets/images/avt.png"},{avt: "/src/assets/images/avt.png"},
    {avt: "/src/assets/images/test.png"},{avt: "/src/assets/images/avt.png"},{avt: "/src/assets/images/avt.png"},
    {avt: "/src/assets/images/avt.png"},{avt: "/src/assets/images/avt.png"},{avt: "/src/assets/images/avt.png"},
    {avt: "/src/assets/images/avt.png"},{avt: "/src/assets/images/avt.png"},{avt: "/src/assets/images/avt.png"},
    {avt: "/src/assets/images/avt.png"},{avt: "/src/assets/images/avt.png"},{avt: "/src/assets/images/avt.png"},
    {avt: "/src/assets/images/avt.png"},{avt: "/src/assets/images/avt.png"},{avt: "/src/assets/images/avt.png"},
    {avt: "/src/assets/images/avt.png"},{avt: "/src/assets/images/avt.png"},{avt: "/src/assets/images/avt.png"},
  ]

  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");  

  const handleClickOpen = (imageUrl: string) => {
    setSelectedImage(imageUrl); 
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage("");
  };

  return (
    <Box sx={{
      backgroundColor: '#e9e9e9',
      padding: '20px'
    }}>
      <Grid container>
        {dataTest.map((item)=> 
          <Grid item xs={3}>
            <IconButton sx={{width: '100%', height: '100%', borderRadius: 0}}
            onClick={() => handleClickOpen(item.avt)}>
              <img
                src= {item.avt}
                alt="Ảnh đại diện"
                style={{width: '100%', height: '100%',  objectFit: 'cover',}}
              /> 
            </IconButton>
          </Grid>
        )}
      </Grid>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth
        sx={{padding: '0px'}}>
        <DialogTitle>
          <Button onClick={handleClose} sx={{ position: 'absolute', right: 16, top: 16 }}>
            <CloseIcon />
          </Button>
        </DialogTitle>
        <DialogContent>
          <img
            src={selectedImage}
            alt="Ảnh đại diện lớn"
            style={{ width: '80%', height: '80%', objectFit: 'contain' }}  // Adjust size and fit
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ProfileImage;
