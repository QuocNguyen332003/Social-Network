/* eslint-disable @typescript-eslint/no-unused-vars */
import {useEffect, useState } from "react"
import axios from "axios";
import { CardConversationAPI, Content } from "./interfaceMessage";



export const useChatList = () => {
    const token = localStorage.getItem('token');
    const currentUserId = localStorage.getItem('userId') || '';
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [data, setData] = useState<CardConversationAPI[]>([]);
    const [filterData, setFilterData] = useState<CardConversationAPI[]>([]);

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
        const response = await axios.put(`http://localhost:3000/v1/messages/read-message/${_idConversation}/${currentUserId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Thêm token vào header
            },
          }
        );
      } catch (error) {
        console.error('Lỗi khi lấy bài viết:', error);
        setError('Lỗi khi tải bài viết. Vui lòng thử lại sau.');
      } finally {
        setIsLoading(false); 
      }
    };

    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/v1/messages/${currentUserId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Thêm token vào header
            },
          }
        );
        setData(response.data);
        setFilterData(response.data);
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
      setFilterData(data);
    }

    const removeAccents = (str: string) => {
      return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    };

    const searchChat = (value: string) => {
      const searchValue = removeAccents(value.toLowerCase());


    const result = data.filter((conversation) =>
      conversation.dataUser.some(
        (user) =>
          removeAccents(user.name.toLowerCase()).includes(searchValue) &&
          user.userID !== currentUserId
      )
    );

      setFilterData(result);
    }

    return {
        isLoading, error,
        data, setData,
        readMessage,
        setValueMessageList,
        fetchMessages,
        filterData,
        searchChat
    }
}
