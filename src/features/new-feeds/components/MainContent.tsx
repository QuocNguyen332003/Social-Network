import { useState } from 'react';
import { Box } from '@mui/material';
import PostForm from '../../../shared/components/postForm/PostForm';
import Post from '../../../shared/components/post/Post';

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
  groupID?: string | null;
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

const MainContent = () => {
  const [posts, setPosts] = useState<PostData[]>([
    {
      _id: '1',
      idAuthor: 'Panda Media',
      startDate: new Date(),
      content:
        "[Historical Fact] The West first learned of the giant panda on 11 March 1869, when the French missionary Armand David received a skin from a hunter. In 1936, Ruth Harkness became the first Westerner to bring back a live giant panda.",
      scope: 'Public',
      img: [],
      emoticons: [],
      comments: [
        {
          _id: '1-1',
          _iduser: 'JohnDoe',
          content: 'Wow, that’s interesting!',
          createdAt: new Date(),
          updatedAt: new Date(),
          replyComment: [],
          emoticons: [],
        },
        {
          _id: '1-2',
          _iduser: 'JaneDoe',
          content: 'I never knew that!',
          createdAt: new Date(),
          updatedAt: new Date(),
          replyComment: [
            {
              _id: '1-2-1',
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
    },
  ]);

  // Xử lý khi gửi bài viết mới
  const handlePostSubmit = (newPost: string, images: File[], visibility: string) => {
    const newPostEntry: PostData = {
      _id: (posts.length + 1).toString(),
      idAuthor: 'Panda Media',
      startDate: new Date(),
      content: newPost,
      img: images.length > 0 ? images.map(image => URL.createObjectURL(image)) : undefined,
      scope: visibility,
      emoticons: [],
      comments: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setPosts([newPostEntry, ...posts]);
  };

  // Xử lý thêm comment mới
  const handleAddComment = (postId: string, newComment: CommentProps) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId
          ? { ...post, comments: [...post.comments!, { ...newComment, _id: 'unique_comment_id', createdAt: new Date(), updatedAt: new Date() }] }
          : post
      )
    );
  };

  // Xử lý thêm reply cho comment
  const handleAddReply = (postId: string, commentId: string, newReply: CommentProps) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post._id === postId) {
          const updatedComments = post.comments!.map((comment) => {
            if (comment._id === commentId) {
              return { ...comment, replyComment: [...comment.replyComment!, { ...newReply, _id: 'unique_reply_id', createdAt: new Date(), updatedAt: new Date() }] };
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
    <Box sx={{ padding: 2, height: '85vh' }}>
      <PostForm onSubmit={handlePostSubmit} />
      {posts.map((post, index) => (
        <Post key={index} post={post} onAddComment={handleAddComment} onAddReply={handleAddReply} />
      ))}
    </Box>
  );
};

export default MainContent;
