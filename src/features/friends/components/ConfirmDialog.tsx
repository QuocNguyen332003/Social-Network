import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material';

interface DialogProps{
    title: string;
    open: boolean;
    message: string;
    onClose: () => void;
    textOnClose: string;
    actions: {text: string; action: () => void}[];
}

const ConfirmDialog = ({title, open, message, onClose, textOnClose, actions }: DialogProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{textOnClose}</Button>
        {actions.map((item) => 
          <Button onClick={item.action} color="primary">{item.text}</Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
export default ConfirmDialog;
