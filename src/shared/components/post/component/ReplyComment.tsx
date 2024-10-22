import React from 'react';
import { Box, Typography, Button, Avatar } from '@mui/material';
import { ThumbUpAlt, Reply } from '@mui/icons-material';
import { Comment as CommentType } from '../../../../interface/interface';
import { formatDistanceToNow } from 'date-fns';

interface ReplyCommentProps {
  replies: CommentType[];
  onLikeReply: (replyId: string) => void;
  onReplyToComment: (commentId: string) => void;
  currentUserId: string;
}

const ReplyComment: React.FC<ReplyCommentProps> = ({ replies, onLikeReply, onReplyToComment, currentUserId }) => {
  return (
    <Box sx={{ marginTop: 2, paddingLeft: 2, borderLeft: '2px solid #bdbdbd' }}>
      {replies.map((reply, replyIndex) => {
        const isReplyLiked = Array.isArray(reply.emoticons) && reply.emoticons.some((emoticon) => emoticon._iduser === currentUserId);

        // Get the avatar from the _iduser object if it's present and is an array
        let avatarUrl = '/default-avatar.png';
        const displayName = typeof reply._iduser === 'object' && reply._iduser !== null ? reply._iduser.displayName : 'Người dùng chưa xác định';
        if (typeof reply._iduser === 'object' && reply._iduser.avt && reply._iduser.avt.length > 0) {
          avatarUrl = reply._iduser.avt[reply._iduser.avt.length - 1]; // Get the last avatar in the array
        }

        return (
          <Box key={replyIndex} sx={{ marginTop: 2 }}>
            <Box display="flex" alignItems="center">
              <Avatar 
                alt={displayName} 
                src={avatarUrl} 
                sx={{ width: 32, height: 32, marginRight: 2 }} 
              />
              <Typography variant="body2" fontWeight="bold" sx={{ color: '#424242' }}>
                {displayName}
              </Typography>
            </Box>
            <Box
                sx={{
                  backgroundColor: '#f5f5f5', // Màu xám nhạt
                  padding: '8px',              // Khoảng cách nội dung tới viền
                  borderRadius: '8px',          // Bo góc
                  marginTop: 1                 // Khoảng cách trên
                }}
              >
                <Typography variant="body2" sx={{ color: '#616161' }}>
                {reply.content}
                </Typography>
              </Box>
            <Typography
                variant="caption" // Bạn có thể đổi thành "overline" nếu muốn nhỏ hơn
                sx={{ 
                  color: '#757575', 
                  marginTop: 1, 
                  fontSize: '0.75rem',  // Kích thước nhỏ hơn
                  opacity: 0.6          // Hiệu ứng mờ
                }}
              >
                 {reply.createdAt ? formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true }) : 'Invalid date'}
            </Typography>
            <Box display="flex" alignItems="center" sx={{ marginTop: 1 }}>
              <Button
                size="small"
                startIcon={<ThumbUpAlt />}
                sx={{ color: '#1976d2', textTransform: 'none' }}
                onClick={() => onLikeReply(reply._id)}
              >
                {isReplyLiked ? 'Bỏ thích' : 'Thích'} ({reply.totalLikes})
              </Button>
              <Button
                size="small"
                startIcon={<Reply />}
                sx={{ color: '#1976d2', textTransform: 'none' }}
                onClick={() => typeof reply._iduser !== 'string' ? onReplyToComment(reply._iduser._id) : null}
              >
                Trả lời
              </Button>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default ReplyComment;
