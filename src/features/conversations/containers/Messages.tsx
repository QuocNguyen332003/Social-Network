import { Grid } from '@mui/material';
import  Header  from '../../../shared/components/header/Header';
import  SidebarLeft  from '../../../shared/components/sidebarLeft/SidebarLeft';
import MainContent from './MainContent';

export interface MessageProps {
  userIDStart: string;
}

const Messages = ({userIDStart}: MessageProps) => {
  return (
    <>
      <Header />
      <Grid container >
        <Grid item xs={2.5}>
          <SidebarLeft />
        </Grid>
        <Grid item xs={9.5} >
          <MainContent userIDStart={userIDStart}/>
        </Grid>
      </Grid>
    </>
  );
};

export default Messages;
