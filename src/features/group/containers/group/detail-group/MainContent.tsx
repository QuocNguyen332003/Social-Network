import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import { useLocation, Outlet } from 'react-router-dom';
import Header from '../../../../../shared/components/header/Header';
import SidebarLeft from '../../../../../shared/components/sidebarLeft/SidebarLeft';
import SidebarRight from '../../../../../shared/components/sidebarRight/SidebarRight';
import GroupHeader from '../../../components/GroupHeader';
import GroupTabs from '../../../components/GroupTabs';

interface GroupProps {
  _id: string;
  groupName: string;
  type: 'public' | 'private';
  idAdmin: string;
  introduction: string;
  avt: string;
  backGround: string;
  members: {
    count: number;
    listUsers: { idUser: string; joinDate: Date }[];
  };
  articles: {
    count: number;
    listArticle: { idArticle: string; state: string }[];
  };
  rule: string[];
  Administrators: { idUser: string; joinDate: Date }[];
  createdAt: Date;
  updatedAt: Date;
  _destroy?: Date;
}

const MainContent: React.FC = () => {
  const location = useLocation();
  
  const group = location.state?.group as GroupProps | undefined;

  useEffect(() => {
    if (group) {
      localStorage.setItem('groupData', JSON.stringify(group));
    }
  }, [group]);

  const storedGroup = localStorage.getItem('groupData');
  const groupData = group || (storedGroup && JSON.parse(storedGroup));

  if (!groupData) {
    return <div>Không tìm thấy dữ liệu nhóm.</div>;
  }

  return (
    <>
      <Header />
      <Grid container>
        <Grid item xs={2.5}>
          <SidebarLeft />
        </Grid>
        <Grid item xs={7}>
          <GroupHeader group={groupData} />
          <GroupTabs groupId={groupData._id} />
          <Outlet context={{ group: groupData }} />
        </Grid>
        <Grid item xs={2.5}>
          <SidebarRight />
        </Grid>
      </Grid>
    </>
  );
};

export default MainContent;
