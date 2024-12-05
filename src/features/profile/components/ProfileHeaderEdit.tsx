import { Box, Typography, Button, Avatar, IconButton } from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ShareIcon from '@mui/icons-material/Share';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { useRef, useState } from 'react';
import { User } from '../../../interface/interface';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

type DataChangeUser = {
  myUser: User;
  changeAvt: (newAvt: string) => void;
  changeBackground: (newbg: string) => void;
}

const ProfileHeaderEdit = ({myUser, changeAvt, changeBackground}: DataChangeUser) => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token'); // Lấy token từ sessionStorage
  const currentUserId = sessionStorage.getItem('userId') || '';
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isAvt, setIsAvt] = useState<boolean>(true);
  const [images, setImages] = useState<(File | null)[]>([null, null]); 

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
        setImages([file, images[1]]);
        changeAvt(fileUrl);
      } else {
        setImages([images[0], file]);
        changeBackground(fileUrl);
      }
    }
    (event.target as any).value = null;
  };
  const handlePressChangeBackground = () => {
    setIsAvt(false);
    openFile();
  }
  const handlePressChangeAvt = () => {
    setIsAvt(true);
    openFile();
  }

  const handleSave = async () => {
    const formData = new FormData();
    // Thêm hình ảnh cho avatar
    if (images[0]) { // Kiểm tra xem hình ảnh avatar có tồn tại không
      formData.append('avatar', images[0]); // Thêm hình ảnh avatar
    }

    // Thêm hình ảnh cho background
    if (images[1]) { // Kiểm tra xem hình ảnh background có tồn tại không
        formData.append('background', images[1]); // Thêm hình ảnh background
    }

    try {
      const response = await axios.patch(`http://localhost:3000/v1/user/${currentUserId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
      });
      console.log('Thay đổi thành công:', response.data);
      
    } catch (error) {
      console.error('Lỗi khi gửi bài viết:', error);
    }
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
        backgroundImage: `url(${myUser.backGround[myUser.backGround.length - 1]?.link})`,
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
          <Avatar src={(myUser.avt[myUser.avt.length - 1]?.link as unknown) as string} sx={{ width: '150px', height: '150px', border: '4px solid white' }} />
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
          onClick={handleSave}
          >
          Lưu
        </Button>
        <Button variant="contained" startIcon={<ShareIcon/>}
        sx={{ width: '150px',
          backgroundColor: '#e9e9e9',
          color: '#1976d2',  textTransform: 'none',
         }} 
         onClick={() => navigate('/edit-profile/hobbies')}>
          Chọn sở thích
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
