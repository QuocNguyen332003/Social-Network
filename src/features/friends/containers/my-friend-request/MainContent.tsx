import { Box, Grid, Typography } from "@mui/material";
import FriendsCard from "../../components/FriendsCard";
import { BoxButtonMyRequest } from "../../components/BoxButton";
import { useMyRequestFriend } from "./useMyRequestFriend";
import { useDialogRequestFriend } from "./useDialogRequestFriend";
import ConfirmDialog from "../../components/ConfirmDialog";
import CustomPagination from "../../../../shared/components/pagination/CustomPagination";
import { useNavigate } from "react-router-dom";

function App() {  
  const navigate = useNavigate();
  const {data, revokeInvitation, limit, count, setPage} = useMyRequestFriend();
  const {showDialog,message, setShowDialog, SetValueDialog} = useDialogRequestFriend();

  const PressRecallFiend = (_id: string | null, name: string) => {
    revokeInvitation(_id);
    SetValueDialog(`Bạn đã thu hồi lời mời kết bạn với ${name}`)
  }
  const viewPersonalPage = (userID: string) => {
    navigate(`/profile?id=${userID}`)
  }
  const totalsPage = Math.ceil(count/limit);
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
        height: '78vh',
        borderRadius: 8,
        scrollbarWidth: 'none', /* Firefox */
        '&::-webkit-scrollbar': {
          display: 'none', /* Chrome, Safari, Opera */
        },
        backgroundColor: '#fff',
      }}
    >
      <Typography variant="h5" component="h2"
      sx={{fontWeight: 'bold'}}>
        Gợi ý
      </Typography>
      <Grid container>
      {data.map((item) => 
        <Grid item xs={6}>
          <FriendsCard 
          avt={item.avt} 
          name={item.name} 
          message={item.aboutMe}>
            <BoxButtonMyRequest FuncButton={[() => {PressRecallFiend(item._id?item._id:null, item.name)}, () => {viewPersonalPage(item.idUser)}]}/>
          </FriendsCard>
        </Grid>
      )}
      </Grid>
      <ConfirmDialog
        title = {"Thông Báo"}
        open={showDialog}
        onClose={() => { setShowDialog(false); } }
        message={message} 
        textOnClose={"OK"}
        actions={[]}        
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
        <CustomPagination totalPages={totalsPage} handleActivityPageChange={setPage}/>
      </Box>
    </Box>
  </Box>
  );
}

export default App;
