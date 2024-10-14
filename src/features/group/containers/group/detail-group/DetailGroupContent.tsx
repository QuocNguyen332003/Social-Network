/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import axios from 'axios';
import GroupHeader from '../../../components/GroupHeader';
import GroupTabs from '../../../components/GroupTabs';
import { Group } from '../../../../../interface/interface';

const DetailGroupContent: React.FC = () => {
  const location = useLocation();
  const token = localStorage.getItem('token');
  // State lưu trữ dữ liệu nhóm và vai trò người dùng
  const [group, setGroup] = useState<Group | undefined>(location.state?.group);
  const [role, setRole] = useState<'owner' | 'admin' | 'member' | 'none'>(location.state?.role || 'none');
  const currentUserId = localStorage.getItem('userId') || ''; // Lấy userId từ localStorage

  // Hàm gọi API lấy lại vai trò người dùng
  const fetchUserRole = async (groupId: string, userId: string) => {
    try {
      const response = await axios.get(`http://localhost:3000/v1/group/${groupId}/role`, {
        headers: {
          Authorization: `Bearer ${token}` // Thêm token vào headers
        },
        params: { userId },
      },);
      setRole(response.data.role); // Cập nhật lại vai trò người dùng
    } catch (error) {
      console.error('Lỗi khi lấy vai trò của người dùng trong nhóm:', error);
    }
  };

  // Cập nhật state khi nhận được dữ liệu nhóm mới từ route state
  useEffect(() => {
    if (location.state?.group && location.state.group._id !== group?._id) {
      setGroup(location.state.group);
      setRole(location.state.role || 'none'); // Cập nhật role từ state nếu có
      console.log('Cập nhật dữ liệu group mới từ state:', location.state.group);
    }
  }, [location.state?.group]);

  // Gọi API lấy lại vai trò nếu role không xác định hoặc mất
  useEffect(() => {
    if (group && role === 'none' && currentUserId) {
      fetchUserRole(group._id, currentUserId);
    }
  }, [group, role, currentUserId]);

  // Cập nhật `localStorage` khi `group` thay đổi để đồng bộ dữ liệu
  useEffect(() => {
    if (group) {
      localStorage.setItem('groupData', JSON.stringify(group));
    }
  }, [group]);

  // Hàm xử lý cập nhật thông tin nhóm khi có thay đổi từ các component con
  const handleUpdateGroup = (updatedGroup: Group) => {
    setGroup(updatedGroup);
    localStorage.setItem('groupData', JSON.stringify(updatedGroup));
  };

  // Hàm xử lý cập nhật quy định và dữ liệu nhóm
  const handleUpdateRules = (updatedRules: string[]) => {
    setGroup((prevGroup) => {
      if (prevGroup) {
        const updatedGroup = { ...prevGroup, rule: updatedRules };
        localStorage.setItem('groupData', JSON.stringify(updatedGroup));
        return updatedGroup;
      }
      return prevGroup;
    });
  };

  if (!group) {
    return <div>Không tìm thấy dữ liệu nhóm.</div>;
  }
  console.log('Group Data in DetailGroupContent:', group);

  return (
    <>
      {/* Truyền role và dữ liệu nhóm xuống các component con */}
      <GroupHeader group={group} role={role} onUpdateGroup={handleUpdateGroup} />
      <GroupTabs groupId={group._id} role={role} />
      {/* Outlet cho phép các component con sử dụng context với dữ liệu group và role */}
      <Outlet context={{ group, role, setGroup, handleUpdateRules }} />
    </>
  );
};

export default DetailGroupContent;
