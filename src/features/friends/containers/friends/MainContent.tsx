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
    height: '86vh',
    borderRadius: 8,
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    margin: 2
  }}>
    <Box 
    sx={{ 
      padding: '16px', 
      overflowY: 'scroll',
      borderRadius: 8,
      height: '78vh',
      scrollbarWidth: 'none', /* Firefox */
      '&::-webkit-scrollbar': {
        display: 'none', /* Chrome, Safari, Opera */
      },
      backgroundColor: '#fff',
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
    sx={{position: 'absolute', width: '100%', height: '8vh', 
      background: '#fff',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
      bottom: -3, display: 'flex', justifyContent: 'center',
      borderBottomLeftRadius: 20, borderBottomRightRadius: 20,
    }}
    >
      <Box sx={{width: '100%', background: '#fff', margin: 2,
      display: 'flex', justifyContent: 'center',
      borderBottomLeftRadius: 20, borderBottomRightRadius: 20,
    }}>
        <CustomPagination totalPages={totalsPage} handleActivityPageChange={changePage}/>
      </Box>
    </Box>
  </Box>
  );
}

export default App;
