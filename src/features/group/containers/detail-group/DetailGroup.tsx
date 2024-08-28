import { Grid } from '@mui/material';
import  Header  from '../../../../shared/components/header/Header';
import  SidebarLeft  from '../../../../shared/components/sidebarLeft/SidebarLeft';
import  SidebarRight  from '../../../../shared/components/sidebarRight/SidebarRight';
import MainContent from './MainContent';

const NewFeeds = () => {
  return (
    <>
      <Header />
      <Grid container >
        <Grid item xs={2}>
          <SidebarLeft />
        </Grid>
        <Grid item xs={7}>
          <MainContent />
        </Grid>
        <Grid item xs={3}>
          <SidebarRight />
        </Grid>
      </Grid>
    </>
  );
};

export default NewFeeds;
