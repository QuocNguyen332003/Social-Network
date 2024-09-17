import React, { useState } from 'react';
import { Box, Paper, IconButton, Button, InputBase, Avatar, MenuItem, Select, FormControl, Typography, Input, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { InsertPhoto, LocalOffer, EmojiEmotions } from '@mui/icons-material';

const PostForm = ({ onSubmit }: { onSubmit: (newPost: string, images: File[], visibility: string, hashTags: string[]) => void }) => {
  const [newPost, setNewPost] = useState(''); // Post content input state
  const [selectedImages, setSelectedImages] = useState<File[]>([]); // Image upload handling
  const [visibility, setVisibility] = useState('public'); // Post visibility options
  const [hashTags, setHashTags] = useState<string[]>([]);
  const [emojiDialogOpen, setEmojiDialogOpen] = useState(false); // Emoji dialog open state

// Function to add a new hashtag
const handleAddHashTag = () => {
  const newHashTag = prompt('Nhập hashtag bạn muốn thêm:');
  if (newHashTag) {
    // Add '#' if it doesn't already have it
    const formattedHashTag = newHashTag.startsWith('#') ? newHashTag : `#${newHashTag}`;
    if (!hashTags.includes(formattedHashTag)) {
      setHashTags([...hashTags, formattedHashTag]);
    }
  }
};


  // Function to add emoji to the post content
  const handleAddEmoji = (emoji: string) => {
    setNewPost(newPost + emoji); // Add selected emoji to post content
    setEmojiDialogOpen(false); // Close emoji dialog
  };

  // Function to submit the post content and images
  const handlePostSubmit = () => {
    if (newPost.trim() || selectedImages.length > 0) {
      console.log("Post Content:", newPost);
      console.log("Selected Images:", selectedImages);
      console.log("Visibility:", visibility);
      console.log("Tags:", hashTags);
      
      onSubmit(newPost, selectedImages, visibility, hashTags); // Submit new post
      setNewPost(''); // Clear input field
      setSelectedImages([]); // Clear selected images
      setHashTags([]); // Clear selected tags
    }
  };

  // Function to handle image uploads
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedImages([...selectedImages, ...Array.from(e.target.files)]); // Add selected images
    }
  };

  return (
    <Paper sx={{ padding: 2, marginBottom: 2, borderRadius: '8px'}}>
      {/* Header with Avatar and user name */}
      <Box display="flex" alignItems="center" mb={2}>
        <Avatar alt="User Avatar" src="https://via.placeholder.com/150" sx={{ width: 48, height: 48, marginRight: 2 }} />
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">Bảo Quốc</Typography>
          {/* Post visibility selector */}
          <FormControl sx={{ minWidth: 120 }}>
            <Select
              value={visibility}
              onChange={(e) => setVisibility(e.target.value as string)} // Change visibility option
              displayEmpty
              inputProps={{ 'aria-label': 'Phạm vi bài viết' }}
              sx={{ fontSize: '14px' }}
            >
              <MenuItem value="public">Công khai</MenuItem> {/* Public visibility */}
              <MenuItem value="friends">Bạn bè</MenuItem> {/* Friends only visibility */}
              <MenuItem value="private">Riêng tư</MenuItem> {/* Private visibility */}
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Input for writing post */}
      <InputBase
        placeholder="Quốc ơi, bạn đang nghĩ gì thế?"
        fullWidth
        multiline
        rows={2}
        value={newPost} // Post content state
        onChange={(e) => setNewPost(e.target.value)} // Update post content
        sx={{
          fontSize: '16px',
          padding: '8px 16px',
          borderRadius: '8px',
          backgroundColor: '#f5f5f5',
          marginBottom: 2,
        }}
      />

      {/* Display selected images */}
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

      {/* Display added tags */}
      {hashTags.length > 0 && (
        <Box sx={{ marginBottom: 2 }}>
          {hashTags.map((hashTags, index) => (
            <Typography key={index} variant="body2" sx={{ display: 'inline-block', marginRight: 1, color: 'blue' }}>
              {hashTags}
            </Typography>
          ))}
        </Box>
      )}

      {/* Function bar with buttons */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" gap={2}>
          <label htmlFor="upload-photo">
            <Input
              id="upload-photo"
              type="file"
              inputProps={{ multiple: true }} // Allow multiple file uploads
              sx={{ display: 'none' }}
              onChange={handleImageChange} // Handle image uploads
            />
            <IconButton component="span" sx={{ color: '#43A047', display: 'flex', alignItems: 'center' }}> {/* Horizontal layout */}
              <InsertPhoto sx={{ fontSize: 24, marginRight: '4px' }} /> {/* Custom size for photo icon */}
              <Typography variant="caption" sx={{ fontWeight: 'bold'}}>Ảnh/Video</Typography> {/* Bold text */}
            </IconButton>
          </label>

          {/* Tag adding button */}
          <IconButton onClick={handleAddHashTag} sx={{ color: '#FB8C00', display: 'flex', alignItems: 'center' }}> {/* Horizontal layout */}
            <LocalOffer sx={{ fontSize: 24, marginRight: '4px' }} /> {/* Custom size for tag icon */}
            <Typography variant="caption" sx={{ fontWeight: 'bold' }}>Thẻ</Typography> {/* Bold text */}
          </IconButton>

          {/* Emoji dialog button */}
          <IconButton onClick={() => setEmojiDialogOpen(true)} sx={{ color: '#FDD835', display: 'flex', alignItems: 'center' }}> {/* Horizontal layout */}
            <EmojiEmotions sx={{ fontSize: 24, marginRight: '4px' }} /> {/* Custom size for emoji icon */}
            <Typography variant="caption" sx={{ fontWeight: 'bold' }}>Biểu tượng</Typography> {/* Bold text */}
          </IconButton>
        </Box>

        {/* Post submit button */}
        <Button
          variant="contained"
          sx={{ bgcolor: '#0D47A1', borderRadius: '16px', padding: '6px 24px' }}
          onClick={handlePostSubmit} // Trigger post submission
        >
          Đăng
        </Button>
      </Box>

      {/* Emoji selection dialog */}
      <Dialog open={emojiDialogOpen} onClose={() => setEmojiDialogOpen(false)}>
        <DialogTitle>Chọn biểu tượng cảm xúc</DialogTitle>
        <DialogContent>
          {/* Extended emoji list */}
          <Box display="grid" gridTemplateColumns="repeat(6, 1fr)" gap={2}>
            {['😀', '😂', '😍', '😎', '😢', '😡', '😱', '👍', '👏', '🙌', '💪', '🙏', '❤️', '💔', '🔥', '💯'].map((emoji, index) => (
              <Button key={index} onClick={() => handleAddEmoji(emoji)}> {/* Emoji buttons */}
                {emoji}
              </Button>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEmojiDialogOpen(false)}>Đóng</Button> {/* Close emoji dialog */}
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default PostForm;
