import { Box, Typography } from "@mui/material";
import FriendsCard from "../../components/FriendsCard";
import { BoxButtonAllFriends } from "../../components/BoxButton";
import { useAllFriend } from "./useAllFriend";
import ConfirmDialog from "../../components/ConfirmDialog";
import { useDialogFriend } from "./useDialogFriend";

function App() {  
  const {data, deleteFriend, viewPersonalPage} = useAllFriend();
  const {showDialog, setShowDialog, currUserID, currName, askDeleteFriend} = useDialogFriend();
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
        Tất cả bạn bè
      </Typography>
      {data.map((item) => 
      <FriendsCard avt={item.avt} 
              name={item.name} 
              message={item.aboutMe}
              > <BoxButtonAllFriends FuncButton={[()=> {askDeleteFriend(item.userID, item.name)}, () => {viewPersonalPage(item.userID)}]}/>
      </FriendsCard>
      )}
      <ConfirmDialog
        title = {"Xác Nhận"}
        open={showDialog}
        onClose={() => { setShowDialog(false); } } textOnClose={"Hủy"}
        message={`Bạn có chắc chắn xóa kết bạn với ${currName}`} 
        actions={[{text: "Xác nhận", action: () => { deleteFriend(currUserID); setShowDialog(false); }}]}     
        />
    </Box>
  );
}

export default App;
