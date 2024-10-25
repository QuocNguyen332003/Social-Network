import {useEffect, useState } from "react"
import { User } from "../../../interface/interface";
import axios from "axios";
import { useLocation } from "react-router-dom";

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
        setMyUser(response.data);
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
    const changeName = (dataInput: string[]) => {
      if (myUser != null){
        const updateUser = {
          ...myUser,
          firstName: dataInput[0], 
          lastName: dataInput[1],
        };
        setMyUser(updateUser);
      }
    }

    const changeUserName = (dataInput: string[]) => {
      if (myUser != null){
        const updateUser = {
          ...myUser,
          userName: dataInput[0],
        };
        setMyUser(updateUser);
      }
    }

    const changeEmail = (dataInput: string[]) => {
      if (myUser != null){
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

    const changeAboutMe = (dataInput: string[]) => {
      if (myUser != null){
        const updateUser = {
          ...myUser,
          aboutMe: dataInput[0]
        };
        setMyUser(updateUser);
      }
    }
    const changePhoneNumber = (dataInput: string[]) => {
      if (myUser != null){
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
    
    return {
        myUser, setMyUser,
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
        isLoading,
        error,
        isOwner,
        idUserView,
    }
}