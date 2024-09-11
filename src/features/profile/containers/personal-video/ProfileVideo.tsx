import { Box, Button, Dialog, DialogContent, DialogTitle, Grid, IconButton } from "@mui/material";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import VideoCard from "../../../../shared/components/video-card/VideoCard";

const ProfileVideo = () => {
  const dataTest = [
    {linkVideo: "/src/assets/video-test/TestVideo.mp4"},{linkVideo: "/src/assets/video-test/TestVideo.mp4"},{linkVideo: "/src/assets/video-test/TestVideo.mp4"},
    {linkVideo: "/src/assets/video-test/TestVideo.mp4"},{linkVideo: "/src/assets/video-test/TestVideo.mp4"},{linkVideo: "/src/assets/video-test/TestVideo.mp4"},
    {linkVideo: "/src/assets/video-test/TestVideo.mp4"},{linkVideo: "/src/assets/video-test/TestVideo.mp4"},{linkVideo: "/src/assets/video-test/TestVideo.mp4"},
    {linkVideo: "/src/assets/video-test/TestVideo.mp4"},{linkVideo: "/src/assets/video-test/TestVideo.mp4"},{linkVideo: "/src/assets/video-test/TestVideo.mp4"},
    {linkVideo: "/src/assets/video-test/TestVideo.mp4"},{linkVideo: "/src/assets/video-test/TestVideo.mp4"},{linkVideo: "/src/assets/video-test/TestVideo.mp4"},
    {linkVideo: "/src/assets/video-test/TestVideo.mp4"},{linkVideo: "/src/assets/video-test/TestVideo.mp4"},{linkVideo: "/src/assets/video-test/TestVideo.mp4"},
    {linkVideo: "/src/assets/video-test/TestVideo.mp4"},{linkVideo: "/src/assets/video-test/TestVideo.mp4"},{linkVideo: "/src/assets/video-test/TestVideo.mp4"},
  ]

  const [open, setOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState("");  

  const handleClickOpen = (imageUrl: string) => {
    setSelectedVideo(imageUrl); 
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedVideo("");
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
            onClick={() => handleClickOpen(item.linkVideo)}>
              <VideoCard linkVideo={item.linkVideo}/>
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
          <VideoCard linkVideo={selectedVideo}/>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ProfileVideo;
