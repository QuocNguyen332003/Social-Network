import { Grid } from '@mui/material';
import  Header  from '../../../../shared/components/header/Header';
import  SidebarLeft  from '../../../../shared/components/sidebarLeft/SidebarLeft';
import  SidebarRight  from '../../../../shared/components/sidebarRight/SidebarRight';
import MainContent from './MainContent';

const Group = () => {
  return (
    <>
      <Header />
      <Grid container >
        <Grid item xs={2.5}>
          <SidebarLeft />
        </Grid>
        <Grid item xs={7} sx={{
            backgroundColor: '#e9e9e9',
          }}>
          <MainContent />
        </Grid>
        <Grid item xs={2.5}>
          <SidebarRight />
        </Grid>
      </Grid>
    </>
  );
};

export default Group;
