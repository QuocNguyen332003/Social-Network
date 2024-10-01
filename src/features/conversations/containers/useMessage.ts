import {useState } from "react"
import { DataChatListProps } from "./useChatList";

export interface UserMessage{
    userID: string;
    avt: string;
    name: string;
}

export const useMessage = (data: DataChatListProps[]) => {
    const [userChat, setUserChat] = useState<DataChatListProps>(data[0]);

    const changeUserChat = (userID: string) => {
        const newUserChat = data.find((item) => item.userID === userID) || {
            userID: userID, 
            avt: "", 
            name: "", 
            sendDate: new Date(), 
            isRead: false, 
            lastMessage: {
              sender: true, 
              message: null 
            }
        };
        const result = {...newUserChat, isRead: true}
        setUserChat(result);
    }
    return {
        userChat,
        changeUserChat,
    }
}


  