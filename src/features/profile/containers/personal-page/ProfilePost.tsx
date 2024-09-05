import { Box } from "@mui/material";
import PostForm from "../../../../shared/components/postForm/PostForm";
import { useState } from "react";
import Post from "../../../../shared/components/post/Post";

interface CommentProps {
  _iduser: string;
  content: string;
  img?: string[];
  replyComment?: CommentProps[];
  emoticons?: { typeEmoticons: string, _iduser: string }[];
  timestamp: Date;  // Thêm trường timestamp để lưu thời gian bình luận
}

interface PostData {
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

const ProfilePost = () => {
  const [posts, _] = useState<PostData[]>([
    {
      _id: '1',
      idAuthor: 'Panda Media',
      startDate: new Date(),
      content:
        "[Historical Fact] The West first learned of the giant panda on 11 March 1869, when the French missionary Armand David received a skin from a hunter. In 1936, Ruth Harkness became the first Westerner to bring back a live giant panda.",
      scope: 'Public',
      comments: [
        {
          _iduser: 'JohnDoe',
          content: 'Wow, that’s interesting!',
          timestamp: new Date(),
          replyComment: [],
        },
        {
          _iduser: 'JaneDoe',
          content: 'I never knew that!',
          timestamp: new Date(),
          replyComment: [
            {
              _iduser: 'PandaLover',
              content: 'Yes, it’s a fascinating history!',
              timestamp: new Date(),
              replyComment: [],
            },
          ],
        },
      ],
    },
  ]);

  const handlePostSubmit = () => {
        
  }

  const handleAddComment = () => {}
  const handleAddReply = () => {}
  return (
    <Box sx={{
      backgroundColor: '#e9e9e9',
      padding: '20px 0'
    }}>
        <PostForm onSubmit={handlePostSubmit} />
        {posts.map((post, index) => (
        <Post key={index} post={post} onAddComment={handleAddComment} onAddReply={handleAddReply} />
      ))}
    </Box>
  );
};

export default ProfilePost;
