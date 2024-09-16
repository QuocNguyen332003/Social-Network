import { Box, Grid } from "@mui/material";
import ListMesssages from "./messages/ListMessages";
import Conversations from "./conversations/Conversations";
import { useConversations } from "./useConversations";
import { useChatList } from "./useChatList";
import { useMessage } from "./useMessage";

function App() {  
  const myAvt = "src/assets/images/avt.png";
  const {dataConversation, chooseFriendChat, addNewMessage} = useConversations();
  const {data, readMessage} = useChatList();
  const {userChat} = useMessage(data);

  const changeChat = (userID: string) => {
    readMessage(userID);
    chooseFriendChat(userID);
  }

  const sendMessage = (type: string, data: string, userID: string) => {
    addNewMessage(type, data, userID);
  }
  return (
    <Box 
      sx={{ 
        padding: '16px', 
        height: '85vh', 
        overflowY: 'scroll', 
        backgroundColor: '#e9e9e9',
      }}
    >
      <Grid container >
        <Grid item xs={4}>
          <ListMesssages data={data} changeChat={changeChat}/>
        </Grid>
        <Grid item xs={8}>
          <Conversations dataConversation={dataConversation} myAvt={myAvt} userChat={userChat}
           sendMessage={sendMessage}/>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
