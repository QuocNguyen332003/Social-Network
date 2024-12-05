import { Box, Grid } from '@mui/material';
import  Header  from '../../../../shared/components/header/Header';
import MainContent from './MainContent'
import SidebarLeftFriends from '../../components/SidebarLeftFriends';

const FriendsSuggest = () => {
  return (
    <Box sx={{backgroundColor: '#e9e9e9'}}>
    <Header />
    <Grid container >
      <Grid item xs={2.5} sx={{backgroundColor: '#fff'}}>
        <SidebarLeftFriends />
      </Grid>
      <Grid item xs={9.5}>
        <MainContent />
      </Grid>
    </Grid>
  </Box>
  );
};

export default FriendsSuggest;
