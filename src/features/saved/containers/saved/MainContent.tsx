import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import SavedItemCard from '../../components/SavedItemCard';
import { User, Article } from '../../../../interface/interface';

interface MainContentProps {
  user: User;
  articles: Article[];
  selectedCollectionId: string | null; // Truyền collectionId để lọc bài viết
}

const findArticleById = (id: string, articles: Article[]) => {
  return articles.find(article => article._id === id);
};

const MainContent: React.FC<MainContentProps> = ({ user, articles, selectedCollectionId }) => {
  // Nếu không chọn collectionId thì hiển thị tất cả bài viết, nếu có thì chỉ hiển thị bài viết thuộc bộ sưu tập đó
  const filteredItems = selectedCollectionId
    ? user.collections.find(collection => collection._id === selectedCollectionId)?.items.map(itemId => findArticleById(itemId, articles)).filter(Boolean)
    : user.collections.flatMap(collection => collection.items.map(itemId => findArticleById(itemId, articles))).filter(Boolean);

  return (
    <Box sx={{ padding: 2, color: 'black', height: '100vh' }}>
      <Typography variant="h6" gutterBottom>
        {selectedCollectionId ? `Bài viết trong bộ sưu tập` : `Tất cả các mục đã lưu`}
      </Typography>

      <Grid container spacing={2}>
        {filteredItems?.map((article, index) => (
          <Grid item xs={12} key={index}>
            <SavedItemCard
              item={{
                _id: article!._id,
                content: article!.content,
                media: article!.listPhoto[0],
                collection: user.collections.find(col => col.items.includes(article!._id))?.name || 'Unknown Collection',
              }}
              collections={user.collections.map(col => col.name)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MainContent;
