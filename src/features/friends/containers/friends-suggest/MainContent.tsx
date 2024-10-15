import { Box, Typography } from "@mui/material";
import FriendsCard from "../../components/FriendsCard";
import { BoxButtonSuggest } from "../../components/BoxButton";
import { useSuggestFriend } from "./useSuggestFriend";
import { useDialogRequestFriend } from "./useDialogRequestFriend";
import ConfirmDialog from "../../components/ConfirmDialog";

function App() {  
  const {data, SendAddFriend} = useSuggestFriend();
  const {showDialog,message, setShowDialog, SetValueDialog} = useDialogRequestFriend();

  const PressAddFiend = (userID: string, name: string) => {
    SendAddFriend(userID);
    SetValueDialog(`Bạn đã gửi lời mời kết bạn đến ${name}`)
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
        Gợi ý
      </Typography>
      {data.map((item) => <FriendsCard 
        avt={item.avt} 
        name={item.name} 
        message={item.aboutMe}>
          <BoxButtonSuggest FuncButton={[() => {PressAddFiend(item.idUser, item.name)}]}/>
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
