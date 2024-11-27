import { Box, Typography, Button, Avatar, IconButton, Menu, MenuItem, ListItemIcon } from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ShareIcon from '@mui/icons-material/Share';
import { useNavigate } from 'react-router-dom';
import { User, UserDataDisplay } from '../../../interface/interface';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import MessageIcon from '@mui/icons-material/Message';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddToQueueIcon  from '@mui/icons-material/AddToQueue';
import useDialogFollow from './dialog-follow/useDialogFollow';
import useProfileHeader from './useProfileHeader';
import DialogFollow from './dialog-follow/DialogFollow';

export type DataUser = {
  myUser: User;
  isOwner: boolean;
  addNewFollower: (newFollower: UserDataDisplay) => void;
  deleteFollower: (userId: string) => void;
}

const ProfileHeader = ({myUser, isOwner, addNewFollower, deleteFollower}: DataUser) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const {relationship, follow, handleFriend} = useProfileHeader(myUser._id, addNewFollower, deleteFollower);
  const {openDialog, first, handleClickOpenDialog, handleCloseDialog, dataFriends, dataFollower} = useDialogFollow(myUser._id);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleGetMessage = () => {
    handleClose();
    navigate(`/messages?friendID=${myUser._id}`);
  }
  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        height: '420px',
        overflow: 'hidden',
        borderBottom: '1px solid #e9e9e9',
        paddingBottom: '20px',
        backgroundColor: '#fff',
      }}
    >
      <Box
      sx={{
        backgroundImage: `url(${myUser.backGround[myUser.backGround.length - 1]?.link})`,
        height: '300px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden',
        position: 'relative',
      }}
      />
      {/* Group Info and Avatar */}
      <Box sx={{ position: 'absolute', bottom: '20px', left: '16px', display: 'flex', alignItems: 'center' }}>
        <IconButton sx={{padding: 0}}>
          <Avatar src={(myUser.avt[myUser.avt.length - 1]?.link as unknown) as string}  sx={{ width: '150px', height: '150px', border: '4px solid white' }} />
        </IconButton>
        <Box sx={{ marginLeft: '16px', marginTop: '10px'}}>
          <Typography variant="h5" color="black" fontWeight="bold">
            {myUser.firstName + " " + myUser.lastName}
          </Typography>
          <Typography variant="body1" color="black">
            {myUser.userName}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ position: 'absolute', bottom: '60px', right: '20px', display: 'flex', alignItems: 'center' }}>
        <Button variant="text" sx={{
          flexDirection: 'column', textTransform: 'none', margin: '0px 20px'
        }}
        onClick={() => {handleClickOpenDialog(0)}}>
          <Typography sx={{color: 'black'}}>{myUser.friends.length}</Typography>
          <Typography sx={{color: 'black'}}>Bạn bè</Typography>
        </Button>
        <Button variant="text" sx={{
          flexDirection: 'column', textTransform: 'none',  margin: '0px 20px'
        }}
        onClick={() => {handleClickOpenDialog(1)}}>
          <Typography sx={{color: 'black'}}>{myUser.follower.length }</Typography>
          <Typography sx={{color: 'black'}}>Người theo dõi</Typography>
        </Button>
        <Button variant="text" sx={{
          flexDirection: 'column', textTransform: 'none',  margin: '0px 20px'
        }}
        onClick={() => {handleClickOpenDialog(2)}}>
          <Typography sx={{color: 'black'}}>{myUser.follow.length}</Typography>
          <Typography sx={{color: 'black'}}>Đang theo dõi</Typography>
        </Button>
      </Box>
      {/* Invite and Share Buttons below the Edit Button with more spacing */}
      {isOwner? (
        <Box sx={{ position: 'absolute', bottom: '20px', right: '20px', display: 'flex', alignItems: 'center' }}>
        <Button variant="contained" startIcon={<BorderColorIcon />}
          sx={{ marginRight: '8px', width: '150px', height: '30px',
            textTransform: 'none',
           }} 
           onClick={()=> {navigate(`/edit-profile?id=${myUser._id}`)}}
          >
          Chỉnh sửa
        </Button>
        <Button variant="contained" startIcon={<ShareIcon/>}
        sx={{ height: '30px',
          textTransform: 'none',
         }} >
          Chia sẻ trang cá nhân
        </Button>
      </Box>
      ): (
      <Box sx={{ position: 'absolute', bottom: '20px', right: '20px', display: 'flex', alignItems: 'center' }}>
        <Button variant="contained" startIcon={<AddToQueueIcon />}
          sx={{ marginRight: '8px', height: '30px', padding: '0px 20px',
            textTransform: 'none',
           }} 
          onClick={follow}
          >
          {relationship.isFollow?"Bỏ theo dõi": "Theo dõi"}
        </Button>
        <Button variant="contained" startIcon={<PersonAddIcon/>}
          sx={{ marginRight: '8px', height: '30px', padding: '0px 20px',
            textTransform: 'none',
           }} 
          onClick={handleFriend}
          > 
          {relationship.isFriend === 'yes'?"Hủy kết bạn": (relationship.isFriend==='no'? "Kết bạn": "Thu hồi lời mời")}
        </Button>
        <Button variant="contained"
          sx={{ marginRight: '8px', height: '30px',
            textTransform: 'none',
           }} 
          onClick={handleAvatarClick}>
          <MenuIcon/>
        </Button>
        <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleGetMessage}>
          <ListItemIcon>
            <MessageIcon/>
          </ListItemIcon>
            Nhắn tin
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <ShareIcon/>
          </ListItemIcon>
          Chia sẻ
        </MenuItem>
      </Menu>
      </Box>
      )}

      <DialogFollow open={openDialog} myUser={myUser} handleClose={handleCloseDialog} first={first} dataFriends={dataFriends} dataFollower={dataFollower}/>
    </Box>
  );
};

export default ProfileHeader;
