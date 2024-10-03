import React, { useEffect, useState } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import GroupHeader from '../../../components/GroupHeader';
import GroupTabs from '../../../components/GroupTabs';
import { Group } from '../../../../../interface/interface';

const DetailGroupContent: React.FC = () => {
  const location = useLocation();

  // State lưu trữ dữ liệu nhóm
  const [group, setGroup] = useState<Group | undefined>(() => {
    // Kiểm tra dữ liệu nhóm trong localStorage nếu có
    const storedGroup = localStorage.getItem('groupData');
    return storedGroup ? JSON.parse(storedGroup) : undefined;
  });

  // Cập nhật state khi nhận được dữ liệu nhóm mới từ route state
  useEffect(() => {
    if (location.state?.group) {
      setGroup(location.state.group);
      // Lưu trữ dữ liệu nhóm vào localStorage để sử dụng sau này
      localStorage.setItem('groupData', JSON.stringify(location.state.group));
    }
  }, [location.state?.group]);

  // Hàm xử lý cập nhật thông tin nhóm khi có thay đổi từ các component con
  const handleUpdateGroup = (updatedGroup: Group) => {
    setGroup(updatedGroup);
    // Cập nhật lại localStorage với dữ liệu nhóm mới
    localStorage.setItem('groupData', JSON.stringify(updatedGroup));
  };

  if (!group) {
    return <div>Không tìm thấy dữ liệu nhóm.</div>;
  }

  return (
    <>
      {/* Component Header của nhóm, truyền vào nhóm và hàm cập nhật */}
      <GroupHeader group={group} onUpdateGroup={handleUpdateGroup} />
      
      {/* Tabs điều hướng các nội dung trong nhóm */}
      <GroupTabs groupId={group._id} />
      
      {/* Outlet để hiển thị các component con */}
      <Outlet context={{ group, setGroup }} />
    </>
  );
};

export default DetailGroupContent;
