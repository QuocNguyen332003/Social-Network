import { Box} from "@mui/material";
import MessageCard from "../../components/MessageCard";
import { useState } from "react";
import { CardConversationAPI } from "../interfaceMessage";

export type ChatListProps = {
  data: CardConversationAPI[];
  changeChat: (userID: string, _idConversation: string) => void;
}

const ChatList = ({data, changeChat} : ChatListProps) => {
  const currentUserId = sessionStorage.getItem('userId') || '';
  const [currMessage, setCurrMessage] = useState<string|null>(null);
  const clickChatList = (userID: string, _idConversation: string) => {
    changeChat(userID, _idConversation);
    setCurrMessage(_idConversation);
  }
  return (
    <Box 
    >
        <Box 
          sx={{
            height: '60vh',
            margin: '5px 0', 
            overflowY: 'scroll',
            scrollbarWidth: 'none', /* Firefox */
            '&::-webkit-scrollbar': {
              display: 'none', /* Chrome, Safari, Opera */
            },
          }}>
          {data.map((item)=> 
            <MessageCard dataCard={item} currMessage={item._id.toString() === currMessage? true: false} 
            onClick={() => {
              const friendID = item.dataUser.find((userData) => currentUserId.toString() !== userData.userID);
              if (friendID !== undefined) {
                clickChatList(friendID?.userID, item._id);
              }
            } } />)}
        </Box>
    </Box>
  );
}

export default ChatList;
