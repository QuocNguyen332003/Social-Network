 
import React, { useEffect } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import { ThumbUpAlt, Reply } from '@mui/icons-material';
import { Comment as CommentType } from '../../../../interface/interface';
import ReplyComment from './ReplyComment'; // Import ReplyComment component
import { useState } from 'react';

interface CommentSectionProps {
  comments: CommentType[];
  onLikeComment: (commentId: string) => void;
  onReplyToComment: (commentId: string) => void;
  handleReplyChange: (commentId: string, text: string) => void;
  replyTexts: { [key: string]: string };
  replyInputs: { [key: string]: boolean };
  handleSubmitReply: (commentId: string) => void;
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
  onLikeReply,
  currentUserId
}) => {
  const [commentLikes, setCommentLikes] = useState<{ [key: string]: boolean }>({});

  // Đồng bộ hóa `likedComments` khi dữ liệu `comments` thay đổi
  useEffect(() => {
    if (comments && comments.length > 0) {
      const initialLikes: { [key: string]: boolean } = {};
      comments.forEach((comment) => {
        const isLiked = comment.emoticons.some(
          (emoticon) => emoticon.typeEmoticons === 'like' && emoticon._iduser === currentUserId
        );
        initialLikes[comment._id] = isLiked;
      });
      setCommentLikes(initialLikes); // Cập nhật state `commentLikes`
    }
  }, [comments, currentUserId]);
  
  return (
    <Box sx={{ marginTop: 2 }}>
      {comments.length > 0 ? (
        comments.map((comment, index) => {
          const totalLikes = comment.emoticons.filter((emoticon) => emoticon.typeEmoticons === 'like').length;
          const isLiked = commentLikes[comment._id] || false;
          return (
            <Box key={index} sx={{ marginBottom: 2, padding: 2, borderRadius: 2, backgroundColor: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <Typography variant="body2" fontWeight="bold" sx={{ color: '#424242' }}>
                {typeof comment._iduser !== 'string' ? comment._iduser.displayName : 'Anonymous'}
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
                    sx={{ color: isLiked ? '#2e7d32' : '#757575', textTransform: 'none' }}
                    onClick={() => {
                      // Thay đổi trạng thái like của bình luận
                      onLikeComment(comment._id);
                      setCommentLikes((prevLikes) => ({
                        ...prevLikes,
                        [comment._id]: !prevLikes[comment._id],
                      }));
                    }}
                  >
                  {isLiked ? 'Bỏ thích' : 'Thích'} ({totalLikes})
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
