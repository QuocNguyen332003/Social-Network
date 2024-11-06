import { Box, Button, TextField, Typography } from "@mui/material"
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';

interface EditCardProps {
    label: string;
    textInput: Date;
    saveData: (dataInput: Date) => void;
}

const formatDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
  const year = String(date.getFullYear());
  return `${day}/${month}/${year}`;
};

const EditCardDate = ({label, textInput, saveData}: EditCardProps) =>{
    const initialDate = new Date(textInput);
    const [selectedDate, setSelectedDate] = useState<Date>(initialDate);

    const changeDataInput = (value: string) => {
        const newDate = new Date(value);
        if (isNaN(newDate.getTime())) {
            toast.error("Ngày không hợp lệ. Vui lòng nhập lại."); // Hiển thị lỗi bằng toast
        } else {
            setSelectedDate(newDate);
        }
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
              label={formatDate(initialDate)}
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
          <ToastContainer position="top-right" autoClose={3000} />
        </Box>
    )
}
export default EditCardDate;