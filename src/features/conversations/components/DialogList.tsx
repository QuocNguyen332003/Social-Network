import { Box, Button, ButtonProps, styled} from "@mui/material";
import MessageCard from "./MessageCard";

const BorderButton = styled(Button)<ButtonProps>(() => ({
    color: '#333',
    backgroundColor: '#c7c7f9',
    borderRadius: 30,
    padding: '5px 40px',
    fontSize: 12,
  }));

const DataMessageCard = [
  {avt: "src/assets/images/avt.png", name: "Phan Minh Quân", lastMessage: "Find that perfect color with our color picker and discover beautiful color harmonies", date: new Date()},
  {avt: "src/assets/images/avt.png", name: "Nguyễn Bảo Quốc", lastMessage: "Find that perfect color with our color picker and discover beautiful color harmonies", date: new Date()},
  {avt: "src/assets/images/avt.png", name: "Thái Thanh Hưng", lastMessage: "Find that perfect color with our color picker and discover beautiful color harmonies", date: new Date()},
  {avt: "src/assets/images/avt.png", name: "Đặng Quang Trường", lastMessage: "Find that perfect color with our color picker and discover beautiful color harmonies", date: new Date()},
  {avt: "src/assets/images/avt.png", name: "Phan Minh Quân", lastMessage: "Find that perfect color with our color picker and discover beautiful color harmonies", date: new Date()},
  {avt: "src/assets/images/avt.png", name: "Nguyễn Bảo Quốc", lastMessage: "Find that perfect color with our color picker and discover beautiful color harmonies", date: new Date()},
  {avt: "src/assets/images/avt.png", name: "Thái Thanh Hưng", lastMessage: "Find that perfect color with our color picker and discover beautiful color harmonies", date: new Date()},
  {avt: "src/assets/images/avt.png", name: "Đặng Quang Trường", lastMessage: "Find that perfect color with our color picker and discover beautiful color harmonies", date: new Date()},
  {avt: "src/assets/images/avt.png", name: "Phan Minh Quân", lastMessage: "Find that perfect color with our color picker and discover beautiful color harmonies", date: new Date()},
  {avt: "src/assets/images/avt.png", name: "Nguyễn Bảo Quốc", lastMessage: "Find that perfect color with our color picker and discover beautiful color harmonies", date: new Date()},
  {avt: "src/assets/images/avt.png", name: "Thái Thanh Hưng", lastMessage: "Find that perfect color with our color picker and discover beautiful color harmonies", date: new Date()},
  {avt: "src/assets/images/avt.png", name: "Đặng Quang Trường", lastMessage: "Find that perfect color with our color picker and discover beautiful color harmonies", date: new Date()}
]
function DialogList() {
  return (
    <Box 
    >
        <BorderButton variant="contained">
            Tất cả
        </BorderButton>
        <Box 
          sx={{
            height: '60vh',
            margin: '5px 0', 
            overflowY: 'scroll',
            scrollbarWidth: 'none', /* Firefox */
            '&::-webkit-scrollbar': {
              display: 'none', /* Chrome, Safari, Opera */
            },
          }}>
          {DataMessageCard.map((item)=> 
            <MessageCard avt={item.avt} name={item.name} lastMessage={item.lastMessage} date={item.date} onClick={function (): void {} }/>)}
        </Box>

    </Box>
  );
}

export default DialogList;
