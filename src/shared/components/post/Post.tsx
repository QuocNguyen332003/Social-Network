import React, { useState } from 'react';
import { Box, Typography, Avatar, Paper, Button, IconButton, Collapse, TextField } from '@mui/material';
import { MoreHoriz, Favorite, Comment, Share, CardGiftcard, ThumbUpAlt, Reply } from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';

interface CommentProps {
  _iduser: string;
  content: string;
  img?: string[];
  replyComment?: CommentProps[];
  emoticons?: { typeEmoticons: string, _iduser: string }[];
  timestamp: Date;
}

interface PostProps {
  _id: string;
  idAuthor: string;
  startDate: Date;
  groupID?: string;
  changeDate?: Date;
  content: string;
  img?: string[];
  scope: string;
  emoticons?: { typeEmoticons: string, _iduser: string }[];
  comments?: CommentProps[];
}

interface PostComponentProps {
  post: PostProps;
  onAddComment: (postId: string, newComment: CommentProps) => void;
  onAddReply: (postId: string, commentId: string, newReply: CommentProps) => void;
}

const Post = ({ post, onAddComment, onAddReply }: PostComponentProps) => {
  const [showComments, setShowComments] = useState(false);
  const [likedComments, setLikedComments] = useState<string[]>([]);
  const [replyInputs, setReplyInputs] = useState<{ [key: string]: boolean }>({});
  const [replyTexts, setReplyTexts] = useState<{ [key: string]: string }>({});
  const [newComment, setNewComment] = useState('');

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
      const reply: CommentProps = {
        _iduser: 'CurrentUser', // Thay bằng ID người dùng hiện tại
        content: replyText,
        img: [],
        replyComment: [],
        emoticons: [],
        timestamp: new Date(), // Lưu thời gian hiện tại khi trả lời bình luận
      };
      onAddReply(post._id, commentId, reply);
      setReplyInputs((prevReplyInputs) => ({
        ...prevReplyInputs,
        [commentId]: false,
      }));
      setReplyTexts((prevReplyTexts) => ({
        ...prevReplyTexts, [commentId]: '',
      }));
    }
  };

  const handleNewCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(event.target.value);
  };

  const handleSubmitNewComment = () => {
    if (newComment.trim()) {
      const comment: CommentProps = {
        _iduser: 'CurrentUser', // Thay bằng ID người dùng hiện tại
        content: newComment,
        img: [],
        replyComment: [],
        emoticons: [],
        timestamp: new Date(), // Lưu thời gian hiện tại khi tạo bình luận
      };
      onAddComment(post._id, comment);
      setNewComment(''); // Reset input sau khi gửi bình luận
    }
  };

  return (
    <Paper sx={{ padding: 2, marginBottom: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center">
          <Avatar alt={post.idAuthor} src="/static/images/avatar/1.jpg" />
          <Box sx={{ marginLeft: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              {post.idAuthor}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {post.startDate.toDateString()} - {post.scope}
            </Typography>
          </Box>
        </Box>
        <IconButton>
          <MoreHoriz />
        </IconButton>
      </Box>
      <Typography variant="body1" sx={{ marginTop: 2 }}>
        {post.content}
      </Typography>
      {post.img && (
        <Box sx={{ marginTop: 2, display: 'flex', flexWrap: 'wrap' }}>
          {post.img.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`post-image-${index}`}
              style={{ maxWidth: '100px', maxHeight: '100px', marginRight: '10px', borderRadius: '8px' }}
            />
          ))}
        </Box>
      )}
      <Box display="flex" alignItems="center" sx={{ marginTop: 2 }}>
        <ThumbUpAlt fontSize="small" sx={{ color: '#2e7d32', marginRight: 1 }} />
        <Favorite fontSize="small" sx={{ color: '#d32f2f', marginRight: 1 }} />
        <Typography variant="body2" sx={{ marginLeft: 1 }}>
          {post.emoticons?.length || 0} likes - {post.comments?.length || 0} Comments
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ marginTop: 2 }}>
        <Box>
          <Button startIcon={<Favorite />} size="small" sx={{ color: '#424242', marginRight: 2 }}>
            Yêu thích
          </Button>
          <Button startIcon={<Comment />} size="small" sx={{ color: '#424242', marginRight: 2 }} onClick={handleToggleComments}>
            Bình luận
          </Button>
          <Button startIcon={<Share />} size="small" sx={{ color: '#424242', marginRight: 2 }}>
            Chia sẻ
          </Button>
          <Button startIcon={<CardGiftcard />} size="small" sx={{ color: '#424242' }}>
            Quà tặng
          </Button>
        </Box>
      </Box>
      <Collapse in={showComments} timeout="auto" unmountOnExit>
        <Box sx={{ marginTop: 2, backgroundColor: '#f5f5f5', padding: 2, borderRadius: 1 }}>
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Viết bình luận..."
              value={newComment}
              onChange={handleNewCommentChange}
              sx={{ marginBottom: 1 }}
            />
            <Button variant="contained" size="small" onClick={handleSubmitNewComment}>
              Gửi
            </Button>
          </Box>
          {post.comments && post.comments.length > 0 ? (
            <Box>
              <Typography variant="subtitle2" fontWeight="bold" sx={{ marginBottom: 2 }}>
                Bình luận:
              </Typography>
              {post.comments.map((comment, index) => (
                <Box key={index} sx={{ marginBottom: 2, paddingLeft: 2, borderLeft: '3px solid #e0e0e0' }}>
                  <Typography variant="body2" fontWeight="bold" sx={{ color: '#424242' }}>
                    {comment._iduser}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#616161' }}>
                    {comment.content}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#757575', marginLeft: 1 }}>
                    {formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}
                  </Typography>
                  {comment.img && (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', marginTop: 1 }}>
                      {comment.img.map((url, imgIndex) => (
                        <img
                          key={imgIndex}
                          src={url}
                          alt={`comment-image-${imgIndex}`}
                          style={{ maxWidth: '50px', maxHeight: '50px', marginRight: '5px', borderRadius: '4px' }}
                        />
                      ))}
                    </Box>
                  )}
                  <Box display="flex" alignItems="center" sx={{ marginTop: 1 }}>
                    <Button
                      size="small"
                      color="primary"
                      startIcon={<ThumbUpAlt />}
                      onClick={() => handleLikeComment(comment._iduser)}
                    >
                      {likedComments.includes(comment._iduser) ? 'Bỏ thích' : 'Thích'}
                    </Button>
                    <Button
                      size="small"
                      color="primary"
                      startIcon={<Reply />}
                      onClick={() => handleReplyToComment(comment._iduser)}
                    >
                      Trả lời
                    </Button>
                  </Box>
                  {replyInputs[comment._iduser] && (
                    <Box sx={{ marginTop: 1, paddingLeft: 2 }}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        placeholder="Nhập trả lời của bạn..."
                        value={replyTexts[comment._iduser] || ''}
                        onChange={(e) => handleReplyChange(comment._iduser, e.target.value)}
                        sx={{ marginBottom: 1 }}
                      />
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleSubmitReply(comment._iduser)}
                      >
                        Gửi
                      </Button>
                    </Box>
                  )}
                  {comment.replyComment && comment.replyComment.map((reply, replyIndex) => (
                    <Box key={replyIndex} sx={{ marginTop: 1, paddingLeft: 2, borderLeft: '2px solid #bdbdbd' }}>
                      <Typography variant="body2" fontWeight="bold" sx={{ color: '#424242' }}>
                        {reply._iduser}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#757575' }}>
                        {reply.content}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#757575', marginLeft: 1 }}>
                        {formatDistanceToNow(new Date(reply.timestamp), { addSuffix: true })}
                      </Typography>
                      {reply.img && (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', marginTop: 1 }}>
                          {reply.img.map((url, replyImgIndex) => (
                            <img
                              key={replyImgIndex}
                              src={url}
                              alt={`reply-image-${replyImgIndex}`}
                              style={{ maxWidth: '50px', maxHeight: '50px', marginRight: '5px', borderRadius: '4px' }}
                            />
                          ))}
                        </Box>
                      )}
                      <Box display="flex" alignItems="center" sx={{ marginTop: 1 }}>
                        <Button
                          size="small"
                          color="primary"
                          startIcon={<ThumbUpAlt />}
                          onClick={() => handleLikeComment(`${comment._iduser}-${replyIndex}`)}
                        >
                          {likedComments.includes(`${comment._iduser}-${replyIndex}`) ? 'Bỏ thích' : 'Thích'}
                        </Button>
                        <Button
                          size="small"
                          color="primary"
                          startIcon={<Reply />}
                          onClick={() => handleReplyToComment(`${comment._iduser}-${replyIndex}`)}
                        >
                          Trả lời
                        </Button>
                      </Box>
                      {replyInputs[`${comment._iduser}-${replyIndex}`] && (
                        <Box sx={{ marginTop: 1, paddingLeft: 2 }}>
                          <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            placeholder="Nhập trả lời của bạn..."
                            value={replyTexts[`${comment._iduser}-${replyIndex}`] || ''}
                            onChange={(e) => handleReplyChange(`${comment._iduser}-${replyIndex}`, e.target.value)}
                            sx={{ marginBottom: 1 }}
                          />
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => handleSubmitReply(`${comment._iduser}-${replyIndex}`)}
                          >
                            Gửi
                          </Button>
                        </Box>
                      )}
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
