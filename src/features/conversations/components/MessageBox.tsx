import { Box } from "@mui/material";
import MessageReceived, { Position } from "./MessageReceived";
import MessageSend from "./MessageSend";

const DataMessage = [
    {avt: "src/assets/images/avt.png", date: new Date(), text: "Hi, hello Quan", link : "", isSend: "send"},
    {avt: "src/assets/images/avt.png", date: new Date(), text: "Hi, hello Quan", link : "", isSend: "received"},
    {avt: "src/assets/images/avt.png", date: new Date(), text: "Hi, hello Quan", link : "", isSend: "send"},
    {avt: "src/assets/images/avt.png", date: new Date(), text: "Hi, hello Quan", link : "", isSend: "received"},
    {avt: "src/assets/images/avt.png", date: new Date(), text: "Hi, hello Quan", link : "", isSend: "send"},
    {avt: "src/assets/images/avt.png", date: new Date(), text: "Hi, hello Quan", link : "", isSend: "send"},
    {avt: "src/assets/images/avt.png", date: new Date(), text: "Hi, hello Quan", link : "", isSend: "send"}
]

const getPositionAndDisplayAvt = (currentIndex: number, data: typeof DataMessage) => {
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

function MessageBox() {
  return (
    <Box 
      sx={{ 
        height: '55vh',
        borderBottom: '1px solid #e0e0e0',
        padding: '20px',
        overflowY: 'scroll',
        scrollbarWidth: 'none', 
      }}
    >
    {DataMessage.map((item, index)=> {
    const { positionMessage, displayAvt } = getPositionAndDisplayAvt(index, DataMessage);
    return item.isSend === "send" ? (
        <MessageSend
            key={index}
            avt={item.avt}
            date={item.date}
            text={item.text}
            link={item.link}
            displayAvt={displayAvt}
            positionMessage={positionMessage}
        />
    ) : (
        <MessageReceived
            key={index}
            avt={item.avt}
            date={item.date}
            text={item.text}
            link={item.link}
            displayAvt={displayAvt}
            positionMessage={positionMessage}
        />
    );
})}
    </Box>
  );
}

export default MessageBox;
