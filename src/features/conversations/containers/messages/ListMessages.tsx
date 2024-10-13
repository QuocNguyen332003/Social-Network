import { Search } from "@mui/icons-material";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import ButtonCreateMessage from "../../components/ButtonCreateMessage";
import ChatList from "./ChatList";
import { CardConversationAPI, DataUser } from "../interfaceMessage";
import DialogNewChat from "../../components/DialogNewChat";
import { useState } from "react";
import useFriend from "./useFriend";

export type ListMessagesProps = {
  data: CardConversationAPI[];
  changeChat: (userID: string, _idConversation: string) => void;
  createNewChat: (dataFriend: DataUser) => void;
  searchChat: (value: string) => void;
}

const ListMesssages = ({data, changeChat, createNewChat, searchChat} : ListMessagesProps) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { isLoading, usersWithoutChat, getDataUserWithoutChat } = useFriend();
  const [textSearch, setTextSearch] = useState<string>("");

  const handlePressItemDialog = (dataFriend: DataUser) => {
    setOpenDialog(false);
    createNewChat(dataFriend)
  }
  return (
    <Box 
      sx={{ 
        height: '79vh',
        border: '1px solid #e0e0e0',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: 3,
      }}
    >
        <Box 
          display='flex'
          justifyContent='space-around'
          alignItems='flex-end'
        >
            <Typography variant="h6" component="h2" fontWeight='bold' color='#1976d2'>
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
                <TextField size="small" id="standard-basic" label="Search" variant="standard"
                  value={textSearch}  onChange={(event) => {
                    setTextSearch(event.target.value);
                    searchChat(event.target.value)
                  }}/>  
            </Box>
        </Box>
        <ButtonCreateMessage handlePress={()=> {setOpenDialog(true);
          getDataUserWithoutChat();
        }}/>
        <ChatList data={data} changeChat={changeChat}/>
        <DialogNewChat open={openDialog} isLoading={isLoading} usersWithoutChat={usersWithoutChat}
      onClose={() => { setOpenDialog(false); } } handleListItemClick={handlePressItemDialog} />
    </Box>
  );
}

export default ListMesssages;
