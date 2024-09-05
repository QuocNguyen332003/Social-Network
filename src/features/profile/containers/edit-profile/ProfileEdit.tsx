import { Grid } from '@mui/material';
import  Header  from '../../../../shared/components/header/Header';
import SidebarLeft from '../../../../shared/components/sidebarLeft/SidebarLeft';
import SidebarRight from '../../../../shared/components/sidebarRight/SidebarRight';
import ProfileHeaderEdit from '../../components/ProfileHeaderEdit';
import EditProfileCard from '../../components/EditProfileCard';

const ProfileEdit = () => {
  return (
    <>
      <Header />
      <Grid container >
        <Grid item xs={2}>
          <SidebarLeft />
        </Grid>
        <Grid item xs={7}
          sx={{
            height: '100vh',
            overflowY: 'auto', 
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            paddingBottom: '200px'
          }}
        >
          <ProfileHeaderEdit/>
          <Grid container spacing={2}>
            <Grid item xs={6}>
                <EditProfileCard label={'Thay đổi tên hiển thị'} textInput={['Phan Minh Quan']}/>
            </Grid>
            <Grid item xs={6}>
                <EditProfileCard label={'Thay đổi Username'} textInput={['@MquanArt']}/>
            </Grid>
            <Grid item xs={6}>
                <EditProfileCard label={'Thay đổi Email'} textInput={['phanminhquanmh@gmail.com']}/>
            </Grid>
            <Grid item xs={6}>
             <EditProfileCard label={'Thay đổi mật khẩu'} textInput={['Mật khẩu cũ', 'Mật khẩu mới', 'Nhập lại mật khẩu']}/>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <SidebarRight />
        </Grid>
      </Grid>
    </>
  );
};

export default ProfileEdit;
