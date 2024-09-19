import React, { useState } from 'react';
import { Box, Paper, IconButton, Button, InputBase, Avatar, MenuItem, Select, FormControl, Typography, Input } from '@mui/material';
import { InsertPhoto, Mic, LocalOffer, Poll, Timer, AttachMoney, EmojiEmotions } from '@mui/icons-material';

const PostForm = ({ onSubmit }: { onSubmit: (newPost: string, images: File[], visibility: string) => void }) => {
  const [newPost, setNewPost] = useState('');
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [visibility, setVisibility] = useState('public'); // Phạm vi bài viết, mặc định là 'public'

  const handlePostSubmit = () => {
    if (newPost.trim() || selectedImages.length > 0) {
      onSubmit(newPost, selectedImages, visibility);
      setNewPost(''); // Clear input
      setSelectedImages([]); // Clear selected images
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedImages([...selectedImages, ...Array.from(e.target.files)]);
    }
  };

  return (
    <Paper sx={{ padding: 2, marginBottom: 2, borderRadius: '8px' }}>
      {/* Header với Avatar và tên người dùng */}
      <Box display="flex" alignItems="center" mb={2}>
        <Avatar alt="User Avatar" src="https://via.placeholder.com/150" sx={{ width: 48, height: 48, marginRight: 2 }} />
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">Bảo Quốc</Typography>
          {/* Phạm vi bài viết */}
          <FormControl sx={{ minWidth: 120 }}>
            <Select
              value={visibility}
              onChange={(e) => setVisibility(e.target.value as string)}
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

      {/* Input để viết bài */}
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
      {selectedImages.length > 0 && (
        <Box sx={{ marginBottom: 2, display: 'flex', flexWrap: 'wrap' }}>
          {selectedImages.map((image, index) => (
            <img
              key={index}
              src={URL.createObjectURL(image)}
              alt={`selected-${index}`}
              style={{ maxWidth: '100px', maxHeight: '100px', marginRight: '10px', borderRadius: '8px' }}
            />
          ))}
        </Box>
      )}
      {/* Thanh chức năng với các nút tương tự */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <label htmlFor="upload-photo">
            <Input
              id="upload-photo"
              type="file"
              inputProps={{ multiple: true }}
              sx={{ display: 'none' }}
              onChange={handleImageChange}
            />
            <IconButton component="span">
              <InsertPhoto sx={{ color: 'gray' }} />
            </IconButton>
          </label>
          <IconButton><Mic sx={{ color: 'gray' }} /></IconButton>
          <IconButton><LocalOffer sx={{ color: 'gray' }} /></IconButton>
          <IconButton><Poll sx={{ color: 'gray' }} /></IconButton>
          <IconButton><Timer sx={{ color: 'gray' }} /></IconButton>
          <IconButton><AttachMoney sx={{ color: 'gray' }} /></IconButton>
          <IconButton><EmojiEmotions sx={{ color: 'gray' }} /></IconButton>
        </Box>

        <Button
          variant="contained"
          sx={{ bgcolor: '#0D47A1', borderRadius: '16px', padding: '6px 24px' }}
          onClick={handlePostSubmit}
        >
          Đăng
        </Button>
      </Box>
    </Paper>
  );
};

export default PostForm;
