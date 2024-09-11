import React from 'react';
import { Box, Typography, Paper, Button, IconButton } from '@mui/material';
import { MoreHoriz } from '@mui/icons-material';
import AlbumItem from './AlbumItem';
import { useNavigate } from 'react-router-dom';



interface ArticleCardCardProps {
  item: AlbumItem;
}

const ArticleCard: React.FC<ArticleCardCardProps> = ({ item }) => {
  const navigate = useNavigate();
  const handleAddToCollection = () => {
    navigate('/collections/article');
  };

  return (
    <>
      <Paper
        sx={{
          padding: 2,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' }, // Responsive layout
          alignItems: 'center',
          backgroundColor: '#f5f5f5',
          color: '#333',
        }}
      >
        <Box sx={{ width: { xs: '100%', sm: '15%' }, mb: { xs: 2, sm: 0 }, mr: { sm: 2 } }}>
          <img
            src={item.media}
            alt={item.content}
            style={{ width: '100px', filter: 'grayscale(100%)', display: 'block', borderRadius: 10 }}
          />
        </Box>
        <Box sx={{ flex: 1, textAlign: { xs: 'center', sm: 'left' },
              paddingRight: '20px', display:'flex', flexDirection: 'column'
          }}>
          <Typography variant="body1" fontWeight="bold" color="#000">
            {item.content}
          </Typography>
          <Typography variant="caption" color="#666">
            {item.type} · Đã lưu vào {item.collection}
          </Typography>
          <Typography variant="caption" color="#999">
            Đã lưu từ bài viết của {item.savedBy}
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          sx={{ mr: 2, display: { xs: 'none', sm: 'inline-flex' } }}
          onClick={handleAddToCollection} // Hiển thị popup khi bấm
        >
          Xem bài viết
        </Button>
        <IconButton sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
          <MoreHoriz />
        </IconButton>
      </Paper>
    </>
  );
};

export default ArticleCard;
