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
      }}
    >
      <Grid container >
        <Grid item xs={3}>
          <ListMesssages/>
        </Grid>
        <Grid item xs={9}>
          <MessageBox />
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
