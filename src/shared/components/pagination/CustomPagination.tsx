import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { SetStateAction, useEffect, useState } from "react";
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
interface CustomPaginationProps{
    totalPages: number;
    handleActivityPageChange: (num: number) => void;
}

const CustomPagination = ({totalPages, handleActivityPageChange}:CustomPaginationProps) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [startPage, setStartPage] = useState<number>(1);
    const [inputPage, setInputPage] = useState('');

    useEffect(() => {
        handleActivityPageChange(currentPage);
    }, [currentPage]);
    
    const handleInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setInputPage(event.target.value);
    };

    const handleGoToPage = () => {
        setInputPage('');
        const pageNum = parseInt(inputPage, 10);
        if (pageNum >= 1 && pageNum <= totalPages) {
            handleChangePage(pageNum);
        }
    };
    const handleChangePage = (page: number) => {
        if (totalPages <= 3){
            setCurrentPage(page);
        }
        else{
            setCurrentPage(page);
            if (page <= 1){
                setStartPage(1)
            }
            else if (page >= totalPages){
                setStartPage(totalPages - 2)
            }
            else{
                setStartPage(page - 1);
            }
        }
    }
    if (totalPages <= 3)
        return(
            <Box sx={{display: "flex"}}>
              {Array.from({ length: totalPages }).map((_, index) => (
                <Button key={index} sx={[{ minWidth: '40px'}, 
                    currentPage -1 === index?{color: 'white', backgroundColor: '#1976d2'}:{}
                ]}
                onClick={() => handleChangePage(index + 1)}>
                    {index + 1}
                </Button>
              ))}
            </Box>
        )
    else 
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap", // Cho phép xuống dòng
                gap: "10px", // Khoảng cách giữa các phần tử
                alignItems: "center",
            }}
        >
            <IconButton onClick={() => handleChangePage(1)}>
                <FirstPageIcon />
            </IconButton>
    
            <Button
                sx={[
                    { minWidth: "40px", color: "black" },
                    currentPage === startPage
                        ? {color: 'white', backgroundColor: '#1976d2'}
                        : {},
                ]}
                onClick={() => handleChangePage(startPage)}
            >
                {startPage}
            </Button>
            <Button
                sx={[
                    { minWidth: "40px", color: "black" },
                    currentPage === startPage + 1
                        ? {color: 'white', backgroundColor: '#1976d2'}
                        : {},
                ]}
                onClick={() => handleChangePage(startPage + 1)}
            >
                {startPage + 1}
            </Button>
            <Button
                sx={[
                    { minWidth: "40px", color: "black" },
                    currentPage === startPage + 2
                        ? {color: 'white', backgroundColor: '#1976d2'}
                        : {},
                ]}
                onClick={() => handleChangePage(startPage + 2)}
            >
                {startPage + 2}
            </Button>
    
            {currentPage < totalPages - 1 && <Typography>...</Typography>}
    
            {currentPage < totalPages - 1 && (
                <Button
                    sx={{
                        minWidth: "40px",
                        textTransform: "none",
                        color: "black",
                    }}
                    onClick={() => handleChangePage(totalPages)}
                >
                    {totalPages}
                </Button>
            )}
    
            <IconButton onClick={() => handleChangePage(totalPages)}>
                <LastPageIcon />
            </IconButton>
    
            {/* Đặt TextField và Button xuống dòng nếu màn hình hẹp */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" }, // Chuyển sang column khi màn hình nhỏ
                    alignItems: "center",
                    gap: "10px", // Khoảng cách giữa TextField và Button
                }}
            >
                <TextField
                    size="small"
                    variant="outlined"
                    type="number"
                    value={inputPage}
                    InputProps={{
                        inputProps: { min: 0 }, // giới hạn số nhỏ nhất
                    }}
                    onChange={handleInputChange}
                    sx={{ width: "60px", height: "40px" }}
                />
    
                <Button
                    sx={{ backgroundColor: '#green' }}
                    variant="contained"
                    onClick={handleGoToPage}
                >
                    OK
                </Button>
            </Box>
        </Box>
    );
    
}

export default CustomPagination;