import {useEffect, useState } from "react"
import { User, UserDataDisplay } from "../../../interface/interface";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { updateAboutMe, updateAccount, updateDetails, updateDisplayName, updateName, updateUserName } from "../services/UpdateProfile";
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

    const changeAboutMe = (dataInput: string[]) => {
      if (myUser != null){
        updateAboutMe(currentUserId, dataInput[0]);
        const updateUser = {
          ...myUser,
          aboutMe: dataInput[0]
        };
        setMyUser(updateUser);
      }
    }

    const changeDisplayName = (dataInput: string[]) => {
      if (myUser != null){
        updateDisplayName(currentUserId, dataInput[0]);
        const updateUser = {
          ...myUser,
          displayName: dataInput[0]
        };
        setMyUser(updateUser);
      }
    }

    const changeUserName = (dataInput: string[]) => {
      if (myUser != null){
        updateUserName(currentUserId, dataInput[0]);
        const updateUser = {
          ...myUser,
          userName: dataInput[0],
        };
        setMyUser(updateUser);
      }
    }

    const changeName = (dataInput: string[]) => {
      if (myUser != null){
        updateName(currentUserId, dataInput[0], dataInput[1]);
        const updateUser = {
          ...myUser,
          firstName: dataInput[0], 
          lastName: dataInput[1],
        };
        setMyUser(updateUser);
      }
    }

    const changeEmail = (dataInput: string[]) => {
      if (myUser != null){
        updateAccount(currentUserId, dataInput[0], myUser.account.password);
        const updateUser = {
          ...myUser,
          account: {
            warningLevel: myUser.account.warningLevel,
            email: dataInput[0],
            password: myUser.account.password
          },
        };
        setMyUser(updateUser);
      }
    }

    const changePassword = (dataInput: string[]) => {
      if (myUser != null && dataInput[0] == myUser.account.password && dataInput[0] == dataInput[1]){
        updateAccount(currentUserId, myUser.account.email, dataInput[2]);
        const updateUser = {
          ...myUser,
          account: {
            warningLevel: myUser.account.warningLevel,
            email: myUser.account.email,
            password: dataInput[2]
          },
        };
        setMyUser(updateUser);
      }
    }

    const changePhoneNumber = (dataInput: string[]) => {
      if (myUser != null){
        updateDetails(currentUserId, {
          phoneNumber: dataInput[0],
          address: myUser.details.address,
          gender: myUser.details.gender,
          birthDate: myUser.details.birthDate,
        })
        const updateUser = {
          ...myUser,
          details: {
            ...myUser.details,
            phoneNumber: dataInput[0],
          }
        };
        setMyUser(updateUser);
      }
    }
    const changeAddress= (dataInput: string[]) => {
      if (myUser != null){
        updateDetails(currentUserId, {
          phoneNumber: myUser.details.phoneNumber,
          address: dataInput[0],
          gender: myUser.details.gender,
          birthDate: myUser.details.birthDate,
        })
        const updateUser = {
          ...myUser,
          details: {
            ...myUser.details,
            address: dataInput[0],
          }
        };
        setMyUser(updateUser);
      }
    }

    const changeBirthday= (dataInput: Date) => {
      if (myUser != null){
        updateDetails(currentUserId, {
          phoneNumber: myUser.details.phoneNumber,
          address: myUser.details.address,
          gender: myUser.details.gender,
          birthDate: dataInput,
        })
        const updateUser = {
          ...myUser,
          details: {
            ...myUser.details,
            birthDate: dataInput,
          }
        };
        setMyUser(updateUser);
      }
    }
    const changeGender= (dataInput: boolean) => {
      if (myUser != null){
        updateDetails(currentUserId, {
          phoneNumber: myUser.details.phoneNumber,
          address: myUser.details.address,
          gender: dataInput,
          birthDate: myUser.details.birthDate,
        })
        const updateUser = {
          ...myUser,
          details: {
            ...myUser.details,
            gender: dataInput,
          }
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
        changeName,
        changeUserName,
        changeEmail,
        changePassword,
        changeAboutMe,
        changePhoneNumber,
        changeAddress,
        changeBirthday,
        changeGender,
        changeDisplayName,
        isLoading,
        error, setError,
        isOwner,
        idUserView,
    }
}