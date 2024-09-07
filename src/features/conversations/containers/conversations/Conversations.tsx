import { Box } from "@mui/material";
import HeaderMessages from "../../components/HeaderMessage";
import MessageBox from "../../components/MessageBox";
import MessageInput from "../../components/MessageInput";

function Conversations() {
  return (
    <Box 
      sx={{ 
        height: '84vh', 
        border: '1px solid #e0e0e0',
        backgroundColor: 'white',
      }}
    >
      <HeaderMessages/>
      <MessageBox/>
      <MessageInput/>
    </Box>
  );
}

export default Conversations;
