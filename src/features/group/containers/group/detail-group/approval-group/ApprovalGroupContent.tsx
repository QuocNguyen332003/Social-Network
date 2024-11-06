/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText, Divider, IconButton, Grid, CircularProgress, Dialog, DialogContent, DialogTitle, DialogActions } from '@mui/material';
import { MoreHoriz } from '@mui/icons-material';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import { Group, Article } from '../../../../../../interface/interface.ts';

const ApprovaGroupContent: React.FC = () => {
  const token = sessionStorage.getItem('token');
  const { group } = useOutletContext<{ group: Group }>();
  const [pendingPosts, setPendingPosts] = useState<Article[]>([]);
  const [approvedPosts, setApprovedPosts] = useState<string[]>([]);
  const [rejectedPosts, setRejectedPosts] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const [currentPhotos, setCurrentPhotos] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const currentUserId = sessionStorage.getItem('userId') || '';

  useEffect(() => {
    const fetchPendingArticles = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/v1/group/${group._id}/pending-articles`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPendingPosts(response.data.articles || []);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách bài viết pending:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPendingArticles();
  }, [group._id]);

  const handleApproval = async (postId: string) => {
    try {
      const response = await axios.post(`http://localhost:3000/v1/group/${group._id}/article/${postId}/processed`, { userId: currentUserId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        setApprovedPosts((prev) => [...prev, postId]);
        setRejectedPosts((prev) => prev.filter(id => id !== postId));
      }
    } catch (error) {
      console.error('Lỗi khi duyệt bài viết:', error);
    }
  };

  const handleRejection = async (postId: string) => {
    try {
      const response = await axios.post(`http://localhost:3000/v1/group/${group._id}/article/${postId}/reject`, { userId: currentUserId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        setRejectedPosts((prev) => [...prev, postId]);
        setApprovedPosts((prev) => prev.filter(id => id !== postId));
      }
    } catch (error) {
      console.error('Lỗi khi từ chối bài viết:', error);
    }
  };

  const handleOpenImageViewer = (index: number, photos: string[]) => {
    setCurrentImageIndex(index);
    setCurrentPhotos(photos);
    setIsImageViewerOpen(true);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % currentPhotos.length);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? currentPhotos.length - 1 : prevIndex - 1
    );
  };

  const handleCloseImageViewer = () => setIsImageViewerOpen(false);

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
        '&::-webkit-scrollbar': { display: 'none' },
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
                    <Avatar 
                     src={(post?.createdBy?.avt?.length ? post.createdBy.avt[post.createdBy.avt.length - 1].link
                     : '/static/images/avatar/default.jpg') as string} 
                     sx={{ width: 50, height: 50 }} />
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
                    secondary={<Typography variant="body2" color="textSecondary">@{post.createdBy?.displayName || 'anonymous'}</Typography>}
                  />
                  <IconButton><MoreHoriz /></IconButton>
                </ListItem>
                <Box sx={{ marginTop: 2 }}>
                  <Typography sx={{ marginBottom: 2, color: '#555' }}>{post.content}</Typography>
                  {post.listPhoto && post.listPhoto.length > 0 && (
                    <>
                      <Grid container spacing={1} sx={{ marginTop: 2 }}>
                        {post.listPhoto.slice(0, 3).map((photo, index) => (
                          <Grid item xs={4} key={index} sx={{ position: 'relative', cursor: 'pointer' }}>
                            <img
                              src={(photo?.link as unknown) as string}
                              alt={`post-image-${index}`}
                              style={{
                                width: '100%',
                                height: '200px',
                                borderRadius: '8px',
                                objectFit: 'contain'
                              }}
                              onClick={() => handleOpenImageViewer(index, post.listPhoto.map((p) => p.link as unknown as string))}
                            />
                            {index === 2 && post.listPhoto.length > 3 && (
                              <Box
                                sx={{
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  width: '100%',
                                  height: '100%',
                                  borderRadius: '8px',
                                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                              >
                                <Typography variant="h4" sx={{ color: '#fff' }}>
                                  +{post.listPhoto.length - 3}
                                </Typography>
                              </Box>
                            )}
                          </Grid>
                        ))}
                      </Grid>

                      <Dialog open={isImageViewerOpen} onClose={handleCloseImageViewer} maxWidth="md" fullWidth>
                        <DialogTitle sx={{ textAlign: 'center', color: '#1976d2' }}>
                          Ảnh {currentImageIndex + 1} / {currentPhotos.length}
                        </DialogTitle>
                        <DialogContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                          <IconButton
                            onClick={handlePreviousImage}
                            sx={{
                              position: 'absolute',
                              left: '20px',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              backgroundColor: 'rgba(0, 0, 0, 0.6)',
                              color: '#fff',
                              borderRadius: '50%',
                              width: '48px',
                              height: '48px',
                              '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.8)' },
                              transition: 'all 0.3s ease'
                            }}
                          >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M15 6L9 12L15 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </IconButton>
                          <img
                            src={currentPhotos[currentImageIndex]}
                            alt={`view-image-${currentImageIndex}`}
                            style={{
                              maxWidth: '100%',
                              maxHeight: '80vh',
                              borderRadius: '8px',
                              objectFit: 'contain',
                              transition: 'all 0.5s ease'
                            }}
                          />
                          <IconButton
                            onClick={handleNextImage}
                            sx={{
                              position: 'absolute',
                              right: '20px',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              backgroundColor: 'rgba(0, 0, 0, 0.6)',
                              color: '#fff',
                              borderRadius: '50%',
                              width: '48px',
                              height: '48px',
                              '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.8)' },
                              transition: 'all 0.3s ease'
                            }}
                          >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M9 6L15 12L9 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </IconButton>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleCloseImageViewer} sx={{ color: '#1976d2' }}>Đóng</Button>
                        </DialogActions>
                      </Dialog>
                    </>
                  )}
                  {approvedPosts.includes(post._id) ? (
                    <Typography sx={{ marginTop: 2, color: '#4caf50', fontWeight: 'bold' }}>Đã duyệt</Typography>
                  ) : rejectedPosts.includes(post._id) ? (
                    <Typography sx={{ marginTop: 2, color: '#d32f2f', fontWeight: 'bold' }}>Đã từ chối</Typography>
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
                            '&:hover': { backgroundColor: '#1565c0' },
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
                            '&:hover': { backgroundColor: '#f9f9f9' },
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
            <Typography textAlign="center" color="textSecondary">Không có bài viết nào đang chờ duyệt.</Typography>
          )}
        </List>
      )}
    </Box>
  );
};

export default ApprovaGroupContent;
