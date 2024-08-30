import { Search } from "@mui/icons-material";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import ButtonCreateMessage from "../../components/ButtonCreateMessage";
import DialogList from "../../components/DialogList";

function ListMesssages() {
  return (
    <Box 
      sx={{ 
        height: '79vh',
        border: '1px solid #e0e0e0',
        padding: '20px',
      }}
    >
        <Box 
          display='flex'
          justifyContent='space-around'
          alignItems='flex-end'
        >
            <Typography variant="h6" component="h2" fontWeight='bold' color='#150aa1'>
                Message
            </Typography>
            <Box 
              display='flex'
              justifyContent='space-between'
              alignItems='flex-end'
            >
                <IconButton
                  sx={{
                    margin: '0 10px 0 10px',
                    width: '30px', height: '30px',
                    color: '#333333', 
                    '&:hover': {
                      color: '#1976d2',
                    },
                  }}
                >
                    <Search />
                </IconButton>
                <TextField size="small" id="standard-basic" label="Search" variant="standard"/>
            </Box>
        </Box>
        <ButtonCreateMessage/>
        <DialogList/>
    </Box>
  );
}

export default ListMesssages;
