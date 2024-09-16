import { Box, Typography} from "@mui/material";
import { Position } from "./MessageReceived";
import VideoCard from "../../../shared/components/video-card/VideoCard";

interface MessageCardProps {
    avt: string;
    date: Date;
    type: string;
    data: string;
    displayAvt: boolean;
    positionMessage: Position;
  }

function MessageSend({avt, date, type, data, displayAvt, positionMessage}: MessageCardProps) {

  return (
    <Box sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
        <Box>
            {type == "image" && (
                <img
                src= {data}
                alt=""
                style={{maxWidth: '100px'}}
              />
            )}
            {type == "text" && (
                <Typography variant="subtitle2" component="h2" color='#333' fontWeight='regular'
                    sx={[{ 
                    fontWeight: '400', color: '#fff',
                    backgroundColor: '#333', padding: '10px', margin: ' 1px 0',
                    borderBottomLeftRadius: 20, borderTopLeftRadius: 20,
                    }, positionMessage===Position.Top?{borderTopRightRadius: 20}: 
                       positionMessage===Position.Bottom?{borderBottomRightRadius: 20}:
                       positionMessage===Position.Alone?{borderBottomRightRadius: 20, borderTopRightRadius: 20}:{}]}>
                    {data}
                </Typography>)}
            {type == "video" && (
                <VideoCard linkVideo={data}/>
            )}
        </Box>
        <Box
          sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', 
                padding: '0 10px', width: '30px', height: '30px'}}>
          {displayAvt && (
            <img
                src= {avt}
                alt="Ảnh đại diện"
                style={{width: '30px', height: '30px', borderRadius: 50 }}
            />
          )}
        </Box>
    </Box>
  );
}

export default MessageSend;
