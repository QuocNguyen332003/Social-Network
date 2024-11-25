import { Box, Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, List, ListItem, ListItemText, CircularProgress } from "@mui/material";
import { useState } from "react";
import SettingUser from "./SettingUser";
import useSetting from "./useSetting";

interface SettingProps{
    open: boolean;
    setOpen: (value: boolean) => void;
}
const Setting = ({open, setOpen}:SettingProps) => {
    const options = [
        "Quyền riêng tư",
        "Màn hình",
        "Thông báo",
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
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Settings</DialogTitle>
                <DialogContent>
                    <Grid container> 
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
                        <Grid xs={8}>
                            {selectedOption === "Quyền riêng tư" && <SettingUser data = {userSetting} setData = {setUserSetting}/>}
                            {selectedOption === "Màn hình" && <Box>Setting for Screen</Box>}
                            {selectedOption === "Thông báo" && <Box>Setting for Notifications</Box>}
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
