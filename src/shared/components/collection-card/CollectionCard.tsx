import { Box, Button, Dialog, DialogContent, DialogTitle, Grid, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import VideoCard from "../video-card/VideoCard";
import CloseIcon from '@mui/icons-material/Close';
import { MyPhoto } from "../../../interface/interface";
interface CollectionCardProps{
    id: string;
    title: string;
    type: string;
    data: MyPhoto[];
}

const CollectionCard = ({id, title,type, data}: CollectionCardProps) => {
    
    const tabs = ["Ảnh của bạn"];
    const [currTab, setCurrTab] = useState(0);
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");  

    const handleClickOpen = (typeLink: string, link: string) => {
      if (typeLink == "img"){
        handleClickOpenImg(link);
      }
    }
    const handleClickOpenImg = (imageUrl: string) => {
      setSelectedImage(imageUrl); 
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      setSelectedImage("");
    };
    const [showAll, setShowAll] = useState(false);
    const displayedItems = showAll ? data : type === "img"? data.slice(0, 11): data.slice(0, 7);
  return (
    <Box id={id}
      sx={{ 
        padding: '16px', 
        backgroundColor: '#fff',
        borderRadius: 5,
        margin: '20px 0'
      }}
    >
        <Typography variant="h5" sx={{fontWeight: 'bold'}}>
            {title}
        </Typography>
        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Box sx={{display: 'flex'}}>
            {tabs.map((item, index)=> (
                <IconButton sx={{borderRadius: 0}} onClick={()=> {setCurrTab(index)}}>
                    <Typography variant="body1" 
                    sx={[{fontWeight: 'bold',
                    padding: '10px 0', margin: '0 10px',
                    }, index === currTab? {borderBottom: '2px solid black'}:{}]}
                    >
                    {item}
                    </Typography>
                </IconButton>
            ))}
            </Box>
            {showAll &&
            <Button startIcon={<UnfoldLessIcon />} onClick={()=> {setShowAll(false)}}>
                Collapse
            </Button>}
        </Box>
        <Grid container spacing={2}>
      {displayedItems.map((item, index) => (
        <Grid item xs={type === "img"? 2: 3} key={index}>
          <IconButton
            sx={{ width: '100%', height: '100%', borderRadius: 0 }}
            onClick={() => handleClickOpen(type, item.link)}
          >
            {type === "img"?(
                <img
                src={item.link}
                alt="Ảnh đại diện"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ): (
                <VideoCard linkVideo={item.link}/>
            )}
          </IconButton>
        </Grid>
      ))}

      {!showAll && data.length > 11 && (
        <Grid item xs={type === "img"? 2: 3} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Button onClick={()=> {setShowAll(true)}}
            sx={{display: 'flex', flexDirection: 'column', 
                width: '100%', height: '100%'
            }}
            >
            <NavigateNextIcon />
            <Typography variant="body1" sx={{fontWeight: 'bold', fontSize: 14, textTransform: 'none'}}>
                Tất cả
            </Typography>
          </Button>
        </Grid>
      )}
      </Grid>
      <Dialog open={open} onClose={handleClose} maxWidth="md"
        fullScreen  
        sx={{padding: '0px'}}
      >
        <DialogTitle>
          <Button onClick={handleClose} sx={{ position: 'absolute', right: 16, top: 16 }}>
            <CloseIcon />
          </Button>
        </DialogTitle>
        <DialogContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img
            src={selectedImage}
            alt="Ảnh đại diện lớn"
            style={{ width: '80%', height: '80%', objectFit: 'contain' }}  // Adjust size and fit
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default CollectionCard;
