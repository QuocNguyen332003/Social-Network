/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText, Divider, IconButton, Grid, CircularProgress } from '@mui/material';
import { MoreHoriz } from '@mui/icons-material';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios'; // Thêm axios để gọi API
import { Group, Article } from '../../../../../../interface/interface.ts';

const ApprovaGroupContent: React.FC = () => {
  const token = sessionStorage.getItem('token');
  const { group } = useOutletContext<{ group: Group }>();
  const [pendingPosts, setPendingPosts] = useState<Article[]>([]); 
  const [approvedPosts, setApprovedPosts] = useState<string[]>([]); 
  const [rejectedPosts, setRejectedPosts] = useState<string[]>([]); 
  const [loading, setLoading] = useState(true); 
  const currentUserId = sessionStorage.getItem('userId') || ''; 
  // Gọi API để lấy danh sách bài viết đang chờ duyệt khi component được render lần đầu
  useEffect(() => {
    const fetchPendingArticles = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/v1/group/${group._id}/pending-articles`,
          {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          }
        );
        setPendingPosts(response.data.articles || []); // Cập nhật danh sách bài viết vào state
      } catch (error) {
        console.error('Lỗi khi lấy danh sách bài viết pending:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPendingArticles();
  }, [group._id]);
  // Hàm duyệt bài viết và gọi API
  const handleApproval = async (postId: string) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/v1/group/${group._id}/article/${postId}/processed`,
        { userId: currentUserId },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        } 
      );
      
      if (response.status === 200) {
        setApprovedPosts((prevApproved) => [...prevApproved, postId]);
        setRejectedPosts((prevRejected) => prevRejected.filter(id => id !== postId)); // Xóa khỏi danh sách từ chối nếu có
      } 
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data.message || error.message;
        console.log(`❗ Lỗi khi duyệt bài viết: ${errorMessage}`);
      } else {
        console.error('Lỗi hệ thống:', error);
      }
    }
  };
  

  // Hàm từ chối bài viết và gọi API
  const handleRejection = async (postId: string) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/v1/group/${group._id}/article/${postId}/reject`,
        { userId: currentUserId },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        } 
      );
  
      if (response.status === 200) {
        setRejectedPosts((prevRejected) => [...prevRejected, postId]);
        setApprovedPosts((prevApproved) => prevApproved.filter((id) => id !== postId)); // Xóa khỏi danh sách đã duyệt nếu có
      } 
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data.message || error.message;
        console.log(`❗ Lỗi khi từ chối bài viết: ${errorMessage}`);
      } else {
        console.error('Lỗi hệ thống:', error);
      }
    }
  };
  

  return (
    <Box
      sx={{
        padding: 3,
        backgroundColor: '#e9e9e9',
        height: '70vh',
        maxWidth: '900px',
        margin: '0 auto',
        overflowY: 'auto',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <CircularProgress />
        </Box>
      ) : (
        <List>
          {pendingPosts.length > 0 ? (
            pendingPosts.map((post, index) => (
              <Box
                key={index}
                sx={{
                  display: 'block',
                  padding: 3,
                  borderRadius: 2,
                  border: '1px solid #e0e0e0',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  backgroundColor: '#f9f9f9',
                  marginBottom: '24px',
                  maxWidth: '600px',
                  margin: '24px auto',
                }}
              >
                <ListItem sx={{ paddingLeft: 0 }}>
                  <ListItemAvatar>
                    <Avatar src={`/static/images/avatar/${index + 1}.jpg`} sx={{ width: 50, height: 50 }} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', marginRight: 1, color: '#333' }}>
                          {post.createdBy?.displayName || 'Người dùng ẩn danh'} - 
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Typography variant="body2" color="textSecondary">
                        @{post.createdBy?.displayName || 'anonymous'}
                      </Typography>
                    }
                  />
                  <IconButton>
                    <MoreHoriz />
                  </IconButton>
                </ListItem>
                <Box sx={{ marginTop: 2 }}>
                  <Typography sx={{ marginBottom: 2, color: '#555' }}>{post.content}</Typography>
                  {post.listPhoto && post.listPhoto.length > 0 && (
                    <Grid container spacing={1}>
                      {post.listPhoto.map((image, imgIndex) => (
                        <Grid item xs={12} key={imgIndex}>
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
                  )}
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
            ))
          ) : (
            <Typography textAlign="center" color="textSecondary">
              Không có bài viết nào đang chờ duyệt.
            </Typography>
          )}
        </List>
      )}
    </Box>
  );
};

export default ApprovaGroupContent;
