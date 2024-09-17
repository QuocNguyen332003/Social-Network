 
import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import Header from '../../../../shared/components/header/Header';
import SavedSidebar from '../../components/SavedSidebar';
import MainContent from './MainContent';
import { User, Article } from '../../../../interface/interface';

// Mock user and articles data
const initialUserData: User = {
  _id: 'user123',
  account: {
    email: 'user@example.com',
    password: 'password123',
  },
  firstName: 'John',
  lastName: 'Doe',
  displayName: 'JohnD',
  userName: 'john.doe',
  friends: [
    { userId: 'friend1', addDate: '2023-05-01' },
    { userId: 'friend2', addDate: '2023-06-15' },
  ],
  avt: ['/static/images/avatar.png'],
  backGround: ['/static/images/background.png'],
  aboutMe: 'Hello',
  status: 'active',
  createDate: '2022-01-01',
  details: {
    phoneNumber: '123-456-7890',
    address: '123 Main St, City, Country',
    gender: true,
    birthDate: new Date('1990-01-01'),
  },
  collections: [
    {
      _id: 'collection1',
      name: 'SG',
      items: ['article1', 'article2'],
      createdAt: new Date(),
      updatedAt: new Date(),
      _destroy: new Date(),
    },
    {
      _id: 'collection2',
      name: 'TV & Phim ảnh',
      items: ['article3'],
      createdAt: new Date(),
      updatedAt: new Date(),
      _destroy: new Date(),
    },
  ],
  groups: ['group1', 'group2'],
  hobbies: ['Gaming', 'Reading'],
  listArticle: ['article1', 'article2'],
  createdAt: new Date(),
  updatedAt: new Date(),
  _destroy: new Date(),
};

// Mock articles data
const articles: Article[] = [
  {
    _id: 'article1',
    sharedPostId: null, // Mã bài viết gốc được chia sẻ (nếu có)
    idHandler: 'John Doe',
    handleDate: new Date(),
    groupID: 'group1',
    content: 'This is the first article content',
    listPhoto: ['/src/assets/images/avt.png'],
    scope: 'public',
    interact: {
      _id: 'interact1',
      emoticons: [],
      comment: [],
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    _destroy: new Date(),
  },
  {
    _id: 'article2',
    sharedPostId: null, // Mã bài viết gốc được chia sẻ (nếu có)
    idHandler: 'Jane Doe',
    handleDate: new Date(),
    groupID: 'group2',
    content: 'This is the second article content',
    listPhoto: ['/src/assets/images/avt.png'],
    scope: 'public',
    interact: {
      _id: 'interact2',
      emoticons: [],
      comment: [],
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    _destroy: new Date(),
  },
  {
    _id: 'article3',
    sharedPostId: null, // Mã bài viết gốc được chia sẻ (nếu có)
    idHandler: 'John Smith',
    handleDate: new Date(),
    groupID: 'group3',
    content: 'This is the third article content',
    listPhoto: ['/src/assets/images/avt.png'],
    scope: 'public',
    interact: {
      _id: 'interact3',
      emoticons: [],
      comment: [],
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    _destroy: new Date(),
  },
];

const SavedItems = () => {
  const [selectedCollectionId, setSelectedCollectionId] = useState<string | null>(null);
  const [user, setUser] = useState<User>(initialUserData); // State for user data

  return (
    <>
      <Header />
      <Box sx={{ height: '100vh' }}>
        <Grid container sx={{ height: '100%' }}>
        <Grid item xs={12} sm={3}>
          <SavedSidebar 
            user={user} 
            onSelectCollection={setSelectedCollectionId} 
            setUser={setUser}  // Truyền setUser ở đây
          />
        </Grid>
          <Grid item xs={12} sm={9}>
            <MainContent
              user={user}
              setUser={setUser}                // Pass setUser to MainContent
              articles={articles}              // Your articles data
              selectedCollectionId={selectedCollectionId}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SavedItems;
