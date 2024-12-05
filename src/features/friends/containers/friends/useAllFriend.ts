import {useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import FriendProps from "../../components/FriendProps";
import axios from "axios";

export const useAllFriend = () => {
    const [data, setData] = useState<FriendProps[]>([]);
    const [count, setCount] = useState<number>(0);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const token = sessionStorage.getItem('token');
    const currentUserId = sessionStorage.getItem('userId') || '';
    const limit = 10
    const [page, setPage] = useState<number>(1);

    useEffect(()=> {
      getAllFriend();
    }, [page]);

    const getAllFriend = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/v1/friends/${currentUserId}/all-friends?page=${page}&limit=${limit}`, 
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data.dataFriend);
        setCount(response.data.count)
      } catch (error) {
        console.error('Lỗi khi lấy bài viết:', error);
        setError('Lỗi khi tải bài viết. Vui lòng thử lại sau.');
      } finally {
        setIsLoading(false); 
      }
    }
    const deleteFriend = async (userID: string | null) => {
      try {
        const response = await axios.put(`http://localhost:3000/v1/friends/${currentUserId}/unfriend/?friendId=${userID}`, 
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        if (response.data){
          setData((prevData) => prevData.filter((friend) => friend.idUser !== userID));
        }
      } catch (error) {
        console.error('Lỗi khi lấy bài viết:', error);
        setError('Lỗi khi tải bài viết. Vui lòng thử lại sau.');
      } finally {
        setIsLoading(false); 
      }
    }

    const viewPersonalPage = (userID: string) => {
        navigate(`/profile?id=${userID}`)
    }

    return {
        data, limit,
        deleteFriend,
        viewPersonalPage,
        isLoading, error,
        page, setPage, count
    }
}
