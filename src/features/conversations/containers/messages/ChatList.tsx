import { Box, Button, ButtonProps, styled} from "@mui/material";
import MessageCard from "../../components/MessageCard";
import { ListMessagesProps } from "./ListMessages";


const BorderButton = styled(Button)<ButtonProps>(() => ({
    color: '#ffffff',
    backgroundColor: '#1976d2',
    borderRadius: 25,
    padding: '5px 40px',
    fontSize: 12,
  }));

const ChatList = ({data, changeChat} : ListMessagesProps) => {
  

  const clickChatList = (userID: string) => {
    changeChat(userID);
  }
  return (
    <Box 
    >
        <BorderButton variant="contained">
            Tất cả
        </BorderButton>
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
            <MessageCard dataCard={item} onClick={() => {clickChatList(item.userID)}}/>)}
        </Box>

    </Box>
  );
}

export default ChatList;
