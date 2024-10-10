import {useEffect, useState } from "react"
import { Content, ConversationAPI } from "./interfaceMessage";
import axios from "axios";

export const useMessage = (friendID: string) => {
    const currentUserId = localStorage.getItem('userId') || '';
    const [conversation, setConversation] = useState<ConversationAPI | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(()=>{
        if (friendID != ""){
            fetchMessagesWithFriend(friendID);
          }
    }, []);

    const fetchMessagesWithFriend = async (changeID: string) => {
        setIsLoading(true); 
        try {
          const response = await axios.get(`http://localhost:3000/v1/messages/${currentUserId}/${changeID}`);
          setConversation(response.data);
        } catch (error) {
          console.error('Lỗi khi lấy bài viết:', error);
          setError('Lỗi khi tải bài viết. Vui lòng thử lại sau.');
        } finally {
          setIsLoading(false); 
        }
      };
    const changeUserChat = (userID: string) => {
        fetchMessagesWithFriend(userID);
    }

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

    return {
        isLoading, error,
        conversation,
        changeUserChat,
        sendNewMessage,
    }
}


  