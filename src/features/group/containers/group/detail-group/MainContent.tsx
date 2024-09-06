import { Grid } from '@mui/material';
import  Header  from '../../../../../shared/components/header/Header';
import  SidebarLeft  from  '../../../../../shared/components/sidebarLeft/SidebarLeft';
import  SidebarRight  from '../../../../../shared/components/sidebarRight/SidebarRight';
import GroupHeader from '../../../components/GroupHeader';
import GroupTabs from '../../../components/GroupTabs';
import { Outlet } from 'react-router-dom'; // Import Outlet

const MainContent = () => {
  return (
    <>
      <Header />
      <Grid container >
        <Grid item xs={2}>
          <SidebarLeft />
        </Grid>
        <Grid item xs={7} >
          <GroupHeader />
          <GroupTabs groupName="Cat Lover Universe" />
          <Outlet/>  
        </Grid>
        <Grid item xs={3}>
          <SidebarRight />
        </Grid>
      </Grid>
    </>
  );
};

export default MainContent;
