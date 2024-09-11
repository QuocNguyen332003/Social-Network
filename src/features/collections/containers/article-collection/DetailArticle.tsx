import { Box, Button } from "@mui/material";
import { useState } from "react";
import Post from "../../../../shared/components/post/Post";
import { useNavigate } from "react-router-dom";

interface EmoticonProps {
  typeEmoticons: string;
  _iduser: string;
}

interface CommentProps {
  _id: string;
  _iduser: string;
  content: string;
  img?: string[];
  replyComment?: CommentProps[];
  emoticons?: EmoticonProps[];
  createdAt: Date;
  updatedAt: Date;
  _destroy?: Date;
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
  emoticons?: EmoticonProps[];
  comments?: CommentProps[];
  createdAt: Date;
  updatedAt: Date;
  _destroy?: Date;
}

const DetailArticle = () => {
    const navigate = useNavigate();
  const [posts, setPosts] = useState<PostData[]>([
    {
      _id: '1',
      idAuthor: 'Panda Media',
      startDate: new Date(),
      content:
        "[Historical Fact] The West first learned of the giant panda on 11 March 1869, when the French missionary Armand David received a skin from a hunter. In 1936, Ruth Harkness became the first Westerner to bring back a live giant panda.",
      scope: 'Public',
      comments: [
        {
          _id: 'comment-1',
          _iduser: 'JohnDoe',
          content: 'Wow, that’s interesting!',
          createdAt: new Date(),
          updatedAt: new Date(),
          replyComment: [],
          emoticons: [],
        },
        {
          _id: 'comment-2',
          _iduser: 'JaneDoe',
          content: 'I never knew that!',
          createdAt: new Date(),
          updatedAt: new Date(),
          replyComment: [
            {
              _id: 'comment-3',
              _iduser: 'PandaLover',
              content: 'Yes, it’s a fascinating history!',
              createdAt: new Date(),
              updatedAt: new Date(),
              replyComment: [],
              emoticons: [],
            },
          ],
          emoticons: [],
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
      emoticons: [],
    },
  ]);

  const handleAddComment = (postId: string, newComment: CommentProps) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId
          ? { ...post, comments: [...post.comments!, newComment] }
          : post
      )
    );
  };

  const handleAddReply = (postId: string, commentId: string, newReply: CommentProps) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post._id === postId) {
          const updatedComments = post.comments!.map((comment) => {
            if (comment._id === commentId) {
              return { ...comment, replyComment: [...comment.replyComment!, newReply] };
            }
            return comment;
          });
          return { ...post, comments: updatedComments };
        }
        return post;
      })
    );
  };

  return (
    <Box sx={{
      backgroundColor: '#e9e9e9',
      padding: '20px'
    }}>
        <Button sx={{
            backgroundColor: '#fff', width: '100%', borderRadius: 3,
            marginBottom: '20px'
        }} onClick={() => {navigate(-1)}}>
            Quay lại
        </Button>
        {posts.map((post, index) => (
        <Post key={index} post={post} onAddComment={handleAddComment} onAddReply={handleAddReply} />
      ))}
    </Box>
  );
};

export default DetailArticle;
