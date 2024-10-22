import { Grid } from '@mui/material';
import  Header  from '../../../shared/components/header/Header';
import SidebarLeft from '../../../shared/components/sidebarLeft/SidebarLeft';
import ProfileHeader from '../components/ProfileHeader';
import ProfileTabs from '../components/ProfileTabs';
import SidebarRight from '../../../shared/components/sidebarRight/SidebarRight';
import { Outlet } from 'react-router-dom';
import { useProfile } from './useProfile';


const Profile = () => {
  const {myUser, isOwner} = useProfile();
  
  if (myUser == null) {
    return <></>;
  }
  return (
    <>
      <Header />
      <Grid container >
        <Grid item xs={2.5}>
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
          <ProfileHeader myUser={myUser} isOwner={isOwner} />
          <ProfileTabs userID={myUser._id}/>
          <Outlet/>  
        </Grid>
        <Grid item xs={2.5}>
          <SidebarRight />
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;

