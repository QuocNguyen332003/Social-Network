import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
} from '@mui/material';

interface CollectionDialogProps {
  open: boolean;
  onClose: () => void;
  collections: string[];
  onSelectCollection: (collection: string) => void;
}

const CollectionDialog: React.FC<CollectionDialogProps> = ({
  open,
  onClose,
  collections,
  onSelectCollection,
}) => {
  const handleCollectionClick = (collection: string) => {
    onSelectCollection(collection);
    onClose(); // Đóng popup sau khi chọn bộ sưu tập
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>
        <Typography variant="h6" align="center" sx={{ fontWeight: 'bold' }}>
          Chọn Bộ Sưu Tập
        </Typography>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <List>
          {collections.map((collection, index) => (
            <ListItem
              button
              key={index}
              onClick={() => handleCollectionClick(collection)}
              sx={{
                padding: 1.5,
                borderRadius: 2,
                transition: 'background-color 0.3s',
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                },
                mb: 1,
              }}
            >
              <ListItemText
                primary={collection}
                primaryTypographyProps={{
                  fontSize: '1rem',
                  fontWeight: 500,
                  textAlign: 'center',
                }}
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <Divider />
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            padding: '6px 24px',
            borderRadius: '20px',
            color: '#1976d2',
            borderColor: '#1976d2',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#1976d2',
              color: 'white',
            },
          }}
        >
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CollectionDialog;
