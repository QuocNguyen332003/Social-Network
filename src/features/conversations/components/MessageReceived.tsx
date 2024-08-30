import { Box, Typography} from "@mui/material";

export enum Position {
    Top = "top",
    Mid = "mid",
    Bottom = "bottom",
    Alone = "alone"
  }

interface MessageCardProps {
    avt: string;
    date: Date;
    text: string;
    link: string;
    displayAvt: boolean;
    positionMessage: Position;
  }

function MessageReceived({avt, date, text, link, displayAvt, positionMessage}: MessageCardProps) {

  return (
    <Box sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end'}}>
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
        <Box>
            {link != "" && (
                <img
                src= {link}
                alt=""
                style={{maxWidth: '100px'}}
              />
            )}
            {text != "" && (
                <Typography variant="subtitle2" component="h2" color='#333' fontWeight='regular'
                    sx={[{ 
                    fontWeight: '400',
                    backgroundColor: '#dbdbdb', padding: '10px', margin: ' 1px 0',
                    borderEndEndRadius: 20, borderTopRightRadius: 20,
                    }, positionMessage===Position.Top?{borderTopLeftRadius: 20}: 
                       positionMessage===Position.Bottom?{borderBottomLeftRadius: 20}:
                       positionMessage===Position.Alone?{borderBottomLeftRadius: 20, borderTopLeftRadius: 20}:{}]}>
                    {text}
                </Typography>)}
        </Box>
    </Box>
  );
}

export default MessageReceived;
