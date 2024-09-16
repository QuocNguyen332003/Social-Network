import { Box } from "@mui/material";
import MessageCard from "./MessageCard";
import { DataChatListProps } from "../containers/useChatList";

type HeaderMessageProps = {
  dataConversation: DataChatListProps;
}

const HeaderMessages = ({dataConversation}: HeaderMessageProps) => {
  return (
    <Box>
        <MessageCard dataCard={dataConversation} 
            onClick={function (): void {} }
        />
    </Box>
  );
};

export default HeaderMessages;
