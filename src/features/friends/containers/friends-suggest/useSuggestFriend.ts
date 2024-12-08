import {useEffect, useState } from "react"
import FriendProps from "../../components/FriendProps";
import axios from "axios";


export const useSuggestFriend = () => {
    const [data, setData] = useState<FriendProps[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const token = sessionStorage.getItem('token');
    const currentUserId = sessionStorage.getItem('userId') || '';
    const [page, setPage] = useState<number>(1);

    const limit = 10;
    const [count, setCount] = useState<number>(0);
    useEffect(()=> {
      getSuggestFriend();
    }, []);

    const getSuggestFriend = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/v1/friends/${currentUserId}/friend-suggestions?page=${page}&limit=${limit}`, 
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data.dataFriend);
        setCount(response.data.count);
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
        limit, count
    }
}
