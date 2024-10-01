import { Box, Typography, Button, Avatar, IconButton } from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ShareIcon from '@mui/icons-material/Share';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { useRef, useState } from 'react';
import { User } from '../../../interface/interface';

type DataChangeUser = {
  myUser: User,
  changeAvt: (newAvt: string) => void;
  changeBackground: (newbg: string) => void;
}

const ProfileHeaderEdit = ({myUser, changeAvt, changeBackground}: DataChangeUser) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isAvt, setIsAvt] = useState<boolean>(true);
  const openFile = () => {
    // Kích hoạt input file ẩn khi gọi hàm
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      if (isAvt){
        changeAvt(fileUrl);
      } else {
        changeBackground(fileUrl);
      }
    }
  };
  const handlePressChangeBackground = () => {
    openFile();
    setIsAvt(false);
  }
  const handlePressChangeAvt = () => {
    openFile();
    setIsAvt(true);
  }
  return (
    <Box
      sx={{
        position: 'relative',
        height: '420px',
        overflow: 'hidden',
        borderBottom: '1px solid #e9e9e9',
        paddingBottom: '20px',
        backgroundColor: '#fff',
      }}
    >
      <IconButton
      sx={{
        height: '300px', width: '100%',
        overflow: 'hidden', borderRadius: 0, position: 'relative',
        display: 'flex', flexDirection: 'column',
        padding: 0,
        backgroundImage: `url(${myUser.backGround[myUser.backGround.length - 1]})`,
        backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat',
      }}
      onClick={handlePressChangeBackground}
      >
        <AddAPhotoIcon/>
        <Typography variant="body1" color="black">
            Thêm ảnh bìa
          </Typography>
      </IconButton>
      {/* Group Info and Avatar */}
      <Box sx={{ position: 'absolute', bottom: '20px', left: '16px', display: 'flex', alignItems: 'center' }}>
        <IconButton sx={{padding: 0}} onClick={handlePressChangeAvt}>
          <Avatar src={myUser.avt[myUser.avt.length - 1]} sx={{ width: '150px', height: '150px', border: '4px solid white' }} />
        </IconButton>
        <Box sx={{ marginLeft: '16px', marginTop: '10px'}}>
          <Typography variant="h5" color="black" fontWeight="bold">
            {myUser.firstName + " " + myUser.lastName}
          </Typography>
          <Typography variant="body1" color="black">
            {myUser.userName}
          </Typography>
        </Box>
      </Box>

      {/* Invite and Share Buttons below the Edit Button with more spacing */}
      <Box sx={{ position: 'absolute', bottom: '40px', right: '16px', display: 'flex', alignItems: 'center' }}>
        <Button variant="contained" startIcon={<BorderColorIcon />}
          sx={{ marginRight: '8px', width: '150px',
            backgroundColor: '#e9e9e9',
            color: '#1976d2',  textTransform: 'none',
           }} 
          >
          Lưu
        </Button>
        <Button variant="contained" startIcon={<ShareIcon/>}
        sx={{ width: '150px',
          backgroundColor: '#e9e9e9',
          color: '#1976d2',  textTransform: 'none',
         }} >
          Chia sẻ
        </Button>
      </Box>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }} // Ẩn input
        accept="image/*" // Giới hạn chỉ nhận file ảnh
        onChange={handleFileChange} // Xử lý khi file được chọn
      />
    </Box>
  );
};

export default ProfileHeaderEdit;
