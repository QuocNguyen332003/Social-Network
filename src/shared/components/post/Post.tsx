 
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Paper,
  Button,
  IconButton,
  Collapse,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
} from '@mui/material';
import { MoreHoriz, Favorite, Comment, Share } from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';
import { Comment as CommentType, Article } from '../../../interface/interface';
import PostMenu from './component/PostMenu.tsx';
import { useNavigate } from 'react-router-dom';
import CommentSection from './component/CommentSection.tsx';
import axios from 'axios';
import ShareItemCard from './component/ShareItemCard'; // Nhập SavedItemCard để hiển thị bài viết được chia sẻ
import { v4 as uuidv4 } from 'uuid';

interface PostComponentProps {
  post: Article;
  onLikeComment: (postId: string, commentId: string) => void;
  onAddComment: (postId: string, newComment: CommentType) => void;
  onAddReply: (postId: string, commentId: string, newReply: CommentType) => void;
  onLikeReplyComment: (postId: string, commentId: string, replyId: string) => void;
  onDeletePost: (postId: string) => void;
  onLikePost: (postId: string) => void;
  onReportPost: (postId: string, reason: string) => void;
  onSavePost: (postId: string) => void;
  onEditPost: (postId: string, updatedContent: string, updatedScope: string) => void;
  currentUserId: string;
  onSharePost: (postId: string, shareContent: string, shareScope: string) => void;
}

const Post = ({
  post,
  onLikeComment,
  onAddComment,
  onLikeReplyComment,
  onAddReply,
  onDeletePost,
  onLikePost,
  onReportPost,
  onSavePost,
  onEditPost,
  currentUserId,
  onSharePost
}: PostComponentProps) => {
  const navigate = useNavigate(); 
  const [showComments, setShowComments] = useState(false);
  const [, setLikedComments] = useState<{ [key: string]: boolean }>({});
  const [replyInputs, setReplyInputs] = useState<{ [key: string]: boolean }>({});
  const [replyTexts, setReplyTexts] = useState<{ [key: string]: string }>({});
  const [newComment, setNewComment] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [updatedContent, setUpdatedContent] = useState(post.content);
  const [updatedScope, setUpdatedScope] = useState(post.scope);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [selectedReportReason, setSelectedReportReason] = useState<string>('');
  const [reportTarget, setReportTarget] = useState<{ postId: string; commentId?: string } | null>(null);

  // New state for share dialog
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [shareContent, setShareContent] = useState('');
  const [shareScope, setShareScope] = useState('public');

  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false); // Trạng thái mở `Dialog`
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Chỉ số của ảnh đang được hiển thị
  
  


  const isLiked = post.interact.emoticons.some(emoticon => emoticon._iduser === currentUserId && emoticon.typeEmoticons === 'like');

  const handleLikeClick = () => {
    onLikePost(post._id); // Gọi hàm onLikePost từ props
  };
  const handleToggleComments = () => {
    setShowComments(!showComments);
  };

  const handleLikeComment = (commentId: string) => {
    onLikeComment(post._id, commentId);
    setLikedComments(prevLikedComments => ({
      ...prevLikedComments,
      [commentId]: !prevLikedComments[commentId], // Toggle trạng thái like của comment
    }));
  };

  const handleLikeReply = (commentId: string, replyId: string) => {
    onLikeReplyComment(post._id, commentId, replyId);
  };

  const handleReplyToComment = (commentId: string) => {
    setReplyInputs(prevReplyInputs => ({
      ...prevReplyInputs,
      [commentId]: !prevReplyInputs[commentId], // Toggle the reply input visibility for the specific comment
    }));
  };

  const handleReplyChange = (commentId: string, text: string) => {
    setReplyTexts(prevReplyTexts => ({
      ...prevReplyTexts,
      [commentId]: text, // Track reply text for each comment
    }));
  };

  const handleSubmitReply = (commentId: string) => {
    const replyText = replyTexts[commentId] || ''; // Đảm bảo replyText luôn là một chuỗi rỗng nếu undefined
    if (replyText.trim()) {
      const reply: CommentType = {
        _id: uuidv4(), // Thêm `_id` bằng uuid
        _iduser: currentUserId,
        content: replyText,
        img: [],
        replyComment: [],
        emoticons: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      onAddReply(post._id, commentId, reply);

      // Reset lại trường nhập liệu sau khi gửi
      setReplyInputs(prevReplyInputs => ({
        ...prevReplyInputs,
        [commentId]: false,
      }));
      setReplyTexts(prevReplyTexts => ({
        ...prevReplyTexts,
        [commentId]: '',
      }));
    }
  };
  

  const handleNewCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(event.target.value);
  };

  const handleSubmitNewComment = () => {
    if (newComment.trim()) {
      const comment: CommentType = {
        _id: uuidv4(), // Thêm `_id` bằng uuid
        _iduser: currentUserId,
        content: newComment,
        img: [],
        replyComment: [],
        emoticons: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      onAddComment(post._id, comment);
      setNewComment('');
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeletePost = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bài viết này không?')) {
      onDeletePost(post._id);
    }
  };

  const handleSavePost = () => {
    onSavePost(post._id);
    handleMenuClose();
  };

  const handleOpenReportDialog = () => {
    setReportTarget({ postId: post._id });
    setReportDialogOpen(true);
  };

  const handleCloseReportDialog = () => {
    setReportDialogOpen(false);
    setSelectedReportReason('');
  };

  const handleSubmitReport = () => {
    if (reportTarget && selectedReportReason) {
      onReportPost(reportTarget.postId, selectedReportReason);
      handleCloseReportDialog();
    }
  };

  const handleReportReasonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedReportReason(event.target.value);
  };

  const handleOpenEditDialog = () => {
    setIsEditDialogOpen(true);
    handleMenuClose();
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
  };

  const handleEditPost = () => {
    onEditPost(post._id, updatedContent, updatedScope);
    setIsEditDialogOpen(false);
  };

  const handleShareDialogOpen = () => {
    setShareDialogOpen(true);
  };

  const handleShareDialogClose = () => {
    setShareDialogOpen(false);
    setShareContent('');
    setShareScope('public');
  };

  const handleShareContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShareContent(event.target.value);
  };

  const handleShareScopeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShareScope(event.target.value);
  };

  const handleShare = async () => {
    onSharePost(post._id, shareContent, shareScope); // Gọi hàm từ props
    handleShareDialogClose();
  };

  const handleOpenImageViewer = (index: number) => {
    setCurrentImageIndex(index);
    setIsImageViewerOpen(true);
  };
  
  // Hàm đóng Dialog
  const handleCloseImageViewer = () => {
    setIsImageViewerOpen(false);
  };
  
  // Hàm chuyển sang ảnh trước
  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? post.listPhoto.length - 1 : prevIndex - 1));
  };
  
  // Hàm chuyển sang ảnh tiếp theo
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === post.listPhoto.length - 1 ? 0 : prevIndex + 1));
  };

  const handleNavigateToOriginalPost = async (sharedPostId: string | null) => {
    if (!sharedPostId) return; 

    try {
      // Gọi API để lấy dữ liệu bài viết gốc
      const response = await axios.get(`http://localhost:3000/v1/article/${sharedPostId}`);
      const articleData = response.data;

      // Điều hướng đến bài viết gốc và truyền articleData vào state
      navigate(`/new-feeds/${sharedPostId}`, { state: { article: articleData } });
    } catch (error) {
      console.error('Lỗi khi lấy bài viết gốc:', error);
    }
  };

  return (
    <Paper sx={{ padding: 2, marginBottom: 3, borderRadius: 3, boxShadow: '0 3px 10px rgba(0,0,0,0.1)' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ marginBottom: 2 }}>
        <Box display="flex" alignItems="center">
        <Avatar 
          alt={typeof post.createdBy === 'string' ? post.createdBy : 'Anonymous'} 
          src={typeof post.createdBy?.avt === 'string' ? post.createdBy.avt : '/static/images/avatar/default.jpg'} 
          sx={{ width: 48, height: 48 }} 
        />
          <Box sx={{ marginLeft: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#333' }}>
              {post?.createdBy?.displayName}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {formatDistanceToNow(new Date(post.createdAt))} - {post.scope}
            </Typography>
          </Box>
        </Box>
        <Box>
          <IconButton onClick={handleMenuOpen}>
            <MoreHoriz sx={{ color: '#757575' }} />
          </IconButton>
        </Box>
        <PostMenu
          anchorEl={anchorEl}
          open={open}
          handleClose={handleMenuClose}
          handleSavePost={handleSavePost}
          handleOpenEditDialog={handleOpenEditDialog}
          handleOpenReportDialog={handleOpenReportDialog}
          handleDeletePost={handleDeletePost}
          isOwner={post.createdBy?._id === currentUserId}
        />
      </Box>
      <Divider sx={{ marginY: 2 }} />
      <Typography variant="body1" sx={{ color: '#424242', marginBottom: 2 }}>
        {post.content}
      </Typography>

      {/* Hiển thị bài viết chia sẻ nếu có */}
      {post.sharedPostId && (
        <Box
          onClick={() => handleNavigateToOriginalPost(post.sharedPostId)} // Điều hướng đến bài viết gốc khi nhấn vào
          sx={{ cursor: 'pointer' }} // Thay đổi con trỏ khi hover
        >
          <ShareItemCard sharedPostId={post.sharedPostId} />
        </Box>
      )}

      <Box display="flex" flexWrap="wrap" gap={1} sx={{ marginBottom: 2 }}>
        {post.hashTag.map((hashtag, index) => (
          <Button
            key={index}
            onClick={() => console.log('Hashtag clicked:', hashtag)}
            sx={{
              textTransform: 'none',
              color: '#1E90FF',
              padding: 0,
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            {hashtag}
          </Button>
        ))}
      </Box>

      {post.listPhoto.length > 0 && (
        <>
          <Box sx={{ marginTop: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {post.listPhoto.slice(0, 3).map((url, index) => (
              <Box key={index} sx={{ position: 'relative', cursor: 'pointer' }} onClick={() => handleOpenImageViewer(index)}>
                <img
                  src={url}
                  alt={`post-image-${index}`}
                  style={{ width: '200px', height: '200px', borderRadius: '8px', objectFit: 'cover' }}
                />
                {/* Hiển thị lớp phủ +n nếu là ảnh thứ 3 và còn ảnh khác */}
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
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="h4" sx={{ color: '#fff' }}>
                      +{post.listPhoto.length - 3}
                    </Typography>
                  </Box>
                )}
              </Box>
            ))}
          </Box>

          {/* Dialog hiển thị từng ảnh */}
          <Dialog open={isImageViewerOpen} onClose={handleCloseImageViewer} maxWidth="md" fullWidth>
            <DialogTitle sx={{ textAlign: 'center', color: '#1976d2' }}>
              Ảnh {currentImageIndex + 1} / {post.listPhoto.length}
            </DialogTitle>
            <DialogContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
              {/* Nút mũi tên trái */}
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
                  transition: 'all 0.3s ease',
                }}
              >
                {/* Sử dụng biểu tượng SVG mũi tên tùy chỉnh */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 6L9 12L15 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </IconButton>

              {/* Hình ảnh đang hiển thị */}
              <img
                src={post.listPhoto[currentImageIndex]}
                alt={`view-image-${currentImageIndex}`}
                style={{ maxWidth: '80%', maxHeight: '80%', borderRadius: '8px', objectFit: 'cover', transition: 'all 0.5s ease' }}
              />

              {/* Nút mũi tên phải */}
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
                  transition: 'all 0.3s ease',
                }}
              >
                {/* Sử dụng biểu tượng SVG mũi tên tùy chỉnh */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 6L15 12L9 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </IconButton>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseImageViewer} sx={{ color: '#1976d2' }}>
                Đóng
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}




      <Divider sx={{ marginY: 2 }} />


      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ marginTop: 2, width: '100%' }}>
        <Button
          startIcon={<Favorite />}
          fullWidth
          size="small"
          sx={{ 
            color: isLiked ? '#d32f2f' : '#1976d2', 
            marginRight: 1, 
            '&:hover': { backgroundColor: '#f5f5f5' },
            flex: 1 // Chiếm 1 phần trong tỷ lệ flex
          }}
          onClick={handleLikeClick}
        >
          {post.interact.emoticons.length} {isLiked ? 'Bỏ thích' : 'Yêu thích'}
        </Button>
        <Button 
          startIcon={<Comment />} 
          fullWidth 
          size="small" 
          sx={{ 
            color: '#1976d2', 
            marginRight: 1, 
            '&:hover': { backgroundColor: '#f5f5f5' },
            flex: 1 // Chiếm 1 phần trong tỷ lệ flex
          }} 
          onClick={handleToggleComments}
        >
          {post?.totalComments} Bình luận
        </Button>
        <Button 
          startIcon={<Share />} 
          fullWidth 
          size="small" 
          sx={{ 
            color: '#1976d2', 
            '&:hover': { backgroundColor: '#f5f5f5' },
            flex: 1 // Chiếm 1 phần trong tỷ lệ flex
          }} 
          onClick={handleShareDialogOpen}
        >
          Chia sẻ
        </Button>
      </Box>


      <Collapse in={showComments} timeout="auto" unmountOnExit>
        <Box sx={{ marginTop: 2, backgroundColor: '#f5f5f5', padding: 2, borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Viết bình luận..."
              value={newComment}
              onChange={handleNewCommentChange}
              sx={{ marginBottom: 1, borderRadius: '8px', backgroundColor: '#fff' }}
            />
            <Button variant="contained" size="small" onClick={handleSubmitNewComment} sx={{ marginTop: 1 }}>
              Gửi
            </Button>
          </Box>

          <CommentSection
            comments={post.interact.comment}
            onLikeComment={handleLikeComment}
            onReplyToComment={handleReplyToComment}
            handleReplyChange={handleReplyChange}
            replyTexts={replyTexts}
            replyInputs={replyInputs}
            handleSubmitReply={handleSubmitReply}
            onLikeReply={handleLikeReply}
            currentUserId={currentUserId}
          />
        </Box>
      </Collapse>

      <Dialog open={shareDialogOpen} onClose={handleShareDialogClose} fullWidth sx={{ '& .MuiDialog-paper': { backgroundColor: '#ffffff', color: '#000' } }}>
        <DialogTitle sx={{ textAlign: 'center', color: '#1976d2' }}>Chia sẻ</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Hãy nói gì đó về nội dung này (không bắt buộc)"
            type="text"
            fullWidth
            variant="outlined"
            value={shareContent}
            onChange={handleShareContentChange}
            sx={{ backgroundColor: '#fff', borderRadius: '4px' }}
          />
          <Typography variant="body2" sx={{ marginTop: 2, color: '#1976d2' }}>
            Chế độ chia sẻ
          </Typography>
          <RadioGroup value={shareScope} onChange={handleShareScopeChange}>
            <FormControlLabel value="public" control={<Radio />} label="Công khai" />
            <FormControlLabel value="friends" control={<Radio />} label="Bạn bè" />
            <FormControlLabel value="private" control={<Radio />} label="Riêng tư" />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleShareDialogClose} sx={{ color: '#1976d2' }}>
            Hủy
          </Button>
          <Button onClick={handleShare} variant="contained" sx={{ backgroundColor: '#1976d2', color: '#fff' }}>
            Chia sẻ ngay
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={reportDialogOpen} onClose={handleCloseReportDialog}>
        <DialogTitle>Báo cáo</DialogTitle>
        <DialogContent>
          <RadioGroup value={selectedReportReason} onChange={handleReportReasonChange}>
            <FormControlLabel value="spam" control={<Radio />} label="Spam" />
            <FormControlLabel value="offensive" control={<Radio />} label="Nội dung xúc phạm" />
            <FormControlLabel value="misleading" control={<Radio />} label="Thông tin sai lệch" />
            <FormControlLabel value="other" control={<Radio />} label="Lý do khác" />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReportDialog}>Hủy</Button>
          <Button onClick={handleSubmitReport} variant="contained" color="primary">Gửi báo cáo</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isEditDialogOpen} onClose={handleCloseEditDialog}>
        <DialogTitle>Chỉnh sửa bài viết</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            variant="outlined"
            label="Nội dung"
            multiline
            rows={4}
            value={updatedContent}
            onChange={(e) => setUpdatedContent(e.target.value)}
            sx={{ 
              marginBottom: 2,
              marginTop: 1,
            }}
          />
          <Typography variant="subtitle2" gutterBottom>
            Phạm vi bài viết
          </Typography>
          <RadioGroup
            value={updatedScope}
            onChange={(e) => setUpdatedScope(e.target.value)}
            row
          >
            <FormControlLabel value="public" control={<Radio />} label="Công khai" />
            <FormControlLabel value="friends" control={<Radio />} label="Bạn bè" />
            <FormControlLabel value="private" control={<Radio />} label="Riêng tư" />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Hủy</Button>
          <Button onClick={handleEditPost} variant="contained" color="primary">
            Lưu thay đổi
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default Post;
