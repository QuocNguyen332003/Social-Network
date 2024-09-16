import { Box, Typography} from "@mui/material";
import { DataChatListProps } from "../containers/useChatList";
interface MessageCardProps {
    dataCard: DataChatListProps;
    onClick: () => void;
  }

const MessageCard = ({dataCard, onClick}: MessageCardProps) => {

  if (!dataCard || !dataCard.sendDate) {
    return null;
  }
  const formattedDate = dataCard.sendDate.toLocaleDateString('en-US', {
    month: 'long', 
    day: 'numeric'
  });

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
    }}
    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f0f0f0"}
    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#fff"}
    onClick={onClick}
    >
    <Box 
      sx={{padding: '10px 0', display: 'flex'}}
      >
        <Box
          sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 10px'}}>
          <img
            src= {dataCard.avt}
            alt="Ảnh đại diện"
            style={{width: '30px', height: '30px', borderRadius: 50 }}
          />
        </Box>
        <Box sx={{width: '100%'}}>
            <Box display='flex' justifyContent='space-between'>
                <Typography variant="subtitle2" component="h2" fontWeight={dataCard.isRead? 'regular': 'bold'}>
                    {dataCard.name}
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
                }, dataCard.isRead? {}: {fontWeight: 'bold'}]}
              >
              {dataCard.lastMessage.message}
              </Typography>
                {!dataCard.isRead && <div style={{width: '8px', height: '8px', backgroundColor: 'black', borderRadius: 50}}/>}
            </Box>
        </Box>
    </Box>
    </button>
  );
}

export default MessageCard;
