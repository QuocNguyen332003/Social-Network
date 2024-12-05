import {  CircularProgress, Grid } from '@mui/material';
import  Header  from '../../../../shared/components/header/Header';
import SidebarLeft from '../../../../shared/components/sidebarLeft/SidebarLeft';
import SidebarRight from '../../../../shared/components/sidebarRight/SidebarRight';
import ProfileHeaderEdit from '../../components/ProfileHeaderEdit';
import { useProfile } from '../useProfile';
import { Outlet } from 'react-router-dom';

const ProfileEdit = () => {

  const {myUser, changeAvt, changeBackground} = useProfile();
  console.log(myUser);
  if (myUser == null) return <CircularProgress/>
  return (
    <>
      <Header />
      <Grid container >
        <Grid item xs={2.5}>
          <SidebarLeft />
        </Grid>
        <Grid item xs={7}
          sx={{
            height: '90vh',
            overflowY: 'auto', 
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            padding: '0 20px',
            backgroundColor: '#e9e9e9',
          }}
        >
          <ProfileHeaderEdit myUser={myUser} changeAvt={changeAvt} changeBackground={changeBackground}/>
          <Outlet/>
        </Grid>
        <Grid item xs={2.5}>
          <SidebarRight />
        </Grid>
      </Grid>
    </>
  );
};

export default ProfileEdit;
