import { Box, Typography } from "@mui/material";
import FriendsCard from "../../components/FriendsCard";
import { BoxButtonAllFriends } from "../../components/BoxButton";

const dataTest = [
  {avt: "/src/assets/images/avt.png", name: "Phan Minh Quân", message: "Use the Base UI Button for complete ownership of the component's design, with no Material UI or Joy UI styles to override. This unstyled version of the component is the ideal choice for heavy customization with a smaller bundle size."},
  {avt: "/src/assets/images/avt.png", name: "Phan Minh Quân", message: "Use the Base UI Button for complete ownership of the component's design, with no Material UI or Joy UI styles to override. This unstyled version of the component is the ideal choice for heavy customization with a smaller bundle size."},
  {avt: "/src/assets/images/avt.png", name: "Phan Minh Quân", message: "Use the Base UI Button for complete ownership of the component's design, with no Material UI or Joy UI styles to override. This unstyled version of the component is the ideal choice for heavy customization with a smaller bundle size."},
  {avt: "/src/assets/images/avt.png", name: "Phan Minh Quân", message: "Use the Base UI Button for complete ownership of the component's design, with no Material UI or Joy UI styles to override. This unstyled version of the component is the ideal choice for heavy customization with a smaller bundle size."},
  {avt: "/src/assets/images/avt.png", name: "Phan Minh Quân", message: "Use the Base UI Button for complete ownership of the component's design, with no Material UI or Joy UI styles to override. This unstyled version of the component is the ideal choice for heavy customization with a smaller bundle size."},
  {avt: "/src/assets/images/avt.png", name: "Phan Minh Quân", message: "Use the Base UI Button for complete ownership of the component's design, with no Material UI or Joy UI styles to override. This unstyled version of the component is the ideal choice for heavy customization with a smaller bundle size."},
  {avt: "/src/assets/images/avt.png", name: "Phan Minh Quân", message: "Use the Base UI Button for complete ownership of the component's design, with no Material UI or Joy UI styles to override. This unstyled version of the component is the ideal choice for heavy customization with a smaller bundle size."}
]

function App() {  
  return (
    <Box 
      sx={{ 
        padding: '16px', 
        overflowY: 'scroll',
        maxHeight: '700px',
        scrollbarWidth: 'none', /* Firefox */
        '&::-webkit-scrollbar': {
          display: 'none', /* Chrome, Safari, Opera */
        },
      }}
    >
      <Typography variant="h5" component="h2"
      sx={{fontWeight: 'bold'}}>
        Tất cả bạn bè
      </Typography>
      {dataTest.map((item) => <FriendsCard avt={item.avt} name={item.name} message={item.message} BoxButton={BoxButtonAllFriends}/>)}
    </Box>
  );
}

export default App;
