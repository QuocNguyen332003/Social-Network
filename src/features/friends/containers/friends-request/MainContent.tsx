import { Box, Typography } from "@mui/material";
import FriendsCard from "../../components/FriendsCard";
import { BoxButtonRequest } from "../../components/BoxButton";
import { useRequestFriend } from "./useRequestFriend";
import { useDialogRequestFriend } from "./useDialogRequestFriend";
import ConfirmDialog from "../../components/ConfirmDialog";

function App() {  
  const {data, AcceptsFriend, RefuseFriend} = useRequestFriend();
  const {showDialog,message, setShowDialog, SetValueDialog} = useDialogRequestFriend();

  const PressAcceptsFriend = (_id: string | null, name: string) => {
    AcceptsFriend(_id);
    SetValueDialog(`Bạn và ${name} đã trở thành bạn bè`);
  }

  const PressRefuseFriend = (_id: string | null, name: string) => {
      RefuseFriend(_id);
      SetValueDialog(`Bạn đã từ chối lời mời của ${name}`);
  }
  return (
    <Box 
      sx={{ 
        padding: '16px', 
        overflowY: 'scroll',
        maxHeight: '700px',
        scrollbarWidth: 'none', /* Firefox */
        '&::-webkit-scrollbar': {
          display: 'none', /* Chrome, Safari, Opera */
        },
        backgroundColor: '#e9e9e9',
      }}
    >
      <Typography variant="h5" component="h2"
      sx={{fontWeight: 'bold'}}>
        Lời mời kết bạn
      </Typography>
      {data.map((item) => <FriendsCard 
        avt={item.avt} 
        name={item.name} 
        message={item.aboutMe}>
          <BoxButtonRequest FuncButton={[() => {PressRefuseFriend(item._id?item._id:null, item.name)}, 
                                        ()=> {PressAcceptsFriend(item._id?item._id:null, item.name)}]}/>
        </FriendsCard>)}
      <ConfirmDialog
        title = {"Thông Báo"}
        open={showDialog}
        onClose={() => { setShowDialog(false); } }
        message={message} 
        textOnClose={"OK"}
        actions={[]}        
        />
    </Box>
  );
}

export default App;
