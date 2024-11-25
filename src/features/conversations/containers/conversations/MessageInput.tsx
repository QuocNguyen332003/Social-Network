import { Box, Button, IconButton, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useRef, useState } from "react";
import { Content } from "../interfaceMessage";
import axios from "axios";

interface MessageInputProps{
  idConversation: string;
  sendMessage: (idConversation: string, content: Content) => void;
}

const MessageInput = ({idConversation, sendMessage}: MessageInputProps) => {
  const currentUserId = sessionStorage.getItem('userId') || '';
  const [text, setText] = useState<string>("");
  const token = sessionStorage.getItem("token");

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [type, setType] = useState<string | null>(null);

  const handlePressSend = () => {
    if (text != ""){
      const newContent : Content = {
        userId: currentUserId,
        message: {
          type: 'text', 
          data: text
        },
        sendDate: new Date(),
        viewDate: null
      }
      sendMessage(idConversation, newContent);
      setText("");
    }
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const openFile = () => {
    // Kích hoạt input file ẩn khi gọi hàm
    if (type !== null){
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      handleSave(file);
    }
    (event.target as any).value = null;
  };
  const handleSave = async (src: File | null) => {
    const formData = new FormData();
    
    if (src) {
      if (type === "img"){
        formData.append('image', src);
      } else {
        formData.append('video', src);
      }
    }

    const newContent: Content = {
      userId: currentUserId,
      message: {
        type: 'text', 
        data: text
      },
      sendDate: new Date(),
      viewDate: null
    };
  
    // Thêm thông tin content vào formData
    formData.append('content', JSON.stringify(newContent));
    try {
      const response = await axios.patch(
        `http://localhost:3000/v1/messages/send-message/photo/${idConversation}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
             Authorization: `Bearer ${token}` 
          },
        }
      );
      if (response.data !== null){
        console.log("pass");
      }
    } catch (error) {
      console.error('Lỗi khi gửi tin nhắn:', error);
    } finally{
      setType(null);
    }
  }

  useEffect(()=> {
    openFile();
  }, [type])

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
            <IconButton color="secondary" aria-label="add an alarm"
            onClick={() => {setType("img");}}>
                <img
                    src= {"src/assets/images/image-gallery.png"}
                    alt="Button Image"
                    style={{width: '30px', height: '30px'}}
                />
            </IconButton>
            <IconButton color="secondary" aria-label="add an alarm"
            onClick={() => {setType("video");}}>
                <img
                    src= {"src/assets/images/video.png"}
                    alt="Button video"
                    style={{width: '30px', height: '30px', borderRadius: 50 }}
                />
            </IconButton>
            </Box>
            <Button variant="contained" endIcon={<SendIcon />}
            onClick={handlePressSend}>
              Send
            </Button>
            <input
              id="fileInput"
              type="file"
              ref={fileInputRef}
              accept={type === "img"? "image/*": "video/*"}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
        </Box>
    </Box>
  );
}

export default MessageInput;
