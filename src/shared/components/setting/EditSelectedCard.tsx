import { Box, Button, FormControlLabel, Switch, Typography } from "@mui/material"
import { useState } from "react";

interface EditCardProps {
    label: string;
    defaultValue: boolean;
    saveData: (value: boolean) => void;
}

const EditSelectedCard = ({label, defaultValue, saveData}: EditCardProps) =>{
    const [value, setValue] = useState<boolean>(defaultValue);

    return (
        <Box sx={{display: 'flex', flexDirection: 'column',
            position: 'relative', width: '80%', paddingLeft: '10%'
        }}>
          <Typography variant="h5" color="black" fontWeight= "bold"
          sx={{margin: '10px 0', color:  '#1976d2', fontSize: 17}}>
                {label}
          </Typography>
          <FormControlLabel
              control={
                  <Switch
                      checked={value}
                      onChange={(e) => setValue(e.target.checked)}
                  />
              }
              label={value?"Nam":"Nữ"}
          />
          <Button variant="contained"
          sx={{
            textTransform: 'none', position: 'absolute',
            bottom: '20px', right: '10px',
            backgroundColor:  '#1976d2' , fontSize: 12
          }} onClick={() => {saveData(value)}}>
            Lưu
          </Button>
        </Box>
    )
}
export default EditSelectedCard;