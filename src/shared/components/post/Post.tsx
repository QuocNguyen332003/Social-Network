 
import React, { useState } from 'react';
import { Box, Typography, Avatar, Paper, Button, IconButton, Collapse, TextField, Dialog, DialogActions, DialogContent, DialogTitle, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { MoreHoriz, Favorite, Comment, Share } from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';
import { Comment as CommentType, Article } from '../../../interface/interface';
import PostMenu from './component/PostMenu.tsx';
import CommentSection from './component/CommentSection.tsx';

interface PostComponentProps {
  post: Article;
  onAddComment: (postId: string, newComment: CommentType) => void;
  onAddReply: (postId: string, commentId: string, newReply: CommentType) => void;
  onDeletePost: (postId: string) => void; 
  onLikePost: (postId: string) => void;
  currentUserId: string;
}

const Post = ({ post, onAddComment, onAddReply, onDeletePost, onLikePost, currentUserId }: PostComponentProps) => {
  const [showComments, setShowComments] = useState(false);
  const [likedComments, setLikedComments] = useState<{ [key: string]: boolean }>({});
  const [replyInputs, setReplyInputs] = useState<{ [key: string]: boolean }>({});
  const [replyTexts, setReplyTexts] = useState<{ [key: string]: string }>({});
  const [newComment, setNewComment] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [selectedReportReason, setSelectedReportReason] = useState<string>('');
  const [reportTarget, setReportTarget] = useState<{ postId: string; commentId?: string } | null>(null);

  const isLiked = post.interact.emoticons.some(emoticon => emoticon._iduser === currentUserId && emoticon.typeEmoticons === 'like');

  const handleLikeClick = () => {
    onLikePost(post._id); // Gọi hàm onLikePost từ props
  };
  const handleToggleComments = () => {
    setShowComments(!showComments);
  };

  const handleLikeComment = (commentId: string) => {
    setLikedComments((prevLikedComments) => ({
      ...prevLikedComments,
      [commentId]: !prevLikedComments[commentId],
    }));

    post.interact.comment = post.interact.comment.map((comment) => {
      if (comment._iduser === commentId) {
        const isLiked = likedComments[commentId];

        if (isLiked) {
          comment.emoticons = comment.emoticons.filter((emoticon) => emoticon._iduser !== currentUserId);
        } else {
          comment.emoticons.push({ typeEmoticons: 'like', _iduser: currentUserId });
        }
      }
      return comment;
    });
  };

  const handleLikeReply = (commentId: string, replyId: string) => {
    post.interact.comment = post.interact.comment.map((comment) => {
      if (comment._id === commentId) {
        comment.replyComment = comment.replyComment.map((reply) => {
          if (reply._iduser === replyId) {
            const isLiked = likedComments[replyId];

            if (isLiked) {
              reply.emoticons = reply.emoticons.filter((emoticon) => emoticon._iduser !== currentUserId);
            } else {
              reply.emoticons.push({ typeEmoticons: 'like', _iduser: currentUserId });
            }
          }
          return reply;
        });
      }
      return comment;
    });

    setLikedComments((prevLikedComments) => ({
      ...prevLikedComments,
      [replyId]: !prevLikedComments[replyId],
    }));
  };


  const handleReplyToComment = (commentId: string) => {
    setReplyInputs((prevReplyInputs) => ({
      ...prevReplyInputs,
      [commentId]: !prevReplyInputs[commentId], // Toggle the reply input visibility for the specific comment
    }));
  };
  
  const handleReplyChange = (commentId: string, text: string) => {
    setReplyTexts((prevReplyTexts) => ({
      ...prevReplyTexts,
      [commentId]: text, // Track reply text for each comment
    }));
  };
  
  const handleSubmitReply = (commentId: string) => {
    const replyText = replyTexts[commentId] || ''; // Đảm bảo replyText luôn là một chuỗi rỗng nếu undefined
    if (replyText.trim()) {
      const reply: CommentType = {
        _iduser: currentUserId,
        content: replyText,
        img: [],
        replyComment: [],
        emoticons: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      onAddReply(post._id, commentId, reply); // Đảm bảo sử dụng comment._id thay vì comment._iduser
      
      // Reset lại trường nhập liệu sau khi gửi
      setReplyInputs((prevReplyInputs) => ({
        ...prevReplyInputs,
        [commentId]: false,
      }));
      setReplyTexts((prevReplyTexts) => ({
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

  const handleReportReasonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedReportReason(event.target.value);
  };

  const handleSubmitReport = () => {
    if (reportTarget) {
      // Submit the report logic here
      handleCloseReportDialog();
    }
  };

  return (
    <Paper sx={{ padding: 2, marginBottom: 3, borderRadius: 3, boxShadow: '0 3px 10px rgba(0,0,0,0.1)' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ marginBottom: 2 }}>
        <Box display="flex" alignItems="center">
          <Avatar alt={post.createdBy ?? 'Anonymous'} src={post.createdBy?.avt || '/static/images/avatar/default.jpg'}  sx={{ width: 48, height: 48 }} />
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
          {/* Chỉ hiển thị nút xóa nếu người dùng là chủ sở hữu bài viết */}
          <IconButton onClick={handleMenuOpen}>
            <MoreHoriz sx={{ color: '#757575' }} />
          </IconButton>
        </Box>
 {      /* Tách phần menu ra thành component riêng */}
         <PostMenu
          anchorEl={anchorEl}
          open={open}
          handleClose={handleMenuClose}
          handleSavePost={handleSavePost}
          handleOpenReportDialog={handleOpenReportDialog}
          handleDeletePost={handleDeletePost}
          isOwner={post.createdBy === currentUserId}
        />
      </Box>

      <Typography variant="body1" sx={{ color: '#424242', marginBottom: 2 }}>
        {post.content}
      </Typography>

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
        <Box sx={{ marginTop: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {post.listPhoto.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`post-image-${index}`}
              style={{ maxWidth: '100px', maxHeight: '100px', borderRadius: '8px', objectFit: 'cover' }}
            />
          ))}
        </Box>
      )}

      <Box display="flex" alignItems="center" sx={{ marginTop: 2 }}>
        <Favorite fontSize="small" sx={{ color: '#d32f2f' }} />
        <Typography variant="body2" sx={{ color: '#757575', marginLeft: 1 }}>
          {post.interact.emoticons.length} lượt thích - {post?.totalComments} bình luận
        </Typography>
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ marginTop: 2 }}>
        <Box>
          <Button
            startIcon={<Favorite />}
            size="small"
            sx={{ color: isLiked ? '#d32f2f' : '#424242', marginRight: 2, '&:hover': { backgroundColor: '#f5f5f5' } }}
            onClick={handleLikeClick}
          >
            {isLiked ? 'Bỏ thích' : 'Yêu thích'}
          </Button>
          <Button startIcon={<Comment />} size="small" sx={{ color: '#424242', marginRight: 2, '&:hover': { backgroundColor: '#f5f5f5' } }} onClick={handleToggleComments}>
            Bình luận
          </Button>
          <Button startIcon={<Share />} size="small" sx={{ color: '#424242', marginRight: 2, '&:hover': { backgroundColor: '#f5f5f5' } }}>
            Chia sẻ
          </Button>
        </Box>
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
              likedComments={likedComments}
              onLikeReply={handleLikeReply} // Truyền hàm onLikeReply vào CommentSection
            />
        </Box>
      </Collapse>

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
    </Paper>
  );
};

export default Post;
