/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CollectionDialog from './CollectionDialog';
import { Article, User } from '../../../interface/interface';
import axios from 'axios';
import { toast } from 'react-toastify';

interface SavedItemCardProps {
  article: Article;
  collections: string[];
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const SavedItemCard: React.FC<SavedItemCardProps> = ({
  article,
  collections,
  user,
  setUser,
}) => {
  const token = sessionStorage.getItem('token'); // Lấy token từ sessionStorage
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const handleAddToCollection = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/v1/user/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        }
      );
      setUser(response.data); // Cập nhật trạng thái người dùng
    } catch (error) {
      toast.error('Lỗi khi tải lại dữ liệu người dùng');
    }
  };

  const handleSelectCollection = async (collection: string) => {
    try {
      // Add the article to the selected collection
      await axios.post(`http://localhost:3000/v1/saved/articles/${article._id}/${collection}`, {
        userId: user._id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
      });
      toast.success('Bài viết đã được thêm vào bộ sưu tập!');
      handleCloseDialog();
      await fetchUserData(); // Gọi hàm này để tải lại dữ liệu người dùng
    } catch (error) {
      toast.error('Lỗi khi thêm bài viết vào bộ sưu tập');
    }
  };

  const handleRemoveFromCollection = async () => {
    try {
      await axios.delete(`http://localhost:3000/v1/saved/articles/${article._id}`, {
        headers: {
          Authorization: `Bearer ${token}` // Thêm token vào headers
        },
        data: {
          userId: user._id,
        },
      });
      toast.success('Bài viết đã được xóa khỏi bộ sưu tập thành công!');
      await fetchUserData(); // Gọi hàm này để tải lại dữ liệu người dùng
    } catch (error) {
      toast.error('Lỗi khi xóa bài viết khỏi bộ sưu tập');
    }
  };

  const handleViewPost = () => {
    navigate(`/new-feeds/${article._id}`, { state: { article } });
  };

  return (
    <>
      <Paper
        sx={{
          padding: 1,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          backgroundColor: '#f5f5f5',
          color: '#333',
          cursor: 'pointer',
          minHeight: '120px',
        }}
        onClick={handleViewPost}
      >
        <Box
          sx={{
            width: { xs: '100%', sm: '15%' },
            mb: { xs: 1, sm: 0 },
            mr: { sm: 2 },
          }}
        >
          <img
              src={article.listPhoto && article.listPhoto.length > 0 ? article.listPhoto[0] : 'src/assets/images/unknow.png'}
              alt={article.content}
              style={{
                width: '100%',
                display: 'block',
                borderRadius: '8px',
                maxWidth: '150px', 
                maxHeight: '150px',
                objectFit: 'contain',
                aspectRatio: '1/1',
              }}
            />   
        </Box>
        <Box
          sx={{
            flex: 1,
            textAlign: { xs: 'center', sm: 'left' },
            padding: '4px',
          }}
        >
          <Typography variant="body1" fontWeight="bold" color="#000" sx={{ fontSize: '0.875rem' }}>
            {article.content.length > 80 ? `${article.content.slice(0, 80)}...` : article.content}
          </Typography>
          <Typography variant="caption" color="#666">
            Đã lưu vào {article.scope}
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          sx={{
            mr: 2,
            display: { xs: 'none', sm: 'inline-flex' },
            padding: '4px 8px',
            fontSize: '0.75rem',
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCollection();
          }}
        >
          Thêm vào bộ sưu tập
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{
            padding: '4px 8px',
            fontSize: '0.75rem',
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleRemoveFromCollection();
          }}
        >
          Xóa
        </Button>
      </Paper>

      <CollectionDialog
        open={openDialog}
        onClose={handleCloseDialog}
        collections={collections.filter(collection => !user.collections.find(col => col.name === collection && col._destroy))} 
        onSelectCollection={handleSelectCollection}
      />
    </>
  );
};

export default SavedItemCard;
