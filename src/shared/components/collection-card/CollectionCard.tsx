import { Box, Button, CardMedia, Dialog, DialogContent, Grid, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import VideoCard from "../video-card/VideoCard";
import CloseIcon from '@mui/icons-material/Close';
import { MyPhoto } from "../../../interface/interface";
import { useCollectionCard } from "./useCollectionCard";
import ShareIcon from '@mui/icons-material/Share';
import ReplyIcon from '@mui/icons-material/Reply';
interface CollectionCardProps{
    id: string;
    title: string;
    type: string;
    data: MyPhoto[];
}

const CollectionCard = ({id, title,type, data}: CollectionCardProps) => {
    
    const tabs = ["Ảnh của bạn"];
    const [currTab, setCurrTab] = useState(0);
    const {openPhoto, open, CloseDialogCollectionCard, photo } = useCollectionCard();
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
            onClick={() => openPhoto(item)}
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
      <Dialog open={open} onClose={CloseDialogCollectionCard} maxWidth="md"
        fullScreen  
        sx={{padding: '0px',
          '& .MuiDialog-paper': {
            backgroundColor: '#ccc',
          },
        }}
      >
        <DialogContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Grid container sx={{ width: '100vw', height: '90vh', 
             borderRadius: 10, backgroundColor: '#fff'}}>
            <Grid item xs={0.5}/>
            <Grid xs={8}>
              {/* Hiển thị ảnh hoặc video */}
              {type === "img" ? (
                <CardMedia
                  sx={{ width: '100%', height: '80vh', objectFit: 'contain', margin: '5vh 0px' }}
                  component="img"
                  image={photo?photo.link:""}
                  alt={photo?photo.name:""}
                />
              ) : (
                <CardMedia
                sx={{ width: '100%', height: '80vh', margin: '5vh 0px' }}
                  component="video"
                  src={photo?photo.link:""}
                  controls
                />
              )}
            </Grid>
            <Grid item xs={0.5}/>
            {/* Thông tin ảnh */}
            <Grid item xs={2.5} sx={{height: '80vh',  margin: '5vh 0px', backgroundColor: '#e9e9e9', borderRadius: 10 }}>
            <Box sx={{ height: '100%' }}>
            <Typography variant="h5" color="black" fontWeight= "bold"
                sx={{margin: '20px', color:  '#1976d2', fontSize: 30}}>
                Thông tin {photo?(photo.type === 'img'? "ảnh":"video"):""}
              </Typography>
              <Typography variant="body1"  color="text.secondary" sx={{ fontWeight: '500', fontSize: 15, margin: '5vh 3vw' }}>
                Tên ảnh: {photo?photo.name: ""}
              </Typography>
              <Typography variant="body1"  color="text.secondary"sx={{ fontWeight: '500', fontSize: 15, margin: '5vh 3vw' }}>
                Tác giả: {photo ? photo.idAuthor : ""}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: '500', fontSize: 15, margin: '5vh 3vw' }}>
                Created: {photo ? new Date(photo.createdAt).toLocaleDateString() : ""}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: '500', fontSize: 15, margin: '5vh 3vw' }}>
                Updated: {photo ? new Date(photo.updatedAt).toLocaleDateString() : ""}
              </Typography>
              <Button variant="contained" endIcon={<ShareIcon />}
              sx={{margin: '2vh 3vw'}}>
                Chia sẻ
              </Button>
              <Button variant="outlined" endIcon={<ReplyIcon />}
              sx={{backgroundColor: '#fff', margin: '2vh 3vw'}}>
                Xem bài viết gốc
              </Button>
            </Box>
            </Grid>
            <Grid item xs={0.5}>
              <Button onClick={CloseDialogCollectionCard} sx={{marginTop: '10px'}}>
                <CloseIcon />
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default CollectionCard;
