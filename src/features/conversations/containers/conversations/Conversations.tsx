import { Box } from "@mui/material";
import HeaderMessages from "../../components/HeaderMessage";
import MessageBox from "./MessageBox";
import MessageInput from "./MessageInput";
import { Content, ConversationAPI } from "../interfaceMessage";

type ConversationsProps = {
  conversation: ConversationAPI | null;
  sendMessage: (idConversation: string, content: Content) => void;
}

const Conversations = ({conversation, sendMessage}: ConversationsProps) => {

  return (
    <Box 
      sx={{ 
        height: '84vh', 
        border: '1px solid #e0e0e0',
        backgroundColor: 'white',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        borderRadius: 3,
      }}
    >
      {conversation !== null && (
        <>
        <HeaderMessages dataConversation={conversation}/>
        <MessageBox dataConversation={conversation}/>
        <MessageInput sendMessage={sendMessage} idConversation={conversation._id} />
        </>
      )}
    </Box>
  );
}

export default Conversations;
