import React from 'react';
import { Box, Paper, Typography, Avatar, IconButton, Button } from '@mui/material';
import { MoreHoriz, Favorite, Comment, Share, CardGiftcard } from '@mui/icons-material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const Post = ({ content, imageUrls }: { content: string, imageUrls?: string[] }) => {
  return (
    <Paper sx={{ padding: 2, marginBottom: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center">
          <Avatar alt="Panda Media" src="/static/images/avatar/1.jpg" />
          <Box sx={{ marginLeft: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Panda Media
            </Typography>
            <Typography variant="caption" color="textSecondary">
              326 abonnés - 20h
            </Typography>
          </Box>
        </Box>
        <IconButton>
          <MoreHoriz />
        </IconButton>
      </Box>
      <Typography variant="body1" sx={{ marginTop: 2 }}>
        {content}
      </Typography>
      {imageUrls && (
        <Box sx={{ marginTop: 2, display: 'flex', flexWrap: 'wrap' }}>
          {imageUrls.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`post-image-${index}`}
              style={{ maxWidth: '100px', maxHeight: '100px', marginRight: '10px', borderRadius: '8px' }}
            />
          ))}
        </Box>
      )}
      <Box display="flex" alignItems="center" sx={{ marginTop: 2 }}>
        <ThumbUpAltIcon fontSize="small" sx={{ color: '#2e7d32', marginRight: 1 }} />
        <FavoriteIcon fontSize="small" sx={{ color: '#d32f2f', marginRight: 1 }} />
        <LightbulbIcon fontSize="small" sx={{ color: '#f9a825', marginRight: 1 }} />
        <EmojiEmotionsIcon fontSize="small" sx={{ color: '#ffb300', marginRight: 1 }} />
        <FavoriteBorderIcon fontSize="small" sx={{ color: '#8e24aa', marginRight: 1 }} />
        <Typography variant="body2" sx={{ marginLeft: 1 }}>
          88 likes - 4 Comments
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ marginTop: 2 }}>
        <Box>
          <Button startIcon={<Favorite />} size="small" sx={{ color: '#424242', marginRight: 2 }}>
            Yêu thích
          </Button>
          <Button startIcon={<Comment />} size="small" sx={{ color: '#424242', marginRight: 2 }}>
            Bình luận
          </Button>
          <Button startIcon={<Share />} size="small" sx={{ color: '#424242', marginRight: 2 }}>
            Chia sẻ
          </Button>
          <Button startIcon={<CardGiftcard />} size="small" sx={{ color: '#424242' }}>
            Quà tặng
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default Post;
