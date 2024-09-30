import { Box, Button, TextField, Typography } from "@mui/material"
import { useState } from "react";

interface EditCardProps {
    label: string;
    textInput: Date;
    saveData: (dataInput: Date) => void;
}

const EditCardDate = ({label, textInput, saveData}: EditCardProps) =>{
    const [selectedDate, setSelectedDate] = useState<Date>(textInput);

    const changeDataInput = (value: string) => {
        const newDate = new Date(value);
        setSelectedDate(newDate);
    }
    return (
        <Box sx={{display: 'flex', flexDirection: 'column',
            position: 'relative', width: '80%', paddingLeft: '10%'
        }}>
          <Typography variant="h5" color="black" fontWeight= "bold"
          sx={{margin: '10px 0', color:  '#1976d2', fontSize: 17}}>
                {label}
          </Typography>
          <TextField
              id="outlined-basic"
              label={textInput.toDateString()}
              variant="outlined"
              type="date"  // Đổi thành kiểu Date
              sx={{
                margin: '10px 0',
                '& .MuiInputBase-input': { fontSize: '12px' },
                '& .MuiInputLabel-root': { fontSize: '12px' },
                '& .MuiOutlinedInput-notchedOutline': {
                  fontSize: '12px',
                },
              }}
              InputLabelProps={{
                shrink: true,
              }}
              value={selectedDate.toISOString().split('T')[0]}
              onChange={(e) => changeDataInput(e.target.value)}
            />
          <Button variant="contained"
          sx={{
            textTransform: 'none', position: 'absolute',
            bottom: '20px', right: '10px',
            backgroundColor:  '#1976d2' , fontSize: 12
          }} onClick={() => {saveData(selectedDate)}}>
            Lưu
          </Button>
        </Box>
    )
}
export default EditCardDate;