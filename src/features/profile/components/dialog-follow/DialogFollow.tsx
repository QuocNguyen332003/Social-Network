import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { User } from '../../../../interface/interface';
import { Tab, Tabs } from '@mui/material';

interface DialogFollowProps {
  open: boolean;
  myUser: User | null;
  handleClose: ()=>void;
  first: number;
}

const  DialogFollow = ({open, myUser, handleClose, first}: DialogFollowProps) => {
  const [currentTab, setCurrenTab] = React.useState(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
      setCurrenTab(newValue);
  };

  React.useEffect(()=>{
    setCurrenTab(first);
  },[first])
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default DialogFollow;