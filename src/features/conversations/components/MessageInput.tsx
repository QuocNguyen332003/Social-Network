import { Box, Button, IconButton, TextField } from "@mui/material";

function MessageInput() {
  return (
    <Box 
      sx={{ 
        height: '17vh', 
        display: 'flex', flexDirection: 'column', justifyContent: 'space-around'
      }}
    >
        <TextField id="standard-basic" label="Nhấn vào đây..." variant="standard" 
            sx={{ margin: '10px 50px',
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
        <Box sx={{display: 'flex', justifyContent: 'space-between', padding: '10px 20px'}}>
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
            <Button variant="contained">Gửi</Button>
        </Box>
    </Box>
  );
}

export default MessageInput;
