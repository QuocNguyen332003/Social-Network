import { Box, Button, TextField, Typography } from "@mui/material"

interface EditCardProps {
    label: string;
    textInput: Array<string>;
}

const EditProfileCard = ({label, textInput}: EditCardProps) =>{
    
    return (
        <Box sx={{display: 'flex', flexDirection: 'column',
            position: 'relative', width: '80%', paddingLeft: '10%'
        }}>
          <Typography variant="h5" color="black" fontWeight= "bold"
          sx={{margin: '10px 0', color:  '#150aa1', fontSize: 17}}>
                {label}
          </Typography>
          {textInput.map((item)=> 
            <TextField id="outlined-basic" label={item} variant="outlined"
            sx={{
                margin: '10px 0',
                '& .MuiInputBase-input': { fontSize: '12px' },  
                '& .MuiInputLabel-root': { fontSize: '12px' },   
                '& .MuiOutlinedInput-notchedOutline': {
                  fontSize: '12px', 
                },
              }}
              />
          )}
          <Button variant="contained"
          sx={{
            textTransform: 'none', position: 'absolute',
            bottom: '20px', right: '10px',
            backgroundColor:  '#150aa1' , fontSize: 12
          }}>
            Lưu
          </Button>
        </Box>
    )
}
export default EditProfileCard;