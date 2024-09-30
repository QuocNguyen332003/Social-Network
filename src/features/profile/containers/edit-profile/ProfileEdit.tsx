import { Grid } from '@mui/material';
import  Header  from '../../../../shared/components/header/Header';
import SidebarLeft from '../../../../shared/components/sidebarLeft/SidebarLeft';
import SidebarRight from '../../../../shared/components/sidebarRight/SidebarRight';
import ProfileHeaderEdit from '../../components/ProfileHeaderEdit';
import EditProfileCard from '../../components/EditProfileCard';
import { useProfile } from '../useProfile';
import EditCardDate from '../../components/EditCardDate';

const ProfileEdit = () => {
  const {myUser, changeAvt, changeBackground, 
    changeName, changeUserName, changeEmail, changePassword,
    changePhoneNumber, changeAboutMe, changeAddress, changeBirthday} = useProfile();

  if (myUser == null) return <></>
  return (
    <>
      <Header />
      <Grid container >
        <Grid item xs={2.5}>
          <SidebarLeft />
        </Grid>
        <Grid item xs={7}
          sx={{
            height: '90vh',
            overflowY: 'auto', 
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            padding: '0 20px',
            backgroundColor: '#e9e9e9',
          }}
        >
          <ProfileHeaderEdit myUser={myUser} changeAvt={changeAvt} changeBackground={changeBackground}/>
          <Grid container sx={{backgroundColor: '#fff', paddingBottom: '100px', marginBottom: '20px'}}>
          <Grid item xs={12}>
                <EditProfileCard label={'Giới thiệu về bản thân'} 
                    textInput={[myUser.aboutMe]} 
                    saveData={changeAboutMe}/>
            </Grid>
            <Grid item xs={6}>
                <EditProfileCard label={'Thay đổi tên hiển thị'} 
                    textInput={[myUser.displayName]} 
                    saveData={changeName}/>
            </Grid>
            <Grid item xs={6}>
                <EditProfileCard label={'Thay đổi Username'} 
                    textInput={[myUser.userName]}
                    saveData={changeUserName}/>
            </Grid>
            <Grid item xs={6}>
                <EditProfileCard label={'Thay đổi tên người dùng'} 
                    textInput={[myUser.firstName, myUser.lastName]} 
                    saveData={changeName}/>
            </Grid>
            <Grid item xs={6}>
                <EditProfileCard label={'Thay đổi Email'} 
                    textInput={[myUser.account.email]}
                    saveData={changeEmail}/>
            </Grid>
            <Grid item xs={6}>
                <EditProfileCard label={'Thay đổi Số điện thoại'} 
                    textInput={[myUser.details? myUser.details.phoneNumber? myUser.details.phoneNumber : "" : ""]}
                    saveData={changePhoneNumber}/>
            </Grid>
            <Grid item xs={6}>
                <EditProfileCard label={'Thay đổi địa chỉ'} 
                    textInput={[myUser.details? myUser.details.address? myUser.details.address : "" : ""]}
                    saveData={changeAddress}/>
            </Grid>
            <Grid item xs={6}>
                <EditCardDate label={'Thay đổi ngày sinh'} 
                    textInput={myUser.details? myUser.details.birthDate? myUser.details.birthDate : new Date() : new Date()}
                    saveData={changeBirthday}/>
            </Grid>
            <Grid item xs={6}>
             <EditProfileCard label={'Thay đổi mật khẩu'} 
                    textInput={['Mật khẩu cũ', 'Mật khẩu mới', 'Nhập lại mật khẩu']}
                    saveData={changePassword}/>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2.5}>
          <SidebarRight />
        </Grid>
      </Grid>
    </>
  );
};

export default ProfileEdit;
