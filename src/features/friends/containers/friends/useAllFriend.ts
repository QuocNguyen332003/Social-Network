import {useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import FriendProps from "../../components/FriendProps";
import axios from "axios";

export const useAllFriend = () => {
    const [data, setData] = useState<FriendProps[]>([]);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const token = sessionStorage.getItem('token');
    const currentUserId = sessionStorage.getItem('userId') || '';
    
    useEffect(()=> {
      getAllFriend();
    }, []);

    const getAllFriend = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/v1/friends/${currentUserId}/all-friends`, 
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy bài viết:', error);
        setError('Lỗi khi tải bài viết. Vui lòng thử lại sau.');
      } finally {
        setIsLoading(false); 
      }
    }
    const deleteFriend = (userID: string | null) => {
        if (userID != null){
            const updatedData = data.filter(friend => friend.idUser !== userID);
            setData(updatedData)
        }
    }

    const viewPersonalPage = (userID: string) => {
        navigate(`/profile/${userID}`)
    }

    return {
        data,
        deleteFriend,
        viewPersonalPage,
        isLoading, error,
    }
}
