import { Box, Grid } from '@mui/material';
import  Header  from '../../../shared/components/header/Header';
import  SidebarLeft  from '../../../shared/components/sidebarLeft/SidebarLeft';
import SidebarRightCollections from '../components/SidebarRightCollection';
import CollectionsScreen from './collection/Collection';
import useCollectionMain from './useCollectionMain';

const CollectionsMain = () => {
  const {collections, articles, currCollection, setCurrCollections} = useCollectionMain();
  return (
    <Box>
      <Header />
      <Grid container>
        <Grid item xs={2.5}>
          <SidebarLeft />
        </Grid>
        <Grid item xs={7} sx={{ backgroundColor: '#e9e9e9' }}>
          <CollectionsScreen articles={articles} collections={collections} 
          currCollection={currCollection} setCurrCollections={setCurrCollections}/>
        </Grid>
        <Grid item xs={2.5}>
          <SidebarRightCollections collections={collections} setCurrCollections={setCurrCollections}/>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CollectionsMain;
