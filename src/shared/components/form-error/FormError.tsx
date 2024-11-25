import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface FormErrorProps{
    open: boolean;
    setOpen: (value: boolean) => void;
    message: string;
}
const FormError = ({open, setOpen, message}: FormErrorProps) => {
    const navigate = useNavigate();

    const handleClose = () => {
        setOpen(false);
        navigate('/new-feeds');
    }
    return (
        <Box>
            {/* Dialog hiển thị giữa màn hình */}
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Thông báo</DialogTitle>
                <DialogContent>
                    <Typography>{message}</Typography>
                </DialogContent>
                <DialogActions>
                    {/* Nút hành động */}
                    <Button onClick={handleClose} color="primary">
                        Xác nhận
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default FormError;