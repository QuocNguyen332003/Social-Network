import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";
import { MyPhoto } from "../../../interface/mainInterface";

type FriendsCardProps = {
  avt: MyPhoto;
  name: string;
  message: string;
  children?: ReactNode;
};

function FriendsCard({ avt, name, message, children }: FriendsCardProps) {  
  return (
    <Box 
      sx={{ 
        margin: '15px',  
        padding: '20px',
        display: 'flex',
        height: '150px',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderRadius: 4,
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
      }}
    >
      <img
        src= {avt.link}
        alt="Ảnh đại diện"
        style={{width: '130px', height: '130px', borderRadius: 50, marginLeft: '20px', objectFit: 'cover' }}
      /> 
      <Box
        sx={{
          width: '50%', height: '100%', padding: '10px',
          display: 'flex', flexDirection: 'column', 
          justifyContent: 'flex-start', alignItems: 'flex-start',
      }}>
        <Typography variant="h6" component="h2"
        sx={{color: 'fffffff', fontWeight: 'bold'}}>
            {name}
        </Typography>
        <Typography variant="body1" component="h2"
          sx={{color: '#808080'}}
        >
          {message}
        </Typography>
      </Box>  
      {children}
    </Box>
  );
}

export default FriendsCard;
