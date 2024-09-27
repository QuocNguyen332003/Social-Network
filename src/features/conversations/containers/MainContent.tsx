import { Box, Grid } from "@mui/material";
import ListMesssages from "./messages/ListMessages";
import Conversations from "./conversations/Conversations";
import { useConversations } from "./useConversations";
import { useChatList } from "./useChatList";
import { useMessage } from "./useMessage";
import { useEffect } from "react";
import { MessageProps } from "./Messages";

const App = ({userIDStart}: MessageProps) => {  
  const myAvt = "src/assets/images/avt.png";
  const {dataConversation, chooseFriendChat, addNewMessage} = useConversations();
  const {data, readMessage} = useChatList();
  const {userChat, changeUserChat} = useMessage(data);

  useEffect(()=> {
    if (userIDStart != ""){
      changeChat(userIDStart);
    }
  }, []);

  const changeChat = (userID: string) => {
    readMessage(userID);
    chooseFriendChat(userID);
    changeUserChat(userID);
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
