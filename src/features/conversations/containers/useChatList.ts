import {useEffect, useState } from "react"
import axios from "axios";
import { CardConversationAPI, Content } from "./interfaceMessage";



export const useChatList = () => {
    const currentUserId = localStorage.getItem('userId') || '';
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [data, setData] = useState<CardConversationAPI[]>([]);
    useEffect(()=> {
      fetchMessages();
    },[]);
    const readMessage = (_idConversation: string) => {

      setData(prevData =>
        prevData.map(conversation =>
          conversation._id === _idConversation
            ? {
              ...conversation,
              content: {
                message: conversation.content?.message || {type: 'text' , data: "" },
                userId: conversation.content?.userId || "",
                sendDate: conversation.content?.sendDate || new Date(),
                viewDate: conversation.content? 
                  (currentUserId.toString() !== conversation.content.userId.toString()? new Date() : conversation.content.viewDate):
                  null
              }
            }
            : conversation
        )
      );

      putReadMessage(_idConversation);
    };
    const putReadMessage = async (_idConversation: string) => {
      try {
        const response = await axios.put(`http://localhost:3000/v1/messages/read-message/${_idConversation}/${currentUserId}`);
      } catch (error) {
        console.error('Lỗi khi lấy bài viết:', error);
        setError('Lỗi khi tải bài viết. Vui lòng thử lại sau.');
      } finally {
        setIsLoading(false); 
      }
    };

    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/v1/messages/${currentUserId}`);
        setData(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy bài viết:', error);
        setError('Lỗi khi tải bài viết. Vui lòng thử lại sau.');
      } finally {
        setIsLoading(false); 
      }
    };
    const setValueMessageList = (idConversation: string, content: Content) => {
      setData(prevData =>
        prevData.map(conversation =>
          conversation._id === idConversation
            ? {
              ...conversation,
              content: content
            }
            : conversation
        )
      );
    }

    return {
        isLoading, error,
        data, setData,
        readMessage,
        setValueMessageList
    }
}
