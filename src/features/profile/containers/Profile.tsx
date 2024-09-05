import { Grid } from '@mui/material';
import  Header  from '../../../shared/components/header/Header';
import SidebarLeft from '../../../shared/components/sidebarLeft/SidebarLeft';
import ProfileHeader from '../components/ProfileHeader';
import ProfileTabs from '../components/ProfileTabs';
import SidebarRight from '../../../shared/components/sidebarRight/SidebarRight';
import { Outlet } from 'react-router-dom';


const Profile = () => {
  return (
    <>
      <Header />
      <Grid container >
        <Grid item xs={2}>
          <SidebarLeft />
        </Grid>
        <Grid item xs={7}
          sx={{
            height: '85vh',
            overflowY: 'auto', 
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            backgroundColor: '#e9e9e9',
            padding: '0 20px'
          }}
        >
          <ProfileHeader/>
          <ProfileTabs userID={'Phan Minh Quan'}/>
          <Outlet/>  
        </Grid>
        <Grid item xs={3}>
          <SidebarRight />
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;
