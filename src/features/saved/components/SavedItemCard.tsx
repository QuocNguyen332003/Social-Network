import React, { useState } from 'react';
import { Box, Typography, Paper, Button, IconButton } from '@mui/material';
import { MoreHoriz } from '@mui/icons-material';
import CollectionDialog from './CollectionDialog'; // Import dialog vừa tạo

interface SavedItem {
  type: string;
  content: string;
  collection: string;
  media: string;
  savedBy: string;
}

interface SavedItemCardProps {
  item: SavedItem;
  collections: string[]; // Thêm prop collections
}

const SavedItemCard: React.FC<SavedItemCardProps> = ({ item, collections }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleAddToCollection = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSelectCollection = (collection: string) => {
    console.log(`Thêm vào bộ sưu tập: ${collection}`); // Xử lý thêm vào bộ sưu tập
  };

  return (
    <>
      <Paper
        sx={{
          padding: 2,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' }, // Responsive layout
          alignItems: 'center',
          backgroundColor: '#f5f5f5',
          color: '#333',
        }}
      >
        <Box sx={{ width: { xs: '100%', sm: '20%' }, mb: { xs: 2, sm: 0 }, mr: { sm: 2 } }}>
          <img
            src={item.media}
            alt={item.content}
            style={{ width: '100%', filter: 'grayscale(100%)', display: 'block' }}
          />
        </Box>
        <Box sx={{ flex: 1, textAlign: { xs: 'center', sm: 'left' } }}>
          <Typography variant="body1" fontWeight="bold" color="#000">
            {item.content}
          </Typography>
          <Typography variant="caption" color="#666">
            {item.type} · Đã lưu vào {item.collection}
          </Typography>
          <Typography variant="caption" color="#999">
            Đã lưu từ bài viết của {item.savedBy}
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          sx={{ mr: 2, display: { xs: 'none', sm: 'inline-flex' } }}
          onClick={handleAddToCollection} // Hiển thị popup khi bấm
        >
          Thêm vào bộ sưu tập
        </Button>
        <IconButton sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
          <MoreHoriz />
        </IconButton>
      </Paper>

      {/* Hiển thị dialog */}
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
