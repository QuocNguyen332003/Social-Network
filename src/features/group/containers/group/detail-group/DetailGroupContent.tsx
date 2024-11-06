import React, { useEffect, useState } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import axios from 'axios';
import GroupHeader from '../../../components/GroupHeader';
import GroupTabs from '../../../components/GroupTabs';
import { Group } from '../../../../../interface/interface';

const DetailGroupContent: React.FC = () => {
  const location = useLocation();
  const token = sessionStorage.getItem('token');
  const currentUserId = sessionStorage.getItem('userId') || ''; // Lấy userId từ sessionStorage

  // Kiểm tra `location.state` hoặc lấy dữ liệu từ `sessionStorage`
  const initialGroup = location.state?.group || JSON.parse(sessionStorage.getItem('groupData') || 'null');
  const initialRole = location.state?.role || sessionStorage.getItem('groupRole') || 'none';

  const [group, setGroup] = useState<Group | undefined>(initialGroup);
  const [role, setRole] = useState<'owner' | 'admin' | 'member' | 'none'>(initialRole as 'owner' | 'admin' | 'member' | 'none');

  // Hàm gọi API lấy lại vai trò người dùng nếu cần
  const fetchUserRole = async (groupId: string, userId: string) => {
    try {
      const response = await axios.get(`http://localhost:3000/v1/group/${groupId}/role`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { userId },
      });
      setRole(response.data.role); // Cập nhật vai trò người dùng
      sessionStorage.setItem('groupRole', response.data.role); // Lưu vào sessionStorage
    } catch (error) {
      console.error('Lỗi khi lấy vai trò của người dùng trong nhóm:', error);
    }
  };

  // Cập nhật state khi nhận được dữ liệu nhóm mới từ route state
  useEffect(() => {
    if (location.state?.group && location.state.group._id !== group?._id) {
      setGroup(location.state.group);
      setRole(location.state.role || 'none');
      // Lưu vào sessionStorage
      sessionStorage.setItem('groupData', JSON.stringify(location.state.group));
      sessionStorage.setItem('groupRole', location.state.role || 'none');
    }
  }, [location.state?.group]);

  // Gọi API lấy lại vai trò nếu role không xác định hoặc mất
  useEffect(() => {
    if (group && role === 'none' && currentUserId) {
      fetchUserRole(group._id, currentUserId);
    }
  }, [group, role, currentUserId]);

  // Cập nhật `sessionStorage` khi `group` thay đổi để đồng bộ dữ liệu
  useEffect(() => {
    if (group) {
      sessionStorage.setItem('groupData', JSON.stringify(group));
    }
  }, [group]);

  // Hàm xử lý cập nhật thông tin nhóm khi có thay đổi từ các component con
  const handleUpdateGroup = (updatedGroup: Group) => {
    setGroup(updatedGroup);
    sessionStorage.setItem('groupData', JSON.stringify(updatedGroup));
  };

  // Hàm xử lý cập nhật quy định và dữ liệu nhóm
  const handleUpdateRules = (updatedRules: string[]) => {
    setGroup((prevGroup) => {
      if (prevGroup) {
        const updatedGroup = { ...prevGroup, rule: updatedRules };
        sessionStorage.setItem('groupData', JSON.stringify(updatedGroup));
        return updatedGroup;
      }
      return prevGroup;
    });
  };

  if (!group) {
    return <div>Không tìm thấy dữ liệu nhóm.</div>;
  }

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
