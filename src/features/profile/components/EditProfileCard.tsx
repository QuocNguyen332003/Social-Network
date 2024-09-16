import { Box, Button, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";

interface EditCardProps {
    label: string;
    textInput: Array<string>;
    saveData: (dataInput: string[]) => void;
}

const EditProfileCard = ({label, textInput, saveData}: EditCardProps) =>{
    const [dataInput, setDataInput] = useState<string[]>([]);

    useEffect(() => {
      setDataInput(Array(textInput.length).fill(""));
    }, [textInput]);
    
    const changeDataInput = (value: string, index: number) => {
      const updatedDataInput = [...dataInput];
      updatedDataInput[index] = value;
      setDataInput(updatedDataInput);
    }
    return (
        <Box sx={{display: 'flex', flexDirection: 'column',
            position: 'relative', width: '80%', paddingLeft: '10%'
        }}>
          <Typography variant="h5" color="black" fontWeight= "bold"
          sx={{margin: '10px 0', color:  '#150aa1', fontSize: 17}}>
                {label}
          </Typography>
          {textInput.map((item, index)=> 
            <TextField id="outlined-basic" label={item} variant="outlined"
            sx={{
                margin: '10px 0',
                '& .MuiInputBase-input': { fontSize: '12px' },  
                '& .MuiInputLabel-root': { fontSize: '12px' },   
                '& .MuiOutlinedInput-notchedOutline': {
                  fontSize: '12px', 
                },
              }}
              value={dataInput[index]}
              onChange={(e) => changeDataInput(e.target.value, index)}
              />
          )}
          <Button variant="contained"
          sx={{
            textTransform: 'none', position: 'absolute',
            bottom: '20px', right: '10px',
            backgroundColor:  '#150aa1' , fontSize: 12
          }} onClick={() => {saveData(dataInput)}}>
            Lưu
          </Button>
        </Box>
    )
}
export default EditProfileCard;