import React from 'react';
import { Box, Typography, Paper, Button, IconButton } from '@mui/material';
import { MoreHoriz } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Article, Collection } from '../../../interface/interface';



interface ArticleCardProps {
  article: Article;
  collection: Collection;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, collection }) => {
  const navigate = useNavigate();
  const handleViewArticle = () => {
    navigate(`/new-feeds/${article._id}`, { state: { article } });
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
            src={(article.listPhoto && article.listPhoto.length > 0 ? article.listPhoto[0].link : 'src/assets/images/unknow.png') as string}
            alt={"Ảnh bài viết"}
            style={{ width: '100px', display: 'block', borderRadius: 10 }}
          />
        </Box>
        <Box sx={{ flex: 1, textAlign: { xs: 'center', sm: 'left' },
              paddingRight: '20px', display:'flex', flexDirection: 'column'
          }}>
          <Typography variant="body1" fontWeight="bold" color="#000">
            {article.content}
          </Typography>
          <Typography variant="caption" color="#666">
            Đã lưu vào {collection.name}
          </Typography>
          <Typography variant="caption" color="#999">
            Đã lưu từ bài viết của {article.idHandler}
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          sx={{ mr: 2, display: { xs: 'none', sm: 'inline-flex' } }}
          onClick={handleViewArticle} // Hiển thị popup khi bấm
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
