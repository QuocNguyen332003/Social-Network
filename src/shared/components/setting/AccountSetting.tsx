import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import EditProfileCard from "./EditProfileCard";
import { useProfileSetting } from "./useProflieSetting";
import EditCardDate from "./EditCardDate";
import EditSelectedCard from "./EditSelectedCard";

const AccountSetting = () => {
    const {myUser, changeAboutMe, changeAddress, changeBirthday, changeDisplayName,
        changeGender, changeName, changePassword, changePhoneNumber, changeUserName
    } = useProfileSetting();

    if (myUser == null) return <CircularProgress/>
    return (
        <Box>
            <Box>
                <Typography variant="h6" gutterBottom>
                    Thông tin cá nhân
                </Typography>
                <Grid container sx={{backgroundColor: '#fff', marginBottom: '20px'}}>
                    <Grid item xs={12}>
                        <EditProfileCard label={'Giới thiệu về bản thân'} 
                            textInput={[myUser.aboutMe]} 
                            saveData={changeAboutMe}/>
                    </Grid>
                    <Grid item xs={12}>
                        <EditProfileCard label={'Thay đổi tên hiển thị'} 
                            textInput={[myUser.displayName]} 
                            saveData={changeDisplayName}/>
                    </Grid>

                    <Grid item xs={12}>
                        <EditProfileCard label={'Thay đổi tên người dùng'} 
                            textInput={[myUser.firstName, myUser.lastName]} 
                            saveData={changeName}/>
                    </Grid>
                    <Grid item xs={12}>
                        <EditProfileCard label={'Thay đổi Số điện thoại'} 
                            textInput={[myUser.details? myUser.details.phoneNumber? myUser.details.phoneNumber : "" : ""]}
                            saveData={changePhoneNumber}/>
                    </Grid>
                    <Grid item xs={12}>
                        <EditProfileCard label={'Thay đổi địa chỉ'} 
                            textInput={[myUser.details? myUser.details.address? myUser.details.address : "" : ""]}
                            saveData={changeAddress}/>
                    </Grid>
                    <Grid item xs={12}>
                        <EditCardDate label={'Thay đổi ngày sinh'} 
                            textInput={myUser.details? myUser.details.birthDate? myUser.details.birthDate : new Date() : new Date()}
                            saveData={changeBirthday}/>
                    </Grid>
                    <Grid item xs={12}>
                        <EditSelectedCard label={'Thay đổi giới tính'} 
                            defaultValue={myUser.details.gender} saveData={changeGender}/>
                    </Grid>
                </Grid>
            </Box>
            <Box>
                <Typography variant="h6" gutterBottom>
                    Tài khoản của bạn
                </Typography>
                <Grid container>
                    <Grid item xs={12}>
                        <EditProfileCard label={'Thay đổi Username'} 
                        textInput={[myUser.userName]}
                        saveData={changeUserName}/>
                    </Grid>
                    <Grid item xs={12}>
                        <EditProfileCard label={'Thay đổi mật khẩu'} 
                        textInput={['Mật khẩu cũ', 'Mật khẩu mới', 'Nhập lại mật khẩu']}
                        saveData={changePassword}/>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default AccountSetting;