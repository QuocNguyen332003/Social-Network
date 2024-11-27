import React, { useEffect, useState } from 'react';
import { Box, Paper, IconButton, Button, InputBase, Avatar, MenuItem, Select, FormControl, Typography, Input, Dialog, DialogActions, DialogContent, DialogTitle, SelectChangeEvent } from '@mui/material';
import { InsertPhoto, LocalOffer, EmojiEmotions, Close } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface PostFormProps {
  onSubmit: (newPost: string, images: File[], visibility: string, hashTags: string[]) => void;
}

const PostForm: React.FC<PostFormProps> = ({ onSubmit }) => {
  const [newPost, setNewPost] = useState(''); // Nội dung bài viết
  const [selectedImages, setSelectedImages] = useState<File[]>([]); // Hình ảnh được chọn
  const [visibility, setVisibility] = useState('public'); // Phạm vi hiển thị bài viết
  const [hashTags, setHashTags] = useState<string[]>([]); // Hashtag đã chọn
  const [emojiDialogOpen, setEmojiDialogOpen] = useState(false); // Hộp thoại emoji
  const [displayName, setDisplayName] = useState(''); // Tên hiển thị người dùng
  const [avatar, setAvatar] = useState(''); // Avatar người dùng
  const userId = sessionStorage.getItem('userId');
  const token = sessionStorage.getItem('token');
  const navigate = useNavigate(); // For navigation

  // Cập nhật tên hiển thị và avatar người dùng từ API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/v1/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        });
        const userData = response.data;
  
        setDisplayName(userData.displayName || `${userData.firstName} ${userData.lastName}`);
        
        // Kiểm tra và lấy avatar cuối cùng trong mảng
        const lastAvatar = userData.avt && userData.avt.length > 0
          ? userData.avt[userData.avt.length - 1].link
          : "default-avatar-url"; // Đặt URL mặc định nếu không có avatar
        setAvatar(lastAvatar);
        
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    if (userId) {
      fetchUserData();
    }
  }, [userId, token]);
  

  // Hàm điều hướng tới trang cá nhân
  const handleAvatarClick = () => {
    navigate(`/profile?id=${userId}`);
  };

  // Hàm thêm hashtag mới
  const handleAddHashTag = () => {
    const newHashTag = prompt('Nhập hashtag bạn muốn thêm:');
    if (newHashTag) {
      const formattedHashTag = newHashTag.startsWith('#') ? newHashTag : `#${newHashTag}`;
      if (!hashTags.includes(formattedHashTag)) {
        setHashTags([...hashTags, formattedHashTag]);
      }
    }
  };

  // Hàm xóa hashtag
  const handleRemoveHashTag = (hashTag: string) => {
    setHashTags(hashTags.filter((tag) => tag !== hashTag));
  };

  // Hàm thêm emoji vào nội dung bài viết
  const handleAddEmoji = (emoji: string) => {
    setNewPost(newPost + emoji);
    setEmojiDialogOpen(false);
  };

  // Sử dụng `SelectChangeEvent` cho hàm `handleVisibilityChange`
  const handleVisibilityChange = (event: SelectChangeEvent<string>) => {
    setVisibility(event.target.value as string);
  };

  // Hàm xử lý khi người dùng nhấn nút Đăng bài
  const handlePostSubmit = () => {
    if (newPost.trim() || selectedImages.length > 0) {
      onSubmit(newPost, selectedImages, visibility, hashTags);
      setNewPost('');
      setSelectedImages([]);
      setHashTags([]);
    }
  };

  // Hàm xử lý khi người dùng chọn ảnh để đăng
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedImages([...selectedImages, ...Array.from(e.target.files)]);
    }
  };

  // Hàm xóa ảnh đã chọn
  const handleRemoveImage = (index: number) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(updatedImages);
  };

  return (
    <Paper sx={{ padding: 2, marginBottom: 2, borderRadius: '20px' }}>
      <Box display="flex" alignItems="center" mb={2}>
        {/* Avatar wrapped in Box to handle click */}
        <Box onClick={handleAvatarClick} sx={{ cursor: 'pointer' }}>
          <Avatar
            alt={displayName || 'Anonymous'}
            src={avatar || '/static/images/avatar/default.jpg'}
            sx={{ width: 48, height: 48, marginRight: 2,  objectFit: 'contain', borderRadius: '50%' }}
          />
        </Box>
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">{displayName}</Typography>
          <FormControl sx={{ minWidth: 120 }}>
            <Select
              value={visibility}
              onChange={handleVisibilityChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Phạm vi bài viết' }}
              sx={{ fontSize: '14px' }}
            >
              <MenuItem value="public">Công khai</MenuItem>
              <MenuItem value="friends">Bạn bè</MenuItem>
              <MenuItem value="private">Riêng tư</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Input để nhập nội dung bài viết */}
      <InputBase
        placeholder="Quốc ơi, bạn đang nghĩ gì thế?"
        fullWidth
        multiline
        rows={2}
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
        sx={{
          fontSize: '16px',
          padding: '8px 16px',
          borderRadius: '8px',
          backgroundColor: '#f5f5f5',
          marginBottom: 2,
        }}
      />

      {/* Hiển thị các hình ảnh đã chọn */}
      {selectedImages.length > 0 && (
        <Box sx={{ marginBottom: 2, display: 'flex', flexWrap: 'wrap' }}>
          {selectedImages.map((image, index) => (
            <Box key={index} sx={{ position: 'relative', display: 'inline-block', margin: '4px' }}>
              <img
                src={URL.createObjectURL(image)}
                alt={`selected-${index}`}
                style={{ maxWidth: '100px', maxHeight: '100px', borderRadius: '8px' }}
              />
              {/* Nút xóa ảnh */}
              <IconButton
                sx={{ position: 'absolute', top: 0, right: 0, backgroundColor: 'white' }}
                onClick={() => handleRemoveImage(index)}
              >
                <Close fontSize="small" />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}

      {/* Hiển thị các hashtag đã thêm */}
      {hashTags.length > 0 && (
        <Box sx={{ marginBottom: 2 }}>
          {hashTags.map((hashTag, index) => (
            <Box key={index} sx={{ display: 'inline-block', marginRight: 1 }}>
              <Typography
                variant="body2"
                sx={{ display: 'inline-block', color: 'blue', cursor: 'pointer' }}
                onClick={() => handleRemoveHashTag(hashTag)}
              >
                {hashTag}
              </Typography>
            </Box>
          ))}
        </Box>
      )}

      {/* Thanh công cụ */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" gap={2}>
          <label htmlFor="upload-photo">
            <Input
              id="upload-photo"
              type="file"
              inputProps={{ multiple: true }}
              sx={{ display: 'none' }}
              onChange={handleImageChange}
            />
            <IconButton component="span" sx={{ color: '#43A047' }}>
              <InsertPhoto sx={{ fontSize: 24, marginRight: '4px' }} />
              <Typography variant="caption" sx={{ fontWeight: 'bold' }}>Ảnh/Video</Typography>
            </IconButton>
          </label>

          <IconButton onClick={handleAddHashTag} sx={{ color: '#FB8C00' }}>
            <LocalOffer sx={{ fontSize: 24, marginRight: '4px' }} />
            <Typography variant="caption" sx={{ fontWeight: 'bold' }}>Thẻ</Typography>
          </IconButton>

          <IconButton onClick={() => setEmojiDialogOpen(true)} sx={{ color: '#FDD835' }}>
            <EmojiEmotions sx={{ fontSize: 24, marginRight: '4px' }} />
            <Typography variant="caption" sx={{ fontWeight: 'bold' }}>Biểu tượng</Typography>
          </IconButton>
        </Box>

        {/* Nút đăng bài */}
        <Button
          variant="contained"
          sx={{ bgcolor: '#1976d2', borderRadius: '16px', padding: '6px 24px' }}
          onClick={handlePostSubmit}
        >
          Đăng
        </Button>
      </Box>

      {/* Hộp thoại chọn emoji */}
      <Dialog open={emojiDialogOpen} onClose={() => setEmojiDialogOpen(false)}>
        <DialogTitle>Chọn biểu tượng cảm xúc</DialogTitle>
        <DialogContent>
          <Box display="grid" gridTemplateColumns="repeat(6, 1fr)" gap={2}>
            {['😀', '😂', '😍', '😎', '😢', '😡', '😱', '👍', '👏', '🙌', '💪', '🙏', '❤️', '💔', '🔥', '💯'].map((emoji, index) => (
              <Button key={index} onClick={() => handleAddEmoji(emoji)}>
                {emoji}
              </Button>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEmojiDialogOpen(false)}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default PostForm;
