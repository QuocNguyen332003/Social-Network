import React, { useState } from 'react';
import { Box, Typography, Paper, Button, IconButton } from '@mui/material';
import { MoreHoriz } from '@mui/icons-material';
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

  const handleViewPost = () => {
    navigate(`/new-feeds/${article._id}`, { state: { article } });
  };

  return (
    <>
      <Paper sx={{ padding: 2, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', backgroundColor: '#f5f5f5', color: '#333', cursor: 'pointer' }} onClick={handleViewPost}>
        <Box sx={{ width: { xs: '100%', sm: '20%' }, mb: { xs: 2, sm: 0 }, mr: { sm: 2 } }}>
          {article.listPhoto.length > 0 && (
            <img src={article.listPhoto[0]} alt={article.content} style={{ width: '100%', display: 'block', borderRadius: '8px' }} />
          )}
        </Box>
        <Box sx={{ flex: 1, textAlign: { xs: 'center', sm: 'left' } }}>
          <Typography variant="body1" fontWeight="bold" color="#000">
            {article.content.length > 100 ? `${article.content.slice(0, 100)}...` : article.content}
          </Typography>
          <Typography variant="caption" color="#666">
            Đã lưu vào {article.scope}
          </Typography>
        </Box>
        <Button variant="contained" color="primary" sx={{ mr: 2, display: { xs: 'none', sm: 'inline-flex' } }} onClick={(e) => { e.stopPropagation(); handleAddToCollection(); }}>
          Thêm vào bộ sưu tập
        </Button>
        <IconButton sx={{ display: { xs: 'none', sm: 'inline-flex' } }} onClick={(e) => e.stopPropagation()}>
          <MoreHoriz />
        </IconButton>
      </Paper>

      <CollectionDialog open={openDialog} onClose={handleCloseDialog} collections={collections} onSelectCollection={handleSelectCollection} />
    </>
  );
};

export default SavedItemCard;
