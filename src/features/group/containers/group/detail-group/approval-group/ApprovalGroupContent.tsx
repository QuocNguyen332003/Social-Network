import React, { useState } from 'react';
import { Box, Button, Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText, Divider, IconButton, Grid } from '@mui/material';
import { MoreHoriz } from '@mui/icons-material';
import { useOutletContext } from 'react-router-dom';
import { Group, Article } from '../../../../../../interface/interface.ts';
import { articles } from '../../../../components/GroupListData.tsx'; // Importing data

const ApprovaGroupContent: React.FC = () => {
  const { group } = useOutletContext<{ group: Group }>();
  
  const [approvedPosts, setApprovedPosts] = useState<string[]>([]);
  const [rejectedPosts, setRejectedPosts] = useState<string[]>([]);

  // Lọc những bài viết có trạng thái "pending" trong nhóm hiện tại
  const pendingPosts = group.article.listArticle
    .filter(article => article.state === 'pending')
    .map(article => articles.find(a => a._id === article.idArticle)) // Sử dụng articles từ GroupListData.tsx
    .filter(Boolean) as Article[];

  // Hàm duyệt bài viết
  const handleApproval = (postId: string) => {
    setApprovedPosts((prevApproved) => [...prevApproved, postId]);
    setRejectedPosts((prevRejected) => prevRejected.filter(id => id !== postId)); // Remove from rejected if present
  };

  // Hàm từ chối bài viết
  const handleRejection = (postId: string) => {
    setRejectedPosts((prevRejected) => [...prevRejected, postId]);
    setApprovedPosts((prevApproved) => prevApproved.filter(id => id !== postId)); // Remove from approved if present
  };

  return (
    <Box
      sx={{
        padding: 3, // Increased padding
        backgroundColor: '#e9e9e9',
        height: '70vh', // Adjusted height
        maxWidth: '900px', // Set max width to control the size of the content
        margin: '0 auto', // Center the content horizontally
        overflowY: 'auto',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      <List>
        {pendingPosts.map((post, index) => (
          <Box
            key={index}
            sx={{
              padding: 3, // Increased padding inside each post box
              borderRadius: 2,
              border: '1px solid #e0e0e0',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)', // Softer shadow
              backgroundColor: '#f9f9f9',
              marginBottom: 4, // More margin between posts
              maxWidth: '600px', // Limit the post box width
              margin: '0 auto', // Center each post
            }}
          >
            <ListItem sx={{ paddingLeft: 0 }}>
              <ListItemAvatar>
                {/* You can dynamically assign avatar based on userId or index */}
                <Avatar src={`/static/images/avatar/${index + 1}.jpg`} sx={{ width: 50, height: 50 }} /> {/* Slightly larger avatar */}
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 'bold', marginRight: 1, color: '#333' }}
                    >
                      {post.idHandler}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      @{post.idHandler}
                    </Typography>
                  </Box>
                }
                secondary={
                  <Typography variant="body2" color="textSecondary">
                    {post.handleDate?.toLocaleDateString()}
                  </Typography>
                }
              />
              <IconButton>
                <MoreHoriz />
              </IconButton>
            </ListItem>
            <Box sx={{ marginTop: 2 }}>
              <Typography sx={{ marginBottom: 2, color: '#555' }}>{post.content}</Typography> {/* Increased margin */}
              <Grid container spacing={1}>
                {post.listPhoto.map((image, imgIndex) => (
                  <Grid item xs={12} key={imgIndex}>
                    <img
                      src={image}
                      alt={`post image ${imgIndex}`}
                      style={{
                        width: '100%',
                        height: '200px', // Increase height for the images
                        objectFit: 'cover',
                        borderRadius: 8,
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
              {approvedPosts.includes(post._id) ? (
                <Typography sx={{ marginTop: 2, color: '#4caf50', fontWeight: 'bold' }}>
                  Đã duyệt
                </Typography>
              ) : rejectedPosts.includes(post._id) ? (
                <Typography sx={{ marginTop: 2, color: '#d32f2f', fontWeight: 'bold' }}>
                  Đã từ chối
                </Typography>
              ) : (
                <>
                  <Divider sx={{ marginY: 2 }} /> {/* Increased margin */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: '#1976d2',
                        width: '48%',
                        padding: '12px 0', // Increased padding on buttons
                        '&:hover': {
                          backgroundColor: '#1565c0',
                        },
                      }}
                      onClick={() => handleApproval(post._id)}
                    >
                      Chấp nhận
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{
                        borderColor: '#d32f2f',
                        color: '#d32f2f',
                        width: '48%',
                        padding: '12px 0', // Increased padding on buttons
                        '&:hover': {
                          backgroundColor: '#f9f9f9',
                        },
                      }}
                      onClick={() => handleRejection(post._id)}
                    >
                      Từ chối
                    </Button>
                  </Box>
                </>
              )}
            </Box>
          </Box>
        ))}
      </List>
    </Box>
  );
};

export default ApprovaGroupContent;
