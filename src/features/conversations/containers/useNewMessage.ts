import { useState } from "react";
import { Content, ConversationAPI, DataUser } from "./interfaceMessage";
import axios from "axios";

const useNewMessage = () => {
    const currentUserId = localStorage.getItem('userId') || '';
    const [NewConversation, setNewConversation] = useState<ConversationAPI | null>(null);
    const [idFriend, setIdFriend] = useState<string | null>(null);
    const [newChat, setNewChat] = useState<boolean>(false);

    const addNewMessage = async (content: Content) => {
        try {
            const response = await axios.post(`http://localhost:3000/v1/messages/create-conversation`,
                {   
                    userID: currentUserId,
                    friendID: idFriend,
                    message: content
                 },
            );
            setNewConversation(response.data);
          } catch (error) {
            console.error('Lỗi khi lấy bài viết:', error);
          } finally {
          }
    }

    const createNewChat = (dataFriend: DataUser) => {
        setIdFriend(dataFriend.userID);
        setNewChat(true);
        const currentUserAvt = JSON.parse(localStorage.getItem('avt') || '[]');
        const currentUserName = localStorage.getItem('displayName') || '';
        const userData : DataUser = {
            userID: currentUserId,
            avt: currentUserAvt,
            name: currentUserName,
        }
        if (idFriend !== null){
            setNewConversation({
                _id: "",
                _user: [currentUserId, dataFriend.userID],
                content: [],
                dataUser: [dataFriend, userData],
            })
        }
    }
    
    return {
        createNewChat,
        NewConversation,
        addNewMessage,
        newChat, setNewChat
    }
}

export default useNewMessage;