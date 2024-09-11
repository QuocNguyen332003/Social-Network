import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import VideoCard from "../../../shared/components/video-card/VideoCard";
interface CollectionCardProps{
    title: string;
    type: string;
    data: { link: string }[];
}

const CollectionCard = ({title, type, data}: CollectionCardProps) => {
    
    const tabs = ["Ảnh của bạn"];
    const [currTab, setCurrTab] = useState(0);
    const handleClickOpen = () => {

    }
    const [showAll, setShowAll] = useState(false);
    const displayedItems = showAll ? data : type === "img"? data.slice(0, 11): data.slice(0, 7);
  return (
    <Box 
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
            onClick={handleClickOpen}
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
    </Box>
  );
}

export default CollectionCard;
