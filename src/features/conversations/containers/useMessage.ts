/* eslint-disable @typescript-eslint/no-unused-vars */
import {useEffect, useState } from "react"
import { Content, ConversationAPI, DataUser } from "./interfaceMessage";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io('http://localhost:3000');

export const useMessage = (friendID: string, readMessage: (_idConversation: string) =>void) => {
  const token = sessionStorage.getItem('token');
    const currentUserId = sessionStorage.getItem('userId') || '';
    const [conversation, setConversation] = useState<ConversationAPI | null>(null);
    const [isLoadingMessage, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [idFriend, setIdFriend] = useState<string | null>(null);
    const [newChat, setNewChat] = useState<boolean>(false);

    useEffect(()=>{
        if (friendID != ""){
            fetchMessagesWithFriend(friendID);
          }
    }, [friendID]);

    useEffect(()=>{
      if (conversation !== null){
          try {
            socket.on(`conversation-${conversation._id}`, (dataSocket) => {
              if (dataSocket._id === conversation._id){
                setConversation({
                  ...conversation,
                  content: [...conversation.content, dataSocket.newContent]
                });
              }
            })
            readMessage(conversation._id);
          } catch{
            setError('Lỗi socket');
          } 
        }
    }, [conversation]);

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
          if (response.data.success){
            if (response.data.data === null){
              try{
                const response = await axios.get(`http://localhost:3000/v1/user/${changeID}`,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`, // Thêm token vào header
                    },
                  }
                );

                createNewChat({userID: response.data._id, avt: response.data.avt, name: response.data.userName});
              } catch(error){
                console.error('Lỗi khi lấy tin nhắn viết:', error);
              }
            }
            setConversation(response.data.data);
          }
        } catch (error) {
          console.error('Lỗi khi lấy tin nhắn:', error);
          setError('Lỗi khi tải bài viết. Vui lòng thử lại sau.');
        } finally {
          setIsLoading(false); 
        }
      };

    const sendNewMessage = (idConversation: string, content: Content) => {
        // setConversation(prevConversation => {
        //   if (!prevConversation) {
        //     return null;
        //   }
        //   return {
        //     ...prevConversation,
        //     content: [...prevConversation.content, content]
        //   };
        // });
        postSendNewMessage(idConversation, content)
      };
    
    const postSendNewMessage = async (idConversation: string, content: Content) => {
        setIsLoading(true); 
        try {
          const response = await axios.patch(
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
          console.log(response.data);
        } catch (error) {
          console.error('Lỗi khi gửi tin nhắn:', error);
          setError('Lỗi khi gửi tin nhắn. Vui lòng thử lại sau.');
        } finally {
          setIsLoading(false); 
        }
    };
    const addNewMessage = async (content: Content) => {
        setNewChat(false);
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
        const currentUserAvt = JSON.parse(sessionStorage.getItem('avt') || '[]');
        const currentUserName = sessionStorage.getItem('displayName') || '';
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
        isLoadingMessage, error,
        conversation,
        sendNewMessage,
        createNewChat,
        addNewMessage,
        newChat, setNewChat
    }
}


  