import { Box, Grid, Typography } from "@mui/material";
import FriendsCard from "../../components/FriendsCard";
import { BoxButtonAllFriends } from "../../components/BoxButton";
import { useAllFriend } from "./useAllFriend";
import ConfirmDialog from "../../components/ConfirmDialog";
import { useDialogFriend } from "./useDialogFriend";
import CustomPagination from "../../../../shared/components/pagination/CustomPagination";

function App() {  
  const {data, deleteFriend, viewPersonalPage, count, setPage, limit} = useAllFriend();
  const {showDialog, setShowDialog, currUserID, currName, askDeleteFriend} = useDialogFriend();

  const totalsPage = Math.ceil(count / limit);
  const changePage = (newPage: number) => {
    setPage(newPage); // Cập nhật số trang
  };

  return (
  <Box sx={{
    position:'relative',
    height: '90vh'
  }}>
    <Box 
    sx={{ 
      padding: '16px', 
      overflowY: 'scroll',
      maxHeight: '700px',
      scrollbarWidth: 'none', /* Firefox */
      '&::-webkit-scrollbar': {
        display: 'none', /* Chrome, Safari, Opera */
      },
      backgroundColor: '#f9f9f9',
    }}
    >
      <Typography variant="h5" component="h2"
      sx={{fontWeight: 'bold'}}>
        Tất cả bạn bè
      </Typography>
      <Grid container>
      {data.map((item) => 
        <Grid item xs={6}>
          <FriendsCard avt={item.avt} 
              name={item.name} 
              message={item.aboutMe}
              > <BoxButtonAllFriends FuncButton={[()=> {askDeleteFriend(item.idUser, item.name)}, () => {viewPersonalPage(item.idUser)}]}/>
          </FriendsCard>
        </Grid>
      )}
      </Grid>
      <ConfirmDialog
        title = {"Xác Nhận"}
        open={showDialog}
        onClose={() => { setShowDialog(false); } } textOnClose={"Hủy"}
        message={`Bạn có chắc chắn xóa kết bạn với ${currName}`} 
        actions={[{text: "Xác nhận", action: () => { deleteFriend(currUserID); setShowDialog(false); }}]}     
        />
    </Box>
    <Box 
    sx={{position: 'absolute', width: '100%', background: '#fff',
      bottom: 0, display: 'flex', justifyContent: 'center',
    }}
    >
      <CustomPagination totalPages={totalsPage} handleActivityPageChange={changePage}/>
    </Box>
  </Box>
  );
}

export default App;
