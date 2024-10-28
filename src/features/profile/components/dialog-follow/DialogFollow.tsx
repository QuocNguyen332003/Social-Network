import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { User, UserDataDisplay } from '../../../../interface/interface';
import { Avatar, List, ListItemButton, ListItemText, Tab, Tabs } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface DialogFollowProps {
  open: boolean;
  myUser: User | null;
  dataFriends: UserDataDisplay[] | null; 
  dataFollower: UserDataDisplay[] | null; 
  handleClose: ()=>void;
  first: number;
}

const  DialogFollow = ({open, myUser, handleClose, first, dataFriends, dataFollower}: DialogFollowProps) => {
  const navigate = useNavigate();
  const [currentTab, setCurrenTab] = React.useState(0);
  const [listUser, setListUser] = React.useState<UserDataDisplay[] | null>(null);
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
      setCurrenTab(newValue);
  };
  
  React.useEffect(()=>{
    setCurrenTab(first);
  },[first])
  
  React.useEffect(()=> {
    if (currentTab === 0){
      setListUser(dataFriends);
    } else if (currentTab === 1) {
      if (myUser !== null){
        setListUser(myUser.follower);
      }
    } else if (currentTab === 2){
      setListUser(dataFollower);
    }
  }, [currentTab]);
  
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{ '& .MuiDialog-paper': { width: '500px', height: '80vh' } }}
      >
        <DialogTitle>{myUser?.displayName}</DialogTitle>
        <DialogContent>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: '#fff' }}>
            <Tabs value={currentTab} onChange={handleTabChange} aria-label="group tabs">
              <Tab label="Bạn bè" />
              <Tab label="Người theo dõi" />
              <Tab label="Đang theo dõi" />
            </Tabs>
          </Box>
          <List>
            {listUser !== null && listUser.map((_user, index) => (
              <ListItemButton key={index} sx={{ mb: 1 }}
                onClick={() => {navigate(`/profile?id=${_user._id}`); navigate(0); }}>
                <Avatar alt={_user.name} src={_user.avt[_user.avt.length - 1]} />
                <ListItemText primary={_user.name} sx={{ marginLeft: '16px' }} />
              </ListItemButton>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default DialogFollow;