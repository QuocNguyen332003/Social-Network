import {useState } from "react"
import { DataChatListProps } from "./useChatList";

export interface UserMessage{
    userID: string;
    avt: string;
    name: string;
}

export const useMessage = (data: DataChatListProps[]) => {
    const [userChat, setUserChat] = useState<DataChatListProps>(data[0]);

    const changeUserChat = (User: UserMessage) => {
        const newUserChat = data.find((item) => item.userID === User.userID) || {
            userID: User.userID, 
            avt: User.avt, 
            name: User.name, 
            sendDate: new Date(), 
            isRead: false, 
            lastMessage: {
              sender: true, 
              message: null 
            }
        };
        setUserChat(newUserChat);
    }
    return {
        userChat,
        changeUserChat,
    }
}


  