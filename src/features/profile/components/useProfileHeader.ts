import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataDisplay } from "../../../interface/interface";

interface RelationShipProps{
    isFollow: boolean;
    isFriend: string;
    _id: string | null;
}

const useProfileHeader = (friendId: string, addNewFollower: (newFollower: UserDataDisplay) => void,
deleteFollower: (userId: string) => void) => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const token = sessionStorage.getItem('token');
    const currentUserId = sessionStorage.getItem('userId') || '';
    const [relationship, setRelationShip] = useState<RelationShipProps>({isFollow: false, isFriend: 'no', _id: null})
    
    const navigate = useNavigate()

    useEffect(()=> {
        getRelationShip(friendId);
    },[friendId]);
    
    const getRelationShip = async (friendId: string) => {
        
        try {
            const response = await axios.get(`http://localhost:3000/v1/user/${currentUserId}/relationship?frienId=${friendId}`, 
                {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            setRelationShip(response.data);
            console.log(response.data);
          } catch (error) {
            console.error('Lỗi khi lấy bài viết:', error);
            setError('Lỗi khi tải bài viết. Vui lòng thử lại sau.');
          } finally {
            setIsLoading(false); 
          }
    }

    const follow = () => {
        if (relationship.isFollow){
            handleUnFollow();
        } else{
            handleFollow();
        }
    }
    const handleFollow = async () => {
        try {
            const response = await axios.put(`http://localhost:3000/v1/user/${currentUserId}/follow?follow=${friendId}`, 
              {},
                {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (response.data){
                setRelationShip({
                    isFollow: true,
                    isFriend: relationship.isFriend,
                    _id: null
                })
                const currentUserName = sessionStorage.getItem('displayName') || '';
                const currentUserAvt = JSON.parse(sessionStorage.getItem('avt') || '[]');
                addNewFollower({
                  _id: currentUserId,
                  avt: currentUserAvt,
                  name: currentUserName
                })
                  
            }
          } catch (error) {
            console.error('Lỗi khi lấy bài viết:', error);
            setError('Lỗi khi tải bài viết. Vui lòng thử lại sau.');
          } finally {
            setIsLoading(false); 
          }
    }
    const handleUnFollow = async () => {
        try {
            const response = await axios.put(`http://localhost:3000/v1/user/${currentUserId}/unfollow?unfollow=${friendId}`, 
              {},
                {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (response.data){
                setRelationShip({
                    isFollow: false,
                    isFriend: relationship.isFriend,
                    _id: null
                })
                deleteFollower(currentUserId);
            }
          } catch (error) {
            console.error('Lỗi khi lấy bài viết:', error);
            setError('Lỗi khi tải bài viết. Vui lòng thử lại sau.');
          } finally {
            setIsLoading(false); 
          }
    }
    const handleFriend = () => {
        if (relationship.isFriend==='no'){
            handleAddFriend();
        } 
        else if (relationship.isFriend==='yes'){
            handleDeleteFriend();
        } 
        else {
            handleRevokeInvite();
        }
    }
    const handleAddFriend = async () => {
        try {
            const response = await axios.post(`http://localhost:3000/v1/friends/${currentUserId}/add-friend?receiverId=${friendId}`, 
              {},
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (response.data){
                navigate(0);
            }
          } catch (error) {
            console.error('Lỗi khi lấy bài viết:', error);
            setError('Lỗi khi tải bài viết. Vui lòng thử lại sau.');
          } finally {
            setIsLoading(false); 
          }
    }
    const handleDeleteFriend = async () => {
        try {
            const response = await axios.put(`http://localhost:3000/v1/friends/${currentUserId}/unfriend/?friendId=${friendId}`, 
                {},
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              if (response.data){
                setRelationShip({
                    isFollow: relationship.isFollow,
                    isFriend: 'no',
                    _id: null
                })
            }
          } catch (error) {
            console.error('Lỗi khi lấy bài viết:', error);
            setError('Lỗi khi tải bài viết. Vui lòng thử lại sau.');
          } finally {
            setIsLoading(false); 
          }
    }
    const handleRevokeInvite = async () => {
        try {
            if (relationship._id !== null){
              const response = await axios.put(`http://localhost:3000/v1/friends/${relationship._id}/recall`,
                {}, 
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              if (response.data){
                setRelationShip({
                    isFollow: relationship.isFollow,
                    isFriend: 'no',
                    _id: null
                })
              }
            }
          } catch (error) {
            console.error('Lỗi khi lấy bài viết:', error);
            setError('Lỗi khi tải bài viết. Vui lòng thử lại sau.');
          } finally {
            setIsLoading(false); 
          }
    }
    return {
        isLoading, error,
        handleFollow, handleUnFollow,
        relationship, 
        follow,
        handleFriend
    }
}

export default useProfileHeader;