import {useEffect, useState } from "react"
import FriendProps from "../../components/FriendProps";
import axios from "axios";


export const useSuggestFriend = () => {
    const [data, setData] = useState<FriendProps[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const token = localStorage.getItem('token');
    const currentUserId = localStorage.getItem('userId') || '';
    const [page, setPage] = useState<number>(1);

    useEffect(()=> {
      getSuggestFriend();
    }, []);

    const getSuggestFriend = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/v1/friends/${currentUserId}/suggest?page=${page}`, 
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

    const SendAddFriend = (userID: string) => {
        const updatedData = data.filter(friend => friend.idUser !== userID);
        setData(updatedData);
        addFriend(userID);
    }
    const addFriend = async (userID: string) => {
      try {
        const response = await axios.post(`http://localhost:3000/v1/friends/${currentUserId}/add-friend?receiverId=${userID}`, 
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
      } catch (error) {
        console.error('Lỗi khi lấy bài viết:', error);
        setError('Lỗi khi tải bài viết. Vui lòng thử lại sau.');
      } finally {
        setIsLoading(false); 
      }
    }
    return {
        data,
        SendAddFriend,
        setPage,
        isLoading, error,
    }
}
