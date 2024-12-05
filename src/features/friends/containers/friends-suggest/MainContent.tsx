import { Box, Grid, Typography } from "@mui/material";
import FriendsCard from "../../components/FriendsCard";
import { BoxButtonSuggest } from "../../components/BoxButton";
import { useSuggestFriend } from "./useSuggestFriend";
import { useDialogRequestFriend } from "./useDialogRequestFriend";
import ConfirmDialog from "../../components/ConfirmDialog";
import CustomPagination from "../../../../shared/components/pagination/CustomPagination";

function App() {  
  const {data, SendAddFriend, limit, count, setPage} = useSuggestFriend();
  const {showDialog,message, setShowDialog, SetValueDialog} = useDialogRequestFriend();

  const PressAddFiend = (userID: string, name: string) => {
    SendAddFriend(userID);
    SetValueDialog(`Bạn đã gửi lời mời kết bạn đến ${name}`)
  }

  const totalsPage = Math.ceil(count/limit);
  return (
    <Box sx={{
      position:'relative',
      minHeight: '86vh',
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
        backgroundColor: '#f9f9f9',
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
          <BoxButtonSuggest FuncButton={[() => {PressAddFiend(item.idUser, item.name)}]}/>
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
