import React, { useState } from 'react';
import { Box, Paper, IconButton, Button, InputBase, Input } from '@mui/material';
import { InsertPhoto, Mic, LocalOffer, Poll, Timer, AttachMoney } from '@mui/icons-material';

const PostForm = ({ onSubmit }: { onSubmit: (newPost: string, images: File[]) => void }) => {
  const [newPost, setNewPost] = useState('');
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const handlePostSubmit = () => {
    if (newPost.trim() || selectedImages.length > 0) {
      onSubmit(newPost, selectedImages);
      setNewPost('');  // Clear input
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
      <InputBase
        placeholder="Hãy chia sẻ suy nghĩ của bạn lúc này"
        fullWidth
        multiline
        rows={1}
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
