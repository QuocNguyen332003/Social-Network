import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import SavedItemCard from '../../components/SavedItemCard';
import { User, Article } from '../../../../interface/interface';

interface MainContentProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  articles: Article[];
  selectedCollectionId: string | null;
}

const MainContent: React.FC<MainContentProps> = ({ user, setUser, articles, selectedCollectionId }) => {
  // Filter articles based on the selected collection
  const filteredArticles = selectedCollectionId
    ? articles.filter(article =>
        user.collections
          .find(collection => collection._id === selectedCollectionId)
          ?.items.includes(article._id)
      )
    : articles;

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
              user={user}
              setUser={setUser}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MainContent;
