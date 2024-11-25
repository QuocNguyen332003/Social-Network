import { useEffect, useState } from "react";
import { UserSetting } from "../../../interface/interface";
import axios from "axios";

const useSetting = () => {
    const [userSetting, setUserSetting] = useState<UserSetting | null>(null);
    const userId = sessionStorage.getItem("userId");
    const token = sessionStorage.getItem("token");

    useEffect(()=> {
        getDataUser();
    }, []);

    const getDataUser = async () => {
        try{
            const response = await axios.get(`http://localhost:3000/v1/user/${userId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`, // Thêm token vào header
                },
              }
            );

            setUserSetting(response.data.setting);
          } catch(error){
            console.error('Lỗi khi lấy tin nhắn viết:', error);
          }
    }

    const saveSetting = async () => {
        try{
            const response = await axios.patch(`http://localhost:3000/v1/user/setting/${userId}`,
                {userSetting},
              {
                headers: {
                  Authorization: `Bearer ${token}`, // Thêm token vào header
                },
              }
            );

            setUserSetting(response.data.setting);
          } catch(error){
            console.error('Lỗi khi lấy tin nhắn viết:', error);
          }
    }

    return {
        userSetting,
        setUserSetting,
        saveSetting
    }
}
export default useSetting;