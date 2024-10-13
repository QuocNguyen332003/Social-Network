import { Button, styled } from "@mui/material";

const ColorButton = styled(Button)(() => ({
    color: '#fff',
    backgroundColor: '#1976d2',
    '&:hover': {
      backgroundColor: '#1565c0',
    },
    margin: '20px 0',
  }));

interface ButtonCreateMessageProps {
  handlePress: () => void;
}
const ButtonCreateMessage = ({handlePress}: ButtonCreateMessageProps) => {
  return (
    <ColorButton variant="contained" startIcon={<img
      src="src/assets/images/dialogue.png"
      alt="Lotus"
      style={{ marginRight: '20px', height: '20px' }} />}
    sx={{ fontSize: 12 }} onClick={handlePress}    >
        Tin nhắn mới
    </ColorButton>
  );
}

export default ButtonCreateMessage;
