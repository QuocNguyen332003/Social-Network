import { Box, Grid } from "@mui/material";
import ListMesssages from "./messages/ListMessages";
import Conversations from "./conversations/Conversations";
import { useChatList } from "./useChatList";
import { useMessage } from "./useMessage";
import { MessageProps } from "./Messages";
import { Content } from "./interfaceMessage";

const App = ({userIDStart}: MessageProps) => {  
  const {data,setValueMessageList, readMessage} = useChatList();
  const {conversation, changeUserChat, sendNewMessage} = useMessage(userIDStart);

  const changeChat = (userID: string, _idConversation: string) => {
    readMessage(_idConversation);
    changeUserChat(userID);
  }

  const sendMessage = (idConversation: string, content: Content) => {
    setValueMessageList(idConversation, content);
    sendNewMessage(idConversation, content);
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
          <Conversations conversation={conversation}
          sendMessage={sendMessage}/>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
