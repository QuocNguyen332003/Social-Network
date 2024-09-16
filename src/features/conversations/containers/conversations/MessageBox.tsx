import { Box } from "@mui/material";
import MessageReceived, { Position } from "../../components/MessageReceived";
import MessageSend from "../../components/MessageSend";
import { DataMessageProps } from "../useConversations";

type Conversations = {
    date: Date;
    type: string;
    data: string;
    isSend: boolean; 
}[]

const getPositionAndDisplayAvt = (currentIndex: number, data: Conversations) => {
    const currentItem = data[currentIndex];
    const prevItem = data[currentIndex - 1];
    const nextItem = data[currentIndex + 1];

    if (currentIndex <= 0){
        if ((currentIndex >= data.length - 1) || (nextItem.isSend !== currentItem.isSend)) 
            return { positionMessage: Position.Alone, displayAvt: true };
        return { positionMessage: Position.Top, displayAvt: false };
    }
    if (currentIndex >= data.length - 1){
        if (prevItem.isSend !== currentItem.isSend) 
            return { positionMessage: Position.Alone, displayAvt: true };
        return { positionMessage: Position.Bottom, displayAvt: true };
    }

    if ((currentItem.isSend !== prevItem.isSend) && (currentItem.isSend !== nextItem.isSend))
        return { positionMessage: Position.Alone, displayAvt: true };
    if ((currentItem.isSend !== prevItem.isSend) && (currentItem.isSend === nextItem.isSend))
        return { positionMessage: Position.Top, displayAvt: false };
    if ((currentItem.isSend === prevItem.isSend) && (currentItem.isSend !== nextItem.isSend))
        return { positionMessage: Position.Bottom, displayAvt: true };
    return { positionMessage: Position.Mid, displayAvt: false };
};

type MessageBoxProps = {
    dataConversation: DataMessageProps;
    myAvt: string;
}

const MessageBox = ({dataConversation, myAvt} : MessageBoxProps) => {
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
    {dataConversation.conversation.map((item, index)=> {
    const { positionMessage, displayAvt } = getPositionAndDisplayAvt(index, dataConversation.conversation);
    return item.isSend? (
        <MessageSend
            key={index}
            avt={myAvt}
            date={item.date}
            type={item.type}
            data={item.data}
            displayAvt={displayAvt}
            positionMessage={positionMessage}
        />
    ) : (
        <MessageReceived
            key={index}
            avt={dataConversation.avt}
            date={item.date}
            type={item.type}
            data={item.data}
            displayAvt={displayAvt}
            positionMessage={positionMessage}
        />
    );
})}
    </Box>
  );
}

export default MessageBox;
