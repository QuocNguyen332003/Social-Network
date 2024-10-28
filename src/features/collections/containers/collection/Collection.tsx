import { Box } from "@mui/material";
import CollectionCard from "../../../../shared/components/collection-card/CollectionCard";
import Album from "../../components/Album";
import useCollection from "./useCollection";
import { Article, Collection } from "../../../../interface/interface";

interface CollectionsProps{
  collections: Collection[];
  articles: Article[];
  currCollection: Collection | null;
  setCurrCollections: (value: Collection | null) => void; 
}
const CollectionsScreen = ({collections, articles, currCollection, setCurrCollections}: CollectionsProps) => {
    const { photos } = useCollection();
  return (
    <Box 
      sx={{ 
        padding: '16px', 
        height: '85vh', 
        overflowY: 'scroll',
        scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
        },
        backgroundColor: '#e9e9e9',
      }}
      
    >
      <CollectionCard title={"Ảnh"} data={photos.img} id={'collection-image'} type={"img"}/>
      <CollectionCard title={"Video"} data={photos.video} id={'collection-video'} type={"video"}/>
      <Album title={"Album"} article={articles} collections={collections} 
      currCollection={currCollection} setCurrCollections={setCurrCollections}/>
    </Box>
  );
}

export default CollectionsScreen;
