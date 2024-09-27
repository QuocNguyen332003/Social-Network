import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { ThumbUpAlt, Reply } from '@mui/icons-material';
import { Comment as CommentType } from '../../../../interface/interface';
import { formatDistanceToNow } from 'date-fns';

interface ReplyCommentProps {
  replies: CommentType[];
  likedComments: { [key: string]: boolean };
  onLikeReply: (commentId: string, replyId: string) => void;
  onReplyToComment: (commentId: string) => void;
}

const ReplyComment: React.FC<ReplyCommentProps> = ({ replies, likedComments, onLikeReply, onReplyToComment }) => {
  return (
    <Box sx={{ marginTop: 2, paddingLeft: 2, borderLeft: '2px solid #bdbdbd' }}>
      {replies.map((reply, replyIndex) => {
        const replyLikes = reply.emoticons.filter((emoticon) => emoticon.typeEmoticons === 'like').length;

        return (
          <Box key={replyIndex} sx={{ marginTop: 2 }}>
            <Typography variant="body2" fontWeight="bold" sx={{ color: '#424242' }}>
              {reply._iduser.displayName} 
            </Typography>
            <Typography variant="body2" sx={{ color: '#616161', marginTop: 1 }}>
              {reply.content}
            </Typography>
            <Typography variant="caption" sx={{ color: '#757575', marginTop: 1 }}>
              {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}
            </Typography>

            <Box display="flex" alignItems="center" sx={{ marginTop: 1 }}>
              <Button
                size="small"
                startIcon={<ThumbUpAlt />}
                sx={{ color: likedComments[reply._iduser._id] ? '#2e7d32' : '#757575', textTransform: 'none' }}
                onClick={() => onLikeReply(reply._iduser, reply._iduser._id)}
              >
                {likedComments[reply._iduser._id] ? 'Bỏ thích' : 'Thích'} ({replyLikes})
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
