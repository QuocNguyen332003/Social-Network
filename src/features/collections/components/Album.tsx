import { Box, Button, Grid, IconButton, Typography } from "@mui/material"
import ArticleCard from "./ArticleCard"
import { useState } from "react";
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import AlbumItem from "./AlbumItem";

interface AlbumProps {
    title: string;
    collections: {label: string; data: AlbumItem[]}[];
    currCollection: number;
    setCurrCollection: (index: number) => void;
}
const Album = ({title, collections, currCollection, setCurrCollection}: AlbumProps) => {
    const maxCard = 5;
    const [showAll, setShowAll] = useState(false);
    const displayedItems = showAll ? collections[currCollection].data : collections[currCollection].data.slice(0, maxCard);
    return (
        <Box id ="album"
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
                {collections.map((item, index)=> (
                    <IconButton sx={{borderRadius: 0}} onClick={()=> {setCurrCollection(index)}}>
                        <Typography variant="body1" 
                        sx={[{fontWeight: 'bold',
                        padding: '10px 0', margin: '0 10px',
                        }, index === currCollection? {borderBottom: '2px solid black'}:{}]}
                        >
                        {item.label}
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
                  <Grid item xs={12} key={index}>
                    <ArticleCard item={item}/>
                  </Grid>
                ))}
                {!showAll && collections[currCollection].data.length > maxCard && (
                <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center'}}>
                    <Button onClick={()=> {setShowAll(true)}}
                      sx={{
                          width: '100%', height: '30px'
                      }}
                      >
                      <Typography variant="body1" sx={{fontWeight: 'bold', fontSize: 14, textTransform: 'none'}}>
                          Tất cả
                      </Typography>
                    </Button>
                  </Grid>
                )}
            </Grid>
        </Box>
    )
}
export default Album;