import { Grid } from '@mui/material';
import  Header  from '../../../../shared/components/header/Header';
import MainContent from './MainContent'
import SidebarLeftFriends from '../../components/SidebarLeftFriends';

const FriendsRequest = () => {
  return (
    <>
      <Header />
      <Grid container >
        <Grid item xs={2}>
          <SidebarLeftFriends />
        </Grid>
        <Grid item xs={10}>
          <MainContent />
        </Grid>
      </Grid>
    </>
  );
};

export default FriendsRequest;
