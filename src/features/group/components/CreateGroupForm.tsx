import React, { useState } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface CreateGroupFormProps {
  open: boolean;
  onClose: () => void;
  onCreate: (groupName: string, groupDescription: string, groupImage: string) => void;
}

const CreateGroupForm: React.FC<CreateGroupFormProps> = ({ open, onClose, onCreate }) => {
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [groupImage, setGroupImage] = useState('');

  const handleCreate = () => {
    if (groupName && groupDescription) {
      onCreate(groupName, groupDescription, groupImage);
      setGroupName('');
      setGroupDescription('');
      setGroupImage('');
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Tạo nhóm mới</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Tên nhóm"
          type="text"
          fullWidth
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Mô tả nhóm"
          type="text"
          fullWidth
          value={groupDescription}
          onChange={(e) => setGroupDescription(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Link hình ảnh"
          type="text"
          fullWidth
          value={groupImage}
          onChange={(e) => setGroupImage(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button onClick={handleCreate} variant="contained" color="primary">
          Tạo
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateGroupForm;
