import { Box, CircularProgress } from "@mui/material";
import MessageReceived, { Position } from "../../components/MessageReceived";
import MessageSend from "../../components/MessageSend";
import { Content, ConversationAPI, DataUser } from "../interfaceMessage";
import { useEffect, useRef, useState } from "react";


const getPositionAndDisplayAvt = (currentIndex: number, contents: Content[]) => {
    const currentItem = contents[currentIndex];
    const prevItem = contents[currentIndex - 1];
    const nextItem = contents[currentIndex + 1];

    if (currentIndex <= 0){
        if ((currentIndex >= contents.length - 1) || (nextItem.userId !== currentItem.userId)) 
            return { positionMessage: Position.Alone, displayAvt: true };
        return { positionMessage: Position.Top, displayAvt: false };
    }
    if (currentIndex >= contents.length - 1){
        if (prevItem.userId !== currentItem.userId) 
            return { positionMessage: Position.Alone, displayAvt: true };
        return { positionMessage: Position.Bottom, displayAvt: true };
    }

    if ((currentItem.userId !== prevItem.userId) && (currentItem.userId !== nextItem.userId))
        return { positionMessage: Position.Alone, displayAvt: true };
    if ((currentItem.userId !== prevItem.userId) && (currentItem.userId === nextItem.userId))
        return { positionMessage: Position.Top, displayAvt: false };
    if ((currentItem.userId === prevItem.userId) && (currentItem.userId !== nextItem.userId))
        return { positionMessage: Position.Bottom, displayAvt: true };
    return { positionMessage: Position.Mid, displayAvt: false };
};

type MessageBoxProps = {
    dataConversation: ConversationAPI;
}
const MessageBox = ({ dataConversation }: MessageBoxProps) => {
    const endOfMessagesRef = useRef<HTMLDivElement | null>(null);
    const currentUserId = sessionStorage.getItem('userId') || '';
  
    const [dataUser, setDataUser] = useState<DataUser | null>(null);
    const [dataFriend, setDataFriend] = useState<DataUser | null>(null);
  
    useEffect(() => {
      if (dataConversation && Array.isArray(dataConversation.dataUser)) {
        dataConversation.dataUser.forEach((userData) => {
          if (userData.userID === currentUserId) {
            setDataUser(userData);
          } else {
            setDataFriend(userData);
          }
        });
        endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    }, [dataConversation]);
  
    if (!dataConversation || !Array.isArray(dataConversation.content)) {
      return <CircularProgress/>; // Hoặc có thể hiển thị thông báo lỗi hoặc trạng thái chờ
    }
  
    return (
      <Box 
        sx={{ 
          height: '50vh',
          borderBottom: '1px solid #e0e0e0',
          padding: '20px',
          overflowY: 'scroll',
          scrollbarWidth: 'none', 
        }}
      >
        {dataConversation.content.map((item, index) => {
          const { positionMessage, displayAvt } = getPositionAndDisplayAvt(index, dataConversation.content);
          return item.userId === currentUserId ? (
            <MessageSend
              key={index}
              avt={dataUser ? dataUser.avt.link : "./src/assets/images/user.png"}
              date={item.sendDate}
              type={item.message.type}
              data={item.message.data}
              displayAvt={displayAvt}
              positionMessage={positionMessage}
            />
          ) : (
            <MessageReceived
              key={index}
              avt={dataFriend ? dataFriend.avt.link : "./src/assets/images/user.png"}
              date={item.sendDate}
              type={item.message.type}
              data={item.message.data}
              displayAvt={displayAvt}
              positionMessage={positionMessage}
            />
          );
        })}
        <div ref={endOfMessagesRef} />
      </Box>
    );
  };
  
  export default MessageBox;
  