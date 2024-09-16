import { Box } from "@mui/material";
import HeaderMessages from "../../components/HeaderMessage";
import MessageBox from "./MessageBox";
import MessageInput from "./MessageInput";
import { DataMessageProps } from "../useConversations";
import { DataChatListProps } from "../useChatList";

type ConversationsProps = {
  dataConversation: DataMessageProps;
  myAvt: string;
  userChat: DataChatListProps;
  sendMessage: (type: string, data: string, userID: string) => void;
}

const Conversations = ({dataConversation, myAvt, userChat, sendMessage}: ConversationsProps) => {
  return (
    <Box 
      sx={{ 
        height: '84vh', 
        border: '1px solid #e0e0e0',
        backgroundColor: 'white',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
      }}
    >
      <HeaderMessages dataConversation={userChat}/>
      <MessageBox dataConversation={dataConversation} myAvt={myAvt}/>
      <MessageInput sendMessage={sendMessage} userID={dataConversation.userID} />
    </Box>
  );
}

export default Conversations;
