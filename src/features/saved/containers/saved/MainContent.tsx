import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import SavedItemCard from '../../components/SavedItemCard';
import { User, Article } from '../../../../interface/interface';

interface MainContentProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>; // Add setUser prop to update the user
  articles: Article[];
  selectedCollectionId: string | null; // Truyền collectionId để lọc bài viết
}

const MainContent: React.FC<MainContentProps> = ({ user, setUser, articles, selectedCollectionId }) => {
  // Lọc các bài viết dựa trên bộ sưu tập được chọn
  const filteredArticles = selectedCollectionId
    ? articles.filter(article =>
        user.collections
          .find(collection => collection._id === selectedCollectionId)
          ?.items.includes(article._id)
      )
    : articles.filter(article =>
        user.collections.some(collection => collection.items.includes(article._id))
      );

  return (
    <Box sx={{ padding: 2, color: 'black', height: '100vh', overflowY: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        {selectedCollectionId ? `Bài viết trong bộ sưu tập` : `Tất cả các mục đã lưu`}
      </Typography>

      <Grid container spacing={2}>
        {filteredArticles.map((article) => (
          <Grid item xs={12} key={article._id}>
            <SavedItemCard
              article={article}
              collections={user.collections.map(col => col.name)}
              user={user}             // Pass user prop
              setUser={setUser}         // Pass setUser prop
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MainContent;
