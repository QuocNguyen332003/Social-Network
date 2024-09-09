import { Grid } from '@mui/material';
import  Header  from '../../../../shared/components/header/Header';
import MainContent from './MainContent';
import SidebarLeft from '../../../../shared/components/sidebarLeft/SidebarLeft';
import SidebarRight from '../../../../shared/components/sidebarRight/SidebarRight';

const NotificationPage = () => {
  return (
    <>
      <Header />
      <Grid container >
        <Grid item xs={2.5}>
          <SidebarLeft/>
        </Grid>
        <Grid item xs={7}>
          <MainContent />
        </Grid>
        <Grid item xs={2.5}>
          <SidebarRight/>
        </Grid>
      </Grid>
    </>
  );
};

export default NotificationPage;
