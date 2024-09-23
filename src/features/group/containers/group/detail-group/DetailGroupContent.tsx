import React, { useEffect, useState } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import GroupHeader from '../../../components/GroupHeader';
import GroupTabs from '../../../components/GroupTabs';
import { Group } from '../../../../../interface/interface';

const DetailGroupContent: React.FC = () => {
  const location = useLocation();

  // Tạo state cho group và setGroup
  const [group, setGroup] = useState<Group | undefined>(() => {
    const storedGroup = localStorage.getItem('groupData');
    return storedGroup ? JSON.parse(storedGroup) : undefined;
  });

  useEffect(() => {
    if (location.state?.group) {
      setGroup(location.state.group);
      localStorage.setItem('groupData', JSON.stringify(location.state.group));
    }
  }, [location.state?.group]);

  if (!group) {
    return <div>Không tìm thấy dữ liệu nhóm.</div>;
  }

  return (
    <>
      <GroupHeader group={group} />
      <GroupTabs groupId={group._id} />
      {/* Truyền group và setGroup thông qua Outlet */}
      <Outlet context={{ group, setGroup }} />
    </>
  );
};

export default DetailGroupContent;
