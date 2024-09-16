import { Grid } from '@mui/material';
import  Header  from '../../../shared/components/header/Header';
import  SidebarLeft  from '../../../shared/components/sidebarLeft/SidebarLeft';
import SidebarRightCollections from '../components/SidebarRightCollection';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { CollectionContext } from '../useCollection';

const CollectionsMain = () => {
  const [currCollection, setCurrCollection] = useState<number>(0);  

  return (
    <CollectionContext.Provider value={{ currCollection, setCurrCollection }}>
      <Header />
      <Grid container>
        <Grid item xs={2.5}>
          <SidebarLeft />
        </Grid>
        <Grid item xs={7} sx={{ backgroundColor: '#e9e9e9' }}>
          <Outlet />
        </Grid>
        <Grid item xs={2.5}>
          <SidebarRightCollections currCollection={currCollection} setCurrCollection={setCurrCollection} />
        </Grid>
      </Grid>
    </CollectionContext.Provider>
  );
};

export default CollectionsMain;
