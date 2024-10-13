import { Avatar, CircularProgress, Dialog, DialogTitle, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import { UserWithoutChat } from "../containers/messages/useFriend";
import { DataUser } from "../containers/interfaceMessage";

export interface SimpleDialogProps {
    open: boolean;
    isLoading: boolean;
    usersWithoutChat: UserWithoutChat[] | null;
    onClose: () => void;
    handleListItemClick: (dataFriend: DataUser) => void;
  }

const DialogNewChat = (props: SimpleDialogProps) => {
    const { onClose, handleListItemClick, open, isLoading, usersWithoutChat } = props;
    
    const handleClose = () => {
      onClose();
    };

    
    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Tin nhắn mới</DialogTitle>
        {isLoading ? (
          <CircularProgress />
        ) : (
          usersWithoutChat !== null && (
            <List sx={{ pt: 0 }}>
              {usersWithoutChat.map((user) => (
                <ListItem disableGutters key={user._id}>
                  <ListItemButton onClick={() => handleListItemClick({
                    userID: user._id,
                    avt: user.avt,
                    name: user.displayName
                  })}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{}}>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={user.displayName} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          )
        )}
      </Dialog>
    );
  }

export default DialogNewChat;