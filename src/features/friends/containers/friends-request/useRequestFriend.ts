import {useEffect, useState } from "react"
import FriendProps from "../../components/FriendProps";
import axios from "axios";


export const useRequestFriend = () => {
    const [data, setData] = useState<FriendProps[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const token = sessionStorage.getItem('token');
    const currentUserId = sessionStorage.getItem('userId') || '';

    const limit = 10;
    const [page, setPage] = useState<number>(1);
    const [count, setCount] = useState<number>(0);
    useEffect(()=> {
      getAllFriendRequest();
    }, [])

    const getAllFriendRequest = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/v1/friends/${currentUserId}/request?page=${page}&limit=${limit}`, 
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
    const AcceptsFriend = (_id: string | null) => {
        answerFriendRequest(_id, 'accepted');
        const updatedData = data.filter(friend => friend._id !== _id);
        setData(updatedData)
    }

    const RefuseFriend = (_id: string | null) => {
        answerFriendRequest(_id, 'rejected');
        const updatedData = data.filter(friend => friend._id !== _id);
        setData(updatedData)
    }

    const answerFriendRequest = async (_id: string | null, status: string) => {
      try {
        if (_id !== null){
          const response = await axios.put(`http://localhost:3000/v1/friends/${_id}/answer?status=${status}`,
            {}, 
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(response.data);
        }
      } catch (error) {
        console.error('Lỗi khi lấy bài viết:', error);
        setError('Lỗi khi tải bài viết. Vui lòng thử lại sau.');
      } finally {
        setIsLoading(false); 
      }
    }

    return {
        data, isLoading, error,
        setPage,
        AcceptsFriend,
        RefuseFriend,
        count, limit
    }
}
