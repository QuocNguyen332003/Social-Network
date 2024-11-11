import { Box, Typography} from "@mui/material";
import { CardConversationAPI, DataUser } from "../containers/interfaceMessage";
import { useEffect, useState } from "react";

interface MessageCardProps {
    currMessage: boolean;
    dataCard: CardConversationAPI;
    onClick: () => void;
  }

const MessageCard = ({currMessage, dataCard, onClick}: MessageCardProps) => {
  const currentUserId = sessionStorage.getItem('userId') || '';

  if (!dataCard || dataCard.content === null) {
    return null;
  }

  const lastContent = dataCard.content;
  let formattedDate;

  const [dataFriend, setDataFriend] = useState<DataUser | null>(null);

  useEffect(()=> {
    dataCard.dataUser.map((userData) => {
        if (userData.userID !== currentUserId){
            setDataFriend(userData);
        }
    })
  }, [dataCard]);
  
  if (lastContent.sendDate) {
    // Chuyển đổi sendDate thành Date nếu cần
    const sendDate = new Date(lastContent.sendDate);
    if (!isNaN(sendDate.getTime())) { // Kiểm tra nếu sendDate là một đối tượng Date hợp lệ
        formattedDate = sendDate.toLocaleDateString('en-US', {
            month: 'long', 
            day: 'numeric'
        });
    } else {
        formattedDate = 'Invalid Date'; // Xử lý trường hợp không hợp lệ
    }
  } else {
      formattedDate = 'No Date Available'; // Xử lý trường hợp không có sendDate
  }

  const isRead = (() => {
    if (lastContent.userId === currentUserId) {
        return true;
    } else if (lastContent.viewDate !== null) {
        return true;
    }
    return false;
  })();


  return (
    <button 
    style={{
      width: '100%',
      background: "none",
      border: "none",
      borderTop: "1px solid #e0e0e0",
      borderBottom: "1px solid #e0e0e0",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      borderRadius: 10,
      backgroundColor: currMessage? "#e9e9e9": "#fff",
    }}
    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f0f0f0"}
    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = currMessage ? "#e9e9e9" : "#fff"}
    onClick={onClick}
    >
    <Box 
      sx={{padding: '10px 0', display: 'flex'}}
      >
        <Box
          sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 10px'}}>
          <img
            src= {dataFriend?.avt.link}
            alt="Ảnh đại diện"
            style={{width: '30px', height: '30px', borderRadius: 50 }}
          />
        </Box>
        <Box sx={{width: '100%'}}>
            <Box display='flex' justifyContent='space-between'>
                <Typography variant="subtitle2" component="h2" fontWeight={isRead? 'regular': 'bold'}>
                    {dataFriend?.name}
                </Typography>
                <Typography variant="subtitle2" component="h2" color='#333' fontWeight='regular'>
                    {formattedDate}
                </Typography>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}} >
              <Typography variant="body2" component="h2" 
                sx={[{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  textAlign: "left",
                  fontSize: 12,
                }, isRead? {}: {fontWeight: 'bold'}]}
              >
              {lastContent.userId === currentUserId? "Bạn: ": "Bạn bè: "}{lastContent.message.data}
              </Typography>
                {!isRead && <div style={{width: '8px', height: '8px', backgroundColor: 'black', borderRadius: 50}}/>}
            </Box>
        </Box>
    </Box>
    </button>
  );
}

export default MessageCard;
