import { Box, Grid } from "@mui/material";
import ListMesssages from "./messages/ListMessages";
import MessageBox from "./conversations/Conversations";


function App() {  
  return (
    <Box 
      sx={{ 
        padding: '16px', 
        height: '85vh', 
        overflowY: 'scroll', 
        backgroundColor: '#e9e9e9',
      }}
      
    >
      <Grid container >
        <Grid item xs={4}>
          <ListMesssages/>
        </Grid>
        <Grid item xs={8}>
          <MessageBox />
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
