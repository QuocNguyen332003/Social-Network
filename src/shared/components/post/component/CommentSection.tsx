import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import { ThumbUpAlt, Reply } from '@mui/icons-material';
import { Comment as CommentType } from '../../../../interface/interface';
import ReplyComment from './ReplyComment'; // Import ReplyComment component

interface CommentSectionProps {
  comments: CommentType[];
  onLikeComment: (commentId: string) => void;
  onReplyToComment: (commentId: string) => void;
  handleReplyChange: (commentId: string, text: string) => void;
  replyTexts: { [key: string]: string };
  replyInputs: { [key: string]: boolean };
  handleSubmitReply: (commentId: string) => void;
  likedComments: { [key: string]: boolean };
  onLikeReply: (commentId: string, replyId: string) => void; // Thêm hàm xử lý like reply
  currentUserId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  comments,
  onLikeComment,
  onReplyToComment,
  handleReplyChange,
  replyTexts,
  replyInputs,
  handleSubmitReply,
  likedComments,
  onLikeReply,
  currentUserId
}) => {
  return (
    <Box sx={{ marginTop: 2 }}>
      {comments.length > 0 ? (
        comments.map((comment, index) => {
          const commentLikes = comment.emoticons.filter((emoticon) => emoticon.typeEmoticons === 'like').length;
          const isCommentLiked = likedComments[comment._id] || false; // Trạng thái like hiện tại
          return (
            <Box key={index} sx={{ marginBottom: 2, padding: 2, borderRadius: 2, backgroundColor: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <Typography variant="body2" fontWeight="bold" sx={{ color: '#424242' }}>
                {comment?._iduser?.displayName}
              </Typography>
              <Typography variant="body2" sx={{ color: '#616161', marginTop: 1 }}>
                {comment.content}
              </Typography>
              <Typography variant="caption" sx={{ color: '#757575', marginTop: 1 }}>
                {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
              </Typography>

              <Box display="flex" alignItems="center" sx={{ marginTop: 1 }}>
                <Button
                  size="small"
                  startIcon={<ThumbUpAlt />}
                  sx={{ color: isCommentLiked ? '#2e7d32' : '#757575', textTransform: 'none' }}
                  onClick={() => onLikeComment(comment._id)}
                >
                  {isCommentLiked ? 'Bỏ thích' : 'Thích'} ({commentLikes})
                </Button>
                <Button
                  size="small"
                  startIcon={<Reply />}
                  sx={{ color: '#757575', textTransform: 'none' }}
                  onClick={() => onReplyToComment(comment._id)}
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
                  <Button variant="contained" size="small" onClick={() => handleSubmitReply(comment._id)}>
                    Gửi
                  </Button>
                </Box>
              )}

              {/* Sử dụng ReplyComment cho phần hiển thị reply */}
              <ReplyComment
                replies={comment.replyComment}
                onLikeReply={(replyId) => onLikeReply(comment._id, replyId)}
                onReplyToComment={onReplyToComment}
                currentUserId={currentUserId} // Truyền currentUserId
              />
            </Box>
          );
        })
      ) : (
        <Typography variant="body2" color="textSecondary">
          Không có bình luận nào.
        </Typography>
      )}
    </Box>
  );
};

export default CommentSection;
