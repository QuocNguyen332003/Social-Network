import React from 'react';
import { Box, Typography, Button } from '@mui/material';
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
        const replyLikes = Array.isArray(reply.emoticons) ? reply.emoticons.filter((emoticon) => emoticon.typeEmoticons === 'like').length : 0;
        const isReplyLiked = Array.isArray(reply.emoticons) && reply.emoticons.some((emoticon) => emoticon._iduser === currentUserId);


        return (
          <Box key={replyIndex} sx={{ marginTop: 2 }}>
            <Typography variant="body2" fontWeight="bold" sx={{ color: '#424242' }}>
            {typeof reply._iduser === 'object' && reply._iduser !== null ? reply._iduser.displayName : 'Người dùng chưa xác định'}
            </Typography>
            <Typography variant="body2" sx={{ color: '#616161', marginTop: 1 }}>
              {reply.content}
            </Typography>
            <Typography variant="caption" sx={{ color: '#757575', marginTop: 1 }}>
              {reply.createdAt ? formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true }) : 'Invalid date'}
            </Typography>

            <Box display="flex" alignItems="center" sx={{ marginTop: 1 }}>
              <Button
                size="small"
                startIcon={<ThumbUpAlt />}
                sx={{ color: isReplyLiked ? '#2e7d32' : '#757575', textTransform: 'none' }}
                onClick={() => onLikeReply(reply._id)}
              >
                {isReplyLiked ? 'Bỏ thích' : 'Thích'} ({replyLikes})
              </Button>
              <Button
                size="small"
                startIcon={<Reply />}
                sx={{ color: '#757575', textTransform: 'none' }}
                onClick={() => onReplyToComment(reply._iduser._id)}
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
