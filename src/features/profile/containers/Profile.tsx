import { Grid } from '@mui/material';
import  Header  from '../../../shared/components/header/Header';
import SidebarLeft from '../../../shared/components/sidebarLeft/SidebarLeft';
import ProfileHeader from '../components/ProfileHeader';
import ProfileTabs from '../components/ProfileTabs';
import SidebarRight from '../../../shared/components/sidebarRight/SidebarRight';
import { Outlet } from 'react-router-dom';
import { useProfile } from './useProfile';
import FormError from '../../../shared/components/form-error/FormError';

const Profile = () => {
  const {myUser, addNewFollower, deleteFollower, isOwner, error,
    setError
  } = useProfile();
  
  if (myUser == null) {
    return (
      <>
        <FormError open={error !== null} setOpen={(value) => {setError(value?null:null)}} message={error?error:""}/>
      </>
    )
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
          <ProfileHeader myUser={myUser} isOwner={isOwner} addNewFollower={addNewFollower} deleteFollower={deleteFollower} />
          <ProfileTabs userID={myUser._id}/>
          <Outlet/>  
        </Grid>
        <Grid item xs={2.5}>
          <SidebarRight />
        </Grid>
        <FormError open={error !== null} setOpen={(value) => {setError(value?null:null)}} message={error?error:""}/>
      </Grid>
    </>
  );
};

export default Profile;

