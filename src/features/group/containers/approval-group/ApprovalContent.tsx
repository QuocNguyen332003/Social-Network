import React, { useState } from 'react';
import { Box, Button, Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText, Paper, Divider, IconButton, Grid } from '@mui/material';
import { MoreHoriz } from '@mui/icons-material';

const pendingPosts = [
  {
    username: 'Jada Jackson',
    handle: '@Jadajackson',
    avatar: '/static/images/avatar/1.jpg',
    date: 'March 24',
    content: 'Hi Guys, This is my cat collection from last summer. Share yours!',
    images: [
      '/static/images/cat1.jpg',
      '/static/images/cat2.jpg',
      '/static/images/cat3.jpg',
    ],
  },
  {
    username: 'Michael Brown',
    handle: '@michaelbrown',
    avatar: '/static/images/avatar/2.jpg',
    date: 'March 25',
    content: 'Check out these cool sunsets I captured last week!',
    images: [
      '/static/images/sunset1.jpg',
      '/static/images/sunset2.jpg',
      '/static/images/sunset3.jpg',
    ],
  },
  {
    username: 'Emma Davis',
    handle: '@emmadavis',
    avatar: '/static/images/avatar/3.jpg',
    date: 'March 26',
    content: 'Look at this delicious meal I had yesterday! Anyone else loves pasta?',
    images: [
      '/static/images/pasta1.jpg',
      '/static/images/pasta2.jpg',
      '/static/images/pasta3.jpg',
    ],
  },
];

const ApprovalContent: React.FC = () => {
  const [approvedPosts, setApprovedPosts] = useState<string[]>([]);

  const handleApproval = (username: string) => {
    setApprovedPosts([...approvedPosts, username]);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Paper sx={{ padding: 3, borderRadius: 3, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <Typography variant="h6" sx={{ marginBottom: 3 }}>
          Chờ phê duyệt
        </Typography>
        <Box sx={{ height: '60vh', overflowY: 'auto', paddingRight: 1 }}>
          <List>
            {pendingPosts.map((post, index) => (
              <Box
                key={index}
                sx={{
                  padding: 3,
                  marginBottom: 4,
                  borderRadius: 2,
                  border: '1px solid #e0e0e0',
                  boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
                  backgroundColor: '#f9f9f9',
                }}
              >
                <ListItem sx={{ paddingLeft: 0 }}>
                  <ListItemAvatar>
                    <Avatar src={post.avatar} sx={{ width: 56, height: 56 }} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', marginRight: 1, color: '#333' }}>
                          {post.username}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {post.handle}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Typography variant="body2" color="textSecondary">
                        {post.date}
                      </Typography>
                    }
                  />
                  <IconButton>
                    <MoreHoriz />
                  </IconButton>
                </ListItem>
                <Box sx={{ marginTop: 2 }}>
                  <Typography sx={{ marginBottom: 2, color: '#555' }}>{post.content}</Typography>
                  <Grid container spacing={1}>
                    {post.images.map((image, imgIndex) => (
                      <Grid item xs={12 / Math.min(post.images.length, 3)} key={imgIndex}>
                        <img
                          src={image}
                          alt={`post image ${imgIndex}`}
                          style={{
                            width: '100%',
                            height: '200px',
                            objectFit: 'cover',
                            borderRadius: 8,
                          }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                  {approvedPosts.includes(post.username) ? (
                    <Typography sx={{ marginTop: 2, color: '#4caf50', fontWeight: 'bold' }}>
                      Đã duyệt
                    </Typography>
                  ) : (
                    <>
                      <Divider sx={{ marginY: 2 }} />
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: '#1976d2',
                            width: '48%',
                            padding: '12px 0',
                            '&:hover': {
                              backgroundColor: '#1565c0',
                            },
                          }}
                          onClick={() => handleApproval(post.username)}
                        >
                          Chấp nhận
                        </Button>
                        <Button
                          variant="outlined"
                          sx={{
                            borderColor: '#d32f2f',
                            color: '#d32f2f',
                            width: '48%',
                            padding: '12px 0',
                            '&:hover': {
                              backgroundColor: '#f9f9f9',
                            },
                          }}
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
      </Paper>
    </Box>
  );
};

export default ApprovalContent;
