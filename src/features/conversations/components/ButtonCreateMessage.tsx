import { Button, ButtonProps, styled } from "@mui/material";

const ColorButton = styled(Button)<ButtonProps>(() => ({
    color: '#fff',
    backgroundColor: '#150aa1',
    '&:hover': {
      backgroundColor: '#3a2ece',
    },
    margin: '20px 0',
  }));
  
function ButtonCreateMessage() {
  return (
    <ColorButton variant="contained" startIcon={
        <img
            src="src/assets/images/dialogue.png"
            alt="Lotus"
            style={{ marginRight: '20px', height: '20px' }}
          />
    }
    sx={{fontSize: 12}}
    >
        Tin nhắn mới
    </ColorButton>
  );
}

export default ButtonCreateMessage;