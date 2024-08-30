import { Box } from "@mui/material";
import MessageCard from "./MessageCard";

const HeaderMessages = () => {
  return (
    <Box>
        <MessageCard avt={"src/assets/images/avt.png"} 
            name={"Phan Minh Quan"} 
            lastMessage={"Send to a paid message"} 
            date={new Date()} 
            onClick={function (): void {} }
        />
    </Box>
  );
};

export default HeaderMessages;
