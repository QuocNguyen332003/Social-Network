import { Box, Grid } from "@mui/material";
import ListMesssages from "./messages/ListMessages";
import Conversations from "./conversations/Conversations";
import { useChatList } from "./useChatList";
import { useMessage } from "./useMessage";
import { MessageProps } from "./Messages";
import { Content } from "./interfaceMessage";
import { useNavigate } from "react-router-dom";
import FormError from "../../../shared/components/form-error/FormError";

const App = ({friendID}: MessageProps) => {  
  const navigate = useNavigate();
  const {filterData, searchChat, setValueMessageList, readMessage, fetchMessages, isLoading} = useChatList();
  const {conversation, sendNewMessage, setNewChat, createNewChat, addNewMessage, newChat, isLoadingMessage,
    error, setError
  } = useMessage(friendID, readMessage);

  const changeChat = (friendID: string, _idConversation: string) => {
    setNewChat(false);
    readMessage(_idConversation);
    navigate(`/messages?friendID=${friendID}`)
  }

  const sendMessage = (idConversation: string, content: Content) => {
    if (newChat){
      addNewMessage(content);
      fetchMessages();
    } else{
      setValueMessageList(idConversation, content);
      sendNewMessage(idConversation, content);
    }
  }

  if (error){
    return (
      <>
        <FormError open={error !== null} setOpen={(value) => {setError(value?null:null)}} message={error?error:""}/>
      </> 
    )
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
        <Grid item xs={3.9}>
          <ListMesssages data={filterData} changeChat={changeChat} 
            createNewChat={createNewChat} searchChat={searchChat}/>
        </Grid>
        <Grid item xs={0.1}/>
        <Grid item xs={8}>
          <Conversations conversation={conversation}
          sendMessage={sendMessage} isloading={isLoading&&isLoadingMessage}/>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
