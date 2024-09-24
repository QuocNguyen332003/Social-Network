import React, { useEffect, useState } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import GroupHeader from '../../../components/GroupHeader';
import GroupTabs from '../../../components/GroupTabs';
import { Group } from '../../../../../interface/interface';

const DetailGroupContent: React.FC = () => {
  const location = useLocation();

  // State for group and setGroup
  const [group, setGroup] = useState<Group | undefined>(() => {
    const storedGroup = localStorage.getItem('groupData');
    return storedGroup ? JSON.parse(storedGroup) : undefined;
  });

  // Update the group state when new group data is passed in the route state
  useEffect(() => {
    if (location.state?.group) {
      setGroup(location.state.group);
      localStorage.setItem('groupData', JSON.stringify(location.state.group));
    }
  }, [location.state?.group]);

  // Callback for updating the group information
  const handleUpdateGroup = (updatedGroup: Group) => {
    setGroup(updatedGroup);
    localStorage.setItem('groupData', JSON.stringify(updatedGroup)); // Update local storage with new group data
  };

  if (!group) {
    return <div>Không tìm thấy dữ liệu nhóm.</div>;
  }

  return (
    <>
      {/* Pass handleUpdateGroup to GroupHeader */}
      <GroupHeader group={group} onUpdateGroup={handleUpdateGroup} />
      <GroupTabs groupId={group._id} />
      {/* Pass group and setGroup via Outlet context */}
      <Outlet context={{ group, setGroup }} />
    </>
  );
};

export default DetailGroupContent;
