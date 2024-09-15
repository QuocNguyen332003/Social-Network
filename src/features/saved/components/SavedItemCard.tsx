import React, { useState } from 'react';
import { Box, Typography, Paper, Button, IconButton } from '@mui/material';
import { MoreHoriz } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import CollectionDialog from './CollectionDialog';

interface SavedItem {
  _id: string;
  content: string;
  collection: string;
  media: string;
}

interface SavedItemCardProps {
  item: SavedItem;
  collections: string[];
}

const SavedItemCard: React.FC<SavedItemCardProps> = ({ item, collections }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const handleAddToCollection = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSelectCollection = (collection: string) => {
    console.log(`Thêm vào bộ sưu tập: ${collection}`);
  };

  const handleViewPost = () => {
    // Điều hướng đến trang chi tiết bài viết, truyền dữ liệu bài viết qua state
    navigate(`/new-feeds/${item._id}`, { state: { item } });
  };

  return (
    <>
      <Paper
        sx={{
          padding: 2,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          backgroundColor: '#f5f5f5',
          color: '#333',
          cursor: 'pointer',
        }}
        onClick={handleViewPost}
      >
        <Box sx={{ width: { xs: '100%', sm: '20%' }, mb: { xs: 2, sm: 0 }, mr: { sm: 2 } }}>
          <img
            src={item.media}
            alt={item.content}
            style={{ width: '100%', display: 'block' }}
          />
        </Box>
        <Box sx={{ flex: 1, textAlign: { xs: 'center', sm: 'left' } }}>
          <Typography variant="body1" fontWeight="bold" color="#000">
            {item.content}
          </Typography>
          <Typography variant="caption" color="#666">
            Đã lưu vào {item.collection}
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          sx={{ mr: 2, display: { xs: 'none', sm: 'inline-flex' } }}
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCollection();
          }}
        >
          Thêm vào bộ sưu tập
        </Button>
        <IconButton
          sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
          onClick={(e) => e.stopPropagation()}
        >
          <MoreHoriz />
        </IconButton>
      </Paper>

      <CollectionDialog
        open={openDialog}
        onClose={handleCloseDialog}
        collections={collections}
        onSelectCollection={handleSelectCollection}
      />
    </>
  );
};

export default SavedItemCard;
