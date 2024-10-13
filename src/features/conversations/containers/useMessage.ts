/* eslint-disable @typescript-eslint/no-unused-vars */
import {useEffect, useState } from "react"
import { Content, ConversationAPI, DataUser } from "./interfaceMessage";
import axios from "axios";

export const useMessage = (friendID: string) => {
  const token = localStorage.getItem('token');
    const currentUserId = localStorage.getItem('userId') || '';
    const [conversation, setConversation] = useState<ConversationAPI | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [idFriend, setIdFriend] = useState<string | null>(null);
    const [newChat, setNewChat] = useState<boolean>(false);

    useEffect(()=>{
        if (friendID != ""){
            fetchMessagesWithFriend(friendID);
          }
    }, [friendID]);

    const fetchMessagesWithFriend = async (changeID: string) => {
        setIsLoading(true); 
        try {
          const response = await axios.get(`http://localhost:3000/v1/messages/${currentUserId}/${changeID}`,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Thêm token vào header
              },
            }
          );
          setConversation(response.data);
        } catch (error) {
          console.error('Lỗi khi lấy bài viết:', error);
          setError('Lỗi khi tải bài viết. Vui lòng thử lại sau.');
        } finally {
          setIsLoading(false); 
        }
      };

    const sendNewMessage = (idConversation: string, content: Content) => {
        setConversation(prevConversation => {
          if (!prevConversation) {
            return null;
          }
          return {
            ...prevConversation,
            content: [...prevConversation.content, content]
          };
        });
        postSendNewMessage(idConversation, content)
      };
    
    const postSendNewMessage = async (idConversation: string, content: Content) => {
        setIsLoading(true); 
        try {
          const response = await axios.put(
            `http://localhost:3000/v1/messages/send-message/${idConversation}`,
            { 
                message: content.message,
                userId: content.userId,
                sendDate: content.sendDate,
                viewDate: null
             },
            {
              headers: {
                'Content-Type': 'application/json',
                 Authorization: `Bearer ${token}` 
              },
            }
          );
        } catch (error) {
          console.error('Lỗi khi gửi tin nhắn:', error);
          setError('Lỗi khi gửi tin nhắn. Vui lòng thử lại sau.');
        } finally {
          setIsLoading(false); 
        }
    };
    const addNewMessage = async (content: Content) => {
        try {
            const response = await axios.post(`http://localhost:3000/v1/messages/create-conversation`,
                {   
                    userID: currentUserId,
                    friendID: idFriend,
                    message: content
                 },
                 {
                  headers: {
                    Authorization: `Bearer ${token}`, // Thêm token vào header
                  },
                }
            );
            setConversation(response.data);
          } catch (error) {
            console.error('Lỗi khi lấy bài viết:', error);
          } finally {
            console.error('Lỗi khi lấy bài viết:', error);
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
            setConversation({
                _id: "",
                _user: [currentUserId, dataFriend.userID],
                content: [],
                dataUser: [dataFriend, userData],
            })
        }
    }
    return {
        isLoading, error,
        conversation,
        sendNewMessage,
        createNewChat,
        addNewMessage,
        newChat, setNewChat
    }
}


  