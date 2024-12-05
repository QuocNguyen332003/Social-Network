import { Box, Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, List, ListItem, ListItemText, CircularProgress } from "@mui/material";
import { useState } from "react";
import SettingUser from "./SettingUser";
import useSetting from "./useSetting";
import AccountSetting from "./AccountSetting";

interface SettingProps{
    open: boolean;
    setOpen: (value: boolean) => void;
}
const Setting = ({open, setOpen}:SettingProps) => {
    const options = [
        "Quyền riêng tư",
        "Tài khoản",
    ];
    const [selectedOption, setSelectedOption] = useState("Quyền riêng tư");
    const handleClose = () => setOpen(false);
    
    const {userSetting, setUserSetting, saveSetting} = useSetting();

    const saveChangeSetting = () => {
        saveSetting();
        handleClose();
    }
    if (userSetting === null) return <CircularProgress/>
    return (
        <Box>
            {/* Dialog hiển thị giữa màn hình */}
            <Dialog open={open} onClose={handleClose} fullScreen maxWidth="sm">
                <DialogTitle>Settings</DialogTitle>
                <DialogContent>
                    <Grid container  sx={{
                      height: '100%',
                    }}> 
                        <Grid item xs={3}>
                            <List>
                                {options.map((option) => (
                                    <ListItem
                                        button
                                        key={option}
                                        selected={selectedOption === option}
                                        onClick={() => setSelectedOption(option)}
                                    >
                                        <ListItemText primary={option} />
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>
                        <Grid xs={1}/>
                        <Grid xs={8} sx={{
                          height: '100%', 
                          overflowY: 'auto', // Kích hoạt cuộn theo chiều dọc
                          scrollbarWidth: 'none', // Ẩn thanh cuộn (Firefox)
                          '&::-webkit-scrollbar': { display: 'none' }, // Ẩn thanh cuộn (Chrome, Safari, Edge)
                        }}>
                            {selectedOption === "Quyền riêng tư" && <SettingUser data = {userSetting} setData = {setUserSetting}/>}
                            {selectedOption === "Tài khoản" && <AccountSetting/>}
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    {/* Nút hành động */}
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={saveChangeSetting} color="primary" variant="contained">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Setting;
