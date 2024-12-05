import { Box, Grid, Typography } from "@mui/material";
import FriendsCard from "../../components/FriendsCard";
import { BoxButtonRequest } from "../../components/BoxButton";
import { useRequestFriend } from "./useRequestFriend";
import { useDialogRequestFriend } from "./useDialogRequestFriend";
import ConfirmDialog from "../../components/ConfirmDialog";
import CustomPagination from "../../../../shared/components/pagination/CustomPagination";

function App() {  
  const {data, AcceptsFriend, RefuseFriend, setPage, count, limit} = useRequestFriend();
  const {showDialog,message, setShowDialog, SetValueDialog} = useDialogRequestFriend();

  const totalPages = Math.ceil(count/limit);
  const PressAcceptsFriend = (_id: string | null, name: string) => {
    AcceptsFriend(_id);
    SetValueDialog(`Bạn và ${name} đã trở thành bạn bè`);
  }

  const PressRefuseFriend = (_id: string | null, name: string) => {
      RefuseFriend(_id);
      SetValueDialog(`Bạn đã từ chối lời mời của ${name}`);
  }
  
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
        Lời mời kết bạn
      </Typography>
      <Grid container>
      {data.map((item) => 
        <Grid item xs={6}>
          <FriendsCard 
          avt={item.avt} 
          name={item.name} 
          message={item.aboutMe}>
            <BoxButtonRequest FuncButton={[() => {PressRefuseFriend(item._id?item._id:null, item.name)}, 
                                        ()=> {PressAcceptsFriend(item._id?item._id:null, item.name)}]}/>
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
        <CustomPagination totalPages={totalPages} handleActivityPageChange={setPage}/>
      </Box>
    </Box>
  </Box>
  );
}

export default App;
