import { Box, Typography } from "@mui/material";
import { ConversationAPI, DataUser } from "../containers/interfaceMessage";
import { useEffect, useState } from "react";

type HeaderMessageProps = {
  dataConversation: ConversationAPI;
}

const HeaderMessages = ({dataConversation}: HeaderMessageProps) => {
  const currentUserId = sessionStorage.getItem('userId') || '';
  const [friend, setFriend] = useState<DataUser | null>(null);

useEffect(() => {
  const firstFriend = dataConversation.dataUser.find((dataUser) => dataUser.userID !== currentUserId);
  setFriend(firstFriend || null);
}, [currentUserId, dataConversation]);

  return (
    <Box 
    style={{
      width: '100%',
      background: "none",
      border: "none",
      borderTop: "1px solid #e0e0e0",
      borderBottom: "1px solid #e0e0e0",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      borderRadius: 10,
    }}
    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f0f0f0"}
    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#fff"}
    >
    <Box 
      sx={{padding: '10px 0', display: 'flex'}}
      >
        <Box
          sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 10px'}}>
          <img
            src= {friend?.avt[friend.avt.length - 1]}
            alt="Ảnh đại diện"
            style={{width: '30px', height: '30px', borderRadius: 50 }}
          />
        </Box>
        <Box sx={{width: '100%'}}>
            <Box display='flex' justifyContent='space-between'>
                <Typography variant="subtitle2" component="h2" fontWeight={'regular'}>
                    {friend?.name}
                </Typography>
            </Box>
        </Box>
    </Box>
    </Box>
  );
};

export default HeaderMessages;
