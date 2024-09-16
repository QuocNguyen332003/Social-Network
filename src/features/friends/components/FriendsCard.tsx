import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

type FriendsCardProps = {
  avt: string;
  name: string;
  message: string;
  children?: ReactNode;
};

function FriendsCard({ avt, name, message, children }: FriendsCardProps) {  
  return (
    <Box 
      sx={{ 
        margin: '15px',  
        display: 'flex',
        height: '200px',
        justifyContent: 'space-between',
        backgroundColor: '#f9f9f9',
        border: '1px solid #ccc'
      }}
    >
      <Box 
      sx={{
        width: '15%', height: '200px',
        display: 'flex', justifyContent: 'center', alignItems: 'center'
      }}
      >
         <img
            src= {avt}
            alt="Ảnh đại diện"
            style={{width: '130px', height: '130px', borderRadius: 50, marginLeft: '20px', objectFit: 'cover' }}
          /> 
      </Box>
      <Box
      sx={{
        padding: '25px', width: '85%',
      }}>
        <Box
          sx={{
            display: 'flex', justifyContent: 'space-between',
            marginBottom: '40px',
          }}>
            <Typography variant="h6" component="h2"
            sx={{color: '#150aa1', fontWeight: 'bold'}}>
                {name}
            </Typography>
            {children}
        </Box>
        <Typography variant="body1" component="h2"
            sx={{color: '#808080'}}
        >
            {message}
        </Typography>
      </Box>
    </Box>
  );
}

export default FriendsCard;
