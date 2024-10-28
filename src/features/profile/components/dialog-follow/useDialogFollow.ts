import axios from "axios";
import { useEffect, useState } from "react";
import { UserDataDisplay } from "../../../../interface/interface";

const useDialogFollow = (friendId: string) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [first, setFirst] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const token = sessionStorage.getItem('token');

    const [dataFriends, setDataFriends] = useState<UserDataDisplay[] | null>(null);
    const [dataFollower, setDataFollower] = useState<UserDataDisplay[] | null>(null);

    useEffect(() => {
        getDataFriends();
        getDataFollower();
    }, []);
    const getDataFriends = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/v1/user/${friendId}/friends-data`, 
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setDataFriends(response.data);
        } catch (error) {
          console.error('Lỗi khi lấy bài viết:', error);
          setError('Lỗi khi tải bài viết. Vui lòng thử lại sau.');
        } finally {
          setIsLoading(false); 
        }
    }
    const getDataFollower = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/v1/user/${friendId}/follower-data`, 
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setDataFollower(response.data);
        } catch (error) {
          console.error('Lỗi khi lấy bài viết:', error);
          setError('Lỗi khi tải bài viết. Vui lòng thử lại sau.');
        } finally {
          setIsLoading(false); 
        }
    }
    const handleClickOpenDialog = (value: number) => {
        setOpenDialog(true);
        setFirst(value);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    return {
        openDialog, first,
        handleClickOpenDialog, handleCloseDialog,
        isLoading, error,
        dataFriends, dataFollower

    }
}

export default useDialogFollow;