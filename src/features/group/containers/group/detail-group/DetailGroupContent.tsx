import React, { useEffect, useState } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import GroupHeader from '../../../components/GroupHeader';
import GroupTabs from '../../../components/GroupTabs';
import { Group } from '../../../../../interface/interface';

const DetailGroupContent: React.FC = () => {
  const location = useLocation();

  // State lưu trữ dữ liệu nhóm
  const [group, setGroup] = useState<Group | undefined>(() => {
    const storedGroup = localStorage.getItem('groupData');
    return storedGroup ? JSON.parse(storedGroup) : undefined;
  });

  // Cập nhật state khi nhận được dữ liệu nhóm mới từ route state
  useEffect(() => {
    if (location.state?.group) {
      setGroup(location.state.group);
      localStorage.setItem('groupData', JSON.stringify(location.state.group));
    }
  }, [location.state?.group]);

  // Hàm xử lý cập nhật thông tin nhóm khi có thay đổi từ các component con
  const handleUpdateGroup = (updatedGroup: Group) => {
    setGroup(updatedGroup);
    localStorage.setItem('groupData', JSON.stringify(updatedGroup));
  };

  // Hàm xử lý cập nhật quy định và dữ liệu nhóm
  const handleUpdateRules = (updatedRules: string[]) => {
    setGroup(prevGroup => {
      if (prevGroup) {
        const updatedGroup = { ...prevGroup, rule: updatedRules }; // Cập nhật quy định
        localStorage.setItem('groupData', JSON.stringify(updatedGroup));
        return updatedGroup; // Trả về nhóm đã cập nhật
      }
      return prevGroup;
    });
  };

  if (!group) {
    return <div>Không tìm thấy dữ liệu nhóm.</div>;
  }

  return (
    <>
      <GroupHeader group={group} onUpdateGroup={handleUpdateGroup} />
      <GroupTabs groupId={group._id} />
      <Outlet context={{ group, setGroup, handleUpdateRules }} />
    </>
  );
};

export default DetailGroupContent;
