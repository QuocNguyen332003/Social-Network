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
                fontWeight: '400', fontSize: 14, textTransform: 'none',
                backgroundColor: '#5858fa',  
              }}
            >{title}
        </Button>
    )
}
export default CustomButton;