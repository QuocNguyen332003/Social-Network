import React, { useState } from 'react';
import { Box } from '@mui/material';
import PostForm from '../../../../../../shared/components/postForm/PostForm';
import Post from '../../../../../../shared/components/post/Post';
import {Interact, Article, Group} from '../../../../../../interface/interface.ts'
import { useOutletContext } from 'react-router-dom';
// Import các interface từ tệp của bạn

const DetailContent = () => {
  const { group, setGroup } = useOutletContext<{ group: Group, setGroup: (group: Group) => void }>();
  
  const mockArticles: Article[] = [
    {
      _id: '1',
      idHandler: 'Jada Jackson',
      handleDate: new Date(),
      groupID: 'group1',
      content: 'Hi Guys, This is my cat collection from last summer. Share yours!',
      listPhoto: ['/src/assets/images/avt.png', '/src/assets/images/avt.png', '/src/assets/images/avt.png'],
      scope: 'public',
      interact: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      _destroy: new Date(),
    },
    {
      _id: '2',
      idHandler: 'Michael Brown',
      handleDate: new Date(),
      groupID: 'group1',
      content: 'Check out these cool sunsets I captured last week!',
      listPhoto: ['/src/assets/images/avt.png', '/src/assets/images/avt.png', '/src/assets/images/avt.png'],
      scope: 'public',
      interact: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      _destroy: new Date(),
    },
    {
      _id: '3',
      idHandler: 'Emma Davis',
      handleDate: new Date(),
      groupID: 'group1',
      content: 'Look at this delicious meal I had yesterday! Anyone else loves pasta?',
      listPhoto: ['/src/assets/images/avt.png', '/src/assets/images/avt.png', '/src/assets/images/avt.png'],
      scope: 'public',
      interact: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      _destroy: new Date(),
    },
  ];

  // Lọc những bài viết có trạng thái "pending"
  const approvedPosts = group.article.listArticle
    .filter(article => article.state === 'approved')
    .map(article => mockArticles.find(a => a._id === article.idArticle))
    .filter(Boolean) as Article[];

  const [posts, setPosts] = useState<Article[]>([
    {
      _id: '1',
      idHandler: 'Panda Media',
      handleDate: new Date(),
      groupID: null,
      content:
        "[Historical Fact] The West first learned of the giant panda on 11 March 1869, when the French missionary Armand David received a skin from a hunter. In 1936, Ruth Harkness became the first Westerner to bring back a live giant panda.",
      scope: 'Public',
      listPhoto: [],
      interact: [
        {
          _id: '1-1',
          emoticons: [],
          comment: {
            _iduser: 'JohnDoe',
            content: 'Wow, that’s interesting!',
            img: [],
            replyComment: [],
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          _id: '1-2',
          emoticons: [],
          comment: {
            _iduser: 'JaneDoe',
            content: 'I never knew that!',
            img: [],
            replyComment: [
              {
                _id: '1-2-1',
                emoticons: [],
                comment: {
                  _iduser: 'PandaLover',
                  content: 'Yes, it’s a fascinating history!',
                  img: [],
                  replyComment: [],
                },
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            ],
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
      _destroy: new Date(),
    },
  ]);

// Xử lý khi gửi bài viết mới
const handlePostSubmit = (newPost: string, images: File[], visibility: string) => {
  const newPostId = (posts.length + 1).toString(); // Tạo ID cho bài viết mới
  const newPostEntry: Article = {
    _id: newPostId,
    idHandler: 'Panda Media',
    handleDate: null,
    groupID: group._id,
    content: newPost,
    listPhoto: images.length > 0 ? images.map(image => URL.createObjectURL(image)) : [],
    scope: visibility,
    interact: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    _destroy: new Date(),
  };

  // In ra dữ liệu của bài viết mới
  console.log('New Post:', newPostEntry);

  // Thêm bài viết mới vào danh sách bài viết
  setPosts([newPostEntry, ...posts]);

  // Cập nhật trạng thái bài viết mới trong group với trạng thái "pending"
  const updatedGroup = {
    ...group,
    article: {
      ...group.article,
      listArticle: [
        ...group.article.listArticle,
        { idArticle: newPostId, state: 'pending' }
      ]
    }
  };

  // In ra dữ liệu của group sau khi cập nhật
  console.log('Updated Group:', updatedGroup);

  // Cập nhật group với bài viết mới
  setGroup(updatedGroup);
};


  // Xử lý thêm comment mới
  const handleAddComment = (postId: string, newComment: Interact) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId
          ? { ...post, interact: [...post.interact, { ...newComment, _id: `comment-${Date.now()}`, createdAt: new Date(), updatedAt: new Date() }] }
          : post
      )
    );
  };


  // Xử lý thêm reply cho comment
  const handleAddReply = (postId: string, commentId: string, newReply: Interact) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post._id === postId) {
          const updatedComments = post.interact.map((comment) => {
            if (comment._id === commentId) {
              return {
                ...comment,
                comment: {
                  ...comment.comment,
                  replyComment: [...comment.comment.replyComment, { ...newReply, _id: `reply-${Date.now()}`, createdAt: new Date(), updatedAt: new Date() }],
                },
              };
            }
            return comment;
          });
          return { ...post, interact: updatedComments };
        }
        return post;
      })
    );
  };

  return (
    <Box
      sx={{
        padding: 2,
        backgroundColor: '#e9e9e9',
        height: '60vh',
        overflowY: 'auto',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      <PostForm onSubmit={handlePostSubmit} />
      {approvedPosts.map((post, index) => (
        <Post key={index} post={post} onAddComment={handleAddComment} onAddReply={handleAddReply} />
      ))}
    </Box>
  );
};

export default DetailContent;
