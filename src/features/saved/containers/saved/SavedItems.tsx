import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import Header from '../../../../shared/components/header/Header';
import SavedSidebar from '../../components/SavedSidebar';
import MainContent from './MainContent';
import { User, Article } from '../../../../interface/interface';
import axios from 'axios';

const SavedItems = () => {
  const [selectedCollectionId, setSelectedCollectionId] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const currentUserId = sessionStorage.getItem('userId') || '';
  const token = sessionStorage.getItem('token'); // Lấy token từ sessionStorage

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUserId) {
        try {
          const response = await axios.get(`http://localhost:3000/v1/user/${currentUserId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Thêm token vào header
              },
            }
          );
          setUser(response.data);
        } catch (error: unknown) {
          if (axios.isAxiosError(error)) {
            console.error('Error fetching user data:', error.message);
          } else {
            console.error('Unknown error:', error);
          }
        }
      }
    };

    fetchUserData();
  }, [currentUserId]);

  useEffect(() => {
    const fetchArticles = async () => {
      if (selectedCollectionId && user) {
        try {
          const response = await axios.get(`http://localhost:3000/v1/user/${currentUserId}/collections/${selectedCollectionId}/articles`,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Thêm token vào header
              },
            }
          );
          setArticles(response.data);
        } catch (error: unknown) {
          if (axios.isAxiosError(error)) {
            console.error('Error fetching articles:', error.message);
          } else {
            console.error('Unknown error:', error);
          }
        }
      }
    };

    fetchArticles();
  }, [selectedCollectionId, user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <Box sx={{ height: '100vh' }}>
        <Grid container sx={{ height: '100%' }}>
          <Grid item xs={12} sm={3}>
            <SavedSidebar 
              user={user} 
              onSelectCollection={setSelectedCollectionId} 
              setUser={setUser}
            />
          </Grid>
          <Grid item xs={12} sm={9}>
            <MainContent
              user={user}
              setUser={setUser}
              articles={articles} // Pass articles to MainContent
              selectedCollectionId={selectedCollectionId}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SavedItems;
