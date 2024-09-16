import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import Header from '../../../../shared/components/header/Header';
import SavedSidebar from '../../components/SavedSidebar';
import MainContent from './MainContent';
import { User, Article } from '../../../../interface/interface';

// Mock user and articles data
const user: User = {
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
  listArticleShare: [
    { id_article: 'article1', id_tuongtac: 'interaction1' },
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
  _destroy: new Date(),
};

// Mock articles data
const articles: Article[] = [
  {
    _id: 'article1',
    idHandler: 'John Doe',
    handleDate: new Date(),
    groupID: 'group1',
    content: 'This is the first article content',
    listPhoto: ['/src/assets/images/avt.png'],
    scope: 'public',
    interact: {
      _id: 'interact1',
      emoticons: [],
      comment: [], // Nếu không có bình luận
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    _destroy: new Date(),
  },
  {
    _id: 'article2',
    idHandler: 'Jane Doe',
    handleDate: new Date(),
    groupID: 'group2',
    content: 'This is the second article content',
    listPhoto: ['/src/assets/images/avt.png'],
    scope: 'public',
    interact: {
      _id: 'interact2',
      emoticons: [],
      comment: [], // Nếu không có bình luận
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    _destroy: new Date(),
  },
  {
    _id: 'article3',
    idHandler: 'John Smith',
    handleDate: new Date(),
    groupID: 'group3',
    content: 'This is the third article content',
    listPhoto: ['/src/assets/images/avt.png'],
    scope: 'public',
    interact: {
      _id: 'interact3',
      emoticons: [],
      comment: [], // Nếu không có bình luận
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    _destroy: new Date(),
  },
];


const SavedItems = () => {
  // Quản lý bộ sưu tập được chọn
  const [selectedCollectionId, setSelectedCollectionId] = useState<string | null>(null);

  return (
    <>
      <Header />
      <Box sx={{ height: '100vh' }}>
        <Grid container sx={{ height: '100%' }}>
          {/* Sidebar chứa danh sách các bộ sưu tập */}
          <Grid
            item
            xs={12}
            sm={3}
            sx={{
              height: { xs: 'auto', sm: '100%' },
            }}
          >
            <Box
              sx={{
                height: { xs: 'auto', sm: '100%' },
                marginRight: { xs: 0, sm: 2 },
              }}
            >
              {/* Truyền callback để chọn bộ sưu tập */}
              <SavedSidebar
                user={user}
                onSelectCollection={setSelectedCollectionId} // Cập nhật bộ sưu tập được chọn
              />
            </Box>
          </Grid>

          {/* Nội dung chính hiển thị các bài viết của bộ sưu tập được chọn */}
          <Grid
            item
            xs={12}
            sm={9}
            sx={{
              overflowY: 'auto',
              backgroundColor: '#e9e9e9',
            }}
          >
            {/* Truyền collectionId được chọn xuống MainContent */}
            <MainContent
              user={user}
              articles={articles}
              selectedCollectionId={selectedCollectionId} // Hiển thị các bài viết thuộc bộ sưu tập được chọn
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SavedItems;
