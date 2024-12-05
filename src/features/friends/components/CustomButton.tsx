import { Button } from "@mui/material";

type ButtonProps = {
    title: string;
    clickButton: () => void;
}

function CustomButton({title, clickButton}: ButtonProps){
    return (
        <Button variant="contained" onClick={clickButton}
            sx={{
                width: '170px', height: '35px',
                margin: '10px', 
                fontWeight: '400', fontSize: 14, textTransform: 'none',
                backgroundColor: '#1976d2',  
              }}
            >{title}
        </Button>
    )
}
export default CustomButton;