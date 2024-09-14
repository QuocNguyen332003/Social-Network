import React, { useState } from 'react';
import { Box, Typography, Avatar, Paper, Button, IconButton, Collapse, TextField, Menu, MenuItem } from '@mui/material';
import { MoreHoriz, Favorite, Comment, Share, CardGiftcard, ThumbUpAlt, Reply } from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';
import {Interact, Article} from '../../../interface/interface'


interface PostComponentProps {
  post: Article;
  onAddComment: (postId: string, newComment: Interact) => void;
  onAddReply: (postId: string, commentId: string, newReply: Interact) => void;
}

const Post = ({ post, onAddComment, onAddReply }: PostComponentProps) => {
  const [showComments, setShowComments] = useState(false);
  const [likedComments, setLikedComments] = useState<string[]>([]);
  const [replyInputs, setReplyInputs] = useState<{ [key: string]: boolean }>({});
  const [replyTexts, setReplyTexts] = useState<{ [key: string]: string }>({});
  const [newComment, setNewComment] = useState('');

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleToggleComments = () => {
    setShowComments(!showComments);
  };

  const handleLikeComment = (commentId: string) => {
    setLikedComments((prevLikedComments) =>
      prevLikedComments.includes(commentId)
        ? prevLikedComments.filter((id) => id !== commentId)
        : [...prevLikedComments, commentId]
    );
  };

  const handleReplyToComment = (commentId: string) => {
    setReplyInputs((prevReplyInputs) => ({
      ...prevReplyInputs,
      [commentId]: !prevReplyInputs[commentId],
    }));
  };

  const handleReplyChange = (commentId: string, text: string) => {
    setReplyTexts((prevReplyTexts) => ({
      ...prevReplyTexts,
      [commentId]: text,
    }));
  };

  const handleSubmitReply = (commentId: string) => {
    const replyText = replyTexts[commentId];
    if (replyText.trim()) {
      const reply: Interact = {
        _id: `reply-${Date.now()}`,
        emoticons: [],
        comment: {
          _iduser: 'CurrentUser',
          content: replyText,
          img: [],
          replyComment: [],
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      onAddReply(post._id, commentId, reply);
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
      const comment: Interact = {
        _id: `comment-${Date.now()}`,
        emoticons: [],
        comment: {
          _iduser: 'CurrentUser',
          content: newComment,
          img: [],
          replyComment: [],
        },
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

  const handleSavePost = () => {
    console.log('Post saved');
    handleMenuClose();
  };

  return (
    <Paper sx={{ padding: 3, marginBottom: 3, borderRadius: 3, boxShadow: '0 3px 10px rgba(0,0,0,0.1)' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ marginBottom: 2 }}>
        <Box display="flex" alignItems="center">
          <Avatar alt={post.idHandler ?? 'Anonymous'} src="/static/images/avatar/1.jpg" sx={{ width: 48, height: 48 }} />
          <Box sx={{ marginLeft: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#333' }}>
              {post.idHandler ?? 'Anonymous'}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {formatDistanceToNow(new Date(post.createdAt))} - {post.scope}
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={handleMenuOpen}>
          <MoreHoriz sx={{ color: '#757575' }} />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={handleSavePost}>Lưu bài viết</MenuItem>
        </Menu>
      </Box>

      <Typography variant="body1" sx={{ color: '#424242', marginBottom: 2 }}>
        {post.content}
      </Typography>

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
        <ThumbUpAlt fontSize="small" sx={{ color: '#2e7d32', marginRight: 1 }} />
        <Favorite fontSize="small" sx={{ color: '#d32f2f', marginRight: 1 }} />
        <Typography variant="body2" sx={{ color: '#757575', marginLeft: 1 }}>
          {post.interact.length || 0} likes - {post.interact.length || 0} bình luận
        </Typography>
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ marginTop: 2 }}>
        <Box>
          <Button startIcon={<Favorite />} size="small" sx={{ color: '#424242', marginRight: 2, '&:hover': { backgroundColor: '#f5f5f5' } }}>
            Yêu thích
          </Button>
          <Button startIcon={<Comment />} size="small" sx={{ color: '#424242', marginRight: 2, '&:hover': { backgroundColor: '#f5f5f5' } }} onClick={handleToggleComments}>
            Bình luận
          </Button>
          <Button startIcon={<Share />} size="small" sx={{ color: '#424242', marginRight: 2, '&:hover': { backgroundColor: '#f5f5f5' } }}>
            Chia sẻ
          </Button>
          <Button startIcon={<CardGiftcard />} size="small" sx={{ color: '#424242', '&:hover': { backgroundColor: '#f5f5f5' } }}>
            Quà tặng
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

          {post.interact.length > 0 ? (
            <Box>
              {post.interact.map((comment: Interact, index: number) => (
                <Box key={index} sx={{ marginBottom: 2, padding: 2, borderRadius: 2, backgroundColor: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
                  <Typography variant="body2" fontWeight="bold" sx={{ color: '#424242' }}>
                    {comment.comment._iduser}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#616161', marginTop: 1 }}>
                    {comment.comment.content}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#757575', marginTop: 1 }}>
                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                  </Typography>

                  <Box display="flex" alignItems="center" sx={{ marginTop: 1 }}>
                    <Button
                      size="small"
                      startIcon={<ThumbUpAlt />}
                      sx={{ color: likedComments.includes(comment._id) ? '#2e7d32' : '#757575', textTransform: 'none' }}
                      onClick={() => handleLikeComment(comment._id)}
                    >
                      {likedComments.includes(comment._id) ? 'Bỏ thích' : 'Thích'}
                    </Button>
                    <Button
                      size="small"
                      startIcon={<Reply />}
                      sx={{ color: '#757575', textTransform: 'none' }}
                      onClick={() => handleReplyToComment(comment._id)}
                    >
                      Trả lời
                    </Button>
                  </Box>

                  {replyInputs[comment._id] && (
                    <Box sx={{ marginTop: 1 }}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        placeholder="Nhập trả lời của bạn..."
                        value={replyTexts[comment._id] || ''}
                        onChange={(e) => handleReplyChange(comment._id, e.target.value)}
                        sx={{ marginBottom: 1, borderRadius: '8px', backgroundColor: '#fff' }}
                      />
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleSubmitReply(comment._id)}
                      >
                        Gửi
                      </Button>
                    </Box>
                  )}

                  {comment.comment.replyComment.map((reply: Interact, replyIndex: number) => (
                    <Box key={replyIndex} sx={{ marginTop: 2, paddingLeft: 2, borderLeft: '2px solid #bdbdbd' }}>
                      <Typography variant="body2" fontWeight="bold" sx={{ color: '#424242' }}>
                        {reply.comment._iduser}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#616161', marginTop: 1 }}>
                        {reply.comment.content}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#757575', marginTop: 1 }}>
                        {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}
                      </Typography>

                      <Box display="flex" alignItems="center" sx={{ marginTop: 1 }}>
                        <Button
                          size="small"
                          startIcon={<ThumbUpAlt />}
                          sx={{ color: likedComments.includes(reply._id) ? '#2e7d32' : '#757575', textTransform: 'none' }}
                          onClick={() => handleLikeComment(reply._id)}
                        >
                          {likedComments.includes(reply._id) ? 'Bỏ thích' : 'Thích'}
                        </Button>
                        <Button
                          size="small"
                          startIcon={<Reply />}
                          sx={{ color: '#757575', textTransform: 'none' }}
                          onClick={() => handleReplyToComment(reply._id)}
                        >
                          Trả lời
                        </Button>
                      </Box>
                    </Box>
                  ))}
                </Box>
              ))}
            </Box>
          ) : (
            <Typography variant="body2" color="textSecondary">
              Không có bình luận nào.
            </Typography>
          )}
        </Box>
      </Collapse>
    </Paper>
  );
};

export default Post;
