import React, { useState } from 'react';
import { Box } from '@mui/material';
import GroupHeader from '../../components/GroupHeader';
import GroupTabs from '../../components/GroupTabs';
import PostForm from '../../../../shared/components/postForm/PostForm';
import Post from '../../../../shared/components/post/Post';

const MainContent = () => {
  const [posts, setPosts] = useState<Array<{ content: string; imageUrls?: string[] }>>([
    {
      content:
        "[Historical Fact] The West first learned of the giant panda on 11 March 1869, when the French missionary Armand David received a skin from a hunter. In 1936, Ruth Harkness became the first Westerner to bring back a live giant panda.",
    },
  ]);

  const handlePostSubmit = (newPost: string, images: File[]) => {
    const newPostEntry = {
      content: newPost,
      imageUrls: images.length > 0 ? images.map(image => URL.createObjectURL(image)) : undefined,
    };
    setPosts([newPostEntry, ...posts]); // Thêm bài đăng mới vào danh sách
  };

  return (
    <Box sx={{ padding: 2, height: '85vh', overflowY: 'scroll' }}>
      <GroupHeader />
      <GroupTabs />
      <PostForm onSubmit={handlePostSubmit} />
      {posts.map((post, index) => (
        <Post key={index} content={post.content} imageUrls={post.imageUrls} />
      ))}
    </Box>
  );
};

export default MainContent;
