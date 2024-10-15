import {useEffect, useState } from "react"
import FriendProps from "../../components/FriendProps";
import axios from "axios";


export const useMyRequestFriend = () => {
    const [data, setData] = useState<FriendProps[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const token = localStorage.getItem('token');
    const currentUserId = localStorage.getItem('userId') || '';
    const [page, setPage] = useState<number>(1);
    useEffect(()=> {
        getAllFriendRequest();
    }, []);
    const getAllFriendRequest = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/v1/friends/${currentUserId}/my-request?page=${page}`, 
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

    const revokeInvitation = (_id: string | null) => {
        answerFriendRequest(_id)
        const updatedData = data.filter(friend => friend._id !== _id);
        setData(updatedData)
    }

    const answerFriendRequest = async (_id: string | null) => {
        try {
          if (_id !== null){
            const response = await axios.put(`http://localhost:3000/v1/friends/${_id}/recall`,
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
        revokeInvitation,

    }
}
