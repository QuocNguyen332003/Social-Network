import { Box, Button, IconButton, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useState } from "react";

interface MessageInputProps{
  sendMessage: (type: string, data: string, userID: string) => void;
  userID: string;
}

const MessageInput = ({sendMessage, userID}: MessageInputProps) => {
  const [text, setText] = useState<string>("");
  const handlePressSend = () => {
    if (text != ""){
      sendMessage("text", text, userID);
      setText("");
    }
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };
  return (
    <Box 
      sx={{ 
        display: 'flex', flexDirection: 'column', justifyContent: 'space-around', padding: '20px'
      }}
    >
        <TextField id="standard-basic" label="Nhấn vào đây..." variant="standard" 
        value={text} onChange={handleChange}
            sx={{ margin: '10px 0px', borderBottom: '1px solid black',
                "& .MuiInput-underline:before": {
                  borderBottom: "none",
                },
                "& .MuiInput-underline:hover:before": {
                  borderBottom: "none",
                },
                "& .MuiInput-underline:after": {
                  borderBottom: "none",
                },
              }}
        />
        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Box>
            <IconButton color="secondary" aria-label="add an alarm">
                <img
                    src= {"src/assets/images/image-gallery.png"}
                    alt="Button Image"
                    style={{width: '30px', height: '30px'}}
                />
            </IconButton>
            <IconButton color="secondary" aria-label="add an alarm">
                <img
                    src= {"src/assets/images/video.png"}
                    alt="Ảnh đại diện"
                    style={{width: '30px', height: '30px', borderRadius: 50 }}
                />
            </IconButton>
            <IconButton color="secondary" aria-label="add an alarm">
                <img
                    src= {"src/assets/images/microphone.png"}
                    alt="Ảnh đại diện"
                    style={{width: '30px', height: '30px', borderRadius: 50 }}
                />
            </IconButton>
            <IconButton color="secondary" aria-label="add an alarm">
                <img
                    src= {"src/assets/images/hourglass.png"}
                    alt="Ảnh đại diện"
                    style={{width: '30px', height: '30px', borderRadius: 50 }}
                />
            </IconButton>
            <IconButton color="secondary" aria-label="add an alarm">
                <img
                    src= {"src/assets/images/dollar.png"}
                    alt="Ảnh đại diện"
                    style={{width: '30px', height: '30px', borderRadius: 50 }}
                />
            </IconButton>
            </Box>
            <Button variant="contained" endIcon={<SendIcon />}
            onClick={handlePressSend}>
              Send
            </Button>
        </Box>
    </Box>
  );
}

export default MessageInput;