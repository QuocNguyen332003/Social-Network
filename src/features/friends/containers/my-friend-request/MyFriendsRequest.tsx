import { Grid } from '@mui/material';
import  Header  from '../../../../shared/components/header/Header';
import MainContent from './MainContent'
import SidebarLeftFriends from '../../components/SidebarLeftFriends';

const MyFriendsRequest = () => {
  return (
    <>
      <Header />
      <Grid container >
        <Grid item xs={2.5}>
          <SidebarLeftFriends />
        </Grid>
        <Grid item xs={9.5}>
          <MainContent />
        </Grid>
      </Grid>
    </>
  );
};

export default MyFriendsRequest;
