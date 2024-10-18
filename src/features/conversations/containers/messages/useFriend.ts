import axios from "axios";
import { useEffect, useState } from "react";

export interface UserWithoutChat {
    _id: string;
    avt: string[];
    displayName: string; 
    userName: string;
  }
const useFriend = () => {
    const token = sessionStorage.getItem('token');
    const currentUserId = sessionStorage.getItem('userId') || '';
    const [usersWithoutChat, setUsersWithoutChat] = useState<UserWithoutChat[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getDataUserWithoutChat = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:3000/v1/messages/friends/newchat/${currentUserId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`, // Thêm token vào header
                },
              }
            );
            setUsersWithoutChat(response.data);
          } catch (error) {
            console.error('Lỗi:', error);
          } finally {
            setIsLoading(false); 
          }
    }

    useEffect(()=> {
        getDataUserWithoutChat();
    }, []);

    return {
        usersWithoutChat,
        isLoading,
        getDataUserWithoutChat,
    }
}
export default useFriend;