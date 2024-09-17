import React, { useState } from 'react';
import { Box, Button, Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText, Divider, IconButton, Grid } from '@mui/material';
import { MoreHoriz } from '@mui/icons-material';
import { Article } from '../../../../../../interface/interface';
import { useOutletContext } from 'react-router-dom';
import {Group} from '../../../../../../interface/interface.ts'

// Mock dữ liệu bài viết
const mockArticles: Article[] = [
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
      comment: [], // Nếu không có bình luận
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
      comment: [], // Nếu không có bình luận
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
      comment: [], // Nếu không có bình luận
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    _destroy: new Date(),
  },
];

const ApprovalContent: React.FC = () => {
  const { group } = useOutletContext<{ group: Group }>();
  
  const [approvedPosts, setApprovedPosts] = useState<string[]>([]);
  const [rejectedPosts, setRejectedPosts] = useState<string[]>([]);

  // Lọc những bài viết có trạng thái "pending"
  const pendingPosts = group.article.listArticle
    .filter(article => article.state === 'pending')
    .map(article => mockArticles.find(a => a._id === article.idArticle))
    .filter(Boolean) as Article[];

  // Hàm duyệt bài viết
  const handleApproval = (postId: string) => {
    setApprovedPosts([...approvedPosts, postId]);
  };

  // Hàm từ chối bài viết
  const handleRejection = (postId: string) => {
    setRejectedPosts([...rejectedPosts, postId]);
  };

  return (
    <Box
      sx={{
        padding: 2,
        backgroundColor: '#e9e9e9',
        height: '60vh',
        overflowY: 'auto',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: 3 }}>
        Chờ phê duyệt
      </Typography>
      <List>
        {pendingPosts.map((post, index) => (
          <Box
            key={index}
            sx={{
              padding: 3,
              borderRadius: 2,
              border: '1px solid #e0e0e0',
              boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
              backgroundColor: '#f9f9f9',
              marginBottom: 3,
            }}
          >
            <ListItem sx={{ paddingLeft: 0 }}>
              <ListItemAvatar>
                <Avatar src={'/static/images/avatar/1.jpg'} sx={{ width: 56, height: 56 }} />
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
              <Typography sx={{ marginBottom: 2, color: '#555' }}>{post.content}</Typography>
              <Grid container spacing={1}>
                {post.listPhoto.map((image, imgIndex) => (
                  <Grid item xs={12 / Math.min(post.listPhoto.length, 3)} key={imgIndex}>
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
                        padding: '12px 0',
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

export default ApprovalContent;
