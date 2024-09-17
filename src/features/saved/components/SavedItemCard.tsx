import React, { useState } from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CollectionDialog from './CollectionDialog';
import { Article, User } from '../../../interface/interface';

interface SavedItemCardProps {
  article: Article;
  collections: string[];
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const SavedItemCard: React.FC<SavedItemCardProps> = ({ article, collections, user, setUser }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const handleAddToCollection = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSelectCollection = (collection: string) => {
    console.log(`Thêm bài viết: ${article._id} vào bộ sưu tập: ${collection}`);

    // Xoá bài viết khỏi tất cả các bộ sưu tập hiện tại
    const updatedCollections = user.collections.map((coll) => {
      if (coll.items.includes(article._id)) {
        return {
          ...coll,
          items: coll.items.filter(itemId => itemId !== article._id), // Xoá bài viết khỏi bộ sưu tập cũ
        };
      }
      return coll;
    });

    // Thêm bài viết vào bộ sưu tập mới
    const targetCollection = updatedCollections.find((coll) => coll.name === collection);
    if (targetCollection) {
      targetCollection.items.push(article._id);
    }

    // Cập nhật lại state của user
    setUser({ ...user, collections: updatedCollections });
  };

  const handleRemoveFromCollection = () => {
    // Xoá bài viết khỏi tất cả các bộ sưu tập hiện tại
    const updatedCollections = user.collections.map((coll) => {
      if (coll.items.includes(article._id)) {
        return {
          ...coll,
          items: coll.items.filter(itemId => itemId !== article._id), // Xoá bài viết khỏi bộ sưu tập
        };
      }
      return coll;
    });

    // Cập nhật lại state của user
    setUser({ ...user, collections: updatedCollections });
  };

  const handleViewPost = () => {
    navigate(`/new-feeds/${article._id}`, { state: { article } });
  };

  return (
    <>
      <Paper 
        sx={{ 
          padding: 1, // Giảm padding tổng thể
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' }, 
          alignItems: 'center', 
          backgroundColor: '#f5f5f5', 
          color: '#333', 
          cursor: 'pointer',
          minHeight: '120px', // Giới hạn chiều cao tối thiểu
        }} 
        onClick={handleViewPost}
      >
        <Box 
          sx={{ 
            width: { xs: '100%', sm: '15%' }, // Giảm chiều rộng của ảnh
            mb: { xs: 1, sm: 0 }, // Giảm khoảng cách dưới ở chế độ mobile
            mr: { sm: 2 }, // Giảm khoảng cách phải ở chế độ desktop
          }}
        >
          {article.listPhoto.length > 0 && (
            <img 
              src={article.listPhoto[0]} 
              alt={article.content} 
              style={{ 
                width: '100%', 
                display: 'block', 
                borderRadius: '8px',
                maxHeight: '100px', // Giới hạn chiều cao của ảnh
                objectFit: 'cover', // Đảm bảo ảnh không bị kéo giãn
              }} 
            />
          )}
        </Box>
        <Box sx={{ flex: 1, textAlign: { xs: 'center', sm: 'left' }, padding: '4px' }}> {/* Giảm padding */}
          <Typography variant="body1" fontWeight="bold" color="#000" sx={{ fontSize: '0.875rem' }}> {/* Giảm font size */}
            {article.content.length > 80 ? `${article.content.slice(0, 80)}...` : article.content} {/* Giảm số ký tự hiển thị */}
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
            padding: '4px 8px', // Giảm padding của button
            fontSize: '0.75rem'  // Giảm kích thước chữ
          }}
          onClick={(e) => { e.stopPropagation(); handleAddToCollection(); }}
        >
          Thêm vào bộ sưu tập
        </Button>
        <Button
          variant="contained"
          color="secondary"
          sx={{ 
            padding: '4px 8px',  // Giảm padding của button
            fontSize: '0.75rem'   // Giảm kích thước chữ
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleRemoveFromCollection();
          }}
        >
          Xóa
        </Button>
      </Paper>

      <CollectionDialog open={openDialog} onClose={handleCloseDialog} collections={collections} onSelectCollection={handleSelectCollection} />
    </>
  );
};

export default SavedItemCard;
