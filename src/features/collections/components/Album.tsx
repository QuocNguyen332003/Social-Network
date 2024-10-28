import { Box, Button, Grid, IconButton, Typography } from "@mui/material"
import ArticleCard from "./ArticleCard"
import { useState } from "react";
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import { Article, Collection } from "../../../interface/interface";

interface AlbumProps {
    title: string;
    article: Article[];
    collections: Collection[];
    currCollection: Collection | null;
    setCurrCollections: (value: Collection | null) => void; 
}
const Album = ({title, article, collections, currCollection, setCurrCollections}: AlbumProps) => {
    const maxCard = 5;
    const [showAll, setShowAll] = useState(false);
    const displayedItems = showAll ? article : article.slice(0, maxCard);
    if (currCollection === null && !currCollection){
      return <Typography>Loading...</Typography>
    }
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
                {collections.map((item)=> (
                    <IconButton sx={{borderRadius: 0}} onClick={()=> {setCurrCollections(item)}}>
                        <Typography variant="body1" 
                        sx={[{fontWeight: 'bold',
                        padding: '10px 0', margin: '0 10px',
                        }, item._id === currCollection._id? {borderBottom: '2px solid black'}:{}]}
                        >
                        {item.name}
                        </Typography>
                    </IconButton>
                ))}
                </Box>
                {showAll &&
                <Button startIcon={<UnfoldLessIcon />} onClick={()=> {setShowAll(false)}}>
                    Collapse
                </Button>}
            </Box>
            <Grid container spacing={2} sx={{
              minHeight: 200, maxHeight: 400,
              overflowY: 'scroll',
              scrollbarWidth: 'none', // Ẩn thanh cuộn trên Firefox
              '&::-webkit-scrollbar': { display: 'none' } // Ẩn thanh cuộn trên Chrome, Safari
            }}>
                {displayedItems.map((item, index) => (
                  <Grid item xs={12} key={index}>
                    <ArticleCard article={item} collection={currCollection}/>
                  </Grid>
                ))}
                {!showAll && article.length > maxCard && (
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