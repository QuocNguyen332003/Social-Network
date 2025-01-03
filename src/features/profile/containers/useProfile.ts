import {useEffect, useState } from "react"
import { User, UserDataDisplay } from "../../../interface/interface";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Friends } from "../../../interface/mainInterface";

export const useProfile = () => {
    const location = useLocation();
    const [myUser, setMyUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const token = sessionStorage.getItem('token');
    const currentUserId = sessionStorage.getItem('userId') || '';
    const [isOwner, setIsOwner] = useState<boolean>(false);
    const [idUserView, setIdUserView] = useState<string | null>(null);

    useEffect(()=> {
      const updateUserIdFromUrl = () => {
        const params = new URLSearchParams(location.search);
        const userId = params.get("id");
        setIdUserView(userId);
      };
    
      updateUserIdFromUrl();
    
      window.addEventListener("popstate", updateUserIdFromUrl);
    
      return () => {
        window.removeEventListener("popstate", updateUserIdFromUrl);
      };
    }, []);
    
    useEffect(() => {
      if (idUserView) {
        getUserById(idUserView);
      }
    }, [idUserView]);

    useEffect(() => {
      if (myUser && myUser._id && myUser._id.toString() === currentUserId.toString()) {
        setIsOwner(true);
      } else {
        setIsOwner(false);
      }
    }, [myUser, currentUserId]);

    const getUserById = async (userId: string) => {
      try {
        const response = await axios.get(`http://localhost:3000/v1/user/${userId}`, 
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data._id !== currentUserId){
          const isFriend = response.data.friends.some((friend: Friends)=> friend.idUser === currentUserId);
          if (response.data.setting.profileVisibility === 'public'){
            setMyUser(response.data);
          }
          else if (response.data.setting.profileVisibility === 'friends' && isFriend){
            setMyUser(response.data);
          } 
          else {
            setError("Người dùng không muốn cho bạn xem thông tin của họ");
          }
        } else {
          setMyUser(response.data);
        }
      } catch (error) {
        console.error('Lỗi khi lấy bài viết:', error);
        setError('Lỗi khi tải bài viết. Vui lòng thử lại sau.');
      } finally {
        setIsLoading(false); 
      }
    }

    const changeAvt = (newAvt: string) => {
      if (myUser != null){
        const updateUser = {
          ...myUser,
          avt: [...myUser.avt, newAvt], // Thêm newAvt vào cuối mảng avt
        };
        setMyUser(updateUser);
      }
    }

    const changeBackground = (newbg: string) => {
      if (myUser != null){
        const updateUser = {
          ...myUser,
          backGround: [...myUser.backGround, newbg],
        };
        setMyUser(updateUser);
      }
    }
    
    const addNewFollower = (newFollower: UserDataDisplay) => {
      setMyUser((prevUser) => {
        if (prevUser) {
          return {
            ...prevUser, 
            follower: [...prevUser.follower, newFollower],
          };
        }
        return prevUser;
      });
      
    }

    const deleteFollower = (userId: string) => {
      setMyUser((prevUser) => {
        if (prevUser) {
          return {
            ...prevUser,
            follower: prevUser.follower.filter(follower => follower._id !== userId),
          };
        }
        return prevUser;
      });
    }
    
    return {
        myUser, addNewFollower, deleteFollower,
        changeAvt,
        changeBackground,
        isLoading,
        error, setError,
        isOwner,
        idUserView,
    }
}